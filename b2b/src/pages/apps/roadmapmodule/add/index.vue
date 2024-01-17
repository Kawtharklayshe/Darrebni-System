<script lang="ts" setup>
import { VForm } from 'vuetify/components'
import Editor from '@tinymce/tinymce-vue'
import type { roadmapData } from '@/views/apps/roadmapmodule/types'
import { requiredValidator } from '@validators'
import { useRoadmapstoreModule } from '@/views/apps/roadmapmodule/useRoadmapstoreModule'
import { useRoadmapstore } from '@/views/apps/roadmap/useRoadmapstore'

// 👉 Default Blank Data

const categoriesstore = useRoadmapstore()

const roadmap = ref<roadmapData>({
  name: '',
  description: '',
  detail: '',
  slug: '',
  type: '',
  status: '',
  image: 'img/deflate.jpg',
  category_id: null,
  seo: {
    title: '',
    author: '',
    description: '',
    keyword: '',
    og_image: 'img/deflate.jpg',
  },
  stages: [{
    name: '',
    description: '',
    image: 'img/deflate.jpg',
    detail: '',
    order: '',
    alt: '',
  }],
})

const addNewStage = () => {
  roadmap.value.stages.push({
    name: '',
    description: '',
    image: 'img/deflate.jpg',
    detail: '',
    order: '',
    alt: '',
  })
}

const statusList = ref([
  { name: 'publish', id: 'publish' },
  { name: 'hide', id: 'hide' },
  { name: 'draft', id: 'draft' },
])

const refInputE4 = ref<HTMLElement>()
const swal = inject('$swal')
const roadmapStore = useRoadmapstoreModule()

const refInputEl = ref<HTMLElement>()
const refInputE12 = ref<HTMLElement>([])
const refInputE2 = ref<HTMLElement>()
const refInputE3 = ref<HTMLElement>()

const isFormValid = ref(false)
const refForm = ref<VForm>()
const categoryList = ref([])
const levelList = ref([])
const roadmapList = ref([])

const photo = ref('@images/avatars/avatar-14.png')

const handleUpload = i => {
  const inputRef = refInputE12.value[i]
  const inputElement = inputRef._rawValue[0]

  inputElement?.click()

}

const FetchCategory = () => {
  categoriesstore.fetchcategories(
    {
      page_size: 10000,
      page: 1,

    },
  ).then(response => {
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
    levelList.value = response.data.data
  }).catch(error => {
    console.log(error)
  })
}

// 👉 Fetch categoriess
watchEffect(() => {
  FetchCategory()
  refInputE12.value = Array(roadmap.value.stages.length).fill(null).map(() => ref(null))
})

const loading = ref(false)

// uploadFirstImage function

const uploadNewImage = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  roadmapStore.uploadImage(fd).then((response: any) => {
    loading.value = false
    roadmap.value.image = response?.data.path_file
  })
}

const uploadNewStageImage = (i: string, index: number) => {
  console.log(i)
  console.log(index)
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  roadmapStore.uploadImage(fd).then((response: any) => {
    loading.value = false
    roadmap.value.stages[index].image = response?.data.path_file
  })
}

const uploadSeoImage = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  roadmapStore.uploadImage(fd).then((response: any) => {
    loading.value = false
    roadmap.value.seo.og_image = response?.data.path_file
  })
}

const uploadFirstImage = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  roadmapStore.uploadImage(fd).then((response: any) => {
    loading.value = false
    roadmap.value.cover = response.data.path_file
  })
}

