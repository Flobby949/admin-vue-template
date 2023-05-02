<template>
  <el-card shadow="never" class="border-0">
    <ListHeader layout="create" @create="handleCreate" @refresh="getData" />
    <el-tree
      :expand-on-click-node="false"
      :data="tableData"
      props="{ label: 'name', children: 'children'}"
      v-loading="loading"
      node-key="id"
      :default-expanded-keys="tableData.map(o => o.id)"
    >
      <template #default="{ data }">
        <div class="custom-tree-node">
          <el-tag type="success" v-if="data.type === 0">菜单</el-tag>
          <el-tag type="warning" v-if="data.type === 1">按钮</el-tag>
          <el-tag type="info" v-if="data.type === 2">接口</el-tag>

          <el-icon v-if="data.icon" :size="16" class="ml-2 mr-1">
            <component :is="data.icon" />
          </el-icon>
          <span>{{ data.name }}</span>

          <div class="ml-auto">
            <el-button type="primary" size="small" @click.stop="handleEdit(data)" text>修改</el-button>
            <el-button type="success" size="small" @click.stop="addChild(data.id)" text>增加</el-button>
            <el-popconfirm
              title="确认删除"
              confirmButtonText="确认"
              cancelButtonText="取消"
              @confirm="handleDelete(data.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" text>删除</el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </template>
    </el-tree>

    <form-drawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="100px" :inline="false">
        <el-form-item label="上级菜单" prop="pid">
          <el-cascader
            :options="tableData"
            v-model="form.pid"
            placeholder="请选择上级菜单"
            :props="{ value: 'id', label: 'name', children: 'children', checkStricty: true, emitPath: false }"
          />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio :label="0" border>菜单</el-radio>
            <el-radio :label="1" border>按钮</el-radio>
            <el-radio :label="2" border>接口</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" style="width: 30%" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon" v-if="form.type === 0">
          <icon-select v-model="form.icon"></icon-select>
        </el-form-item>
        <el-form-item label="路由" prop="url" v-if="form.type === 0">
          <el-input v-model="form.url" placeholder="路由"></el-input>
        </el-form-item>
        <el-form-item label="授权" prop="authority" v-if="form.type === 1">
          <el-input v-model="form.authority" placeholder="授权"></el-input>
        </el-form-item>
        <el-form-item label="打开方式" prop="openType" v-if="form.type === 0">
          <el-select v-model="form.openType" placeholder="选择打开方式">
            <el-option v-for="(item, index) in ['内部', '外部']" :key="item" :label="item" :value="index"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="form.sort" :min="0" :max="1000" />
        </el-form-item>
      </el-form>
    </form-drawer>
  </el-card>
</template>

<script setup>
const { loading, tableData, getData, handleDelete } = useInitTable({
  getList: getMenuList,
  delete: deleteMenu
})

const { formDrawerRef, formRef, form, rules, drawerTitle, handleSubmit, handleCreate, handleEdit } = useInitForm({
  form: {
    pid: 0,
    type: 0,
    name: '',
    authority: '',
    icon: '',
    url: '',
    openType: null,
    order: 50
  },
  rules: {},
  getData,
  update: updateMenu,
  create: createMenu
})

const addChild = id => {
  handleCreate()
  form.pid = id
}
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-right: 8px;
}

.el-tree-node__content {
  padding: 20px 0;
}

.el-tree-node__label {
  width: 100%;
}
</style>
