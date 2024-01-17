<script lang="ts" setup>

// Type: Invoice data
import Editor from '@tinymce/tinymce-vue'

import { VForm } from 'vuetify/components'
import type { featureData } from '@/views/apps/feature/types'
import { requiredValidator } from '@validators'
import { usefeatureStore } from '@/views/apps/feature/usefeatureStore'
import { useServiceStore } from '@/views/apps/service/useServiceStore'

// 👉 Store
const ServiceStore = useServiceStore()

// 👉 Default Blank Data
const feature = ref<featureData>({

  name: '',

  description: '',

  summary: '',
  icon: '',
  service_id: '',

  alt: '',
  image: '',
  seo: {
    title: '',
    author: '',
    description: '',
    keyword: '',
    og_image: 'img/deflate.jpg',
  },

})

const refInputE4 = ref<HTMLElement>()

const loading = ref(false)
const featureStore = usefeatureStore()
const refInputE1 = ref()
const Totalservices = ref([])

ServiceStore.fetchService(
  {
    page_size: 1000,
    page: 1,

  },
).then(response => {
  // .data)
  Totalservices.value = response.data.data

  // totalPage.value = response.data.data.last_page
  // totalservices.value = response.data.data.total
}).catch(error => {
  console.log(error)
})

const uploadFirstImage = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  featureStore.uploadImage(fd).then((response: any) => {
    loading.value = false
    feature.value.image = response.data.path_file
  })
}

const uploadSeoImage = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  featureStore.uploadImage(fd).then((response: any) => {
    loading.value = false
    feature.value.seo.og_image = response?.data.path_file
  })
}

const swal = inject('$swal')

const isFormValid = ref(false)
const refForm = ref<VForm>()

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
     
      loading.value = true
      featureStore.addfeature(feature.value).then(res => {
        swal({
          title: ' Added ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        nextTick(() => {
          loading.value = false
          refForm.value?.reset()
          refForm.value?.resetValidation()
          feature.value.language_id = 1
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
        <VCard>
          <!-- SECTION Header -->
          <!--  eslint-disable vue/no-mutating-props -->

          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <!-- 👉 Left Content -->

            <!-- 👉 Right Content -->
            <div class="mt-4 ma-sm-4">
              <!-- 👉 Invoice Id -->

              <div class="d-flex align-center mb-6">
                <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                  <span>
                    <VTextField
                      v-model="feature.name"
                      label="Name"
                      :rules="[requiredValidator]"

                      density="compact"
                      style="width: 15.9rem;"
                    />
                  </span>
                </h6>
                <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                  <span>

                    <VSelect
                      v-model="feature.service_id"
                      :items="Totalservices"
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

                <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                  <span>
                    <VTextField
                      v-model="feature.icon"
                      label="icon"

                      density="compact"
                      style="width: 15.9rem;"
                    />
                  </span>
                </h6>
              </div>
            </div>
          </VCardText>
          <VCardText>
            <VRow>
              <VCol cols="6">
                <VCard title="image ">
                  <VCardText>
                    <!-- 👉 Upload Photo -->
                    <VAvatar
                      rounded
                      :size="200"
                      class="me-6"
                      :image="`https://prokoders.academy/${feature.image}`"
                    />
                  </VCardText>
                </VCard>
                <div class="d-flex flex-wrap gap-2 mt-10">
                  <VBtn
                    color="primary"
                    @click="refInputE1?.click()"
                  >
                    <VIcon
                      icon="tabler-cloud-upload"
                      class="d-sm-none"
                    />
                    <span class="d-none d-sm-block">Upload image</span>
                  </VBtn>

                  <input
                    ref="refInputE1"
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
                      v-model="feature.alt"

                      label=" Image alt text "

                      style="width: 20.9rem;"
                    />
                  </span>
                  <!-- </h6> -->
                </p>
              </VCol>
            </VRow>
          </VCardText>
          <VCardText class="  ">
            <label> description</label>
            <Editor
              v-model="feature.description"

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
          <VCardText class="  ">
            <label> summary</label>

            <Editor
              v-model="feature.summary"

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
            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="feature.seo.title"
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
                    v-model="feature.seo.author"

                    label="Seo author "

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>
            <VCardText>
              <label> SEO Keyword</label>
              <!--
                {{ feature.seo.keyword }}
                {{ tags }}
                feature.seo.keyword
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
                v-model="feature.seo.keyword"

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
                v-model="feature.seo.description"

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
                      :image="`https://prokoders.academy/${feature.seo.og_image}`"
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
