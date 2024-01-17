<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vue/no-mutating-props -->
<script setup lang="ts">
import { VForm } from 'vuetify/components'
import { emailValidator, requiredValidator } from '@validators'
import { useUserListStore } from '@/views/apps/user/useUserListStore'
import { useCourseStore } from '@/views/apps/course/useCoursestore'

interface Props {
  userData: {
    id?: number
    first_name: string

    last_name: string
    role?: string
    password: string
    email: string
    phone_number: string
    image: string
    type: string
    alt: string

  }
}
const props = defineProps<Props>()

const courseStore = useCourseStore()

const swal = inject('$swal')

// 👉 Store
const userListStore = useUserListStore()

const typeList = ref([
  { name: 'super admin', id: 'super_admin' },
  { name: 'trainer', id: 'trainer' },
  { name: 'user', id: 'user' },
])

const isFormValid = ref(false)
const refForm = ref<VForm>()
const refInputEl = ref<HTMLElement>()

const photo = ref('@images/avatars/avatar-14.png')

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

// reset avatar image
const resetAvatar = () => {
  photo.value = '@images/avatars/avatar-14.png'
}

// 👉 Status variant resolver
const resolveUserStatusVariant = (stat: string) => {
  if (stat === 'pending')
    return 'warning'
  if (stat === 'active')
    return 'success'
  if (stat === 'inactive')
    return 'secondary'

  return 'primary'
}

const loading = ref(false)

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      loading.value = true
      userListStore.UpdateUser(props.userData).then(res => {
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

// 👉 Role variant resolver
const resolveUserRoleVariant = (role: string) => {
  if (role === 'subscriber')
    return { color: 'warning', icon: 'tabler-user' }
  if (role === 'author')
    return { color: 'success', icon: 'tabler-circle-check' }
  if (role === 'maintainer')
    return { color: 'primary', icon: 'tabler-chart-pie-2' }
  if (role === 'editor')
    return { color: 'info', icon: 'tabler-pencil' }
  if (role === 'admin')
    return { color: 'secondary', icon: 'tabler-server-2' }

  return { color: 'primary', icon: 'tabler-user' }
}
</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VForm
        ref="refForm"
        v-model="isFormValid"
        @submit.prevent="onSubmit"
      >
        <VCard v-if="props.userData">
          <VCardText>
            <!-- 👉 Avatar -->

            <VCard title=" ">
              <VCardText>
                <!-- 👉 Upload Photo -->
                <VAvatar
                  rounded
                  :size="150"

                  class="me-6"
                  :image="`https://prokoders.academy/${userData.image}`"
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

            <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
            <!-- 👉 User name -->
            <h6 class="text-h6 mt-4">
              {{ props.userData.first_name }}
            </h6>
          </VCardText>

          <VCardText class="d-flex justify-center flex-wrap mt-3">
            <!-- 👉 Done task -->
            <div class="d-flex align-center me-8 mb-2">
              <VAvatar
                :size="38"
                rounded
                color="primary"
                variant="tonal"
                class="me-3"
              >
                <VIcon
                  size="24"
                  icon="tabler-checkbox"
                />
              </VAvatar>
            </div>

            <!-- 👉 Done Project -->
            <div class="d-flex align-center me-4 mb-2">
              <VAvatar
                :size="38"
                rounded
                color="primary"
                variant="tonal"
                class="me-3"
              >
                <VIcon
                  size="24"
                  icon="tabler-briefcase"
                />
              </VAvatar>
            </div>
          </VCardText>

          <VDivider />

          <!-- 👉 Details -->
          <VCardText>
            <p class="text-sm text-uppercase text-disabled">
              Details
            </p>

            <!-- 👉 User Details list -->
            <VList class="card-list mt-5">
              <VListItem>
                <VListItemTitle>
                  <h6 class="text-base font-weight-semibold mt-5">
                    <VTextField
                      v-model="props.userData.first_name "
                      :rules="[requiredValidator]"
                      label="Last Name"
                    />
                  </h6>
                  <h6 class="text-base font-weight-semibold mt-5">
                    <VTextField
                      v-model="props.userData.last_name "
                      :rules="[requiredValidator]"
                      label="Last Name"
                    />
                  </h6>
                  <h6 class="text-base font-weight-semibold mt-5">
                    <VSelect
                      v-model="props.userData.type"
                      :items="typeList"
                      :rules="[requiredValidator]"
                      item-title="name"
                      item-value="id"
                      label="Select Type"
                    />
                  </h6>
                </VListItemTitle>
              </VListItem>

              <VListItem>
                <VListItemTitle>
                  <h6 class="text-base font-weight-semibold mt-5">
                    <VTextField
                      v-model="props.userData.email"
                      :rules="[requiredValidator, emailValidator]"
                      label="Email"
                    />
                  </h6>
                </VListItemTitle>
              </VListItem>
              <VListItem>
                <VListItemTitle>
                  <h6 class="text-base font-weight-semibold mt-5">
                    <VTextField
                      v-model="props.userData.password"

                      label="Password"
                    />
                  </h6>
                </VListItemTitle>
              </VListItem>
            </VList>
          </VCardText>

          <!-- 👉 Edit and Suspend button -->
          <VCardText class="d-flex justify-center">
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
      </VForm>
    </VCol>
    <!-- !SECTION -->

    <!-- SECTION Current Plan -->

    <!-- !SECTION -->
  </VRow>

  <!-- 👉 Upgrade plan dialog -->
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.7rem;
}

.text-capitalize {
  text-transform: capitalize !important;
}
</style>
