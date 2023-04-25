<template>
  <!-- 不保留小数 -->
  {{ d.num.toFixed(0) }}
</template>

<script setup>
import gsap from 'gsap'
// 定义该数字动画组件的属性 value，指定类型和默认值
const props = defineProps({
  value: {
    type: Number,
    default: 0
  }
})

const d = reactive({ num: 0 })

// 定义数字动画函数，1秒内从 0 变化到父组件通过 props 传入的值
const animateToValue = () => {
  gsap.to(d, {
    duration: 1,
    num: props.value
  })
}

animateToValue()

// 监听值的变化
watch(
  () => props.value,
  () => animateToValue()
)
</script>
