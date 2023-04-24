<template>
  <el-card shadow="never" class="border-0">
    <!-- 新建/刷新 -->
    <div class="f-between mb-4">
      <div>
        <input
          type="text"
          v-model="params.username"
          placeholder="请输入用户名"
          class="text-gray-500 border-gray-300 border-solid border-1 outline-none rounded-2xl py-1 ml-3 w-60 pl-2 text-sm"
        />
        <input
          type="text"
          v-model="params.address"
          placeholder="请输入地址"
          class="text-gray-500 border-gray-300 border-solid border-1 outline-none rounded-2xl py-1 ml-3 w-60 pl-2 text-sm"
        />
        <el-select class="ml-2" v-model="params.status" placeholder="请选择状态" clearable filterable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>

        <el-button class="px-8 py-4 bg-sky-500 text-light-50 rounded-full ml-2" @click="getData">搜索</el-button>
      </div>
      <el-tooltip content="刷新数据" placement="top" effect="dark">
        <el-button text @click="getData">
          <IEpRefresh />
        </el-button>
      </el-tooltip>
    </div>

    <el-table :data="tableData" stripe v-loading="loading" class="w-full">
      <el-table-column label="用户名" prop="username" />
      <el-table-column label="操作IP" prop="ip" width="100" />
      <el-table-column label="操作地址" prop="address" width="120" />
      <el-table-column label="操作UA" prop="userAgent" width="380" />
      <el-table-column label="登录状态" prop="status">
        <template #default="{ row }">
          <el-tag :type="row.status == 1 ? 'primary' : 'danger'">
            <!-- 判断状态 0 1 -->
            {{ row.status === 1 ? '成功' : '失败' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作内容" prop="operation">
        <template #default="{ row }">
          <el-tag :type="row.operation < 2 ? 'success' : 'warning'">
            <!-- 判断状态 0 1 2 3 -->
            {{
              row.operation === 0
                ? '登陆成功'
                : row.operation === 1
                ? '退出成功'
                : row.operation === 2
                ? '验证码错误'
                : '账号密码错误'
            }}
          </el-tag>
        </template></el-table-column
      >
      <el-table-column label="操作时间" prop="createTime" width="300" />
    </el-table>

    <div class="f-center mt-5">
      <el-pagination
        :total="total"
        :current-page="currentPage"
        :page-size="limit"
        @current-change="getData"
        layout="prev, pager, next"
      />
    </div>
  </el-card>
</template>

<script setup>
const { tableData, loading, currentPage, total, limit, getData, params } = useInitTable({
  getList: getLogs
})

const options = [
  {
    value: 0,
    label: '失败'
  },
  {
    value: 1,
    label: '成功'
  }
]
</script>

<style scoped></style>
