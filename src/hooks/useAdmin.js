export function usePassword() {
  const router = useRouter()
  const formDrawerRef = ref(null)
  const openRepasswordForm = () => formDrawerRef.value.open()
  const form = reactive({
    oldPassword: '123456',
    newPassword: 'admin',
    rePassword: 'admin'
  })

  const rePassRule = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('确认密码不能为空！'))
    } else if (value !== form.newPassword) {
      callback(new Error('确认密码必须和新密码一致！'))
    } else {
      callback()
    }
  }

  const rules = {
    oldPassword: [
      {
        required: true,
        message: '旧密码不能为空',
        trigger: 'blur'
      }
    ],
    newPassword: [
      {
        required: true,
        message: '新密码不能为空',
        trigger: 'blur'
      }
    ],
    rePassword: [
      {
        required: true,
        validator: rePassRule,
        trigger: 'blur'
      }
    ]
  }

  const formRef = ref(null)

  const { storeLogout } = useAdminStore()

  const onSubmit = () => {
    formRef.value.validate(valid => {
      if (!valid) {
        return false
      }
      const data = {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword
      }
      formDrawerRef.value.showLoading()
      rePassword(data)
        .then(() => {
          toast('修改密码成功，请重新登录')
          storeLogout().then(() => {
            router.push('/login')
          })
        })
        .finally(() => {
          formDrawerRef.value.hideLoading()
        })
    })
  }

  return {
    formDrawerRef,
    form,
    rules,
    formRef,
    openRepasswordForm,
    onSubmit
  }
}
