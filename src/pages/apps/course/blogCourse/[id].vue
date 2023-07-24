<script lang="ts" setup>
import { VForm } from 'vuetify/components'

import { useBlogstore } from '@/views/apps/blog/useBlogstore'
import { requiredValidator } from '@validators'

// 👉 Default Blank Data

const blogCourse = ref<any>({
  id: null,
  blog_ids: [],

})

const blogstore = useBlogstore()

const blogList = ref([])
const courseList = ref([])
const swal = inject('$swal')

blogstore.fetchblog(
  {
    page_size: 10000,
    page: 1,

  },
).then(response => {
  // )
  blogList.value = response.data.data

  // blogList.value = response.data.data
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
      console.log('bootcamp', blogCourse)
      console.log('router.params.id', router.params.id)
      blogCourse.value.id = (Number(router.params.id))
      loading.value = true
      blogstore.addblogCourse(blogCourse.value).then(res => {
        swal({
          title: ' Added ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        nextTick(() => {
          // router.push('/apps/blog/list')
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
        <VCard title="Add   blog  to Course ">
          <!-- SECTION Header -->

          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex mb-6 ">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="blogCourse.blog_ids"
                  :items="blogList"
                  :rules="[requiredValidator]"
                  item-title="title"
                  item-value="id"
                  label="Select blog"
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
