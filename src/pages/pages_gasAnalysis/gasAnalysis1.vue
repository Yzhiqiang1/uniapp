<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "气体分析1"
  }
}
</route>

<script lang="ts" setup>
import {} from "@/utils/date";
import { useUserStore, useParameterGroupStore } from "@/store/index"

const userStore = useUserStore();
const parameterGroupStore = useParameterGroupStore();

// _s = util.oneData(3) < 10 ? '0' + util.oneData(3) : util.oneData(3);
// //日月年切换
// const dataSwitchIn = ref(0);

// //年月日时
// const start = ref(util.nowDate()); // 开始时间
// const start_HH = ref('00');

// const startDate = ref(new Date(util.oneData(), util.oneData(5), util.oneData(4)).getTime()); //时间戳
// const end = ref(util.nowDate()); //结束日期
// const end_HH = ref(_s + '');
// const endDate = ref(new Date(util.oneData(), util.oneData(5), util.oneData(4), util.oneData(3), util.oneData(2)).getTime()); //时间戳

// //年月-日期选择
// const _month = ref(util.nowDate(1));
// //年月-日选择
// const _monthTime = ref([
//     util.mGetDate(util.oneData(6), (util.oneData(5) + 1)),
//     util.mGetDate(util.oneData(6), (util.oneData(5) + 1)),
// ]);
// const _monthTimeIn = ref([0, util.oneData(4) - 1])
// //年-日期选择
// const _year = ref(util.nowDate(2))
// const _yearTime = ref([
//     ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
//     ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
// ])
// const _yearTimeIn = ref([0, util.oneData(5)])
// //数据项
// const optionData = ref([]);

// //日月年 选项卡切换
// const clickDataSwitch = (e:any)=>{
//     dataSwitchIn.value = e
// }

