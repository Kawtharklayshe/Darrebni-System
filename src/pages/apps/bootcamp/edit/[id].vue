<script lang="ts" setup>

// Type: Invoice data

import Editor from '@tinymce/tinymce-vue'
import { VForm } from 'vuetify/components'
import type { bootcampData } from '@/views/apps/bootcamp/types'

import { usebootcampstore } from '@/views/apps/bootcamp/usebootcampstore'
import { useCourseStore } from '@/views/apps/course/useCoursestore'
import { dateRangeValidator, requiredValidator } from '@validators'

// 👉 Default Blank Data
const bootcamp = ref<bootcampData>({
  title: '',
  description: '',
  duration: null,
  summary: '',
  number_hour: null,
  register_start_at: '',
  number_of_subscribers: null,
  register_end_at: '',
  course_ids: [],
  end_date: '',
  start_date: '',
})

const swal = inject('$swal')

const refInputEl = ref<HTMLElement>()
const bootcampStore = usebootcampstore()

const isFormValid = ref(false)

const refForm = ref<VForm>()
const route = useRoute()

const maxDateAllowed = computed(() => {
  return bootcamp.value.end_date
})

const maxDateAllowedRejister = computed(() => {
  return bootcamp.value.register_end_at
})

const coursestore = useCourseStore()
const courseList = ref([])

coursestore.fetchcourse(
  {
    page_size: 10000,
    page: 1,

  },
).then(response => {

  courseList.value = response.data.data.data
}).catch(error => {
  console.log(error)
})

bootcampStore.fetchbootcampById(Number(route.params.id)).then(response => {

  bootcamp.value = response.data.data
})

const loading = ref(false)

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      loading.value = true
      bootcampStore.updatebootcamp(bootcamp.value).then(res => {
        swal({
          title: ' Updated ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        loading.value = false
        router.push('/apps/bootcamp/list')
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
        <VCard title="Add bootcamp">
          <!-- SECTION Header -->

          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="bootcamp.title"
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
                    v-model="bootcamp.duration"
                    :rules="[requiredValidator]"
                    label="duration "
                    type="number"

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>

            <div class="d-flex mb-6 ">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="bootcamp.course_ids"
                  :items="courseList"
                  :rules="[requiredValidator]"
                  item-title="name"
                  item-value="id"
                  label="Select Course"
                  style="width: 20.9rem;"
                  chips
                  multiple
                />
              </h6>
            </div>
            <div class="d-flex mb-6">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>

                  <VTextField
                    v-model="bootcamp.number_of_subscribers"
                    :rules="[requiredValidator]"
                    label="Number Of Subscibers "
                    type="number"

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>
            <div class="d-flex mb-6">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>

                  <VTextField
                    v-model="bootcamp.number_hour"
                    :rules="[requiredValidator]"
                    label="Number Hour "
                    type="number"

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>
          </VCardText>
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <!-- 👉 Left Content -->

            <!-- 👉 Right Content -->

            <!-- 👉 Invoice Id -->

            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <AppDateTimePicker
                    v-model="bootcamp.start_date"
                    label="Start Date"
                    :rules="[requiredValidator, () => dateRangeValidator(bootcamp.start_date, bootcamp.end_date)]"

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
                    v-model="bootcamp.end_date"
                    :min="bootcamp.start_date"
                    :rules="[requiredValidator]"
                    label="End Date"
                    :config=" { enableTime: true, dateFormat: 'Y-m-d H:i', minDate: maxDateAllowed }"
                    style="width: 20rem;"
                  />
                </span>
              </h6>
            </div>
          </VCardText>
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <!-- 👉 Left Content -->

            <!-- 👉 Right Content -->

            <!-- 👉 Invoice Id -->

            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <AppDateTimePicker
                    v-model="bootcamp.register_start_at"
                    label="Register Start At"
                    :rules="[requiredValidator, () => dateRangeValidator(bootcamp.register_start_at, bootcamp.register_end_at)]"

                    :config=" { enableTime: true, dateFormat: 'Y-m-d H:i', maxDate: maxDateAllowedRejister }"
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
                    v-model="bootcamp.register_end_at"
                    :min="bootcamp.register_start_at"
                    :rules="[requiredValidator]"
                    label="Register End At"
                    :config=" { enableTime: true, dateFormat: 'Y-m-d H:i', minDate: maxDateAllowedRejister }"
                    style="width: 20rem;"
                  />
                </span>
              </h6>
            </div>
          </VCardText>

          <VDivider />
          <VCardText>
            <label> description</label>
            <Editor
              v-model="bootcamp.description"

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
            <label> summary</label>
            <Editor
              v-model="bootcamp.summary"

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
