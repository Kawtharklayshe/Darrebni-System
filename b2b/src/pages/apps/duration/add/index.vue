<script lang="ts" setup>
import { VForm } from 'vuetify/components'
import Editor from '@tinymce/tinymce-vue'
import type { durationData } from '@/views/apps/duration/types'
import { requiredValidator } from '@validators'
import { usedurationstore } from '@/views/apps/duration/usedurationstore'


const duration = ref<durationData>({
  title: '',
  number: null,

  number2: null,
  option: '',

})

const typeList = ref([{id:'!=',name:'!='}, {id:'>',name:'>'}, {id:'<',name:'<'}, {id:'=',name:'='}])

const swal = inject('$swal')
const durationStore = usedurationstore()


const isFormValid = ref(false)
const refForm = ref<VForm>()



const router = useRouter()
const loading = ref(false)

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
     
      loading.value = true
      durationStore.addduration(duration.value).then(res => {
        swal({
          title: ' Added ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        nextTick(() => {
          router.push('/apps/duration/list')
          loading.value = false

          duration.value.image = 'img/deflate.jpg'
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
        <VCard title="Add duration">
          <!-- duration Header -->

          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="duration.title"
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
                    v-model="duration.option"
                    :items="typeList"
                    :rules="[requiredValidator]"
                    item-title="name"
                    item-value="id"
                    label="Select Option"
                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>
            <div class="d-flex mb-6">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="duration.number"
                    label="Number "
                    :rules="[requiredValidator]"
                    type="number"
                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="duration.number2"
                    label="Number 2 "
                  type="number"

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
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
