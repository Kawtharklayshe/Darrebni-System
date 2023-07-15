<script lang="ts" setup>

// Type: Invoice data

import { VForm } from 'vuetify/components'
import type { settingData } from '@/views/apps/setting/types'
import { requiredValidator } from '@validators'
import { usesettingstore } from '@/views/apps/setting/usesettingstore'


import { useCourseStore } from '@/views/apps/course/useCoursestore'
import Editor from '@tinymce/tinymce-vue'

// 👉 Default Blank Data
const setting = ref<settingData>({
  title: '',
  date: '',

  body: '',
  type: '',
})


const uploadNewImage = (i: any) => {
  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  authorStore.uploadImage(fd).then((response: any) => {
    console.log('res', response?.data.path_file)
    // author.value.image = response?.data.path_file
  })
}


const swal = inject('$swal')
const courseStore = useCourseStore()

const refInputEl = ref<HTMLElement>()

const isFormValid = ref(false)

const refForm = ref<VForm>()
const route = useRoute()
const settingstore = usesettingstore()

const typeList = ref([])

settingstore.fetchTypes(
    {
      page_size: 10000,
      page: 1,

    },
  ).then(response => {
    console.log(response.data)
    typeList.value = response.data.data
  }).catch(error => {
    console.log(error)
  })


settingstore.fetchsettingById(route.params.id).then(response => {
  console.log(response.data.data)
  setting.value = response.data.data
})


const loading = ref(false)

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      loading.value = true
      settingstore.updatesetting(setting.value).then(res => {
        swal({
          title: ' Updated ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        loading.value = false
        router.push('/apps/setting/list')
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
      <VCard title="Update setting">
          <!-- setting Header -->

          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="setting.title"
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
                  
                  <VSelect
                  v-model="setting.type"
                  :items="typeList"
                  :rules="[requiredValidator]"
                  item-title="name"
                  item-value="id"
                  label="Select Type"
                  style="width: 20.9rem;"
                />
                </span>
              </h6>
            </div>
            <div class="d-flex mb-6">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>

                  <AppDateTimePicker
                  v-model="setting.date"
                    label=" Date"
                    :rules="[requiredValidator]"

                    :config=" { enableTime: true, dateFormat: 'Y-m-d H:i'}"
                    style="width: 20rem;"
                    ok-text="OK"
                  />
                </span>
              </h6>
            </div>

            
          </VCardText>
    

          <VDivider />
          <VCardText>
            <label> body</label>
            <Editor
              v-model="setting.body"

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
