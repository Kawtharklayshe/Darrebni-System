<script lang="ts" setup>

// Type: Invoice data

import { VForm } from 'vuetify/components'
import { usefaqsstore } from '@/views/apps/faq/usefaqsstore'
import { requiredValidator } from '@validators'

// 👉 Default Blank Data
const faqs = ref<any>({

  answer: '',
  question: '',

})

const route = useRoute()
const swal = inject('$swal')

const faqsStore = usefaqsstore()
const isFormValid = ref(false)

const refForm = ref<VForm>()

faqsStore.fetchfaqsById(Number(route.params.id)).then(response => {
  // .data)
  faqs.value = response.data.data
})

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      faqsStore.updatefaqs(faqs.value).then(res => {
        swal({
          title: ' Updated ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
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
