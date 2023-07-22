<script lang="ts" setup>
import { VForm } from 'vuetify/components'
import type { trainerData } from '@/views/apps/trainer/types'
import { emailValidator, passwordValidator, requiredValidator } from '@validators'
import { usetrainerstore } from '@/views/apps/trainer/usetrainerstore'

import { useCourseStore } from '@/views/apps/course/useCoursestore'

// 👉 Default Blank Data

const courseStore = useCourseStore()

const trainer = ref<trainerData>({
  certificate: '',
  date_of_barth: '',

  gender: '',
  languages: '',

  cv: '',

  first_name: '',

  phone_number: '',

  email: '',

  password: '',

  image: 'img/deflate.jpg',

  last_name: '',

})

const GenderList = ref([{ name: 'Male', id: 'male' }, { name: 'Female', id: 'female' }])

const uploadFile = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('file', file)
  fd.append('folder', 'other')
  courseStore.uploadFile(fd).then((response: any) => {
    loading.value = false
    trainer.value.cv = response?.data
  })
}

const swal = inject('$swal')
const trainerStore = usetrainerstore()
const refInputEl = ref<HTMLElement>()

const isFormValid = ref(false)
const refForm = ref<VForm>()
  const loading = ref(false)

// uploadFirstImage function

const uploadNewImage = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  trainerStore.uploadImage(fd).then((response: any) => {
        loading.value = false
    trainer.value.image = response?.data.path_file
  })
}

const router = useRouter()

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      console.log('trainer', trainer)
      loading.value = true
      trainerStore.addtrainer(trainer.value).then(res => {
        swal({
          title: ' Added ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        nextTick(() => {
          router.push('/apps/trainer/list')
          loading.value = false

          trainer.value.image = 'img/deflate.jpg'
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
        <VCard title="Add trainer">
          <!-- trainer Header -->

          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="trainer.first_name"
                    label="First Name "
                    :rules="[requiredValidator]"

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>

            <div class="d-flex mb-6  ">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="trainer.last_name"
                    :rules="[requiredValidator]"
                    label="Last Name "

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>
           
            <div class="d-flex mb-6 ">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="trainer.gender"
                  :items="GenderList"
                  :rules="[requiredValidator]"
                  item-title="name"
                  item-value="id"
                  label="Select Gender"
                  style="width: 20.9rem;"
                />
              </h6>
            </div>
            <div class="d-flex mb-6">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VTextField
                  v-model="trainer.certificate"
                  :rules="[requiredValidator]"
                  label="Certificate"

                  style="width: 20.9rem;"
                />
              </h6>
            </div>

            <div class="d-flex  mb-date">
              <!-- <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3"> -->

              <AppDateTimePicker
                v-model="trainer.date_of_barth"
                label="Date of Birthday"
                :rules="[requiredValidator]"

                :config=" { enableTime: true, dateFormat: 'Y-m-d' }"
                style="width: 20.9rem;"
                ok-text="OK"
              />

              <!-- </h6> -->
            </div>
            
            <div class="d-flex mb-6">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VTextField
                  v-model="trainer.email"
                  :rules="[emailValidator, requiredValidator]"
                  label="Email "

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
                      :image="`https://b2b.prokoders.space/${trainer.image}`"
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
            <div class="d-flex align-center mb-6">
              <VTextField
                label="CV"
                type="file"
                style="width: 20.9rem;"

                @input="uploadFile"
              />
            </div>
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

<style>
.mb-date {
    margin-bottom: 62px !important;
}
</style>
