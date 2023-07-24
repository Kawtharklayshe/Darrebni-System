<script lang="ts" setup>
import { VForm } from 'vuetify/components'

import { usetrainerstore } from '@/views/apps/trainer/usetrainerstore'
import { requiredValidator } from '@validators'

// 👉 Default Blank Data

const tagCourse = ref<any>({
  id: null,
  trainer_ids: [],

})

const trainerstore = usetrainerstore()

const tagList = ref([])
const courseList = ref([])
const swal = inject('$swal')

trainerstore.fetchtag(
  {
    page_size: 10000,
    page: 1,

  },
).then(response => {
  // )
  tagList.value = response.data.data
}).catch(error => {
  console.log(error)
})

const isFormValid = ref(false)
const refForm = ref<VForm>()

const router = useRoute()
const loading = ref(false)

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      console.log('bootcamp', tagCourse)
      tagCourse.value.id = (Number(router.params.id))
      loading.value = true
      trainerstore.addTrainerLangs(tagCourse.value).then(res => {
        swal({
          title: ' Added ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        nextTick(() => {
          // router.push('/apps/tag/list')
          loading.value = false

          refForm.value?.reset()
          refForm.value?.resetValidation()
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
        cols="12"
        md="12"
      >
        <VCard title="Add   Trainer  to Languges ">
          <!-- SECTION Header -->

          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex mb-6 ">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="tagCourse.trainer_ids"
                  :items="tagList"
                  :rules="[requiredValidator]"
                  item-title="name"
                  item-value="id"
                  label="Select Trainer"
                  style="width: 20.9rem;"
                  chips
                  multiple
                />
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
