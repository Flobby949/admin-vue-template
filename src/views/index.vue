<script setup>
const panels = ref([])

setTimeout(() => {
  getStatistics1().then(res => {
    panels.value = res
  })
}, 1000)

const goods = ref([])
const orders = ref([])
getStatistics3().then(res => {
  goods.value = res.goods
  orders.value = res.orders
})
</script>

<template>
  <div class="p-3">
    <!-- 页面上方，统计面板 -->
    <el-row :gutter="20">
      <template v-if="panels.length == 0">
        <el-col :span="6" v-for="index in 4" :key="index">
          <el-skeleton style="width: 100%" animated loading>
            <template #template>
              <el-card class="shadow border-0">
                <template #header>
                  <div class="f-between">
                    <el-skeleton-item variant="text" class="w-[50%]"></el-skeleton-item>
                    <el-skeleton-item variant="text" class="w-[10%]"></el-skeleton-item>
                  </div>
                </template>
                <el-skeleton-item variant="h3" class="w-[80%]"></el-skeleton-item>
                <el-divider />
                <div class="flex justify-between text-sm text-gray-500">
                  <el-skeleton-item variant="text" class="w-[50%]"></el-skeleton-item>
                  <el-skeleton-item variant="text" class="w-[10%]"></el-skeleton-item>
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>
      <el-col :span="6" v-for="(item, index) in panels" :key="index">
        <el-card class="shadow cursor-pointer hover:(shadow-xl bg-sky-100 opacity-70)">
          <template #header>
            <div class="f-between">
              <span class="text-sm">{{ item.title }}</span>
              <el-tag :type="item.unitColor" effect="plain">{{ item.unit }}</el-tag>
            </div>
          </template>
          <span class="text-3xl font-bold text-gray-500">
            <CountTo :value="item.value" />
          </span>
          <el-divider />
          <div class="flex justify-between text-sm text-gray-500">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <IndexNav />
    <!-- 页面下方，左右结构 -->
    <el-row :gutter="20" class="mt-5">
      <!-- 左侧柱状图 -->
      <el-col :span="12">
        <IndexChart />
      </el-col>
      <!-- 右侧分类标签组件 -->
      <el-col :span="12">
        <IndexTag title="店铺及商品提示" tip="店铺及商品提示" :btns="goods" class="mb-3" />
        <IndexTag title="交易提示" tip="需要立即处理的交易订单" :btns="orders" />
      </el-col>
    </el-row>
  </div>
</template>
