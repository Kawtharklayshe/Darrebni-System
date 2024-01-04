<script lang="ts" setup>

// Type: categoriesData
import { VForm } from 'vuetify/components'
import TinycmeEditor from '@/@core/components/tinymce.vue'
import { useRoadmapstore } from '@/views/apps/roadmap/useRoadmapstore'
import { requiredValidator } from '@validators'
import { useCourseStore } from '@/views/apps/course/useCoursestore'
import { useRoadmapstoreModule } from '@/views/apps/roadmapmodule/useRoadmapstoreModule'

// 👉 Default Blank Data
const categories = ref({

  name: '',

  image: 'img/deflate.jpg',
  slug: '',
  description: '',
  detail: '',
  order: '',
  roadmap_id: null,

})

const swal = inject('$swal')
const categoriesStore = useRoadmapstore()
const isFormValid = ref(false)
const refForm = ref<VForm>()
const refInputEl = ref<HTMLElement>()
const loading = ref(false)
const router = useRouter()
const courseStore = useCourseStore()

const RoadmapList = ref([])

const roadmapStore = useRoadmapstoreModule()

const FetchRoadmap = () => {
  roadmapStore.fetchroadmap(
    {
      page_size: 10000,
      page: 1,

    },
  ).then(response => {
    RoadmapList.value = response.data.data
  }).catch(error => {
    console.log(error)
  })
}

// 👉 Fetch categoriess
watchEffect(() => {
  FetchRoadmap()
})

const uploadNewImage = (i: any) => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  courseStore.uploadImage(fd).then((response: any) => {
    loading.value = false
    categories.value.image = response?.data.path_file
  })
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      loading.value = true
      categoriesStore.addcategories(categories.value).then(res => {
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
          router.push('/apps/category-blog/list')
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
        <VCard title="Add Stage">
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <!-- 👉 Left Content -->

            <!-- 👉 Right Content -->
            <div class="d-flex mb-6">
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="categories.name"
                    :rules="[requiredValidator]"
                    label="name "

                    style="width: 15.9rem;"
                  />
                </span>
              </h6>

              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="categories.slug"
                    :rules="[requiredValidator]"
                    label="slug "

                    style="width: 15.9rem;"
                  />
                </span>
              </h6>

              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <span>
                  <VTextField
                    v-model="categories.order"
                    :rules="[requiredValidator]"
                    label="order "

                    style="width: 15.9rem;"
                  />
                </span>
              </h6>
              <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
                <VSelect
                  v-model="roadmap.roadmap_id"
                  :items="RoadmapList"
                  :rules="[requiredValidator]"
                  item-title="name"
                  item-value="id"
                  label="Select Roadmap"
                  style="width: 20.9rem;"
                />
              </h6>
            </div>
          </VCardText>
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <VCol cols="6">
              <VCard title=" image ">
                <VCardText>
                  <!-- 👉 Upload Photo -->
                  <VAvatar
                    rounded
                    :size="200"
                    class="me-6"
                    :image="`https://prokoders.academy/${categories.image}`"
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
          </VCardText>
          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <VCol cols="12">
              <TinycmeEditor
                v-model="categories.description"
                style="width: 40.9rem; height: 400px !important;"
                :init="{
                  toolbar: ' undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat  | charmap emoticons | fullscreen  preview save print | insertfile image code media template link anchor  | ltr rtl',
                  toolbar_sticky: true,

                  autosave_ask_before_unload: true,
                  autosave_interval: '30s',
                  autosave_prefix: '{path}{query}-{id}-',
                  autosave_restore_when_empty: false,
                  autosave_retention: '2m',

                  plugins: '    media table   preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template  table charmap  anchor  advlist lists  help charmap quickbars emoticons',
                }"
              />
            </VCol>
          </VCardText>

          <VCardText class="d-flex flex-wrap  flex-column flex-sm-row">
            <VCol cols="12">
              <label> detail</label>
              <TinycmeEditor
                v-model="categories.detail"
                style="width: 40.9rem; height: 400px !important;"
                :init="{
                  toolbar: ' undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat  | charmap emoticons | fullscreen  preview save print | insertfile image code media template link anchor  | ltr rtl',
                  toolbar_sticky: true,

                  autosave_ask_before_unload: true,
                  autosave_interval: '30s',
                  autosave_prefix: '{path}{query}-{id}-',
                  autosave_restore_when_empty: false,
                  autosave_retention: '2m',

                  plugins: '    media table   preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template  table charmap  anchor  advlist lists  help charmap quickbars emoticons',
                }"
              />
            </VCol>
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
