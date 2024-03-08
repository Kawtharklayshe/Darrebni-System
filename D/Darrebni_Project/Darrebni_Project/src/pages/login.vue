<script setup>
import { useAppAbility } from '@/plugins/casl/useAppAbility'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import axios from '@axios'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import avatar1 from '@images/avatars/avatar-1.png'
import Darrebnilogo from '@images/d.jpg'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import {
  emailValidator,
  requiredValidator,
} from '@validators'
import { VForm } from 'vuetify/components/VForm'
import setAuthHeader from '../utils/setAuthHeader'

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const authThemeImg = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
const isPasswordVisible = ref(false)
const route = useRoute()
const router = useRouter()
const ability = useAppAbility()

const errors = ref({
  email: undefined,
  password: undefined,
})

const refVForm = ref()
const email = ref('admin@demo.com')
const password = ref('admin')
const rememberMe = ref(false)

const login = () => {
  axios.post('login', {
    email: form.value.email,
    password: form.value.password,
  }).then(r => {
    const { user: { name }, token } = r.data.data

    const userAbilities = [
      {
        action: 'manage',
        subject: 'all',
      },
    ]

    const userData = {
      id: 1,
      fullName: 'John Doe',
      username: 'johndoe',
      avatar: avatar1,
      email: 'admin@demo.com',
      role: 'admin',
    }

    setAuthHeader(token)

    localStorage.setItem('userAbilities', JSON.stringify(userAbilities))
    ability.update(userAbilities)

    localStorage.setItem('userData', JSON.stringify(userData))
    localStorage.setItem('accessToken', JSON.stringify(token))
    localStorage.setItem('userName', JSON.stringify(name))

    // Redirect to `to` query if exist or redirect to index route
    router.replace(route.query.to ? String(route.query.to) : '/')
  }).catch(e => {
    const { errors: formErrors } = e.response.data

    errors.value = formErrors
    console.error(e.response.data)
  })
}

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid)
      login()
  })
}
</script>

<template>
  <VRow
    no-gutters
    class="auth-wrapper bg-surface"
  >
    <VCol
      md="8"
      class="d-none d-md-flex"
    >
      <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="505"
            :src="Darrebnilogo"
            class="auth-illustration mt-16 mb-2"
          />
        </div>
      </div>
    </VCol>

    <VCol
      cols="12"
      md="4"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <VNodeRenderer
            :nodes="themeConfig.app.logo"
            class="mb-6"
            style="width: 50px;"
          />
          <h5 class="text-h5 mb-1">
            مرحباً بك في <span class="text-capitalize">{{ themeConfig.app.title }}</span>! 👋🏻
          </h5>
          <p class="mb-0">
            يرجى تسجيل الدخول إلى حسابك والبدء في المغامرة
          </p>
        </VCardText>
        <VCardText>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="form.email"
                  autofocus
                  label="البريد الإلكتروني"
                  type="email"
                  :rules="[requiredValidator, emailValidator]"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="form.password"
                  label="كلمة المرور"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  :rules="[requiredValidator]"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div class="d-flex align-center flex-wrap justify-space-between mt-2 mb-4">
                  <VCheckbox
                    v-model="form.remember"
                    label="تذكرني"
                  />
                  <!-- <RouterLink
                    class="text-primary ms-2 mb-1"
                    :to="{ name: 'pages-authentication-forgot-password-v2' }"
                  >
                    نسيت كلمة المرور ؟
                  </RouterLink> -->
                </div>

                <VBtn
                  block
                  type="submit"
                  @click="login"
                >
                  تسجيل الدخول
                </VBtn>
              </VCol>

              <!-- create account -->
              
              <VCol
                cols="12"
                class="text-center text-base"
              >
               
               
              </VCol> 
            

              
              <VCol
                cols="12"
                class="d-flex align-center"
              >
                <VDivider />
                <!-- <span class="mx-4">or</span>
                <VDivider /> -->
              </VCol> 
             

              <!-- auth providers -->
              <VCol
                cols="12"
                class="text-center"
              >
                <AuthProvider />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
