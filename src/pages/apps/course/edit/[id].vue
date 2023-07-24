<script lang="ts" setup>
// Type: Invoice data

import Editor from '@tinymce/tinymce-vue'
import { VForm } from 'vuetify/components'
import { useCategoriesstore } from '@/views/apps/categories/useCategoriesstore'
import { useCompanystore } from '@/views/apps/company/useCompanystore'
import type { courseData } from '@/views/apps/course/types'
import { useCourseStore } from '@/views/apps/course/useCoursestore'
import { uselanguagesstore } from '@/views/apps/languages/uselanguagesstore'
import { requiredValidator } from '@validators'

// 👉 Default Blank Data
const course = ref<courseData>({
  name: '',
  description: '',
  price: null,
  prerequisites: '',
  slug: '',
  objectives: '',
  audience: '',
  summary: '',
  status: 'publish',
  version: null,
  level_id: null,
  number_hour: null,
  first_image_alt: '',
  alt: '',
  first_image: '',
  languages: [],
  image: '',
  video: '',
  file: '',
  youtube_url: '',
  seo: {
    title: '',
    author: '',
    description: '',
    keyword: '',
    og_image: 'img/deflate.jpg',
  },
  course_category_id: null,
  company_category_id: null,

})

const swal = inject('$swal')
const courseStore = useCourseStore()
const refInputEl = ref<HTMLElement>()
const refInputE2 = ref<HTMLElement>()
const refInputE3 = ref<HTMLElement>()
const refInputE4 = ref<HTMLElement>()

const categoryList = ref([])
const levelList = ref([])
const courseList = ref([])

const statusList = ref([
  { name: 'draft', id: 'draft' },
  { name: 'publish', id: 'publish' },
  { name: 'stopped', id: 'stopped' },
])

const isFormValid = ref(false)

const LangsList = ref([])

const languagestore = uselanguagesstore()

languagestore.fetchlanguage(
  {
    page_size: 10000,
    page: 1,
  },
).then(response => {
  LangsList.value = response.data.data
}).catch(error => {
  console.log(error)
})

const refForm = ref<VForm>()
const route = useRoute()
const categoriesstore = useCategoriesstore()
const companystore = useCompanystore()

const FetchCategory = () => {
  categoriesstore.fetchcategories(
    {
      need: 'sub_category',
      page_size: 10000,
      page: 1,

    },
  ).then(response => {
    // )
    categoryList.value = response.data.data
  }).catch(error => {
    console.log(error)
  })
  categoriesstore.fetchlevel(
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

const FetchCourse = () => {
  categoriesstore.fetchcategories(
    {
      need: 'company',
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

const loading = ref(false)

// uploadFirstImage function
const uploadFirstImage = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'course')
  courseStore.uploadImage(fd).then((response: any) => {
    loading.value = false
    course.value.first_image = response.data.path_file
  })
}

const uploadNewImage = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'course')
  courseStore.uploadImage(fd).then((response: any) => {
    loading.value = false
    course.value.image = response?.data.path_file
  })
}

const uploadSeoImage = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'course')
  courseStore.uploadImage(fd).then((response: any) => {
    loading.value = false
    course.value.seo.og_image = response?.data.path_file
  })
}

const uploadVideo = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('video', file)
  fd.append('folder', 'course')
  courseStore.uploadVideo(fd).then((response: any) => {
    loading.value = false
    course.value.video = response?.data.path_file
  })
}

const uploadFile = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('file', file)
  fd.append('folder', 'course')
  courseStore.uploadFile(fd).then((response: any) => {
    course.value.file = response?.data
    loading.value = false
  })
}

courseStore.fetchcourseById(Number(route.params.id)).then(response => {
  // .data)
  course.value = response.data.data
})

