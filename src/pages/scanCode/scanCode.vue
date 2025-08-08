<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "创建设备"
  }
}
</route>

<script setup lang="ts">

// 地图中心点坐标
const longitude = ref(116.404)
const latitude = ref(39.915)
const scale = ref(16)

// 标记点
const markers = ref<any[]>([
  {
    id: 1,
    longitude: 116.404,
    latitude: 39.915,
    title: '天安门',
    iconPath: '/static/location.png',
    width: 30,
    height: 30,
    callout: {
      content: '北京市中心',
      color: '#ffffff',
      fontSize: 14,
      borderRadius: 5,
      bgColor: '#007AFF',
      padding: 5,
      display: 'ALWAYS'
    }
  }
])

// 标记点点击事件
const onMarkerTap = (e) => {
  console.log('标记点被点击', e.detail)
}

// 气泡点击事件
const onCalloutTap = (e) => {
  console.log('气泡被点击', e.detail)
}

// 地图区域改变事件
const onRegionChange = (e) => {
  console.log('地图区域改变', e.detail)
}
</script>

<template>
  <view class="map-container">
    <map
      :longitude="longitude"
      :latitude="latitude"
      :markers="markers"
      :scale="scale"
      @markertap="onMarkerTap"
      @callouttap="onCalloutTap"
      @regionchange="onRegionChange"
    ></map>
  </view>
</template>

<style lang="scss" scoped>
.map-container {
    width: 100vw;
    height: 100vh;
}
</style>
