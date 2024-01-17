<script lang="ts" setup>

// Type: socialMediaData
import { VForm } from 'vuetify/components'

import { requiredValidator } from '@validators'
import { usesocialMediastore } from '@/views/apps/socialMedia/usesocialMediastore'

import type { socialMediaData } from '@/views/apps/socialMedia/types'

// 👉 Default Blank Data
const socialMedia = ref<socialMediaData>({

  name: '',
 
  url: '',

  icon: '',

})
const SocialList = ref([
  'FaceBook', 'Twitter', 'Instagram', 'WhatsApp', 'LinkedIn',
])

const swal = inject('$swal')
const socialMediaStore = usesocialMediastore()
const isFormValid = ref(false)
const refForm = ref<VForm>()

const loading = ref(false)


const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
  
      loading.value = true
      socialMediaStore.addsocialMedia(socialMedia.value).then(res => {
        swal({
          title: ' Added ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        nextTick(() => {
          loading.value = false
          refForm.value?.reset()
          refForm.value?.resetValidation()
          // socialMedia.value.language_id = 1
        })
      })
        .catch(error => {
          loading.value = false
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
        


          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <!-- 👉 Left Content -->

            <!-- 👉 Right Content -->

            <!-- 👉 Invoice Id -->

            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VSelect
                    v-model="socialMedia.name"
                    :items="SocialList"
                    :rules="[requiredValidator]"
                    style="width: 20.9rem;"
                    label="Name"
                  />
                </span>
              </h6>
            </div>
        
            <div class="d-flex mb-6">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="socialMedia.url"
                    :rules="[requiredValidator]"
                    label="Url "

                    style="width: 15.9rem;"
                  />
                </span>
              </h6>
            </div>
            <div class="d-flex mb-6">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="socialMedia.icon"
                    :rules="[requiredValidator]"
                    label="Icon "

                    style="width: 15.9rem;"
                  />
                </span>
              </h6>
            </div>
          </VCardText>
       
          <VCardText>
            <!-- 👉 Send Invoice -->
            <VBtn
              v-if="!loading"
              prepend-icon="tabler-send"
              type="submit"
              class="me-3"
            >
              Save
            </VBtn>
            <VBtn
            v-else
            loading
      disabled
      color="primary"
   
    >
    loading ...
    <template #loader>
        <span class="custom-loader">
          <VIcon icon="tabler-refresh" />
        </span>
      </template>
    </VBtn>
          </VCardText>
        </VCard>
      </VCol>

      <!-- 👉 Right Column: Invoice Action -->
    </VRow>
  </VForm>
</template>

