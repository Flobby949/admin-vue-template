<template>
  <el-card shadow="never" class="border-0">
    <list-header @create="handleCreate" @refresh="getData" @delete="deleteBatch" @export="exportData">
      <template #import>
        <el-upload :action="uploadUserExcelUrl" :on-success="handleSuccess" :show-file-list="false" class="mx-3">
          <el-button type="warning" class="px-5 py-4 rounded-full">导入数据</el-button>
        </el-upload>
      </template>
    </list-header>

    <el-table
      :data="tableData"
      stripe
      v-loading="loading"
      class="w-full"
      ref="multipleTableRef"
      @selection-change="handleSelect"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="用户信息" width="180" align="center">
        <template #default="{ row }">
          <div class="f-center">
            <el-avatar :size="40" :src="row.avatar">
              <img :src="row.avatar" />
            </el-avatar>
            <div class="f-col-center ml-5">
              <span>{{ row.username }}</span>
              <span>id:{{ row.id }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="realName" align="center" />
      <el-table-column label="手机号" prop="mobile" width="180" align="center" />
      <el-table-column label="邮箱" prop="email" width="180" align="center" />
      <el-table-column label="性别" prop="gender" align="center">
        <template #default="{ row }">
          <el-tag :type="row.gender === 0 ? 'primary' : row.gender === 1 ? 'warning' : 'info'">
            <!-- 判断状态 0 1 2 -->
            {{ row.gender === 0 ? '男' : row.gender === 1 ? '女' : '保密' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" align="center">
        <template #default="{ row }">
          <el-switch
            :modelValue="row.status"
            :active-value="1"
            :inactive-value="0"
            @change="handleStatusChange($event, row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" width="180" align="center" />
      <el-table-column label="操作" width="200" align="center">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)" v-permission="['sys:user:update']"
            >修改</el-button
          >
          <el-popconfirm
            title="你确定删除该用户吗？"
            confirmButtonText="确认"
            cancelButtonText="取消"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button type="danger" size="small" v-permission="['sys:user:delete']">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
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

    <!-- 抽屉 -->
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="form.realName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-avatar :src="form.avatar"></el-avatar>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
            <el-radio :label="2">保密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>

<script setup>
const { tableData, loading, currentPage, total, limit, getData, handleDelete } = useInitTable({
  getList: getUserPage,
  delete: deleteUser
})

const {
  formDrawerRef,
  formRef,
  multipleTableRef,
  form,
  rules,
  drawerTitle,
  handleSubmit,
  handleCreate,
  handleEdit,
  handleSelect,
  deleteBatch
} = useInitForm({
  form: {
    username: '',
    password: '',
    realName: '',
    avatar: '',
    gender: null,
    email: '',
    mobile: ''
  },
  rules: {},
  getData,
  update: updateInfo,
  create: saveInfo,
  batchDelete: deleteUser,
  loading
})

const exportData = fileName => {
  exportUser().then(res => {
    // res的data是一个blob文件
    console.log(res)
    // 创建a标签
    const down = document.createElement('a')
    // 如果没有文件名，使用时间戳作为文件名
    down.download = fileName || new Date().getTime().toString() + '.xlsx'
    // 隐藏a标签
    down.style.display = 'none'

    // 创建字节数组，将返回的 blob 加进去
    let binaryData = []
    binaryData.push(res.data)
    // 创建下载url
    down.href = URL.createObjectURL(new Blob(binaryData))
    // 将 a 标签加入 DOM
    document.body.appendChild(down)
    // 模拟点击下载
    down.click()

    // 释放url，移除a标签
    URL.revokeObjectURL(down.href)
    document.body.removeChild(down)
  })
}

const uploadUserExcelUrl = import.meta.env.VITE_API_URL + '/sys/user/import?accessToken=' + getToken()

const handleSuccess = () => {
  ElMessage.success({
    message: '上传成功',
    duration: 500,
    onClose: () => {
      getData()
    }
  })
}

const handleStatusChange = (status, row) => {
  // 调用接口
  changeStatus(row.id, status).then(() => {
    msg('状态修改成功')
    row.status = status
  })
}
</script>

<style scoped></style>
