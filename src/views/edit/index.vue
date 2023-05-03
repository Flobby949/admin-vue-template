<script setup>
const editorValue = ref('')
const handleSubmit = () => {
  console.log(editorValue.value)
}
</script>

<template>
  <div class="p-5">
    <WangEditor v-model="editorValue" placeholder="请输入..."></WangEditor>
    <el-button @click="handleSubmit" type="primary" class="mt-2">提交</el-button>
  </div>
</template>
