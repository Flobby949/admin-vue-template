//账号密码登录 hooks
export function useAccountLogin() {
  const router = useRouter()

  const form = reactive({
    username: 'admin',
    password: '123456'
  })

  const rules = {
    username: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      }
    ],
    captcha: [
      {
        required: true,
        message: '验证码不能为空',
        trigger: 'blur'
      }
    ]
  }

  const formRef = ref(null)
  const loading = ref(false)

  const { storeLogin } = useAdminStore()

  const onSubmit = () => {
    formRef.value.validate(valid => {
      if (!valid) {
        return false
      }
      loading.value = true

      storeLogin(form).then(() => {
        toast('登录成功')
        router.push('/')
        loading.value = false
      })
    })
  }
  return {
    form,
    formRef,
    rules,
    loading,
    onSubmit
  }
}

//退出登录 hooks
export function useLogout() {
  const { storeLogout } = useAdminStore()
  const router = useRouter()
  function handleLogout() {
    showModal('是否要退出登录？').then(() => {
      storeLogout().then(() => {
        router.push('/login')
      })
    })
  }
  return {
    handleLogout
  }
}

// 手机验证码登录
export function useMobileLogin() {
  const router = useRouter()
  const form = reactive({
    mobile: '18962521753',
    code: ''
  })

  const rules = {
    mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
    code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
  }

  const formRef = ref(null)
  const loading = ref(false)

  const { storeMobileLogin } = useAdminStore()

  const onSubmit = () => {
    formRef.value.validate(valid => {
      if (!valid) {
        return false
      }
      loading.value = true
      storeMobileLogin(form).then(() => {
        toast('登录成功')
        router.push('/')
        loading.value = false
      })
    })
  }

  return {
    form,
    formRef,
    rules,
    loading,
    onSubmit
  }
}
