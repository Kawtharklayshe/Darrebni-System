<script lang="ts" setup>
import Editor from '@tinymce/tinymce-vue'
import { VForm } from 'vuetify/components'
import { useCourseStore } from '@/views/apps/course/useCoursestore'
import type { lessonData } from '@/views/apps/lesson/types'
import { useLessonstore } from '@/views/apps/lesson/useLessonstore'
import { requiredValidator } from '@validators'

// 👉 Default Blank Data

const coursestore = useCourseStore()

const lesson = ref<lessonData>({
  name: '',
  description: '',

  slug: '',
  summary: '',

  alt: '',

  image: 'img/deflate.jpg',
  video: '',
  file: '',

  course_id: null,

})

watch(() => lesson.value.name, newValue => {
  lesson.value.slug = newValue.toLowerCase().replace(/\s+/g, '-')
})

const swal = inject('$swal')
const lessonStore = useLessonstore()
const refInputEl = ref<HTMLElement>()

const refInputE3 = ref<HTMLElement>()

const isFormValid = ref(false)
const refForm = ref<VForm>()

const courseList = ref([])

const photo = ref('@images/avatars/avatar-14.png')

const FetchCategory = () => {
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

// 👉 Fetch categoriess
watchEffect(() => {
  FetchCategory()
})

const loading = ref(false)

// uploadFirstImage function

const uploadNewImage = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'lesson')
  coursestore.uploadImage(fd).then((response: any) => {
    loading.value = false
    lesson.value.image = response?.data.path_file
  })
}

const uploadVideo = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('video', file)
  fd.append('folder', 'lesson')
  coursestore.uploadVideo(fd).then((response: any) => {
    loading.value = false
    lesson.value.video = response?.data.path_file
  })
}

const uploadFile = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('file', file)
  fd.append('folder', 'lesson')
  coursestore.uploadFile(fd).then((response: any) => {
    loading.value = false
    lesson.value.file = response?.data
  })
}

const router = useRouter()

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      console.log('lesson', lesson)
      loading.value = true
      lessonStore.addlesson(lesson.value).then(res => {
        swal({
          title: ' Added ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        nextTick(() => {
          router.push('/apps/lesson/list')
          loading.value = false

          lesson.value.image = 'img/deflate.jpg'
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
        <VCard title="Add lesson">
          <!-- SECTION Header -->

          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="lesson.name"
                    label="Name "
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
                    v-model="lesson.slug"
                    :rules="[requiredValidator]"
                    label="slug "

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>

            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="lesson.course_id"
                  :items="courseList"
                  :rules="[requiredValidator]"
                  item-title="name"
                  item-value="id"
                  label="Select Course"
                  style="width: 20.9rem;"
                />
              </h6>
            </div>

            <div class="ma-sm-4">
              <VRow>
                <VCol cols="6">
                  <VCard title=" image ">
                    <VCardText>
                      <!-- 👉 Upload Photo -->
                      <VAvatar
                        rounded
                        :size="200"
                        class="me-6"
                        :image="`https://b2b.prokoders.space/${lesson.image}`"
                      />
                    </VCardText>
                  </VCard>
                  <div class="d-flex flex-wrap gap-2 mt-10">
                    <VBtn
                      color="primary"
                      @click="refInputEl?.click()"
                    >
                      <VIcon
                        icon="tabler-cloud-upload"
                        class="d-sm-none"
                      />
                      <span class="d-none d-sm-block">Upload new photo</span>
                    </VBtn>

                    <input
                      ref="refInputEl"
                      type="file"
                      name="file"
                      accept=".jpeg,.png,.jpg,GIF"
                      hidden
                      @input="uploadNewImage"
                    >
                  </div>

                  <p class="text-body-1 mb-0 mt-5">
                    <!-- <h6 class="d-flex me-2 mt-5  align-center font-weight-medium justify-sm-end text-xl mb-3"> -->
                    <span>
                      <VTextField
                        v-model="lesson.alt"

                        label=" alt text "

                        style="width: 20.9rem;"
                      />
                    </span>
                    <!-- </h6> -->
                  </p>
                </VCol>
                <VCol cols="6">
                  <VCard title=" Video ">
                    <VCardText>
                      <!-- 👉 Upload Photo -->

                      <video

                        :src="`https://b2b.prokoders.space/${lesson.video}`"
                        :controls="true"
                        class="me-6"
                        width="200"
                        height="200"
                      />
                    </VCardText>
                  </VCard>
                  <div class="d-flex flex-wrap gap-2 mt-10">
                    <VBtn
                      color="primary"
                      @click="refInputE3?.click()"
                    >
                      <VIcon
                        icon="tabler-cloud-upload"
                        class="d-sm-none"
                      />
                      <span class="d-none d-sm-block">Upload new video</span>
                    </VBtn>

                    <input
                      ref="refInputE3"
                      type="file"
                      name="file"
                      accept=".mp4,.png,.jpg,GIF"
                      hidden
                      @input="uploadVideo"
                    >
                  </div>
                </VCol>
              </VRow>
              <!-- 👉 title_support_email -->
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
          </VCardText>
          <VDivider />
          <VCardText>
            <label> description</label>
            <Editor
              v-model="lesson.description"

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
              v-model="lesson.summary"

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
