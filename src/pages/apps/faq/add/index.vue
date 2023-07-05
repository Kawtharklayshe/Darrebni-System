<script lang="ts" setup>

// Type: faqsData
import { VForm } from 'vuetify/components'
import avatar1 from '@/assets/images/avatars/no-img.png'
import { requiredValidator } from '@validators'
import { usefaqsstore } from '@/views/apps/faq/usefaqsstore'



// 👉 Default Blank Data
const faqs = ref<any>({
  selectedLangs: 1,
  question: '',
  answer: '',

})

const swal = inject('$swal')

const refInputEl = ref<HTMLElement>()
const photo = ref('@/assets/images/avatars/avatar-3.png')
const faqsStore = usefaqsstore()
const isFormValid = ref(false)
const refForm = ref<VForm>()
const LanguagesList = ref([])



const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      console.log('faqs', faqs)

      faqsStore.addfaqs(faqs.value).then(res => {
        swal({
          title: ' Added ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        nextTick(() => {
          refForm.value?.reset()
          refForm.value?.resetValidation()
          faqs.value.selectedLangs = 1
        })
      })
        .catch(error => {
          swal({
            title: '',
            text: `${error.response.data.message}`,
            icon: 'error',
            confirmButtonText: 'ok',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
    }
  })
}
</script>

<template>
  <VForm
    ref="refForm"
    v-model="isFormValid"
    @submit.prevent="onSubmit"
  >
    <VRow>
      <!-- 👉 InvoiceEditable -->
      <VCol
        cols="9"
        md="9"
      >
        <VCard>
          <!-- SECTION Header -->
          <!--  eslint-disable vue/no-mutating-props -->
        

          <!-- !SECTION -->
      
    

          <VCardText class="d-flex flex-wrap   flex-column flex-sm-row gap-4">
            <div class="row">
              <div class="d-flex align-center mb-6">
                <VTextarea
                  v-model="faqs.question"
                  label="question"
                  :rules="[requiredValidator]"
                  density="compact"
                  style="width: 40.9rem;"
                />
              </div>
            </div>
          </VCardText>
          <VDivider />
          <VCardText class="d-flex flex-wrap   flex-column flex-sm-row gap-4">
            <div class="row">
              <div class="d-flex align-center mb-6">
                <VTextarea
                  v-model="faqs.answer"
                  label="answer"
                  :rules="[requiredValidator]"
                  density="compact"
                  style="width: 40.9rem;"
                />
              </div>
            </div>
          </VCardText>
       
          <VCardText>
            <!-- 👉 Send Invoice -->
            <VBtn
              
              prepend-icon="tabler-send"
              type="submit"
              class="me-3"
            >
              Save
            </VBtn>
          </VCardText>
        </VCard>
      </VCol>

      <!-- 👉 Right Column: Invoice Action -->
    </VRow>
  </VForm>
</template>

