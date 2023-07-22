<script lang="ts" setup>
import Editor from '@tinymce/tinymce-vue'
import { VForm } from 'vuetify/components'
import { useCourseStore } from '@/views/apps/course/useCoursestore'
import type { partnerData } from '@/views/apps/partner/types'
import { usepartnerstore } from '@/views/apps/partner/usepartnerstore'
import { requiredValidator } from '@validators'

// 👉 Default Blank Data

const coursestore = useCourseStore()

const partner = ref<partnerData>({
  name: '',


  alt: '',

  image: 'img/deflate.jpg',
 
})


const swal = inject('$swal')
const partnerStore = usepartnerstore()
const refInputEl = ref<HTMLElement>()


const isFormValid = ref(false)
const refForm = ref<VForm>()





// uploadFirstImage function
const loading = ref(false)

const uploadNewImage = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  coursestore.uploadImage(fd).then((response: any) => {
       loading.value = false
    partner.value.image = response?.data.path_file
  })
}


const router = useRouter()


const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      console.log('partner', partner)
      loading.value = true
      partnerStore.addpartner(partner.value).then(res => {
        swal({
          title: ' Added ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        nextTick(() => {
          router.push('/apps/partner/list')
          loading.value = false

          partner.value.image = 'img/deflate.jpg'
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
        <VCard title="Add partner">
          <!-- SECTION Header -->

          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="partner.name"
                    label="Name "
                    :rules="[requiredValidator]"

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>

          

         
              <VRow>
                <VCol cols="6">
                  <VCard title=" image ">
                    <VCardText>
                      <!-- 👉 Upload Photo -->
                      <VAvatar
                        rounded
                        :size="200"
                        class="me-6"
                        :image="`https://b2b.prokoders.space/${partner.image}`"
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
                        v-model="partner.alt"
                    
                        label=" alt text "

                        style="width: 20.9rem;"
                      />
                    </span>
                    <!-- </h6> -->
                  </p>
                </VCol>
                
              </VRow>
              <!-- 👉 title_support_email -->
        
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
