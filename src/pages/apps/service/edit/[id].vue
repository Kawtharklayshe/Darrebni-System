<script lang="ts" setup>

// Type: Invoice data

import { VForm } from 'vuetify/components'
import type { ServiceData } from '@/views/apps/service/types'
import { requiredValidator } from '@validators'
import { useServiceStore } from '@/views/apps/service/useServiceStore'


// 👉 Default Blank Data
const Service = ref<ServiceData>({
 
  name: '',

  description: '',
 
  summary: '',
  icon: '',

})

const route = useRoute()
const swal = inject('$swal')

const ServiceStore = useServiceStore()
const isFormValid = ref(false)
const refForm = ref<VForm>()

const LanguagesList = ref([])
const photo = ref('@/assets/images/avatars/avatar-14.png')
const refInputEl = ref<HTMLElement>()

ServiceStore.fetchServiceById(Number(route.params.id)).then(response => {
  console.log(response.data.data)
  Service.value = response.data.data


})


const loading = ref(false)

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      loading.value = true
    
      ServiceStore.updateService(Service.value).then(res => {
        swal({
          title: ' Updated ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        loading.value = false
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
        cols="12"
        md="12"
      >
        <VCard>
          <!-- SECTION Header -->
          <!--  eslint-disable vue/no-mutating-props -->
          

         
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <!-- 👉 Left Content -->

            <!-- 👉 Right Content -->
            <div class="mt-4 ma-sm-4">
              <!-- 👉 Invoice Id -->

              <div class="d-flex align-center mb-6">
                <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                  <span>
                    <VTextField
                      v-model="Service.name"
                      label="Name"
                      :rules="[requiredValidator]"

                      density="compact"
                      style="width: 15.9rem;"
                    />
                  </span>
                </h6>
              
                <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                  <span>
                    <VTextField
                      v-model="Service.icon"
                      label="Icon"
                      :rules="[requiredValidator]"

                      density="compact"
                      style="width: 15.9rem;"
                    />
                  </span>
                </h6>
              </div>
            </div>
          </VCardText>
         <VCardText class="  ">
            <div class="row">
              <div class="d-flex align-center mb-6 col-sm-12 col-xl-12">
                <VTextarea
                  v-model="Service.description"
                  label="description"
                  :rules="[requiredValidator]"
                  density="compact"
                 
                />
              </div>
            </div>
          </VCardText>
          <VDivider />
         <VCardText class="  ">
            <div class="row">
              <div class="d-flex align-center mb-6 col-sm-12 col-xl-12">
                <VTextarea
                  v-model="Service.summary"
                  label="summary"
                  :rules="[requiredValidator]"
                  density="compact"
                 
                />
              </div>
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

