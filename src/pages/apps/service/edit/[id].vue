<script lang="ts" setup>

// Type: Invoice data

import { VForm } from 'vuetify/components'
import type { ServiceData } from '@/views/apps/service/types'
import { useServiceStore } from '@/views/apps/service/useServiceStore'
import { requiredValidator } from '@validators'

// 👉 Default Blank Data
const Service = ref<ServiceData>({

  name: '',

description: '',

summary: '',
icon: '',
slug: '',
btn: '',
alt: '',
image: '',

})

const route = useRoute()
const swal = inject('$swal')

const ServiceStore = useServiceStore()
const isFormValid = ref(false)
const refForm = ref<VForm>()

const LanguagesList = ref([])
const photo = ref('@images/avatars/avatar-14.png')
const refInputEl = ref<HTMLElement>()

ServiceStore.fetchServiceById(Number(route.params.id)).then(response => {
  // .data)
  Service.value = response.data.data
})

const loading = ref(false)

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      loading.value = true

      ServiceStore.updateService(Service.value).then(res => {
        swal({
          title: ' Updated ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        loading.value = false
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

                <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                  <span>
                    <VTextField
                      v-model="Service.slug"
                      label="slug"
                      :rules="[requiredValidator]"

                      density="compact"
                      style="width: 15.9rem;"
                    />
                  </span>
                </h6>

                <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                  <span>
                    <VTextField
                      v-model="Service.btn"
                      label="btn"
                    

                      density="compact"
                      style="width: 15.9rem;"
                    />
                  </span>
                </h6>
                <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                  <span>
                    <VTextField
                      v-model="Service.icon"
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
                        :image="`https://b2b.prokoders.space/${Service.image}`"
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
                        v-model="Service.alt"

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
