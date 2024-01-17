<script lang="ts" setup>
import { VForm } from 'vuetify/components'
import type { adsData } from '@/views/apps/ads/types'
import { useadsstore } from '@/views/apps/ads/useadsstore'
import { dateRangeValidator, requiredValidator } from '@validators'

// 👉 Default Blank Data

const ads = ref<adsData>({

  video: '',
  url: '',
  alt: '',
  image: 'img/deflate.jpg',

  end_date: '',
  start_date: '',

})

const maxDateAllowed = computed(() => {
  return ads.value.end_date
})

const refInputE3 = ref<HTMLElement>()
const adsStore = useadsstore()

const swal = inject('$swal')

const refInputEl = ref<HTMLElement>()

const isFormValid = ref(false)
const refForm = ref<VForm>()

const statusList = ref([
  { name: 'publish', id: 'publish' },
  { name: 'hide', id: 'hide' },
  { name: 'draft', id: 'draft' },
])

// uploadFirstImage function
const loading = ref(false)

const refInputE4 = ref<HTMLElement>()

const uploadNewImage = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  adsStore.uploadImage(fd).then((response: any) => {
    loading.value = false
    ads.value.image = response?.data.path_file
  })
}

const uploadVideo = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('video', file)
  fd.append('folder', 'other')
  adsStore.uploadVideo(fd).then((response: any) => {
    loading.value = false
    ads.value.video = response?.data.path_file
  })
}

const uploadSeoImage = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  adsStore.uploadImage(fd).then((response: any) => {
    loading.value = false
    ads.value.seo.og_image = response?.data.path_file
  })
}

const uploadFile = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('file', file)
  fd.append('folder', 'course')
  adsStore.uploadFile(fd).then((response: any) => {
    loading.value = false
    ads.value.file = response?.data
  })
}

const router = useRouter()

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {

      loading.value = true
      adsStore.addads(ads.value).then(res => {
        swal({
          title: ' Added ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        nextTick(() => {
          router.push('/apps/ads/list')
          loading.value = false

          ads.value.image = 'img/deflate.jpg'
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
        <VCard title="Add ads">
          <!-- SECTION Header -->

          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="ads.url"
                    label="URL "
                    :rules="[requiredValidator]"

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>
          </VCardText>
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <!-- 👉 Left Content -->

            <!-- 👉 Right Content -->

            <!-- 👉 Invoice Id -->

            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <AppDateTimePicker
                    v-model="ads.start_date"
                    label="Start Date"
                    :rules="[requiredValidator, () => dateRangeValidator(ads.start_date, ads.end_date)]"

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
                    v-model="ads.end_date"
                    :min="ads.start_date"
                    :rules="[requiredValidator]"
                    label="End Date"
                    :config=" { enableTime: true, dateFormat: 'Y-m-d H:i', minDate: maxDateAllowed }"
                    style="width: 20rem;"
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
                      :image="`https://prokoders.academy/${ads.image}`"
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
                      v-model="ads.alt"

                      label=" alt text "

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

                      :src="`https://prokoders.academy/${ads.video}`"
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
