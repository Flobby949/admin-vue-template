<script setup>
const props = defineProps({
  layout: {
    type: String,
    default: 'create,delete,refresh,export'
  }
})
const btns = computed(() => props.layout.split(','))

defineEmits(['create', 'refresh', 'delete', 'export'])
</script>
<template>
  <div class="f-between mb-4">
    <div class="flex">
      <el-button
        v-if="btns.includes('create')"
        type="primary"
        size="small"
        class="px-5 py-4 rounded-full"
        @click="$emit('create')"
        >新增数据</el-button
      >
      <el-popconfirm
        v-if="btns.includes('delete')"
        title="是否要删除选中记录？"
        confirmButtonText="确认"
        cancelButtonText="取消"
        @confirm="$emit('delete')"
      >
        <template #reference>
          <el-button type="danger" size="small" class="px-5 py-4 rounded-full">批量删除</el-button></template
        >
      </el-popconfirm>
      <slot name="import"></slot>
      <el-button
        v-if="btns.includes('export')"
        type="success"
        size="small"
        class="px-5 py-4 rounded-full"
        @click="$emit('export')"
        >导出数据</el-button
      >
    </div>
    <div>
      <el-tooltip effect="dark" content="刷新数据" placement="top">
        <el-button size="small" text @click="$emit('refresh')">
          <el-icon :size="15">
            <Refresh />
          </el-icon>
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>
