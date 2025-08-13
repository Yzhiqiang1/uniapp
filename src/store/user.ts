import type { IUserInfoVo } from '@/api/types/login'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getUserInfo as _getUserInfo,
  login as _login,
  logout as _logout,
  wxLogin as _wxLogin,
  getWxCode,
} from '@/api/login'
import { toast } from '@/utils/toast'
import { srtToBase64 } from '@/utils/app'

// 初始化状态
const userInfoState: IUserInfoVo = {
  id: 0,//用户ID
  username: '',//用户名字
  avatar: '/static/images/default-avatar.png',//用户头像
  token: '',
  clientId: '',
  secret: '',
  amt: null,//账户余额
}

export const useUserStore = defineStore(
  'user',
  () => {
    // 定义用户信息
    const userInfo = ref<IUserInfoVo>({ ...userInfoState })
    // 设置用户信息
    const setUserInfo = (val: IUserInfoVo) => {
      console.log('设置用户信息', val)
      // 若头像为空 则使用默认头像
      if (!val.avatar) {
        val.avatar = userInfoState.avatar
      }
      else {
        val.avatar = 'https://oss.laf.run/ukw0y1-site/avatar.jpg?feige'
      }
      userInfo.value = val
    }

    const setUserAvatar = (avatar: string) => {
      userInfo.value.avatar = avatar
      console.log('设置用户头像', avatar)
      console.log('userInfo', userInfo.value)
    }
    // 删除用户信息
    const removeUserInfo = () => {
      userInfo.value = { ...userInfoState }
      uni.removeStorageSync('userInfo')
      uni.removeStorageSync('token')
    }
    /**
     * 获取用户信息
     */
    const getUserInfo = async () => {
      const res = await _getUserInfo()
      const userInfo = res.data
      setUserInfo(userInfo)
      uni.setStorageSync('userInfo', userInfo)
      uni.setStorageSync('token', userInfo.token)
      // TODO 这里可以增加获取用户路由的方法 根据用户的角色动态生成路由
      return res
    }

    /**
     *  获取accessToken
     */
    const getAccessToken = () => {
      let authorization = srtToBase64(userInfo.value.clientId + ":" + userInfo.value.secret);
      return new Promise((resolve, reject) => {
          // fetch(api.token,{
          //     method:'GET',
          //     headers:{
          //         'Content-Type': 'text/plain',
          //         'authorization': 'Basic ' + authorization
          //     }
          // }).then(response => response.json()) //数据解析的方式，json解析
          //     .then(response => {
          //         if(response.access_token){
          //             userInfo.value.token = response.access_token
          //             resolve(true);
          //         }else{
          //             reject(response.error)
          //         }
          //     }).catch((error) => {
          //         reject('网络错误');
          //     })
      })
    }
    /**
     * 用户登录
     * @param credentials 登录参数
     * @returns R<IUserLogin>
     */
    const login = async (credentials: {
      userName: string
      password: string
    }) => {
      const res = await _login(credentials)
      console.log('登录信息', res)
      toast.success('登录成功')
      await getUserInfo()
      return res
    }

    /**
     * 退出登录 并 删除用户信息
     */
    const logout = async () => {
      _logout()
      removeUserInfo()
    }
    /**
     * 微信登录
     */
    const wxLogin = async () => {
      // 获取微信小程序登录的code
      const data = await getWxCode()
      console.log('微信登录code', data)

      const res = await _wxLogin(data)
      await getUserInfo()
      return res
    }

    return {
      userInfo,
      login,
      wxLogin,
      getUserInfo,
      setUserAvatar,
      logout,
    }
  },
  {
    persist: true,
  },
)
