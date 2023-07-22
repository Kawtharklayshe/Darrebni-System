<script lang="ts" setup>
import { VForm } from 'vuetify/components'
import type { authorData } from '@/views/apps/author/types'
import { requiredValidator } from '@validators'
import { useAuthorstore } from '@/views/apps/author/useAuthorstore'
import Editor from '@tinymce/tinymce-vue'


const author = ref<authorData>({
  name: '',
  description: '',

  summary: '',
 
  image: 'img/deflate.jpg',
  

})

const swal = inject('$swal')
const authorStore = useAuthorstore()
const refInputEl = ref<HTMLElement>()

const isFormValid = ref(false)
const refForm = ref<VForm>()
  const loading = ref(false)


const uploadNewImage = (i: any) => {

  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  authorStore.uploadImage(fd).then((response: any) => {
   loading.value = false
    author.value.image = response?.data.path_file
  })
}



const router = useRouter()


const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      console.log('author', author)
      loading.value = true
      authorStore.addauthor(author.value).then(res => {
        swal({
          title: ' Added ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        nextTick(() => {
          router.push('/apps/author/list')
          loading.value = false
        
          author.value.image = 'img/deflate.jpg'
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
        <VCard title="Add author">
          <!-- SECTION Header -->

          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <div class="d-flex  mb-6">
              <h6 class="d-flex me-2 align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="author.name"
                    label="Name "
                    :rules="[requiredValidator]"

                    style="width: 20.9rem;"
                  />
                </span>
              </h6>
            </div>

</VCardText>
<VCardText>
     
              <VRow>
             
                <VCol cols="4">
                  <VCard title=" image ">
                    <VCardText>
                      <!-- 👉 Upload Photo -->
                      <VAvatar
                        rounded
                        :size="200"
                        class="me-6"
                        :image="`https://b2b.prokoders.space/${author.image}`"
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
          <VCardText >
            <label> description</label>
                  <Editor
                    v-model="author.description"
                   
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
      
          <VCardText >
           
            <label> summary</label>
                  <Editor
                    v-model="author.summary"
                   
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
