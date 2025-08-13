<route lang="jsonc" type="default">
{
  "style": {
    "navigationStyle": "custom"
  }
}
</route>

<template>
    <Navbar
        title="账号登录"
        background="#2EA4FF"
        color="#ffffff"
        :showBack="true"
    />
    <view class="login-container">
    <!-- 表单区域 -->
    <view class="form-container">
        <!-- 用户名输入框 -->
        <view class="input-group">
            <uni-icons class="input-icon" type="person" size="20" color="#999"></uni-icons>
            <input v-model="userName" class="input" placeholder="输入用户名" />
        </view>

        <!-- 密码输入框 -->
        <view class="input-group">
            <uni-icons class="input-icon" type="locked" size="20" color="#999"></uni-icons>
            <input v-model="password" class="input" password placeholder="输入您的密码" />
        </view>

        <!-- 忘记密码链接 -->
        <!-- <view class="forgot-password">
        <text class="forgot-password-text">忘记密码？</text>
        </view> -->

        <!-- 登录按钮 -->
        <button class="login-button" @click="login">登录</button>
        <button class="cancel-button">取消登录</button>

        <!-- 其他选项 -->
        <view class="other-options">
        <text class="other-option">短信登录</text>
        <text class="separator">|</text>
        <text class="other-option">注册账号</text>
        </view>
    </view>

    <!-- 底部体验账号登录 -->
    <view class="bottom" @click="guestLogin">
        <view class="tourist-login">
          <image class="tourist-icon" src="/static/images/Tourist.png"></image>
          <text class="bottom-text">体验账号登录</text>
        </view>
    </view>
    </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/index';
const userStore = useUserStore();

const userName = ref('');
const password = ref('');

// 登录方法
const login = (userInfo?: { userName: string, password: string }) => {
  const query = userInfo ? userInfo : { userName: userName.value, password: password.value };
  if(query.userName.length === 0 || query.password.length === 0) {
    uni.showToast({
      title: '账号或密码不能为空',
      icon: 'none',
      duration: 2000,
    });
  }
  // 使用userStore定义的登录方法
  userStore.login(query)
    .then((res)=>{
      if(res.flag) {
        if(res.flag == '00'){
          // 成功操作
          uni.navigateTo({ url: "/pages/home/home" })
          
        } else {
          // 失败
          uni.showToast({
            title: '登录异常,请检查帐号是否正确',
            icon: 'error',
            duration: 2000,
          });
        }
      }else {
        uni.showToast({
          title: '登录异常,请检查帐号是否正确',
          icon: 'error',
          duration: 2000,
        });
      }
    }).catch((err) => {
      uni.showToast({ 
        title: '登录异常，请检查网络是否正常',
        icon: 'error',
        duration: 2000,
      })
    });
};

// 游客体验登入
const guestLogin = () => {
  login({userName: 'tlink', password: 'admin'});
};

</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  padding: 120rpx 80rpx 0;
  background-color: #fff;
  box-sizing: border-box;

  .header {
    text-align: center;
    margin-bottom: 80rpx;

    .title {
      font-size: 48rpx;
      font-weight: bold;
      color: #333;
    }
  }

  .form-container {
    width: 100%;
    .input-group {
      display: flex;
      align-items: center;
      border: 1rpx solid #e5e5e5;
      border-radius: 50rpx;
      padding: 20rpx 30rpx;
      margin-bottom: 30rpx;
      background-color: #f9f9f9;
      .input-icon {
        margin-right: 20rpx;
      }
      .input {
        flex: 1;
        font-size: 28rpx;
        background-color: transparent;
        border: none;
        outline: none;
        color: #333;
      }
    }

    .forgot-password {
      text-align: right;
      margin-bottom: 50rpx;

      .forgot-password-text {
        color: #1890ff;
        font-size: 26rpx;
      }
    }

    .login-button {
      width: 100%;
      height: 80rpx;
      background-color: #1890ff;
      border-radius: 50rpx;
      color: #fff;
      font-size: 32rpx;
      border: none;
      margin-bottom: 20rpx;
    }

    .cancel-button {
      width: 100%;
      height: 80rpx;
      background-color: #fff;
      border-radius: 50rpx;
      color: #666;
      font-size: 32rpx;
      border: 1rpx solid #e5e5e5;
      margin-bottom: 30rpx;
    }

    .other-options {
      display: flex;
      justify-content: center;
      align-items: center;

      .other-option {
        color: #1890ff;
        font-size: 26rpx;
        margin: 0 20rpx;
      }

      .separator {
        color: #999;
        font-size: 26rpx;
      }
    }
  }

  .bottom {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 100rpx;
    margin-top: 50rpx;

    .tourist-login {
      display: flex;
      flex-direction: column;
      align-items: center;

      .tourist-icon {
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 20rpx;
      }

      .bottom-text {
        color: #999;
        font-size: 26rpx;
      }
    }
  }
}
</style>