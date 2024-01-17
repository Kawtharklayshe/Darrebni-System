<script lang="ts" setup>
// Type: Invoice data

import Editor from '@tinymce/tinymce-vue'
import { VForm } from 'vuetify/components'
import { useinfostore } from '@/views/apps/info/useinfostore'
import { emailValidator, requiredValidator } from '@validators'

// 👉 Default Blank Data
const info = ref<any>({
  name: '',
  slogan: '',
  logo_dark: '',
  big_logo_dark: '',
  phone: '',
  phone2: '',
  icon: '',
  sign_in: '',
  email: '',
  sync_slug: '',
  sync_link: '',
  address: '',

  logo: 'img/deflate.jpg',

})

const swal = inject('$swal')

const infoStore = useinfostore()
const refInputEl = ref<HTMLElement>()

const isFormValid = ref(false)

const refForm = ref<VForm>()
const route = useRoute()

const refInputE2 = ref<HTMLElement>()
const refInputEBD = ref<HTMLElement>()
const refInputED = ref<HTMLElement>()
const refInputEI = ref<HTMLElement>()

const loading = ref(false)

const uploadFirstImage = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  infoStore.uploadImage(fd).then((response: any) => {
    loading.value = false
    info.value.big_logo = response.data.path_file
  })
}

const uploadIcon = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  infoStore.uploadImage(fd).then((response: any) => {
    loading.value = false
    info.value.icon = response.data.path_file
  })
}

const uploadBigLogoDark = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  infoStore.uploadImage(fd).then((response: any) => {
    loading.value = false
    info.value.big_logo_dark = response.data.path_file
  })
}

const uploadLogoDark = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  infoStore.uploadImage(fd).then((response: any) => {
    loading.value = false
    info.value.logo_dark = response.data.path_file
  })
}

const uploadNewImage = (i: any) => {
  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  infoStore.uploadImage(fd).then((response: any) => {
  
    info.value.logo = response?.data.path_file
  })
}

infoStore.fetchinfoById(Number(route.params.id)).then(response => {
  // )
  info.value = response.data
})

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      loading.value = true
      infoStore.updateinfo(info.value).then(res => {
        swal({
          title: ' Updated ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        loading.value = false
        router.push('/apps/info/list')
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
        <VCard title="Update info">
          <!-- info Header -->

          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="info.name"
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
                    v-model="info.slogan"
                    :rules="[requiredValidator]"
                    label="slogan "

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>
            <div class="d-flex mb-6">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>

                  <VTextField
                    v-model="info.phone"
                    :rules="[requiredValidator]"
                    label="phone "

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>
            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="info.sync_slug"
                    label="sync Slug "
                    :rules="[requiredValidator]"

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>
            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="info.sync_link"
                    label="sync Link "
                    :rules="[requiredValidator]"

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>

            <div class="d-flex mb-6">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VTextField
                  v-model="info.phone2"
                  :rules="[requiredValidator]"
                  label="phone 2  "

                  style="width: 20.9rem;"
                />
              </h6>
            </div>
            <div class="d-flex mb-6">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VTextField
                  v-model="info.email"
                  :rules="[emailValidator, requiredValidator]"
                  label="Email "

                  style="width: 20.9rem;"
                />
              </h6>
            </div>

            <div class="d-flex mb-6">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VTextField
                  v-model="info.sign_in"
                  :rules="[requiredValidator]"
                  label="Sign In "

                  style="width: 20.9rem;"
                />
              </h6>
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
                      :image="`https://prokoders.academy/${info.logo}`"
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
                      v-model="info.alt"

                      label="alt text "

                      style="width: 20.9rem;"
                    />
                  </span>
                  <!-- </h6> -->
                </p>
              </VCol>
              <VCol cols="6">
                <VCard title="Cover Big Logo ">
                  <VCardText>
                    <!-- 👉 Upload Photo -->
                    <VAvatar
                      rounded
                      :size="200"
                      class="me-6"
                      :image="`https://prokoders.academy/${info.big_logo}`"
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
                    <span class="d-none d-sm-block">Upload Big Logo</span>
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
                      v-model="info.alt_big_logo"

                      label="Big Logo alt text "

                      style="width: 20.9rem;"
                    />
                  </span>
                  <!-- </h6> -->
                </p>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="6">
                <VCard title=" Logo Dark ">
                  <VCardText>
                    <!-- 👉 Upload Photo -->
                    <VAvatar
                      rounded
                      :size="200"
                      class="me-6"
                      :image="`https://prokoders.academy/${info.logo_dark}`"
                    />
                  </VCardText>
                </VCard>
                <VCard
                  title="  ICON "
                  class="mt-10"
                >
                  <VCardText>
                    <!-- 👉 Upload Photo -->
                    <VAvatar
                      rounded
                      :size="200"
                      class="me-6 mt-5"
                      :image="`https://prokoders.academy/${info.icon}`"
                    />
                  </VCardText>
                </VCard>
                <div class="d-flex flex-wrap gap-2 mt-10">
                  <VBtn
                    color="primary"
                    @click="refInputEI?.click()"
                  >
                    <VIcon
                      icon="tabler-cloud-upload"
                      class="d-sm-none"
                    />
                    <span class="d-none d-sm-block">Upload Icon</span>
                  </VBtn>

                  <input
                    ref="refInputEI"
                    type="file"
                    name="file"
                    accept=".jpeg,.png,.jpg,GIF"
                    hidden
                    @input="uploadIcon"
                  >
                </div>
                <p class="text-body-1 mb-0 mt-5">
                  <!-- <h6 class="d-flex me-2 mt-5  align-center font-weight-medium justify-sm-end text-xl mb-3"> -->

                  <!-- </h6> -->
                </p>
              </VCol>
              <VCol cols="6">
                <VCard title="Cover Big Logo Dark ">
                  <VCardText>
                    <!-- 👉 Upload Photo -->
                    <VAvatar
                      rounded
                      :size="200"
                      class="me-6"
                      :image="`https://prokoders.academy/${info.big_logo_dark}`"
                    />
                  </VCardText>
                </VCard>
                <div class="d-flex flex-wrap gap-2 mt-10">
                  <VBtn
                    color="primary"
                    @click="refInputEBD?.click()"
                  >
                    <VIcon
                      icon="tabler-cloud-upload"
                      class="d-sm-none"
                    />
                    <span class="d-none d-sm-block">Upload Big Logo Dark</span>
                  </VBtn>

                  <input
                    ref="refInputEBD"
                    type="file"
                    name="file"
                    accept=".jpeg,.png,.jpg,GIF"
                    hidden
                    @input="uploadBigLogoDark"
                  >
                </div>

                <p class="text-body-1 mb-0 mt-5">
                  <!-- <h6 class="d-flex me-2 mt-5  align-center font-weight-medium justify-sm-end text-xl mb-3"> -->
                  <!--
                    <span>
                    <VTextField
                    v-model="info.alt_big_logo"

                    label="Big Logo alt text "

                    style="width: 20.9rem;"
                    />
                  -->
                  <!-- </span> -->
                  <!-- </h6> -->
                </p>
              </VCol>
            </VRow>
          </VCardText>

          <VDivider />
          <VCardText>
            <label> Address</label>
            <Editor
              v-model="info.address"

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
