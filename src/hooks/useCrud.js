// 通用列表，分页，新增，删除，修改 封装
export function useInitTable(opt = {}) {
  const tableData = ref([])
  const loading = ref(false)

  // 分页
  const currentPage = ref(1)
  const total = ref(0)
  const limit = ref(10)
  let searchForm = reactive({})

  // 获取数据
  function getData(p = null) {
    if (typeof p == 'number') {
      currentPage.value = p
    }

    loading.value = true
    opt
      .getList(currentPage.value, limit.value, searchForm)
      .then(res => {
        tableData.value = res.list
        total.value = res.total
      })
      .finally(() => {
        loading.value = false
      })
  }

  getData()

  // 删除
  const handleDelete = id => {
    console.log(id)
    loading.value = true
    opt
      .delete(id)
      .then(() => {
        toast('删除成功')
        getData()
      })
      .finally(() => {
        loading.value = false
      })
  }

  const resetSearchForm = () => {
    for (const key in searchForm) {
      searchForm[key] = null
    }
    getData()
  }

  return {
    tableData,
    loading,
    currentPage,
    total,
    limit,
    searchForm,
    getData,
    handleDelete,
    resetSearchForm
  }
}

// 新增，修改
export function useInitForm(opt = {}) {
  // 表单部分
  const formDrawerRef = ref(null)
  const formRef = ref(null)
  const defaultForm = opt.form
  const form = reactive({})
  const rules = opt.rules || {}
  const editId = ref(0)
  const drawerTitle = computed(() => (editId.value ? '修改' : '新增'))
  // 多选
  const multiSelectIds = ref([])
  const handleSelect = e => {
    multiSelectIds.value = e.map(o => o.id)
  }
  const multipleTableRef = ref(null)

  const handleSubmit = () => {
    formRef.value.validate(valid => {
      if (!valid) return

      formDrawerRef.value.showLoading()

      let body = {}
      if (opt.beforeSubmit && typeof opt.beforeSubmit == 'function') {
        body = opt.beforeSubmit({ ...form })
      } else {
        body = form
      }

      const fun = editId.value ? opt.update({ id: editId.value, ...form }) : opt.create(body)

      fun
        .then(() => {
          toast(drawerTitle.value + '成功')
          // 修改刷新当前页，新增刷新第一页
          opt.getData(editId.value ? false : 1)
          formDrawerRef.value.close()
        })
        .finally(() => {
          formDrawerRef.value.hideLoading()
        })
    })
  }

  // 重置表单
  function resetForm(row = false) {
    if (formRef.value) formRef.value.clearValidate()
    for (const key in defaultForm) {
      form[key] = row[key]
    }
  }

  // 新增
  const handleCreate = () => {
    editId.value = 0
    resetForm(defaultForm)
    formDrawerRef.value.open()
  }

  // 编辑
  const handleEdit = row => {
    editId.value = row.id
    resetForm(row)
    formDrawerRef.value.open()
  }

  // 批量删除
  const deleteBatch = () => {
    opt.loading.value = true
    if (multiSelectIds.value.length == 0) {
      msg('未选择记录！', 'error')
      opt.loading.value = false
      return
    }
    opt
      .batchDelete(multiSelectIds.value)
      .then(() => {
        msg('删除成功')
        // 清空选中
        if (multipleTableRef.value) {
          multipleTableRef.value.clearSelection()
        }
        opt.getData()
      })
      .finally(() => {
        opt.loading.value = false
      })
  }

  return {
    formDrawerRef,
    formRef,
    multipleTableRef,
    form,
    rules,
    editId,
    drawerTitle,
    handleSubmit,
    resetForm,
    handleCreate,
    handleEdit,
    handleSelect,
    deleteBatch
  }
}
