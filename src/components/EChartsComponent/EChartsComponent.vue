<template>
  <view class="echarts-container">
    <ec-canvas ref="chartContainer" class="chart-container" />
  </view>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'

// 定义组件属性
interface Props {
  ecType?: number
  width?: string
  height?: string
  ecData?: any
}

const props = withDefaults(defineProps<Props>(), {
  width: '300%',
  height: '400rpx',
  ecType: 1,
  ecData: {}
})

// 图表实例和容器引用
const chartContainer = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null

// 默认图表配置
const defaultOption: { option: echarts.EChartsOption } = reactive({
    option: {}
})

//初始化图表
const initChart = (res: any)=>{
    let type = props.ecType;
    if(type == 1){
      // 1折线图
      defaultOption.option = {
        backgroundColor: '#ffffff',
        color:["#1890FF","#17BBB8","#F1A910","#E86B78","#02848B","#FF0096","#FF6803","6CAB06","#8485F6","#476CB2"],
        title: {
            text: res.title,
            padding: [0,10],
            textStyle: {
              color: '#666666',
              fontWeight: 'normal',
              fontSize: 14,
              height: 40,
              lineHeight: 40,
            }
        },
        legend:{
          type: 'scroll',
          top: 29,
          right: 10,
          data: res.legendData,
        },
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine:{lineStyle:{color:'#389CEE'}},
            axisTick:{show: false},
            axisLabel:{
                color: '#666666',
            },
            data: res.xAxisData,
        },
        yAxis: {
            type: 'value',
            name: res.yAxisName,
            nameLocation:'end',
            nameGap: 12,
            boundaryGap: ['0%', '30%'],
            nameTextStyle:{color: '#666666'},
            axisLine:{show: true,lineStyle:{color:'#389CEE'}},
            axisTick:{show: false,},
            axisLabel:{color: '#666666'},
            splitLine:{lineStyle:{color:['#D8D8D8'],type:'dashed'}},
        },
        series: res.series
      }
    }else if(type == 2){ //2,3柱状图---普通的柱形图
        defaultOption.option = {
            backgroundColor: '#ffffff',
            color: ["#1890FF","#17BBB8","#F1A910","#E86B78","#02848B","#FF0096","#FF6803","6CAB06","#8485F6","#476CB2"],
            title: {
                text: res.title,
                padding: [0,10],
                textStyle: {color: '#666666',fontWeight: 'normal',fontSize: 14,height: 40,lineHeight: 40}
            },
            legend: {
                type: 'scroll',
                top: 29,
                right: 10,
                data: res.legendData,
            },
            tooltip: {
                show: true,
                trigger: 'axis',
                axisPointer: {type: 'cross',label: {backgroundColor: '#6a7985'}}
            },
            grid: {left: '3%',right: '4%',bottom: '3%',containLabel: true},
            xAxis: {
                type: 'category',
                axisLine:{lineStyle:{color:'#389CEE'}},
                axisTick:{show: false},
                axisLabel:{interval:0,color: '#666666', fontSize: 11},
                data: res.xAxisData,
            },
            yAxis: {
                type: 'value',
                axisLine:{show: true,lineStyle:{color:'#389CEE'}},
                axisTick:{show: false},
                axisLabel:{color: '#666666'},
                splitLine:{lineStyle:{color:['#D8D8D8'],type:'dashed'}},
            },
            series: res.series
        }
    //适合柱状图 
    }else if(type == 3){ //2,3柱状图-3为可换行，每组多个柱形结构的图形
        defaultOption.option = {
            color:["#1890FF","#17BBB8","#F1A910","#E86B78","#02848B","#FF0096","#FF6803","6CAB06","#8485F6","#476CB2"],
            backgroundColor: '#ffffff',
            title: {
                text: res.title,
                padding: [0,10],
                textStyle: {
                    color: '#666666',
                    fontWeight: 'normal',
                    fontSize: 14,
                    height: 40,
                    lineHeight: 40,
                }
            },
            legend:{
                type: 'scroll',
                top: 29,
                right: 10,
                data: res.legendData,
            },
            tooltip: {
                show: true,
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            }, 
            grid: res.gridData,
            xAxis: res.xAxisData,
            yAxis: res.yAxisData,
            series: res.series
        }
    }else if(type == 4){ //饼图
        defaultOption.option = {
            color:["#1890FF","#17BBB8","#F1A910","#E86B78","#02848B","#FF0096","#FF6803","6CAB06","#8485F6","#476CB2"],
            backgroundColor: '#ffffff',
            title: {
                text: res.title,
                padding: [0,10],
                textStyle: {
                    color: '#666666',
                    fontWeight: 'normal',
                    fontSize: 14,
                    height: 40,
                    lineHeight: 40,
                }
            },
            tooltip: {
                trigger: 'item',
            }, 
            legend:{
                type: 'scroll',
                top: 29,
                right: 10,
                data: res.legendData,
            },
            series: res.series
        }
    }
    if (chartContainer.value) {
        // 销毁已存在的实例
        if (chartInstance) {
            chartInstance.dispose()
        }
        // 创建新的图表实例
        chartInstance = echarts.init(chartContainer.value)
        // 使用默认配置或传入的配置
        chartInstance.setOption(defaultOption.option)
    }
}

// 窗口大小调整时重绘图表
const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

// 监听窗口大小变化
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
    nextTick();
    initChart(props.ecData);
})

onUnmounted(() => {
  // 清理事件监听器和图表实例
  window.removeEventListener('resize', resizeChart)
  
  if (resizeObserver && chartContainer.value) {
    resizeObserver.unobserve(chartContainer.value)
    resizeObserver = null
  }
  
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})

// 暴露方法给父组件
defineExpose({
  initChart,
  resizeChart
})
</script>

<style scoped>
.echarts-container {
  width: 100%;
  height: 300rpx;
}

.chart-container {
  display: block;
  width: 100%!important;
  height: 100%!important;
}
</style>