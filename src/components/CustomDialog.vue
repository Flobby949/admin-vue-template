<template>
  <el-dialog v-model="showDialog" :title="title" :width="width + '%'">
    <slot>
      <span>对话框内容</span>
    </slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="$emit('confirm')"> {{ confirmText }} </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
const showDialog = ref(false)
defineProps({
  title: {
    type: String,
    default: 'Tips'
  },
  width: {
    type: Number,
    default: 30
  },
  confirmText: {
    type: String,
    default: '确定'
  }
})
defineEmits(['confirm'])
// 打开
const open = () => (showDialog.value = true)
// 关闭
const close = () => (showDialog.value = false)
// 提交
defineExpose({
  open,
  close
})
</script>

<style scoped></style>
