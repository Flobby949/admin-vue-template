<template>
  <el-form :model="model" :rules="rules" label-width="80px" class="mb-3" size="small">
    <el-row>
      <slot />

      <template v-if="showSearch">
        <slot name="show" />
      </template>
    </el-row>

    <el-col :span="4" :offset="1">
      <div class="flex items-center justify-end">
        <el-button type="primary" @click="$emit('search')">搜索</el-button>
        <el-button @click="$emit('reset')">重置</el-button>
        <el-button type="primary" text @click="showSearch = !showSearch" v-if="hasShowSearch">
          {{ showSearch ? '收起' : '展开' }}
          <el-icon>
            <ArrowUp v-if="showSearch" />
            <ArrowDown />
          </el-icon>
        </el-button>
      </div>
    </el-col>
  </el-form>
</template>

<script setup>
defineProps({
  model: Object
})
defineEmits(['search', 'reset'])

const showSearch = ref(false)
const slots = useSlots()
const hasShowSearch = ref(!!slots.show)
</script>
