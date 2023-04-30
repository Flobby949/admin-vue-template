<template>
  <el-card shadow="never" class="border-0">
    <custom-search :model="searchForm" @search="getData" @reset="resetSearchForm">
      <el-form-item label="通知标题" :span="4">
        <el-input v-model="searchForm.title" placeholder="通知标题" clearable />
      </el-form-item>
      <el-form-item label="通知内容" :span="4">
        <el-input v-model="searchForm.content" placeholder="通知内容" clearable />
      </el-form-item>
    </custom-search>
    <!-- 新增，批量删除，属性 -->
    <list-header @create="handleCreate" @refresh="getData" @delete="handleMultiDelete"></list-header>

    <el-table
      :data="tableData"
      stripe
      v-loading="loading"
      class="w-full"
      ref="multipleTableRef"
      @selection-change="handleSelect"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="公告标题" prop="title" />
      <el-table-column label="公告内容" prop="content" />
      <el-table-column label="发布时间" prop="createTime" width="380" />
      <el-table-column label="操作" width="200" align="center">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)" v-permission="['sys:notice:update']"
            >修改</el-button
          >
          <el-popconfirm
            title="你确定删除公告吗？"
            confirmButtonText="确认"
            cancelButtonText="取消"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button type="danger" size="small" v-permission="['sys:notice:delete']">删除</el-button>
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
        <el-form-item label="通知标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入通知标题"></el-input>
        </el-form-item>
        <el-form-item label="通知内容" prop="content">
          <el-input v-model="form.content" placeholder="请输入通知内容" type="textarea" :rows="5"></el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const { tableData, loading, currentPage, total, limit, getData, handleDelete, searchForm, resetSearchForm } =
  useInitTable({
    getList: getNoticePage,
    delete: deleteNotice,
    searchForm: {
      title: '',
      content: ''
    }
  })

const { formDrawerRef, formRef, form, rules, drawerTitle, handleSubmit, handleCreate, handleEdit } = useInitForm({
  form: {
    title: '',
    content: ''
  },
  rules: {
    title: [
      {
        required: true,
        message: '通知标题不能为空',
        trigger: 'blur'
      }
    ],
    content: [
      {
        required: true,
        message: '通知内容不能为空',
        trigger: 'blur'
      }
    ]
  },
  getData,
  update: updateNotice,
  create: saveNotice
})

// 多选
const multiSelectIds = ref([])
const handleSelect = e => {
  multiSelectIds.value = e.map(o => o.id)
  console.log(multiSelectIds.value)
}

// 批量删除
const multipleTableRef = ref(null)
const handleMultiDelete = () => {
  loading.value = true
  if (multiSelectIds.value.length == 0) {
    msg('未选择记录！', 'error')
    loading.value = false
    return
  }
  deleteBatch(multiSelectIds.value)
    .then(() => {
      msg('删除成功')
      // 清空选中
      if (multipleTableRef.value) {
        multipleTableRef.value.clearSelection()
      }
      getData()
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<style scoped>
.el-card_body {
  padding: 0 !important;
}
</style>
