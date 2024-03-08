<script setup>
import { useLoginStore } from "@/views/apps/login/useLoginStore"
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import Darrebnilogo from '@images/d.jpg'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import {
  emailValidator,
  requiredValidator,
} from '@validators'

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const store = useLoginStore()

const login = () => {
  console.log(form.value)
  store.login(form.value)
}



const isPasswordVisible = ref(false)
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
                <span>جديد على منصتنا؟</span>
                <RouterLink
                  class="text-primary ms-2"
               
                >
                  أنشئ حسابًا 
                </RouterLink>
              </VCol> 
             

              
              <VCol
                cols="12"
                class="d-flex align-center"
              >
                <VDivider />
                <span class="mx-4">or</span>
                <VDivider />
              </VCol> 
             

              <!-- auth providers -->
              <VCol
                cols="12"
                class="text-center"
              >
                <!-- <AuthProvider /> -->
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
</route>
