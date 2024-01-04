<script lang="ts" setup>
// Type: Invoice data

import { VForm } from 'vuetify/components'
import type { languageData } from '@/views/apps/languages/types'
import { uselanguagesstore } from '@/views/apps/languages/uselanguagesstore'
import { requiredValidator } from '@validators'

// 👉 Default Blank Data
const language = ref<languageData>({

  name: '',

  code: '',

  icon: '',

})

const route = useRoute()
const swal = inject('$swal')

const newsStore = uselanguagesstore()
const isFormValid = ref(false)
const router = useRouter()
const refForm = ref<VForm>()

newsStore.fetchlanguageById(Number(route.params.id)).then(response => {
  // .data)
  language.value = response.data.data
})

const loading = ref(false)

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      loading.value = true
      newsStore.updatelanguage(language.value).then(res => {
        swal({
          title: ' Updated ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        loading.value = false
        router.push('/apps/languages/list')
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
        <VCard title="Update Language">
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <!-- 👉 Left Content -->

            <!-- 👉 Right Content -->
            <div class="d-flex mb-6">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="language.name"
                    :rules="[requiredValidator]"
                    label="name "

                    style="width: 15.9rem;"
                  />
                </span>
              </h6>

              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="language.icon"

                    label="Icon "

                    style="width: 15.9rem;"
                  />
                </span>
              </h6>
            </div>
          </VCardText>
          <VCardText>
            <!-- <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3"> -->
            <VTextField
              v-model="language.code"

              label="code "

              style="width: 15.9rem;"
            />
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
