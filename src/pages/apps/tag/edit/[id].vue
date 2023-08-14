<script lang="ts" setup>

// Type: Invoice data

import { VForm } from 'vuetify/components'
import Editor from '@tinymce/tinymce-vue'
import type { tagData } from '@/views/apps/tag/types'
import { usetagstore } from '@/views/apps/tag/usetagstore'
import { requiredValidator } from '@validators'

// 👉 Default Blank Data
const tag = ref<tagData>({
  name: '',
  slug: '',
  alt: '',
  image: 'img/deflate.jpg',
  seo: {
    title: '',
    author: '',
    description: '',
    keyword: '',
    og_image: 'img/deflate.jpg',
  },

  icon: '',

})

const route = useRoute()
const swal = inject('$swal')
const refInputE4 = ref<HTMLElement>()
const newsStore = usetagstore()

const loading = ref(false)

const uploadNewImage = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  newsStore.uploadImage(fd).then((response: any) => {
    loading.value = false
    tag.value.image = response?.data.path_file
  })
}

const refInputEl = ref<HTMLElement>()

const uploadSeoImage = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  newsStore.uploadImage(fd).then((response: any) => {
    loading.value = false
    tag.value.seo.og_image = response?.data.path_file
  })
}

const isFormValid = ref(false)
const router = useRouter()
const refForm = ref<VForm>()

newsStore.fetchtagById(Number(route.params.id)).then(response => {
  // .data)
  tag.value = response.data.data
})

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      loading.value = true
      newsStore.updatetag(tag.value).then(res => {
        swal({
          title: ' Updated ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        loading.value = false
        router.push('/apps/tag/list')
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
        cols="9"
        md="9"
      >
        <VCard title="Update Tag">
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <!-- 👉 Left Content -->

            <!-- 👉 Right Content -->
            <div class="d-flex mb-6">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="tag.name"
                    :rules="[requiredValidator]"
                    label="name "

                    style="width: 15.9rem;"
                  />
                </span>
              </h6>

              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="tag.icon"

                    label="Icon "

                    style="width: 15.9rem;"
                  />
                </span>
              </h6>
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="tag.slug"

                    label="Slug "

                    style="width: 15.9rem;"
                  />
                </span>
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
                      :image="`https://b2b.prokoders.space/${tag.image}`"
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
                      v-model="tag.alt"

                      label=" alt text "

                      style="width: 20.9rem;"
                    />
                  </span>
                  <!-- </h6> -->
                </p>
              </VCol>
            </VRow>
          </VCardText>
          <VCardText>
            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="tag.seo.title"
                    label="Seo Title "

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>

              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="tag.seo.author"

                    label="Seo author "

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>
            <VCardText>
              <label> SEO Keyword</label>
              <!--
                {{ tag.seo.keyword }}
                {{ tags }}
                tag.seo.keyword
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
                v-model="tag.seo.keyword"

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
                v-model="tag.seo.description"

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
                      :image="`https://b2b.prokoders.space/${tag.seo.og_image}`"
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
