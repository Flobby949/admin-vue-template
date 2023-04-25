<script setup>
defineProps({
  title: String,
  tip: String,
  btns: Array
})
// 给标签配上一组颜色
const colors = ['#22d3ee', '#22c55e', '#d6d3d1', '#f59e0b']
</script>
<template>
  <el-card class="shadow">
    <template #header>
      <div class="f-between">
        <span class="text-sm">{{ title }}</span>
        <el-tag type="danger" effect="plain">{{ tip }}</el-tag>
      </div>
    </template>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in btns" :key="index">
        <el-card class="shadow" :style="{ backgroundColor: colors[index] }">
          <div class="flex flex-col justify-center items-center">
            <span class="text-xl">{{ item.value }}</span>
            <span class="text-xs text-gray-500">{{ item.label }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>
