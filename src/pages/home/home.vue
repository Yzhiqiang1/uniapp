<route lang="jsonc" type="home">
{
  "layout": "default",
  "style": {
    "navigationStyle": "custom",
    "navigationBarTitleText": "首页"
  }
}
</route>

<script lang="ts" setup>


// 使用 uni-app 的导航API
function navigateTo(url: string) {
  uni.navigateTo({ url });
}
</script>

<template>
  <view class="home-container">
    <view class="navbar"></view>
    <!-- 设备概括 -->
    <view class="section">
      <text class="section-title">设备概括</text>
      <view class="section-content">
        <view class="item">
          <image src="/static/svgs/EnerRoughly.svg" class="icon"></image>
          <text class="item-text">用能概括</text>
        </view>
        <view class="item">
          <image src="/static/svgs/Scan.svg" class="icon"></image>
          <text class="item-text">创建设备</text>
        </view>
      </view>
    </view>

    <!-- 电力测试 -->
    <view class="section">
      <text class="section-title">电力测试</text>
      <view class="section-content">
        <view class="item" @click="navigateTo('/pages/login/login')">
          <image src="/static/svgs/ElectricPowerDaily.svg" class="icon"></image>
          <text class="item-text">日原数据</text>
        </view>
        <view class="item">
          <image src="/static/svgs/DailyExtremes.svg" class="icon"></image>
          <text class="item-text">逐日极值</text>
        </view>
        <view class="item">
          <image src="/static/svgs/ElectricityChart.svg" class="icon"></image>
          <text class="item-text">电力报表</text>
        </view>
        <view class="item">
          <image src="/static/svgs/ExtremeValueReport.svg" class="icon"></image>
          <text class="item-text">极值报表</text>
        </view>
        <view class="item">
          <image src="/static/svgs/PowerFactor.svg" class="icon"></image>
          <text class="item-text">功率因素</text>
        </view>
        <view class="item">
          <image src="/static/svgs/ElectricPowerDaily.svg" class="icon"></image>
          <text class="item-text">电力日报</text>
        </view>
        <view class="item">
          <image src="/static/svgs/ElectricPowerDaily.svg" class="icon"></image>
          <text class="item-text">谐波监测</text>
        </view>
      </view>
    </view>

    <!-- 用电分析 -->
    <view class="section">
      <text class="section-title">用电分析</text>
      <view class="section-content">
        <view class="item">
          <image src="/static/svgs/EnergyChart.svg" class="icon"></image>
          <text class="item-text">用能报表</text>
        </view>
        <view class="item">
          <image src="/static/svgs/YearOnYearAnalysis.svg" class="icon"></image>
          <text class="item-text">同比分析</text>
        </view>
        <view class="item">
          <image src="/static/svgs/Qoq.svg" class="icon"></image>
          <text class="item-text">环比分析</text>
        </view>
        <view class="item">
          <image src="/static/svgs/LossAnalysis.svg" class="icon"></image>
          <text class="item-text">损耗分析</text>
        </view>
        <view class="item">
          <image src="/static/svgs/ElectricEnergyCollection.svg" class="icon"></image>
          <text class="item-text">电能集抄</text>
        </view>
        <view class="item">
          <image src="/static/svgs/SharpPeaksAndValleys.svg" class="icon"></image>
          <text class="item-text">尖峰平谷</text>
        </view>
        <view class="item">
          <image src="/static/svgs/MaxDemand.svg" class="icon"></image>
          <text class="item-text">最大需量</text>
        </view>
      </view>
    </view>

    <!-- 用水分析 -->
    <view class="section">
      <text class="section-title">用水分析</text>
      <view class="section-content">
        <view class="item">
          <image src="/static/svgs/EnergyChart.svg" class="icon"></image>
          <text class="item-text">用能报表</text>
        </view>
        <view class="item">
          <image src="/static/svgs/YearOnYearAnalysis.svg" class="icon"></image>
          <text class="item-text">同比分析</text>
        </view>
        <view class="item">
          <image src="/static/svgs/Qoq.svg" class="icon"></image>
          <text class="item-text">环比分析</text>
        </view>
        <view class="item">
          <image src="/static/svgs/LossAnalysis.svg" class="icon"></image>
          <text class="item-text">损耗分析</text>
        </view>
        <view class="item">
          <image src="/static/svgs/ElectricEnergyCollection.svg" class="icon"></image>
          <text class="item-text">水能集抄</text>
        </view>
      </view>
    </view>

    <!-- 用气分析 -->
    <view class="section">
      <text class="section-title">用气分析</text>
      <view class="section-content">
        <view class="item">
          <image src="/static/svgs/EnergyChart.svg" class="icon"></image>
          <text class="item-text">用能报表</text>
        </view>
        <view class="item">
          <image src="/static/svgs/YearOnYearAnalysis.svg" class="icon"></image>
          <text class="item-text">同比分析</text>
        </view>
        <view class="item">
          <image src="/static/svgs/Qoq.svg" class="icon"></image>
          <text class="item-text">环比分析</text>
        </view>
        <view class="item">
          <image src="/static/svgs/LossAnalysis.svg" class="icon"></image>
          <text class="item-text">损耗分析</text>
        </view>
        <view class="item">
          <image src="/static/svgs/ElectricEnergyCollection.svg" class="icon"></image>
          <text class="item-text">气能集抄</text>
        </view>
      </view>
    </view>

    <!-- 安全用电 -->
    <view class="section">
      <text class="section-title">安全用电</text>
      <view class="section-content">
        <view class="item">
          <image src="/static/svgs/Ltd.svg" class="icon"></image>
          <text class="item-text">漏电/温度监测</text>
        </view>
        <view class="item">
          <image src="/static/svgs/Switch.svg" class="icon"></image>
          <text class="item-text">开关控制</text>
        </view>
        <view class="item">
          <image src="/static/svgs/SwitchMonitoring.svg" class="icon"></image>
          <text class="item-text">开关监测</text>
        </view>
        <view class="item">
          <image src="/static/svgs/Camera.svg" class="icon"></image>
          <text class="item-text">摄像头</text>
        </view>
      </view>
    </view>

    <!-- 底部导航栏 -->
    <view class="bottom-navigation">
      <view class="nav-item active">
        <image src="/static/svg/home-active.svg" class="nav-icon"></image>
        <text class="nav-text">首页</text>
      </view>
      <view class="nav-item">
        <image src="/static/svg/cloud-group-status.svg" class="nav-icon"></image>
        <text class="nav-text">云组态</text>
      </view>
      <view class="nav-item">
        <image src="/static/svg/my-profile.svg" class="nav-icon"></image>
        <text class="nav-text">我的</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.home-container {
  position: relative;
  padding: 20rpx;
  padding-top: 100rpx;
  background-color: #F2F2F2;
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 84rpx;
    background-color: #fff;
  }
  .section {
    margin-bottom: 20rpx;
    background-color: #fff;
    border-radius: 8rpx;
    padding: 16rpx;

    .section-title {
      font-size: 16rpx;
      font-weight: bold;
      margin-bottom: 16rpx;
    }

    .section-content {
      display: flex;
      flex-wrap: wrap;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 25%;
        text-align: center;
        margin-bottom: 16rpx;

        .icon {
          width: 48rpx;
          height: 48rpx;
        }

        .item-text {
          font-size: 14rpx;
          margin-top: 8rpx;
        }
      }
    }
  }

  .bottom-navigation {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    padding: 10rpx 0;

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      &.active {
        .nav-icon {
          filter: brightness(0) invert(1);
        }
      }

      .nav-icon {
        width: 24rpx;
        height: 24rpx;
      }

      .nav-text {
        font-size: 12rpx;
        margin-top: 4rpx;
      }
    }
  }
}
</style>
