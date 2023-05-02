<template>
  <el-form ref="formRef" :model="form" :rules="rules" class="f-col-center">
    <el-form-item prop="mobile">
      <el-input v-model="form.mobile" placeholder="手机号" class="w-[330px] py-3">
        <template #prefix> <IEpUser /> </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="code" class="flex">
      <el-input v-model="form.code" placeholder="验证码" class="w-[220px] py-3 mr-2">
        <template #prefix> <IEpLock /> </template>
      </el-input>
      <div>
        <el-button v-if="!sms.disabled" type="default" @click="handleSendCode" class="py-2">发送验证码</el-button>
        <el-button type="default" v-else disabled>{{ sms.count }} 秒后重新发送</el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button class="m-btn w-[330px]" @click="onSubmit" :loading="loading">登 录</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
const { form, formRef, rules, onSubmit } = useMobileLogin()

// 发送短信验证码
const handleSendCode = () => {
  timerHandler()

  // sendCode(form.mobile).then(() => {
  // })
}

// 短信计时器
const sms = reactive({
  disabled: false,
  total: 15,
  count: 0
})

// 计时器处理器
const timerHandler = () => {
  sms.count = sms.total
  sms.disabled = true
  let timer = setInterval(() => {
    if (sms.count > 1 && sms.count <= sms.total) {
      sms.count--
    } else {
      sms.disabled = false
      clearInterval(timer)
    }
  }, 1000)
}
</script>
