<script lang="ts" setup>
import { VForm } from 'vuetify/components'
import { useCourseStore } from '@/views/apps/course/useCoursestore'
import type { tagData } from '@/views/apps/tag-course/types'
import { usetagCoursestore } from '@/views/apps/tag-course/usetagstore'
import { usetagstore } from '@/views/apps/tag/usetagstore'
import { requiredValidator } from '@validators'

// 👉 Default Blank Data

const coursestore = useCourseStore()
const lessonstore = usetagstore()
const tagCoursestore = usetagCoursestore()

const tag = ref<tagData>({

  tag_id: null,
  course_id: null,

})

const swal = inject('$swal')
const tagStore = usetagstore()

const isFormValid = ref(false)
const refForm = ref<VForm>()

const courseList = ref([])
const tagList = ref([])
const levelList = ref([])

const FetchCourse = () => {
  coursestore.fetchcourselist(
    {
      page_size: 10000,
      page: 1,

    },
  ).then(response => {
    // )
    courseList.value = response.data.data
  }).catch(error => {
    console.log(error)
  })
}

const fetchTag = () => {
  tagStore.fetchtag(
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
}

// 👉 Fetch categoriess
watchEffect(() => {
  FetchCourse()
  fetchTag()
})

const router = useRouter()
const loading = ref(false)

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      console.log('tag', tag)
      loading.value = true
      tagCoursestore.addtag(tag.value).then(res => {
        swal({
          title: ' Added ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        nextTick(() => {
          router.push('/apps/tag/list')
          loading.value = false

          tag.value.image = 'img/deflate.jpg'
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
        <VCard title="Add tag">
          <!-- SECTION Header -->

          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="tag.course_id"
                  :items="courseList"
                  :rules="[requiredValidator]"
                  item-title="name"
                  item-value="id"
                  label="Select Course"
                  style="width: 20.9rem;"
                />
              </h6>
            </div>

            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="tag.tag_id"
                  :items="tagList"
                  :rules="[requiredValidator]"
                  item-title="name"
                  item-value="id"
                  label="Select Tag"
                  style="width: 20.9rem;"
                />
              </h6>
            </div>
          </VCardText>

          <VDivider />

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