// 查询数据
const getData = ()=>{
    let LoginStatus = that.state.LoginStatus; //登录状态
    if (LoginStatus == 1) {
      uni.showToast({
        title: '未登录，请先登录！！！',
        icon: 'none',
      })
      return false;
    }
    uni.showLoading({
      title: '加载中',
      mask: true
    })
    //用户ID
    let userId = userStore.id;
    //查询设备ID
    let ObjdeviceId:any = parameterGroupStore.parameterGroup.multiGroup.selectKey;
    let strdeviceId = "";
    for (let i in ObjdeviceId) {
        if (i != "isGroup") {
          strdeviceId += strdeviceId == "" ? ObjdeviceId[i] : ',' + ObjdeviceId[i];
        }
    }
    //查询类型 日 月 年
    let dataSwitchIn = that.state.dataSwitchIn;
    //处理日报 月报 年报 接口切换
    let url = dataSwitchIn == 0 ? api.yqbb_getDayData : dataSwitchIn == 1 ? api.yqbb_getMonthData : api.yqbb_getYearData;
    //接口参数
    let parameter:any = {
        userId: userId,
        deviceIds: strdeviceId,
    }
    let date = '';

    if (dataSwitchIn == 0) {
        parameter.start = that.state.start;
        parameter.end = that.state.end;
        parameter.hour1 = that.state.start_HH;
        parameter.hour2 = that.state.end_HH;
    } else if (dataSwitchIn == 1) {
        date = that.state._month;
        parameter.date = that.state._month;
        parameter.day1 = that.state._monthTime[0][that.state._monthTimeIn[0]];
        parameter.day2 = that.state._monthTime[1][that.state._monthTimeIn[1]];
    } else if (dataSwitchIn == 2) {
        date = that.state._year;
        parameter.date = that.state._year;
        parameter.month1 = that.state._yearTime[0][that.state._yearTimeIn[0]];
        parameter.month2 = that.state._yearTime[1][that.state._yearTimeIn[1]];
    }
    //定义图表数据
    let queryData:any = [
        {
            id: tool.randomNum(6),
            type: 1,
            name: t('brokenReport'),
            state: true,
            title: '',
            legendData: [],
            xAxisData: [],
            xAxisDataIs: false,
            yAxisName: "",
            series: []
        },
        {
            id: tool.randomNum(6),
            type: 2,
            name: t('gasUsed'),
            state: true,
            title: '',
            total: 0,
            legendData: [],
            series: [{
                    // name: '用气占比',
                    name: '',
                    type: 'pie',
                    center: ['50%', '55%'],
                    radius: ['35%', '50%'],
                    label: {
                        alignTo: 'labelLine',
                        formatter: '{c|{c}({d}%)}',
                        backgroundColor: '#ffffff',
                        borderColor: '#8C8D8E',
                        borderWidth: 1,
                        borderRadius: 4,
                        rich: {
                            c: {
                                color: '#4C5058',
                                fontSize: 12,
                                align: 'center',
                                padding: [0, 5],
                                lineHeight: 26
                            }
                        }
                    },
                    data: []
                },
                {
                    name: t('total'),
                    type: 'pie',
                    center: ['50%', '55%'],
                    radius: ['34%', '35%'],
                    label: {
                        position: 'center',
                        formatter: '{a}\n{c}',
                        fontSize: 14,
                    },
                    data: []
                }
            ]
        }
    ];
    //查询数据
    HttpService.apiPost(url, parameter).then((res:any) => {
        if (res.flag == "00") {
            let listData = res.data.data;
            let allTime = res.data.allTime;
            //校验数据是否为空
            if (listData.length > 0) {
                for (let i = 0; i < listData.length; i++) {
                    //传感器数据
                    let objData = listData[i];
                    if (objData.data != undefined) {
                        //定义曲线对象
                        queryData[0].title = objData.sensorName + '(' + objData.sensorUnit + ')';
                        queryData[0].legendData.push(objData.name);
                        queryData[0].series[i] = {
                            name: objData.name,
                            type: 'line',
                            connectNulls: true,
                            data: []
                        };
                        /*循环处理数据*/
                        let arrData = objData.data; //对象数据
                        let dataName = dataSwitchIn == 0 ? t('hour') : dataSwitchIn == 1 ? t('day') : t('month');
                        ///////////////////
                        //处理折线数据,
                        // 日报
                        if (dataName == t('hour')) {
                            // x轴数据
                            queryData[0].xAxisData = allTime;
                            var keys = Object.keys(arrData);
                            var values = Object.values(arrData);
                            queryData[0].series[i].data = values;
                        }
                        //月报
                        else if (dataName == t('day')) {
                            for (let a = 0; a < 32; a++) {
                                let num = a < 10 ? '0' + a : a;
                                if (arrData[num] != undefined) {
                                    if (queryData[0].xAxisDataIs == false) {
                                        queryData[0].xAxisData.push(a + dataName);
                                    } else {
                                        if (queryData[0].xAxisData.length < arrData.length) {
                                            queryData[0].xAxisDataIs = false;
                                            queryData[0].xAxisData = [];
                                            queryData[0].xAxisData.push(a + t('hour'));
                                        }
                                    }
                                    queryData[0].series[i].data.push(arrData[num]);
                                }
                                if (a == 31) {
                                    queryData[0].xAxisDataIs = true;
                                }
                            }
                        }
                        //年报
                        else if (dataName == t('month')) {
                            for (let a = 0; a < 12; a++) {
                                let num = a < 10 ? '0' + a : a;
                                if (arrData[num] != undefined) {
                                    if (queryData[0].xAxisDataIs == false) {
                                        queryData[0].xAxisData.push(a + dataName);
                                    } else {
                                        if (queryData[0].xAxisData.length < arrData.length) {
                                            queryData[0].xAxisDataIs = false;
                                            queryData[0].xAxisData = [];
                                            queryData[0].xAxisData.push(a + t('hour'));
                                        }
                                    }
                                    queryData[0].series[i].data.push(arrData[num]);
                                }
                                if (a == 12) {
                                    queryData[0].xAxisDataIs = true;
                                }
                            }
                        }

                        //处理饼图数据,
                        queryData[1].title = objData.sensorName;
                        queryData[1].legendData.push(objData.name);
                        queryData[1].series[0].data.push({
                            value: objData.total,
                            name: objData.name
                        });
                        queryData[1].total = ((queryData[1].total * 1000000) + (objData.total * 1000000)) / 1000000;
                    }
                    if (i == (listData.length - 1)) {
                        queryData[1].series[1].data.push({
                            value: queryData[1].total,
                            name: t('total')
                        });
                    }

                }
                //更新数据
                that.setState({
                    optionData: queryData,
                }, () => {
                    //关闭加载效果
                    this.setState({
                        visible: false,
                    })
                })
            } else {
                that.setState({
                    optionData: [],
                }, () => {
                    //关闭加载效果
                    this.setState({
                        visible: false,
                    })
                })
            }
        } else {
            //关闭加载效果
            this.setState({
                visible: false,
            })
            this.setState({
                msgType: 2,
                visible: true,
                LoadingMsg: res.msg,
            },()=>{
                setTimeout(()=>{
                    this.setState({
                        visible: false,
                    })
                },2000)
            })
        }
    }).catch((fail_message) => {
        //关闭加载效果
        this.setState({
            visible: false,
        })
        // //错误提示信息
        this.setState({
            msgType: 2,
            visible: true,
            LoadingMsg: fail_message,
        },()=>{
            setTimeout(()=>{
                this.setState({
                    visible: false,
                })
            },2000)
        })
    });
}
</script>

<template>
  <view class=""></view>
</template>

<style lang="scss" scoped>
//
</style>
