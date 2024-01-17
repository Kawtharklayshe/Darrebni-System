<script setup lang="ts">
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { VForm } from 'vuetify/components'
import { useCourseStore } from '@/views/apps/course/useCoursestore'
import type { UserProperties } from '@/@fake-db/types'
import { emailValidator, passwordValidator, requiredValidator } from '@validators'

interface Emit {
  (e: 'update:isDrawerOpen', value: boolean): void
  (e: 'userData', value: UserProperties): void
}

interface Props {
  isDrawerOpen: boolean
}
const props = defineProps<Props>()

const emit = defineEmits<Emit>()

const courseStore = useCourseStore()

const refInputEl = ref<HTMLElement>()
const isFormValid = ref(false)
const refForm = ref<VForm>()
const first_name = ref('')
const last_name = ref('')
const alt = ref('')
const type = ref('')
const email = ref('')
const password = ref('')
const photo = ref('@images/avatars/avatar-14.png')
const photoTest = ref('@images/avatars/avatar-14.png')

// changeAvatar function
const changeAvatar = (i: Event) => {
  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)
  fd.append('folder', 'other')
  courseStore.uploadImage(fd).then((response: any) => {

    photo.value = response.data.path_file
  })
}

const typeList = ref([
  { name: 'super admin', id: 'super_admin' },
  { name: 'trainer', id: 'trainer' },
  { name: 'user', id: 'user' },
])

// reset avatar image
const resetAvatar = () => {
  photo.value = '@images/avatars/avatar-14.png'
}

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)

  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      emit('userData', {
        id: 0,
        first_name: first_name.value,
        last_name: last_name.value,
        phone_number: password.value,
        image: photoTest.value,
        email: email.value,
        alt: alt.value,
        type: type.value,
        password: password.value,
      })
      emit('update:isDrawerOpen', false)
      nextTick(() => {
        photo.value = '@images/avatars/avatar-14.png'
        refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
  })
}

const handleDrawerModelValueUpdate = (val: boolean) => {
  emit('update:isDrawerOpen', val)
}
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="400"
    location="end"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- 👉 Title -->
    <div class="d-flex align-center pa-6 pb-1">
      <h6 class="text-h6">
        Add User
      </h6>

      <VSpacer />

      <!-- 👉 Close btn -->
      <VBtn
        variant="tonal"
        color="default"
        icon
        size="32"
        class="rounded"
        @click="closeNavigationDrawer"
      >
        <VIcon
          size="18"
          icon="tabler-x"
        />
      </VBTn>
    </div>

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <VCol cols="12">
                <VCard title="Photo ">
                  <VCardText class="d-flex ">
                    <!-- 👉 Upload Photo -->
                    <VAvatar
                      rounded
                      :size="150"
                      class="me-6"
                      :image="`https://prokoders.academy/${photo}`"
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
                    @input="changeAvatar"
                  >

                  <VBtn
                    type="reset"
                    color="secondary"
                    variant="tonal"
                    @click="resetAvatar"
                  >
                    <span class="d-none d-sm-block">Reset</span>
                    <VIcon
                      icon="tabler-refresh"
                      class="d-sm-none"
                    />
                  </VBtn>
                </div>

                <!--
                  <p class="text-body-1 mb-0 mt-5">

                  <span>
                  <VTextField
                  v-model="alt"
                  :rules="[requiredValidator]"
                  label=" Image alt text "

                  style="width: 20.9rem;"
                  />
                  </span>

                  </p>
                -->
              </VCol>
            </VRow>
            <VRow>
              <!-- 👉 Full name -->
              <VCol cols="12">
                <VTextField
                  v-model="first_name"
                  :rules="[requiredValidator]"
                  label="Last Name"
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="last_name"
                  :rules="[requiredValidator]"
                  label="Last Name"
                />
              </VCol>
              <VCol cols="12">
                <VSelect
                  v-model="type"
                  :items="typeList"
                  :rules="[requiredValidator]"
                  item-title="name"
                  item-value="id"
                  label="Select Type"
                />
              </VCol>
              <!-- 👉 Email -->
              <VCol cols="12">
                <VTextField
                  v-model="email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                />
              </VCol>

              <!-- 👉 password -->
              <VCol cols="12">
                <VTextField
                  v-model="password"
                  :rules="[requiredValidator, passwordValidator]"
                  label="password"
                />
              </VCol>

              <!-- 👉 Submit and Cancel -->
              <VCol cols="12">
                <VBtn
                  type="submit"
                  class="me-3"
                >
                  Submit
                </VBtn>
                <VBtn
                  type="reset"
                  variant="tonal"
                  color="secondary"
                  @click="closeNavigationDrawer"
                >
                  Cancel
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
