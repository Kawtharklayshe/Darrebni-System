<script lang="ts" setup>
import Editor from '@tinymce/tinymce-vue'
import { VForm } from 'vuetify/components'
import { usecareerstore } from '@/views/apps/career/usecareerstore'

import { dateRangeValidator, requiredValidator } from '@validators'

// 👉 Default Blank Data

const career = ref<any>({
  skills: [],
  skills_ids: [],
  jobTypes: [],
  jobTypes_ids: [],
  tags: [],
  tags_ids: [],
  categories: [],
  categories_ids: [],
  start_date: '',
  expire_date: '',
  sync_slug: '',
  name: '',
  description: '',
  content: '',
  address: '',
  status: '',
  apply_url: '',
  is_freelance: '',
  career_level_id: '',
  career_level_value: '',

  currency_id: '',
  currency_value: '',

  degree_level_id: '',
  degree_level_value: '',

  job_shift_value: '',
  job_shift_id: '',

  job_experience_id: '',
  job_experience_value: '',

  functional_area_id: '',
  functional_area_value: '',
  image:'',
  alt:'',
  salary_from: '',
  salary_to: '',

  salary_range: '',
  seo: {
    title: '',
    author: '',
    description: '',
    keyword: '',
    og_image: 'img/deflate.jpg',
  },
  number_of_positions: '',

})

const items = []
const swal = inject('$swal')
const careerStore = usecareerstore()

const refInputEl = ref<HTMLElement>()

const maxDateAllowed = computed(() => {
  return career.value.expire_date
})

const isFormValid = ref(false)
const refForm = ref<VForm>()

const skilllsList = ref([])
const JobList = ref([])
const TagList = ref([])
const CategoriesList = ref([])

const careerLevelList = ref([])
const currencyList = ref([])
const jobShiftList = ref([])
const jobExperienceList = ref([])
const FuncList = ref([])
const DegreeList = ref([])

const refInputE4 = ref<HTMLElement>()

const FetchData = () => {
  careerStore.fetchcareerData(

  ).then(response => {
    console.log('fetchcareerData', response.data)
    skilllsList.value = response.data.data.job_skill
    JobList.value = response.data.data.job_type
    TagList.value = response.data.data.tag
    CategoriesList.value = response.data.data.category

    careerLevelList.value = response.data.data.career_level
    currencyList.value = response.data.data.job_type
    jobShiftList.value = response.data.data.job_shift
    jobExperienceList.value = response.data.data.job_experience
    FuncList.value = response.data.data.functional_area
    DegreeList.value = response.data.data.degree_level
  }).catch(error => {
    console.log(error)
  })
}

const loading = ref(false)


const uploadNewImage = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  careerStore.uploadImage(fd).then((response: any) => {
    loading.value = false
    career.value.image = response?.data.path_file
  })
}

const uploadSeoImage = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  careerStore.uploadImage(fd).then((response: any) => {
    loading.value = false
    career.value.seo.og_image = response?.data.path_file
  })
}

// 👉 Fetch categoriess
watchEffect(() => {
  FetchData()
})

