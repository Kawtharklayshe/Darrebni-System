<script lang="ts" setup>
import Editor from '@tinymce/tinymce-vue'
import { VForm } from 'vuetify/components'
import { useCourseStore } from '@/views/apps/course/useCoursestore'
import type { quizData } from '@/views/apps/quiz/types'
import { useQuizstore } from '@/views/apps/quiz/useQuizstore'
import { requiredValidator } from '@validators'

// 👉 Default Blank Data

const coursestore = useCourseStore()

const quiz = ref<quizData>({
  name: '',
  description: '',

  start_date: '',

  duration: null,

  level_id: null,
  course_id: null,

})

const swal = inject('$swal')
const quizStore = useQuizstore()

// const maxDateAllowed = computed(() => {
//   return quiz.value.end_date
// })

const isFormValid = ref(false)
const refForm = ref<VForm>()

const courseList = ref([])
const levelList = ref([])

const photo = ref('@images/avatars/avatar-14.png')

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

const fetchlevel = () => {
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

// 👉 Fetch categoriess
watchEffect(() => {
  FetchCourse()
  fetchlevel()
})

const router = useRouter()
const loading = ref(false)

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
    
      loading.value = true
      quizStore.addquiz(quiz.value).then(res => {
        swal({
          title: ' Added ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        nextTick(() => {
          router.push('/apps/quiz/list')
          loading.value = false

          quiz.value.image = 'img/deflate.jpg'
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
        <VCard title="Add quiz">
          <!-- SECTION Header -->

          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="quiz.name"
                    label="name "
                    :rules="[requiredValidator]"

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>

            <div class="d-flex mb-6  me-2 ">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="quiz.duration"
                    :rules="[requiredValidator]"
                    label="duration "
                    type="number"

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>

            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="quiz.course_id"
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
                  v-model="quiz.level_id"
                  :items="levelList"
                  :rules="[requiredValidator]"
                  item-title="name"
                  item-value="id"
                  label="Select level"
                  style="width: 20.9rem;"
                />
              </h6>
            </div>
          </VCardText>

          <VDivider />
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <!-- 👉 Left Content -->

            <!-- 👉 Right Content -->

            <!-- 👉 Invoice Id -->

            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <AppDateTimePicker
                    v-model="quiz.start_date"
                    label="Start Date"
                    :rules="[requiredValidator]"

                    :config=" { enableTime: true, dateFormat: 'Y-m-d H:i' }"
                    style="width: 20rem;"
                    ok-text="OK"
                  />
                </span>
              </h6>
            </div>
          </VCardText>
          <VCardText>
            <label> description</label>
            <Editor
              v-model="quiz.description"

              :init="{
                toolbar: ' undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat  | charmap emoticons | fullscreen  preview save print | insertfile image code media template link anchor  | ltr rtl',
                toolbar_sticky: true,

                autosave_ask_before_unload: true,
                autosave_interval: '30s',
                autosave_prefix: '{path}{query}-{idd}-',
                autosave_restore_when_empty: false,
                autosave_retention: '2m',

                plugins: 'media table   preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template  table charmap  anchor  advlist lists  help charmap quickbars emoticons',
              }"
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
