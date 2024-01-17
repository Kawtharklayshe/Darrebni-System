<script lang="ts" setup>
import { VForm } from 'vuetify/components'
import { useCourseStore } from '@/views/apps/course/useCoursestore'
import { useLessonstore } from '@/views/apps/lesson/useLessonstore'
import type { questionData } from '@/views/apps/question/types'
import { useQuestionstore } from '@/views/apps/question/useQuestionstore'
import { requiredValidator } from '@validators'

// 👉 Default Blank Data

const coursestore = useCourseStore()
const lessonstore = useLessonstore()

const question = ref<questionData>({
  question: '',
  type: '',
  answers: '',
  marks: null,

  level_id: null,

  lesson_id: null,
  course_id: null,

})

const swal = inject('$swal')
const questionStore = useQuestionstore()

const isFormValid = ref(false)
const refForm = ref<VForm>()

const courseList = ref([])
const lessonList = ref([])
const levelList = ref([])

const typeList = ref([
  { name: 'One chose', id: 'one_chose' },
  { name: 'Multi chose', id: 'multi_chose' },
  { name: 'text', id: 'text' },
])

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
  coursestore.fetchlevel(
    {

      page_size: 10000,
      page: 1,

    },
  ).then(response => {
    // )
    levelList.value = response.data.data
  }).catch(error => {
    console.log(error)
  })
}

const fetchLesson = id => {
  lessonstore.fetchlesson(
    {
      id,
      page_size: 10000,
      page: 1,

    },
  ).then(response => {
    // )
    lessonList.value = response.data.data
  }).catch(error => {
    console.log(error)
  })
}

// 👉 Fetch categoriess
watchEffect(() => {
  FetchCourse()
  fetchLesson(question.value.course_id)
})

// uploadFirstImage function

const uploadFile = (i: any) => {
  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('file', file)
  fd.append('folder', 'question')
  coursestore.uploadFile(fd).then((response: any) => {
    question.value.file = response?.data
  })
}

const router = useRouter()
const loading = ref(false)

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
   
      loading.value = true
      questionStore.addquestion(question.value).then(res => {
        swal({
          title: ' Added ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        nextTick(() => {
          router.push('/apps/question/list')
          loading.value = false

          question.value.image = 'img/deflate.jpg'
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
        <VCard title="Add question">
          <!-- SECTION Header -->

          <VCardText>
            <VTextarea
              v-model="question.question"
              placeholder="Question"
              :rules="[requiredValidator]"
            />
          </VCardText>

          <VCardText>
            <VTextarea
              v-model="question.answers"
              placeholder="Answers"
              :rules="[requiredValidator]"
            />
          </VCardText>
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex mb-6  me-2 ">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="question.marks"
                    :rules="[requiredValidator]"
                    label="marks "
                    type="number"

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>

            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="question.course_id"
                  :items="courseList"
                  :rules="[requiredValidator]"
                  item-title="name"
                  item-value="id"
                  label="Select Course"
                  style="width: 20.9rem;"
                  @change="fetchLesson(question.course_id)"
                />
              </h6>
            </div>

            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="question.lesson_id"
                  :items="lessonList"
                  :rules="[requiredValidator]"
                  item-title="name"
                  item-value="id"
                  label="Select Lesson"
                  style="width: 20.9rem;"
                />
              </h6>
            </div>
            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="question.level_id"
                  :items="levelList"
                  :rules="[requiredValidator]"
                  item-title="name"
                  item-value="id"
                  label="Select level"
                  style="width: 20.9rem;"
                />
              </h6>
            </div>
            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="question.type"
                  :items="typeList"
                  :rules="[requiredValidator]"
                  item-title="name"
                  item-value="id"
                  label="Select Type"
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
