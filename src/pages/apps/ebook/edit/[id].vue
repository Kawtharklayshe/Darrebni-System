<script lang="ts" setup>
// Type: Invoice data

import Editor from '@tinymce/tinymce-vue'
import { VForm } from 'vuetify/components'
import { useAuthorstore } from '@/views/apps/author/useAuthorstore'
import { useCategoriesEbookstore } from '@/views/apps/category-ebook/useCategoriesstore'
import { useCourseStore } from '@/views/apps/course/useCoursestore'
import type { ebookData } from '@/views/apps/ebook/types'
import { useEbookstore } from '@/views/apps/ebook/useEbookstore'
import { requiredValidator } from '@validators'

// 👉 Default Blank Data
const ebook = ref<ebookData>({
  name: '',
  description: '',

  slug: '',
  summary: '',

  status: '',

  level_id: null,

  image: 'img/deflate.jpg',

  file: '',

  author_id: null,

  ebook_category_id: null,

})

const swal = inject('$swal')
const courseStore = useCourseStore()
const ebookStore = useEbookstore()
const refInputEl = ref<HTMLElement>()

const categoryList = ref([])
const levelList = ref([])
const authorList = ref([])

const statusList = ref([
  { name: 'draft', id: 'draft' },
  { name: 'publish', id: 'publish' },
  { name: 'stopped', id: 'stopped' },
])

const isFormValid = ref(false)

const refForm = ref<VForm>()
const route = useRoute()
const categoriesstore = useCategoriesEbookstore()

const FetchCategory = () => {
  categoriesstore.fetchcategories(
    {
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

const authorStore = useAuthorstore()

const Fetchebook = () => {
  authorStore.fetchauthor(
    {
      page_size: 10000,
      page: 1,

    },
  ).then(response => {
    // )
    authorList.value = response.data.data
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
  ebookStore.uploadImage(fd).then((response: any) => {
    loading.value = false
    ebook.value.image = response?.data.path_file
  })
}

const uploadFile = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('file', file)
  fd.append('folder', 'other')
  courseStore.uploadFile(fd).then((response: any) => {
    loading.value = false
    ebook.value.file = response?.data
  })
}

ebookStore.fetchebookById(Number(route.params.id)).then(response => {
  // .data)
  ebook.value = response.data.data
})

watchEffect(() => {
  FetchCategory()
  Fetchebook()
})

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      loading.value = true
      ebookStore.updateebook(ebook.value).then(res => {
        swal({
          title: ' Updated ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        loading.value = false
        router.push('/apps/ebook/list')
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
        <VCard title="Update ebook">
          <!-- SECTION Header -->

          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="ebook.name"
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
                    v-model="ebook.slug"
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
                    v-model="ebook.status"
                    :items="statusList"
                    :rules="[requiredValidator]"
                    item-title="name"
                    item-value="id"
                    label="Select Status"
                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>

            <div class="d-flex mb-6">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="ebook.author_id"
                  :items="authorList"
                  :rules="[requiredValidator]"
                  label="Select Author"
                  item-title="name"
                  item-value="id"
                  style="width: 20.9rem;"
                />
              </h6>
            </div>
            <div class="d-flex mb-6  me-2">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="ebook.ebook_category_id"
                  :items="categoryList"
                  :rules="[requiredValidator]"
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
                  v-model="ebook.level_id"
                  :items="levelList"

                  item-title="name"
                  item-value="id"
                  label="Select Level"
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
              <a
                target="_blank"
                :href="`https://b2b.prokoders.space/${ebook.file}`"
              >click to show file</a>
            </div>
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
                      class="me-6"
                      :image="`https://b2b.prokoders.space/${ebook.image}`"
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
              </VCol>
            </VRow>
          </VCardText>

          <VDivider />
          <VCardText>
            <label> description</label>
            <Editor
              v-model="ebook.description"

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
              v-model="ebook.summary"

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
