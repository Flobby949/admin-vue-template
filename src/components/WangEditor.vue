<script setup>
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import constant from '@/utils/constant'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    default: 'default' // 可选值：[default | simple]
  },
  placeholder: {
    type: String,
    default: ''
  },
  style: {
    type: String,
    default: 'height: 400px;'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 编辑器配置
const editorConfig = {
  placeholder: props.placeholder,
  readOnly: props.disabled,
  MENU_CONF: {
    uploadImage: {
      server: constant.uploadUrl, // 上传接口地址
      fieldName: 'file', // 上传文件参数名
      // 自定义插入图片
      customInsert(res, insertFn) {
        // res 即服务端的返回结果
        // 从 res 中找到 url alt href ，然后插图图片
        insertFn(res.data.url, res.data.name, '')
      }
    }
  }
}

// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) {
    return
  }
  editor.destroy()
})

const handleCreated = editor => {
  editorRef.value = editor
}

// 编辑器 change 事件触发
const emit = defineEmits(['update:modelValue'])
const handleChange = editor => {
  emit('update:modelValue', editor.getHtml())
}
</script>

<template>
  <div style="border: 1px solid #ccc; z-index: 100">
    <!-- 工具栏 -->
    <Toolbar :editor="editorRef" :mode="mode" style="border-bottom: 1px solid #ccc" />
    <!-- 编辑器 -->
    <Editor
      :model-value="modelValue"
      :style="style"
      :disabled="disabled"
      :default-config="editorConfig"
      :mode="mode"
      @on-created="handleCreated"
      @on-change="handleChange"
    />
  </div>
</template>
