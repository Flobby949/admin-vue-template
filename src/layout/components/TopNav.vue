<script setup>
const store = useAdminStore()
const { adminInfo, sideWidth } = storeToRefs(store)
const { handleSideWidth } = store
const { handleLogout } = useLogout()
const { formDrawerRef, form, rules, formRef, openRepasswordForm, onSubmit } = usePassword()
const { isFullscreen, toggle } = useFullscreen()
const handleRefresh = () => location.reload()
</script>

<template>
  <div class="f-header v-center">
    <RouterLink to="/">
      <div class="f-center text-[1.5rem] transition-all duration-500" :style="{ width: sideWidth }">
        <IEpElementPlus />
        <span class="ml-3" v-show="sideWidth === '220px'">极客空间</span>
      </div>
    </RouterLink>

    <div @click="handleSideWidth" class="icon v-center">
      <IEpFold v-if="sideWidth === '220px'" />
      <IEpExpand v-else />
    </div>

    <div class="ml-auto v-center">
      <IEpRefresh class="icon" @click="handleRefresh" />
      <div @click="toggle" class="icon v-center">
        <IEpFullScreen v-if="!isFullscreen" />
        <IEpAim v-else />
      </div>
      <IEpPrinter class="icon" />
      <IEpSetting class="icon" />

      <el-dropdown class="dropdown">
        <span class="v-center text-light-50">
          <el-avatar class="mr-2" :size="32" :src="adminInfo.avatar" />
          {{ adminInfo.realName }}
          <IEpArrow-down class="icon" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="openRepasswordForm">修改密码</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <form-drawer ref="formDrawerRef" title="修改密码" destroyOnClose @submit="onSubmit">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="form.oldPassword" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="form.newPassword" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="rePassword">
        <el-input v-model="form.rePassword" placeholder="请确认密码"></el-input>
      </el-form-item>
    </el-form>
  </form-drawer>
</template>

<style scoped>
.f-header {
  @apply bg-gradient-to-r from-cyan-600 to-sky-600 text-light-50 fixed top-0 left-0 right-0 h-16;
}
.el-icon {
  @apply mx-1;
}
.icon {
  @apply mx-1 cursor-pointer hover: opacity-70 text-xl;
}
.f-header .dropdown {
  cursor: pointer;
  @apply flex justify-center items-center mx-5 h-16;
}
.btn {
  @apply w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full;
}
</style>
