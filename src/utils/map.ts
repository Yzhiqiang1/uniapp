// 高德地图初始化配置
import { initAMapApiLoader } from '@vuemap/vue-amap'

// 初始化高德地图API
initAMapApiLoader({
  key: import.meta.env.VITE_AMAP_KEY, // 使用环境变量中的高德地图key
  version: '2.0', // 指定要加载的API版本
  plugins: [
    'AMap.Scale',       // 比例尺
    'AMap.ToolBar',     // 工具条
    'AMap.ControlBar',  // 控制条
    'AMap.Marker',      // 点标记
    'AMap.Polyline',    // 折线
    'AMap.Polygon',     // 多边形
    'AMap.Circle',      // 圆形
    'AMap.Geolocation', // 定位
    'AMap.AdvancedInfoWindow' // 高级信息窗口
  ]
})

export default initAMapApiLoader