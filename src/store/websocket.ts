import { defineStore } from "pinia"
import { useUserStore } from "@/store/index"

const userStore = useUserStore()
let timeout = null
let WS = null

export const useSocketStore = defineStore(
  'socket',
  () => {
    const socket = reactive({
        websocket_key: null,//实时数据websocket_key
        accessToken: null,//每次打开从新获取accessToken
        localSocket: function(data: any){},//创建websocket连接
        isSocket: true,//是否允许创建连接
        inSocket: true,//是否需要断线重连
        dropLineNum: 10,//掉线重连次数
        dropLineTime: 10000,//掉线重连时间/秒
    })
    
    // 是否创建websocket连接
    const initSocket = (type:any) => {
        let open = socket.isSocket;//是否允许创建链接
        if(type == true){//type 为true时 创建链接
            if (open == true){//open为true时 创建链接
                openWebsocket()
                socket.inSocket = true
                socket.dropLineNum = 10
            }
        }else{//type false 关闭链接
            if (open == false) {//open为false时 关闭链接
                socket.inSocket = false
                WS.close();//关闭链接
                //重置倒计时
                if (timeout != null){
                    clearTimeout(timeout);
                    timeout = null;
                }
            }
        }
    }
    // 创建websocket连接并监听状态
    const openWebsocket = () => {
        let websocket_key = socket.websocket_key + '_0';
        let url = import.meta.env.VITE_SOCKET_URL + websocket_key;
        let userId = userStore.userInfo.id;
        
        WS = new WebSocket(url)
        WS.onopen = () => {
            console.log("创建连接");
            socket.isSocket = false
        };
        WS.onmessage = (e: { data: any; }) => {
            let data = JSON.parse(e.data);
            if (data.flag == "00") {
                if (data.deviceUserid == userId) {
                    socket.localSocket(data);
                }
            }
        };
        
        WS.onerror = (e: { message: any; }) => {
            console.log('连接失败')
            socket.isSocket = true
        };
        
        WS.onclose = (e: { code: any; reason: any; }) => {
            console.log('连接关闭');
            socket.isSocket = true
            //判断是否允许 循环创建链接
            if (socket.inSocket == true){
                reconnect();
            }
        };
    }
    // 连接失败从新连接
    const reconnect = () => {
        let that = this;
        timeout = setTimeout(() => {
            socket.dropLineNum = socket.dropLineNum - 1
            if (socket.dropLineNum > 0){//最多重连10次
                openWebsocket();//重新链接
            }else{
               uni.showToast({
                title: 'WebSocket连接似乎遇到一个问题，请从新打开程序或者联系技术支持',
                icon: 'none',
                duration: 2000
              });
            }
            //重置定时器
            timeout = null;
        }, socket.dropLineTime);//每隔10秒连接一次
    }

    return {
      socket,
      initSocket,
      openWebsocket,
      reconnect,
    }
  },
)