watchEffect(() => {
  FetchCategory()
  FetchCourse()
})

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      loading.value = true
      courseStore.updatecourse(course.value).then(res => {
        swal({
          title: ' Updated ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        loading.value = false
        router.push('/apps/course/list')
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
        <VCard title="Update Course">
          <!-- SECTION Header -->

          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="course.name"
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
                    v-model="course.price"

                    label="price "
                    type="number"

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>
            <div class="d-flex mb-6  me-2 ">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="course.slug"
                    :rules="[requiredValidator]"
                    label="slug "

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>
            <div class="d-flex mb-6">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>

                  <VSelect
                    v-model="course.status"
                    :items="statusList"
                    :rules="[requiredValidator]"
                    item-title="name"
                    item-value="id"
                    clearable
                    clear-icon="tabler-x"
                    label="Select Status"
                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>
            <div class="d-flex mb-6">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>

                  <VSelect
                    v-model="course.languages"
                    clearable
                    clear-icon="tabler-x"
                    :items="LangsList"

                    item-title="name"
                    item-value="id"
                    label="Select Lnaguages"
                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>
            <div class="d-flex mb-6  me-2 ">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="course.version"
                    type="number"
                    label="version "

                    class="mb-6"
                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>
            <div class="d-flex mb-6">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="course.number_hour"
                    type="number"
                    label="Number hour "

                    class="mb-6"
                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>
            <div class="d-flex mb-6">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="course.company_category_id"
                  :items="courseList"
                  clearable
                  clear-icon="tabler-x"
                  label="Select Company"
                  item-title="name"
                  item-value="id"
                  style="width: 20.9rem;"
                />
              </h6>
            </div>
            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="course.course_category_id"
                  :items="categoryList"
                  :rules="[requiredValidator]"
                  clearable
                  clear-icon="tabler-x"
                  item-title="name"
                  item-value="id"
                  label="Select Category"
                  style="width: 20.9rem;"
                />
              </h6>
            </div>
            <div class="d-flex mb-6">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="course.level_id"
                  :items="levelList"

                  item-title="name"
                  item-value="id"
                  label="Select Level"
                  style="width: 20.9rem;"
                />
              </h6>
            </div>

            <div class="ma-sm-4">
              <VRow>
                <VCol cols="6">
                  <VCard title="First image ">
                    <VCardText>
                      <!-- 👉 Upload Photo -->
                      <VAvatar
                        rounded
                        :size="200"
                        class="me-6"
                        :image="`https://b2b.prokoders.space/${course.first_image}`"
                      />
                    </VCardText>
                  </VCard>
                  <div class="d-flex flex-wrap gap-2 mt-10">
                    <VBtn
                      color="primary"
                      @click="refInputE2?.click()"
                    >
                      <VIcon
                        icon="tabler-cloud-upload"
                        class="d-sm-none"
                      />
                      <span class="d-none d-sm-block">Upload First photo</span>
                    </VBtn>

                    <input
                      ref="refInputE2"
                      type="file"
                      name="file"
                      accept=".jpeg,.png,.jpg,GIF"
                      hidden
                      @input="uploadFirstImage"
                    >
                  </div>

                  <p class="text-body-1 mb-0 mt-5">
                    <!-- <h6 class="d-flex me-2 mt-5  align-center font-weight-medium justify-sm-end text-xl mb-3"> -->
                    <span>
                      <VTextField
                        v-model="course.first_image_alt"

                        label="First Image alt text "

                        style="width: 20.9rem;"
                      />
                    </span>
                    <!-- </h6> -->
                  </p>
                </VCol>
                <VCol cols="6">
                  <VCard title=" image ">
                    <VCardText>
                      <!-- 👉 Upload Photo -->
                      <VAvatar
                        rounded
                        :size="200"
                        class="me-6"
                        :image="`https://b2b.prokoders.space/${course.image}`"
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
                        v-model="course.alt"

                        label="alt text "

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

                        :src="`https://b2b.prokoders.space/${course.video}`"
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
                v-model="course.youtube_url"
                label="youtube_url"

                style="width: 20.9rem;"
              />
            </div>
            <!--
              <div class="d-flex align-center mb-6">
              <VTextField
              v-model="course.file"
              label="file"
              type="file"

              :rules="[requiredValidator]"
              style="width: 20.9rem;"
              />
              </div>
            -->
            <VDivider />
            <VCardText>
              <VTextarea
                v-model="course.small_text"
                label="Small Text"

                density="compact"
              />
            </VCardText>
          </VCardText>
          <VDivider />
          <VCardText>
            <label> description</label>
            <Editor
              v-model="course.description"

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
            <label> prerequisites</label>
            <Editor
              v-model="course.prerequisites"

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
              v-model="course.summary"

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
            <label> objectives</label>
            <Editor
              v-model="course.objectives"

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
            <label> audience</label>
            <Editor
              v-model="course.audience"

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
          <VCardText class="d-flex flex-wrap   flex-column flex-sm-row gap-4">
            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="course.seo.title"
                    label="Seo Title "

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>
            <div class="d-flex mb-6  me-2 ">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="course.seo.author"

                    label="Seo author "

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>
          </VCardText>
          <VCardText>
            <label> SEO Keyword</label>
            <Editor
              v-model="course.seo.keyword"

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
            <label> SEO Description</label>
            <Editor
              v-model="course.seo.description"

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
          <VRow>
            <VCol cols="4">
              <VCard title="Seo Image ">
                <VCardText>
                  <!-- 👉 Upload Photo -->
                  <VAvatar
                    rounded
                    :size="200"
                    class="me-6"
                    :image="`https://b2b.prokoders.space/${course.seo.og_image}`"
                  />
                </VCardText>
              </VCard>
              <div class="d-flex flex-wrap gap-2 mt-10">
                <VBtn
                  color="primary"
                  @click="refInputE4?.click()"
                >
                  <VIcon
                    icon="tabler-cloud-upload"
                    class="d-sm-none"
                  />
                  <span class="d-none d-sm-block">Upload Seo photo</span>
                </VBtn>

                <input
                  ref="refInputE4"
                  type="file"
                  name="file"
                  accept=".jpeg,.png,.jpg,GIF"
                  hidden
                  @input="uploadSeoImage"
                >
              </div>

              <p class="text-body-1 mb-0">
                Allowed JPG, GIF or PNG. Max size of 800K
              </p>
            </VCol>
          </VRow>

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
