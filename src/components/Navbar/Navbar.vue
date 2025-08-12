<script lang="ts" setup>
interface CapsuleInfo {
  width: number
  height: number
  top: number
  right: number
  bottom: number
  left: number
}

// 获取设备信息和状态栏高度
let statusBarHeight = 0
let navigationBarHeight = 44 // 默认导航栏高度
let capsuleInfo: CapsuleInfo | null = null
let systemInfo: UniNamespace.GetSystemInfoResult | UniNamespace.GetWindowInfoResult | null = null

// #ifdef MP-WEIXIN
// 微信小程序
systemInfo = uni.getWindowInfo()
statusBarHeight = systemInfo.statusBarHeight || 0
capsuleInfo = uni.getMenuButtonBoundingClientRect() as CapsuleInfo
if (capsuleInfo) {
  navigationBarHeight = capsuleInfo.height + (capsuleInfo.top - statusBarHeight) * 2
}
// #endif

// #ifdef APP-PLUS
// App
systemInfo = uni.getSystemInfoSync()
statusBarHeight = systemInfo.statusBarHeight || 0
navigationBarHeight = 88
// #endif

// #ifdef H5
// H5
statusBarHeight = 0
navigationBarHeight = 88
// #endif

// 总的导航栏高度
const totalHeight = statusBarHeight + navigationBarHeight

const props = withDefaults(defineProps<{
  title?: string
  background?: string
  color?: string
  showBack?: boolean
  showDropdown?: boolean // 控制是否显示下拉设备树功能
}>(), {
  title: '首页',
  background: '#ffffff',
  color: '#000000',
  showBack: false,
  showDropdown: false
})

const emit = defineEmits<{
  back: []
  dropdownToggle: [boolean] // 新增：通知父组件弹窗状态变化
}>()

const goBack = () => {
  if (props.showBack) {
    emit('back')
    uni.navigateBack()
  }
}

// 控制弹窗显示状态
const isDropdownVisible = ref(false)

// 切换弹窗显示状态
const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value
  // 通知父组件弹窗状态变化
  emit('dropdownToggle', isDropdownVisible.value)
}

// 关闭弹窗
const closeDropdown = () => {
  isDropdownVisible.value = false
  emit('dropdownToggle', false)
}
</script>

<template>
  <view class="navbar-container" :style="{ 
    height: totalHeight + 'rpx',
    backgroundColor: background
  }">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'rpx' }"></view>
    
    <!-- 导航栏主体 -->
    <view class="navbar" :style="{ height: navigationBarHeight + 'rpx' }">
      <!-- 返回按钮 -->
      <view v-if="showBack" class="navbar-back" @click="goBack">
        <uni-icons type="left" :color="color" size="26">返回</uni-icons>
      </view>
      
      <!-- 标题 -->
      <view class="navbar-title" :style="{ color: color }">
        {{ title }}
      </view>
    </view>
  </view>

  <!-- 主页下拉设备树 -->
  <view class="navbar-dropdown">
    <!-- <template>
      <view @click="">
        <text>当前未登录点击登录</text>
      </view>
    </template> -->
    <template>
      <text>用电表TP600/1609_140</text>
      <!-- 右侧下拉按钮 -->
      <view v-if="showDropdown" class="navbar-right" @click="toggleDropdown">
        <!-- 下拉图标 -->
        <uni-icons 
          :type="isDropdownVisible ? 'up' : 'down'"
          :color="'#000000'"
          size="26"
        />
      </view>
    </template>
  </view>
  
  <!-- 设备树弹窗 -->
  <view 
    v-if="showDropdown && isDropdownVisible" 
    class="dropdown-overlay" 
    @click="closeDropdown"
  >
    <view
      :style="{ marginTop: totalHeight + 70 + 'rpx', }" 
      class="dropdown-content" @click.stop
    >
      <view class="dropdown-left">
        <view class="dropdown-item select-item">
          <text>电表</text>
        </view>
        <view class="dropdown-item">
          <text>温度</text>
        </view>
        <view class="dropdown-item">
          <text>序列号分组</text>
        </view>
      </view>
      <view class="dropdown-right flex-1">
        
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.navbar-container {
  position: sticky;
  top: 0;
  width: 100vw;
  box-sizing: content-box;
  z-index: 999;
}

.status-bar {
  width: 100%;
}

.navbar {
  display: flex;
  align-items: center;
  padding: 0 15px;
  position: relative;
  box-sizing: border-box;
}

.navbar-back {
  position: absolute;
  width: 120rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
}

.navbar-title {
  flex: 1;
  text-align: center;
  font-size: 36rpx;
  font-weight: 500;
  margin: 0 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.navbar-right {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar-dropdown {
  position: sticky;
  z-index: 999;
  background-color: #ffffff;
  height: 60rpx;
  display: flex;
  font-size: 28rpx;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  box-sizing: border-box;
}

.dropdown-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  .dropdown-content {
    margin: auto;
    background-color: #ffffff;
    width: 94vw;
    height: 50vh;
    z-index: 999;
    border-radius: 10rpx;
    display: flex;
    overflow: hidden;
    .dropdown-left {
      width: 30vw;
      background-color: #F0F0F0;
      overflow-y: auto;
      .dropdown-item {
        color: #666666;
        padding: 15rpx;
        padding-left: 20rpx;
      }
      .select-item {
        color: #1890FF;
        background-color: #ffffff;
      }
    }
    .dropdown-right {

    }
  }
}
</style>