const router = useRouter()

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      console.log('career', career)
      loading.value = true
      careerStore.addcareer(career.value).then(res => {
        swal({
          title: ' Added ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        nextTick(() => {
          router.push('/apps/career/list')
          loading.value = false

          career.value.image = 'img/deflate.jpg'
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
        <VCard title="Add career">
          <!-- SECTION Header -->
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="career.sync_slug"
                    label="sync Slug "
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
                    v-model="career.name"
                    :rules="[requiredValidator]"
                    label="name "
                    type="text"

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>

            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VTextField
                  v-model="career.status"

                  label="status "
                  type="text"

                  style="width: 20.9rem;"
                />
              </h6>
            </div>

            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VTextField
                  v-model="career.apply_url"

                  label="apply url "
                  type="text"

                  style="width: 20.9rem;"
                />
              </h6>
            </div>
          </VCardText>
        
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex mb-6  me-2 ">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="career.salary_from"
                   
                    label="salary From "
                    type="number"

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>

            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VTextField
                  v-model="career.salary_to"

                  label="salary To "
                  type="number"

                  style="width: 20.9rem;"
                />
              </h6>
            </div>

            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VTextField
                  v-model="career.salary_range"

                  label="salary range "
                  type="text"

                  style="width: 20.9rem;"
                />
              </h6>
            </div>
            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VTextField
                  v-model="career.number_of_positions"

                  label="number of positions "
                  type="number"

                  style="width: 20.9rem;"
                />
              </h6>
            </div>
          </VCardText>
          <VCardText>
            <VRow>
              <VCol cols="3">
                <VCard title=" image ">
                  <VCardText>
                    <!-- 👉 Upload Photo -->
                    <VAvatar
                      rounded
                      :size="200"
                      class="me-6"
                      :image="`https://b2b.prokoders.space/${career.image}`"
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
                        v-model="career.alt"
                       
                        label=" alt text "

                        style="width: 20.9rem;"
                      />
                    </span>
                    <!-- </h6> -->
                  </p>
              </VCol>
              </VRow>
              </VCardText>
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="career.career_level_value"

                    label="Career Level"

                    chips
                    style="width: 20.9rem;"
                  />
                </span>
              </h6>

              <h6 class="d-flex me-2 mt align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="career.career_level_id"
                  :items="careerLevelList"
                 
                  item-title="name"
                  item-value="id"

                  style="width: 20.9rem;"
                  label="Select Career Level"
                />
              </h6>
            </div>
          </VCardText>
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="career.currency_value"

                    label="Currency Value"

                    chips
                    style="width: 20.9rem;"
                  />
                </span>
              </h6>

              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="career.currency_id"
                  :items="currencyList"
                 
                  item-title="name"
                  item-value="id"

                  style="width: 20.9rem;"
                  label="Select Currency Value"
                />
              </h6>
            </div>
          </VCardText>

          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="career.degree_level_value"

                    label="Degree Level"

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>

              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="career.degree_level_id"
                  :items="DegreeList"
                
                  item-title="name"
                  item-value="id"

                  style="width: 20.9rem;"
                  label="Select Degree Level"
                />
              </h6>
            </div>
          </VCardText>
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <AppCombobox
                    v-model="career.skills"
                    :items="items"
                    label="Skills"
                    multiple
                    chips
                    style="width: 20.9rem;"
                  />
                </span>
              </h6>

              <h6 class="d-flex me-2 mt-6 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="career.skills_ids"
                  :items="skilllsList"
                  
                  item-title="name"
                  item-value="id"
                  multiple
                  style="width: 20.9rem;"
                  label="Select Skills"
                />
              </h6>
            </div>
          </VCardText>
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="career.job_shift_value"

                    label="Job Shift"
                    multiple
                    chips
                    style="width: 20.9rem;"
                  />
                </span>
              </h6>

              <h6 class="d-flex me-2 mt-6 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="career.job_shift_id"
                  :items="jobShiftList"
                 
                  item-title="name"
                  item-value="id"

                  style="width: 20.9rem;"
                  label="Select Job Shift"
                />
              </h6>
            </div>
          </VCardText>

          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="career.job_experience_value"

                    label="Job Experience"

                    chips
                    style="width: 20.9rem;"
                  />
                </span>
              </h6>

              <h6 class="d-flex me-2 mt-6 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="career.job_experience_id"
                  :items="jobExperienceList"
                
                  item-title="name"
                  item-value="id"

                  style="width: 20.9rem;"
                  label="Select Experience"
                />
              </h6>
            </div>
          </VCardText>

          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="career.functional_area_value"

                    label="Job Experience"

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>

              <h6 class="d-flex me-2 mt-6 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="career.functional_area_id"
                  :items="FuncList"
                  
                  item-title="name"
                  item-value="id"

                  style="width: 20.9rem;"
                  label="Select Experience"
                />
              </h6>
            </div>
          </VCardText>
          <VDivider />
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <AppCombobox
                    v-model="career.jobTypes"
                    :items="items"
                    label="jobTypes"
                    multiple
                    chips
                    style="width: 20.9rem;"
                  />
                </span>
              </h6>

              <h6 class="d-flex me-2 mt-6 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="career.jobTypes_ids"
                  :items="JobList"
                  
                  item-title="name"
                  item-value="id"
                  multiple
                  style="width: 20.9rem;"
                  label="Select jobTypes"
                />
              </h6>
            </div>
          </VCardText>
          <VDivider />
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <AppCombobox
                    v-model="career.tags"
                    :items="items"
                    label="tags"
                    multiple
                    chips
                    style="width: 20.9rem;"
                  />
                </span>
              </h6>

              <h6 class="d-flex me-2 mt-6 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="career.tags_ids"
                  :items="TagList"
                  
                  item-title="name"
                  item-value="id"
                  multiple
                  style="width: 20.9rem;"
                  label="Select tags"
                />
              </h6>
            </div>
          </VCardText>
          <VDivider />
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <AppCombobox
                    v-model="career.categories"
                    :items="items"
                    label="categories"
                    multiple
                    chips
                    style="width: 20.9rem;"
                  />
                </span>
              </h6>

              <h6 class="d-flex me-2 mt-6 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="career.categories_ids"
                  :items="TagList"
                  
                  item-title="name"
                  item-value="id"
                  multiple
                  style="width: 20.9rem;"
                  label="Select categories"
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
                    v-model="career.start_date"
                    label="Start Date"
                    :rules="[requiredValidator, () => dateRangeValidator(career.start_date, career.expire_date)]"

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
                    v-model="career.expire_date"
                    :min="career.start_date"
                    
                    label="Expire Date"
                    :config=" { enableTime: true, dateFormat: 'Y-m-d H:i', minDate: maxDateAllowed }"
                    style="width: 20rem;"
                  />
                </span>
              </h6>
            </div>
          </VCardText>
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <VCol cols="12">
              <VTextarea
        label="description"
        :rules="[requiredValidator]"
        v-model="career.description"
     
      />
            </VCol>
          </VCardText>
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <VCol cols="12">
              <VTextarea
        label="content"
        :rules="[requiredValidator]"
        v-model="career.content"
     />
            </VCol>
          </VCardText>

          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <VCol cols="12">
              <VTextarea
        label="address"
    
        v-model="career.address"
     
      />
            </VCol>
          </VCardText>
          <VCardText>
            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="career.seo.title"
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
                    v-model="career.seo.author"

                    label="Seo author "

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>
            <VCardText>
              <label> SEO Keyword</label>
              <!--
                {{ career.seo.keyword }}
                {{ tags }}
                career.seo.keyword
                <SmartTagz
                ref="smarttag"
                :tags="tags"
                input-placeholder="Select Countries ..."
                :default-tags="tags"
                :read-only="false"
                @click="handleTagsUpdated"
                />
              -->
              <Editor
                v-model="career.seo.keyword"

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
                v-model="career.seo.description"

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
                      :image="`https://b2b.prokoders.space/${career.seo.og_image}`"
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
