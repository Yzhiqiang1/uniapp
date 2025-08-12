<route lang="jsonc" type="page">
{
  "layout": "tabbar",
  "style": {
    "navigationStyle": "custom"
  }
}
</route>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const handleLogout = () => {
  // 处理退出登录逻辑
  router.push('/login'); // 假设登录页路径为 /login
};
</script>

<template>
  <Navbar
    title="我的"
    :showBack="true"
    background="#2EA4FF"
    color="#ffffff"
    :showDropdown="true"
  />
  <view class="">
    <!-- 用户信息区域 -->
    <van-cell center :border="false">
      <template #icon>
        <img src="https://placehold.co/60x60" alt="用户头像" style="width: 60px; height: 60px; border-radius: 50%;">
      </template>
      <template #title>
        <div style="margin-left: 16px;">
          <p style="font-size: 18px; font-weight: bold;">TLINK</p>
          <p style="font-size: 14px; color: #999;">账号：20001009917</p>
        </div>
      </template>
      <template #right-icon>
        <van-icon name="arrow" />
      </template>
    </van-cell>

    <!-- 退出登录按钮 -->
    <van-button type="primary" block @click="handleLogout">退出登录</van-button>
  </view>
</template>

<style lang="scss" scoped>
.van-cell {
  padding: 20px;
}

.van-button--primary {
  margin-top: 20px;
  width: 80%;
  margin-left: 10%;
}
</style>