const router = useRouter()

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
     
      loading.value = true
      roadmapStore.addroadmap(roadmap.value).then(res => {
        swal({
          title: ' Added ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        nextTick(() => {
          router.push('/apps/roadmapmodule/list')
          loading.value = false

          roadmap.value.image = 'img/deflate.jpg'
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
        <VCard title="Add roadmap">
          <!-- SECTION Header -->

          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="roadmap.name"
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
                    v-model="roadmap.slug"
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
                    v-model="roadmap.status"
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
                    v-model="roadmap.type"
                    :items="['bootcamp', 'roadmap']"
                    :rules="[requiredValidator]"
                    item-title="name"
                    item-value="id"
                    clearable
                    clear-icon="tabler-x"
                    label="Select Type"
                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>
            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="roadmap.category_id"
                  :items="categoryList"
                  :rules="[requiredValidator]"
                  item-title="name"
                  item-value="id"
                  label="Select Category"
                  style="width: 20.9rem;"
                />
              </h6>
            </div>
          </VCardText>
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <VRow>
              <VCol cols="6">
                <VCard title=" image ">
                  <VCardText>
                    <!-- 👉 Upload Photo -->
                    <VAvatar
                      rounded
                      :size="200"
                      class="me-6"
                      :image="`https://prokoders.academy/${roadmap.image}`"
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
                    <span class="d-none d-sm-block">Upload new   photo</span>
                  </VBtn>

                  <input
                    ref="refInputE3"
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
                      v-model="roadmap.alt"

                      label="alt text "

                      style="width: 20.9rem;"
                    />
                  </span>
                  <!-- </h6> -->
                </p>
              </VCol>
              <VCol cols="6">
                <VCard title="Cover image ">
                  <VCardText>
                    <!-- 👉 Upload Photo -->
                    <VAvatar
                      rounded
                      :size="200"
                      class="me-6"
                      :image="`https://prokoders.academy/${roadmap.cover}`"
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
                      v-model="roadmap.alt_cover"

                      label="Cover Image alt text "

                      style="width: 20.9rem;"
                    />
                  </span>
                  <!-- </h6> -->
                </p>
              </VCol>
            </VRow>
          </VCardText>
            <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <VCol cols="12">
              <label> description</label>
              <Editor
                v-model="roadmap.description"

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
            </VCol>
          </VCardText>
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <VCol cols="12">
              <label> detail</label>

              <Editor
                v-model="roadmap.detail"
                :init="{
                  toolbar: ' undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat  | charmap emoticons | fullscreen  preview save print | insertfile image code media template link anchor  | ltr rtl',
                  toolbar_sticky: true,

                  autosave_ask_before_unload: true,
                  autosave_interval: '30s',
                  autosave_prefix: '{path}{query}-{id}-',
                  autosave_restore_when_empty: false,
                  autosave_retention: '2m',

                  plugins: '    media table   preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template  table charmap  anchor  advlist lists  help charmap quickbars emoticons',
                }"
              />
            </VCol>
          </VCardText>
          <VDivider />

          <VCard title="Add Stages">
            <VCardText
              v-for="(stage, index) in roadmap.stages"
              :key="index"
              class="d-flex flex-wrap  flex-column flex-sm-row"
            >
              <div class="d-flex  mb-6 mt-5">
                <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                  <span>
                    <VTextField
                      v-model="stage.name"
                      label="Stage name "
                      :rules="[requiredValidator]"

                      style="width: 20.9rem;"
                    />
                  </span>
                </h6>
              </div>
              <div class="d-flex  mb-6 mt-5">
                <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                  <span>
                    <VTextField
                      v-model="stage.order"
                      type="number"
                      label="Stage order "
                      :rules="[requiredValidator]"

                      style="width: 20.9rem;"
                    />
                  </span>
                </h6>
              </div>
   <VCardText>
              <VRow>
                <VCol cols="6">
                  <label> Stage description</label>
                  <Editor
                    v-model="stage.description"

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
                </VCol>
                <VCol cols="6">
                  <label> Stage details</label>
                  <Editor
                    v-model="stage.details"

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
                </VCol>
              </VRow>
   </VCardText>
              <VCardText>
                <VRow>
                  <VCol cols="6">
                    <VCard title=" image ">
                      <VCardText>
                      
                        <!-- 👉 Upload Photo -->
                        <VAvatar
                          rounded
                          :size="200"
                        
                          :image="`https://prokoders.academy/${stage.image}`"
                        />
                      </VCardText>
                    </VCard>
                    <div class="d-flex flex-wrap gap-2 mt-10">
                      <VBtn
                        color="primary"
                        @click="handleUpload(index)"
                      >
                        <VIcon
                          icon="tabler-cloud-upload"
                          class="d-sm-none"
                        />
                        <span class="d-none d-sm-block">Upload new Stage  photo</span>
                      </VBtn>

                      <input
                        :ref="refInputE12[index]"
                        type="file"
                        name="file"
                        accept=".jpeg,.png,.jpg,GIF"
                        hidden
                        @input="uploadNewStageImage($event, index)"
                      >
                    </div>
                    <p class="text-body-1 mb-0 mt-5">
                      <!-- <h6 class="d-flex me-2 mt-5  align-center font-weight-medium justify-sm-end text-xl mb-3"> -->
                      <span>
                        <VTextField
                          v-model="roadmap.alt"

                          label="alt text "

                          style="width: 20.9rem;"
                        />
                      </span>
                      <!-- </h6> -->
                    </p>
                  </VCol>
                </VRow>
              </VCardText>
            </VCardText>
            <VCardText>
              <VRow>
                <VCol cols="6">
                  <VBtn
                    prepend-icon="tabler-send"
                    class="me-3"

                    @click="addNewStage"
                  >
                    add New Stage
                  </VBtn>
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
          <VDivider />
        
          <VCardText>
            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="roadmap.seo.title"
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
                    v-model="roadmap.seo.author"

                    label="Seo author "

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>
            <VCardText>
              <label> SEO Keyword</label>
              <!--
                {{ roadmap.seo.keyword }}
                {{ tags }}
                roadmap.seo.keyword
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
                v-model="roadmap.seo.keyword"

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
                v-model="roadmap.seo.description"

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
                      :image="`https://prokoders.academy/${roadmap.seo.og_image}`"
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
