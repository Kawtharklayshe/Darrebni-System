<script lang="ts" setup>
// Type: Invoice data
import Editor from '@tinymce/tinymce-vue'

import { VForm } from 'vuetify/components'
import type { ServiceData } from '@/views/apps/service/types'
import { requiredValidator } from '@validators'
import { useServiceStore } from '@/views/apps/service/useServiceStore'

// 👉 Default Blank Data
const Service = ref<ServiceData>({

  name: '',

  description: '',

  summary: '',
  icon: '',

})


const loading = ref(false)
const ServiceStore = useServiceStore()
const refInputE1=ref()

const uploadFirstImage = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  ServiceStore.uploadImage(fd).then((response: any) => {
    loading.value = false
    Service.value.icon = response.data.path_file
  })
}



const swal = inject('$swal')


const isFormValid = ref(false)
const refForm = ref<VForm>()



const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      console.log('Service', Service)
      loading.value = true
      ServiceStore.addService(Service.value).then(res => {
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
          Service.value.language_id = 1
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
                      v-model="Service.name"
                      label="Name"
                      :rules="[requiredValidator]"

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
                  <VCard title="Icon ">
                    <VCardText>
                      <!-- 👉 Upload Photo -->
                      <VAvatar
                        rounded
                        :size="200"
                        class="me-6"
                        :image="`https://b2b.prokoders.space/${Service.icon}`"
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
                      <span class="d-none d-sm-block">Upload Icon</span>
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

                
                </VCol>
               
              </VRow>
          </VCardText>
          <VCardText class="  ">
            <label> description</label>
            <Editor
              v-model="Service.description"

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
              v-model="Service.summary"

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
