<script lang="ts" setup>
// Type: Invoice data

import Editor from '@tinymce/tinymce-vue'
import { VForm } from 'vuetify/components'
import type { assignmentData } from '@/views/apps/assignment/types'
import { useassignmentstore } from '@/views/apps/assignment/useassignmentstore'
import { useCourseStore } from '@/views/apps/course/useCoursestore'
import { useLessonstore } from '@/views/apps/lesson/useLessonstore'
import { dateRangeValidator, requiredValidator } from '@validators'

// 👉 Default Blank Data
const assignment = ref<assignmentData>({
  title: '',
  note: '',

  start_date: '',
  end_date: '',

  marks: null,

  file: '',

  lesson_id: null,
  course_id: null,
})

const courseList = ref([])
const route = useRoute()
const coursestore = useCourseStore()
const lessonstore = useLessonstore()

const maxDateAllowed = computed(() => {
  return assignment.value.end_date
})

const FetchCourse = () => {
  coursestore.fetchcourselist(
    {
      page_size: 10000,
      page: 1,

    },
  ).then(response => {
   
    courseList.value = response.data.data
  }).catch(error => {
    console.log(error)
  })
}

const loading = ref(false)


const uploadFile = (i: any) => {
  
loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('file', file)
  fd.append('folder', 'assignment')
  coursestore.uploadFile(fd).then((response: any) => {
    loading.value = false
    assignment.value.file = response?.data
  })
}


const swal = inject('$swal')
const assignmentStore = useassignmentstore()

const lessonList = ref([])

const isFormValid = ref(false)

const refForm = ref<VForm>()

assignmentStore.fetchassignmentById(Number(route.params.id)).then(response => {

  assignment.value = response.data.data
})

const fetchLesson = id => {
  lessonstore.fetchlesson(
    {
      id,
      page_size: 10000,
      page: 1,

    },
  ).then(response => {
   
    lessonList.value = response.data.data
  }).catch(error => {
    console.log(error)
  })
}

// 👉 Fetch categoriess
watchEffect(() => {
  FetchCourse()
  fetchLesson(assignment.value.course_id)
})



const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      loading.value = true
      assignmentStore.updateassignment(assignment.value).then(res => {
        swal({
          title: ' Updated ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        loading.value = false
        router.push('/apps/assignment/list')
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
        <VCard title="Update assignment">
          <!-- SECTION Header -->

          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="assignment.title"
                    label="title "
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
                    v-model="assignment.marks"
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
                  v-model="assignment.course_id"
                  :items="courseList"
                  :rules="[requiredValidator]"
                  item-title="name"
                  item-value="id"
                  label="Select Course"
                  style="width: 20.9rem;"
                  @change="fetchLesson(assignment.course_id)"
                />
              </h6>
            </div>

            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="assignment.lesson_id"
                  :items="lessonList"
                  :rules="[requiredValidator]"
                  item-title="name"
                  item-value="id"
                  label="Select Lesson"
                  style="width: 20.9rem;"
                />
              </h6>
            </div>
          </VCardText>
          <VCardText class="d-flex flex-wrap   flex-column flex-sm-row gap-4">
            <div class="d-flex align-center mb-6">
              <VTextField
                label="file"
                type="file"
                style="width: 20.9rem;"

                @input="uploadFile"
              />
            </div>
            <a
              target="_blank"
              :href="`https://b2b.prokoders.space/${assignment.file}`"
            >click to show file</a>
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
                    v-model="assignment.start_date"
                    label="Start Date"
                    :rules="[requiredValidator, () => dateRangeValidator(assignment.start_date, assignment.end_date)]"

                    :config=" { enableTime: true, dateFormat: 'Y-m-d H:i', maxDate: maxDateAllowed }"
                    style="width: 20rem;"
                    ok-text="OK"
                  />
                </span>
              </h6>
            </div>
            <div class="d-flex mb-6">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <AppDateTimePicker
                    v-model="assignment.end_date"
                    :min="assignment.start_date"
                    :rules="[requiredValidator]"
                    label="End Date"
                    :config=" { enableTime: true, dateFormat: 'Y-m-d H:i', minDate: maxDateAllowed }"
                    style="width: 20rem;"
                  />
                </span>
              </h6>
            </div>
          </VCardText>
          <VCardText>
            <label> Note</label>
            <Editor
              v-model="assignment.note"

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
