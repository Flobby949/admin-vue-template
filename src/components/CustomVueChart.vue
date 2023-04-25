<template>
  <v-chart class="chart" :option="option" />
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, BarChart, LineChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, PieChart, BarChart, LineChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent])

const props = defineProps({
  title: {
    type: String,
    default: 'chart'
  },
  // 数据
  data: {
    type: Array,
    required: true,
    default: () => {
      return [
        { value: 335, name: 'Direct' },
        { value: 310, name: 'Email' },
        { value: 234, name: 'Ad Networks' },
        { value: 135, name: 'Video Ads' },
        { value: 154, name: 'Search Engines' }
      ]
    }
  },
  // 标签
  label: {
    type: Array,
    required: true,
    default: () => {
      return ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines']
    }
  },
  // 图表类型
  chartType: {
    type: String,
    default: 'pie',
    validator: value => {
      // 这个值必须匹配下列字符串中的一个
      return ['line', 'bar', 'pie'].indexOf(value) !== -1
    }
  },
  // 是否玫瑰图 & 玫瑰图类型
  roseType: {
    type: [String, Boolean],
    // area:数据通过半径区分
    // radius:数据通过圆心角和半径共同区分
    default: 'radius'
  },
  showLabel: {
    type: Boolean,
    default: false
  },
  // 展示图例
  showLegend: {
    type: Boolean,
    default: true
  },
  // 展示悬浮框
  showTooltip: {
    type: Boolean,
    default: true
  },
  // 悬浮框格式
  tooltipFormatter: {
    type: String,
    // 图表标题，这一项的名字，数据，饼图比例
    // {a} <br/>{b} : {c} ({d}%)
    default: ''
  }
})

onMounted(() => {
  setTimeout(() => {
    if (props.chartType != 'pie') {
      option.xAxis = {
        type: 'category',
        data: props.label,
        axisLabel: {
          interval: 0
        }
      }
      option.yAxis = { type: 'value' }
    }
    if (props.showTooltip) {
      option.tooltip = {
        trigger: 'item',
        formatter: props.tooltipFormatter
      }
    }
  }, 2000)
})

const option = reactive({
  title: {
    text: props.title,
    left: 'center'
  },
  legend: {
    bottom: 'bottom',
    data: props.showLegend ? props.label : []
  },
  series: [
    {
      label: {
        show: props.showLabel
      },
      type: props.chartType,
      roseType: props.roseType,
      itemStyle: {
        borderRadius: 10
      },
      data: props.data
    }
  ]
})
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
