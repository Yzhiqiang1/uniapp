<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "扫码创建设备"
  }
}
</route>

<script setup lang="ts">
import { ref } from 'vue'
// 引入高德地图组件
import { ElAmap, ElAmapMarker } from '@vuemap/vue-amap'
import '@vuemap/vue-amap/dist/style.css'

// 地图中心点坐标
const center = ref([116.404, 39.915])
const zoom = ref(16)
const markers = ref([
  {
    position: [116.404, 39.915],
    title: '天安门',
    events: {
      click: (e) => {
        console.log('标记点被点击', e)
        // 显示信息窗口
        markerContent.value = '北京市中心'
        infoWindowVisible.value = true
      }
    }
  }
])

// 信息窗口相关
const infoWindowVisible = ref(false)
const markerContent = ref('')

// 地图点击事件
const onMapClick = (e) => {
  console.log('地图被点击', e)
  // 点击地图时隐藏信息窗口
  infoWindowVisible.value = false
}

// 地图移动事件
const onMapMove = (e) => {
  console.log('地图移动', e)
}
</script>

<template>
  <view class="map-container">
    <el-amap 
      :center="center" 
      :zoom="zoom"
      @click="onMapClick"
      @move="onMapMove"
      class="map"
      view-mode="3D"
    >
      <!-- 标记点 -->
      <el-amap-marker 
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
        :title="marker.title"
        @click="marker.events.click"
      />
    </el-amap>
  </view>
</template>

<style lang="scss" scoped>
.map-container {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.map {
  width: 100%;
  height: 100%;
}

</style>