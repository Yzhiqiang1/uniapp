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
const data = ref(null);
const error = ref(null);

</script>

<template>
  <view class="home-container">
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
        <view class="item">
          <image src="/static/icons/daily-data.png" class="icon"></image>
          <text class="item-text">日原数据</text>
        </view>
        <view class="item">
          <image src="/static/icons/daily-extreme-value.png" class="icon"></image>
          <text class="item-text">逐日极值</text>
        </view>
        <view class="item">
          <image src="/static/icons/electricity-report.png" class="icon"></image>
          <text class="item-text">电力报表</text>
        </view>
        <view class="item">
          <image src="/static/icons/extreme-value-report.png" class="icon"></image>
          <text class="item-text">极值报表</text>
        </view>
        <view class="item">
          <image src="/static/icons/power-factor.png" class="icon"></image>
          <text class="item-text">功率因素</text>
        </view>
        <view class="item">
          <image src="/static/icons/electricity-daily-report.png" class="icon"></image>
          <text class="item-text">电力日报</text>
        </view>
        <view class="item">
          <image src="/static/icons/harmonic-monitoring.png" class="icon"></image>
          <text class="item-text">谐波监测</text>
        </view>
      </view>
    </view>

    <!-- 用电分析 -->
    <view class="section">
      <text class="section-title">用电分析</text>
      <view class="section-content">
        <view class="item">
          <image src="/static/icons/energy-report.png" class="icon"></image>
          <text class="item-text">用能报表</text>
        </view>
        <view class="item">
          <image src="/static/icons/same-period-analysis.png" class="icon"></image>
          <text class="item-text">同比分析</text>
        </view>
        <view class="item">
          <image src="/static/icons/ring-period-analysis.png" class="icon"></image>
          <text class="item-text">环比分析</text>
        </view>
        <view class="item">
          <image src="/static/icons/loss-analysis.png" class="icon"></image>
          <text class="item-text">损耗分析</text>
        </view>
        <view class="item">
          <image src="/static/icons/energy-collection.png" class="icon"></image>
          <text class="item-text">电能集抄</text>
        </view>
        <view class="item">
          <image src="/static/icons/peak-valley-flat.png" class="icon"></image>
          <text class="item-text">尖峰平谷</text>
        </view>
        <view class="item">
          <image src="/static/icons/max-demand.png" class="icon"></image>
          <text class="item-text">最大需量</text>
        </view>
      </view>
    </view>

    <!-- 用水分析 -->
    <view class="section">
      <text class="section-title">用水分析</text>
      <view class="section-content">
        <view class="item">
          <image src="/static/icons/water-energy-report.png" class="icon"></image>
          <text class="item-text">用能报表</text>
        </view>
        <view class="item">
          <image src="/static/icons/water-same-period-analysis.png" class="icon"></image>
          <text class="item-text">同比分析</text>
        </view>
        <view class="item">
          <image src="/static/icons/water-ring-period-analysis.png" class="icon"></image>
          <text class="item-text">环比分析</text>
        </view>
        <view class="item">
          <image src="/static/icons/water-loss-analysis.png" class="icon"></image>
          <text class="item-text">损耗分析</text>
        </view>
        <view class="item">
          <image src="/static/icons/water-energy-collection.png" class="icon"></image>
          <text class="item-text">水能集抄</text>
        </view>
      </view>
    </view>

    <!-- 用气分析 -->
    <view class="section">
      <text class="section-title">用气分析</text>
      <view class="section-content">
        <view class="item">
          <image src="/static/icons/gas-energy-report.png" class="icon"></image>
          <text class="item-text">用能报表</text>
        </view>
        <view class="item">
          <image src="/static/icons/gas-same-period-analysis.png" class="icon"></image>
          <text class="item-text">同比分析</text>
        </view>
        <view class="item">
          <image src="/static/icons/gas-ring-period-analysis.png" class="icon"></image>
          <text class="item-text">环比分析</text>
        </view>
        <view class="item">
          <image src="/static/icons/gas-loss-analysis.png" class="icon"></image>
          <text class="item-text">损耗分析</text>
        </view>
        <view class="item">
          <image src="/static/icons/gas-energy-collection.png" class="icon"></image>
          <text class="item-text">气能集抄</text>
        </view>
      </view>
    </view>

    <!-- 安全用电 -->
    <view class="section">
      <text class="section-title">安全用电</text>
      <view class="section-content">
        <view class="item">
          <image src="/static/icons/leakage-temperature-monitoring.png" class="icon"></image>
          <text class="item-text">漏电/温度监测</text>
        </view>
        <view class="item">
          <image src="/static/icons/switch-control.png" class="icon"></image>
          <text class="item-text">开关控制</text>
        </view>
        <view class="item">
          <image src="/static/icons/switch-monitoring.png" class="icon"></image>
          <text class="item-text">开关监测</text>
        </view>
        <view class="item">
          <image src="/static/icons/camera.png" class="icon"></image>
          <text class="item-text">摄像头</text>
        </view>
      </view>
    </view>

    <!-- 底部导航栏 -->
    <view class="bottom-navigation">
      <view class="nav-item active">
        <image src="/static/icons/home-active.png" class="nav-icon"></image>
        <text class="nav-text">首页</text>
      </view>
      <view class="nav-item">
        <image src="/static/icons/cloud-group-status.png" class="nav-icon"></image>
        <text class="nav-text">云组态</text>
      </view>
      <view class="nav-item">
        <image src="/static/icons/my-profile.png" class="nav-icon"></image>
        <text class="nav-text">我的</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.home-container {
  padding: 20px;

  .section {
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 8px;
    padding: 16px;

    .section-title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 16px;
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
        margin-bottom: 16px;

        .icon {
          width: 48px;
          height: 48px;
        }

        .item-text {
          font-size: 14px;
          margin-top: 8px;
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
    padding: 10px 0;

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
        width: 24px;
        height: 24px;
      }

      .nav-text {
        font-size: 12px;
        margin-top: 4px;
      }
    }
  }
}
</style>
