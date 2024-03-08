<script setup>
// import router from '@/router'
import axiosIns from '@/plugins/axios'
import AddNewUserDrawer from '@/views/apps/user/list/AddNewUserDrawer.vue'
import { useUserListStore } from '@/views/apps/user/useUserListStore'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { useTrainerListStore } from '../../../../views/apps/trainer/TrainerListStore'
import { get } from '@vueuse/core'


const userListStore = useUserListStore()
const currentId = ref(null)
const isDialogVisible = ref(false)
const searchQuery = ref('')
const selectedRole = ref()
const selectedPlan = ref()
const selectedStatus = ref()
const totalPage = ref(1)
const totalUsers = ref(10)
const users = ref([])
const trainers = ref([])
const specialization = ref([])
const pathSelected = ref([])

const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

// Headers
const headers = [
  {
    title: 'اسم المدرب',
    key: 'first_name',
  },
  {
    title: 'معرف المدرب',
    key: 'CoachID',
  },
  {
    title: 'المسار',
    key: 'pathSelected_id',
  },
  {
    title: 'الاختصاص',
    key: 'specializetion_id',
  },

  // {
  //   title: 'Status',
  //   key: 'status',
  // },
  {
    title: 'الخيارات',
    key: 'actions',
    sortable: false,
  },
]

// 👉 Fetching users
// const fetchUsers = () => {
//   userListStore.fetchUsers({
//     q: searchQuery.value,
//     status: selectedStatus.value,
//     plan: selectedPlan.value,
//     role: selectedRole.value,
//     options: options.value,
//   }).then(response => {
//     users.value = response.data.users
//     totalPage.value = response.data.totalPage
//     totalUsers.value = response.data.totalUsers
//     options.value.page = response.data.page
//   }).catch(error => {
//     console.error(error)
//   })
// }

// watchEffect(fetchUsers)

// 👉 search filters
const roles = [
  {
    title: 'Front end',
    value: 'front end',
  },
  {
    title: 'Back end',
    value: 'back end',
  },
  {
    title: 'Mobile application',
    value: 'mobile application',
  },
  
]

const store = useTrainerListStore()

const getTrainers = async () => {
  await store.getTrainers().then(r => {
    console.log(r)
    trainers.value = r
  })
}

onMounted(async() => {
  await getTrainers()

  try {
    const response = await axiosIns.get('specializetion/index')

    // console.log(response.data)
    specialization.value = response.data.data.data
    console.log(specialization.value )

    const response2 = await axiosIns.get('course')


    // console.log(response.data)
    pathSelected.value = response2.data.data.data
    console.log(pathSelected.value )
  } catch(err) {
    console.log(err)
  }

})


const plans = [
  {
    title: 'إيميسا',
    value: 'emessa',
  },
  {
    title: 'التربية',
    value: 'T',
  },
  {
    title: 'OnLine',
    value: 'online',
  },

]

const status = [
  {
    title: 'Pending',
    value: 'pending',
  },
  {
    title: 'Active',
    value: 'active',
  },
  {
    title: 'Inactive',
    value: 'inactive',
  },
]

const resolveUserRoleVariant = role => {
  const roleLowerCase = role.toLowerCase()
  if (roleLowerCase === 'subscriber')
    return {
      color: 'warning',
      icon: 'tabler-circle-check',
    }
  if (roleLowerCase === 'author')
    return {
      color: 'success',
      icon: 'tabler-user',
    }
  if (roleLowerCase === 'maintainer')
    return {
      color: 'primary',
      icon: 'tabler-chart-pie-2',
    }
  if (roleLowerCase === 'editor')
    return {
      color: 'info',
      icon: 'tabler-edit',
    }
  if (roleLowerCase === 'admin')
    return {
      color: 'secondary',
      icon: 'tabler-device-laptop',
    }
  
  return {
    color: 'primary',
    icon: 'tabler-user',
  }
}

const resolveUserStatusVariant = stat => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'pending')
    return 'warning'
  if (statLowerCase === 'active')
    return 'success'
  if (statLowerCase === 'inactive')
    return 'secondary'
  
  return 'primary'
}

const isAddNewUserDrawerVisible = ref(false)

const addNewUser = userData => {
  userListStore.addUser(userData)

  // refetch User
  fetchUsers()
}

// 👉 List
// const userListMeta = [
//   {
//     icon: 'tabler-user',
//     color: 'primary',
//     title: 'Session',
//     stats: '21,459',
//     percentage: +29,
//     subtitle: 'Total Users',
//   },
//   {
//     icon: 'tabler-user-plus',
//     color: 'error',
//     title: 'Paid Users',
//     stats: '4,567',
//     percentage: +18,
//     subtitle: 'Last week analytics',
//   },
//   {
//     icon: 'tabler-user-check',
//     color: 'success',
//     title: 'Active Users',
//     stats: '19,860',
//     percentage: -14,
//     subtitle: 'Last week analytics',
//   },
//   {
//     icon: 'tabler-user-exclamation',
//     color: 'warning',
//     title: 'Pending Users',
//     stats: '237',
//     percentage: +42,
//     subtitle: 'Last week analytics',
//   },
// ]

const deleteTrainer = id => {
  store.deleteTrainer(id)
  isDialogVisible.value = !isDialogVisible.value
  getTrainers()
}

const router = useRouter()

const goToAddTrainerPage = () => {
  router.push('/apps/trainer/add')
}

const updateTrainer = id => {
  router.push(`/apps/trainer/update/${id}`)
}
</script>

<template>
  <section>
    <VDialog
      v-model="isDialogVisible"
      persistent
      class="v-dialog-sm"
    >
      <!-- Dialog Activator -->
      <!--
        <template #activator="{ props }">
        <VBtn v-bind="props">
        Open Dialog
        </VBtn>
        </template> 
      -->

      <!-- Dialog close btn -->
      <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

      <!-- Dialog Content -->
      <VCard title="تأكيد الحذف">
        <VCardText>
          هل أنت متأكد أنك تريد حذف هذا المدرب ؟
        </VCardText>

        <VCardText class="d-flex justify-end gap-3 flex-wrap">
          <VBtn
            color="secondary"
            variant="tonal"
            @click="isDialogVisible = false"
          >
            إلغاء
          </VBtn>
          <VBtn @click="deleteTrainer(currentId)">
            تأكيد
          </VBtn>
        </VCardText>
      </VCard>
    </VDialog>
    <VRow>
      <VCol cols="12">
        <VCard title="المدربين">
          <!-- 👉 Filters -->
          <VCardText>
            <VRow>
              <!-- 👉 Select Role -->
              <VCol
                cols="12"
                sm="6"
              >
                <AppSelect
                  v-model="selectedRole"
                  label="اختر المسار"
                  :items="roles"
                  clearable
                  clear-icon="tabler-x"
                />
              </VCol>
              <!-- 👉 Select Plan -->
              <VCol
                cols="12"
                sm="6"
              >
                <AppSelect
                  v-model="selectedPlan"
                  label="اختر الفرع"
                  :items="plans"
                  clearable
                  clear-icon="tabler-x"
                />
              </VCol>
              <!-- 👉 Select Status -->
              <!--
                <VCol
                cols="12"
                sm="4"
                >
                <AppSelect
                v-model="selectedStatus"
                label="Select Status"
                :items="status"
                clearable
                clear-icon="tabler-x"
                />
                </VCol> 
              -->
            </VRow>
          </VCardText>

          <VDivider />

          <VCardText class="d-flex flex-wrap justify-end py-4 gap-4">
            <!--
              <div class="me-3 d-flex gap-3">
              <AppSelect
              :model-value="options.itemsPerPage"
              :items="[
              { value: 10, title: '10' },
              { value: 25, title: '25' },
              { value: 50, title: '50' },
              { value: 100, title: '100' },
              { value: -1, title: 'All' },
              ]"
              style="width: 6.25rem;"
              @update:model-value="options.itemsPerPage = parseInt($event, 10)"
              />
              </div> 
            -->
            <!-- <VSpacer /> -->

            <div class="app-user-search-filter d-flex align-center justify-end flex-wrap gap-4">
              <!-- 👉 Search  -->
              <!--
                <div style="inline-size: 10rem;">
                <AppTextField
                v-model="searchQuery"
                placeholder="Search"
                density="compact"
                />
                </div> 
              -->
              <!-- 👉 Add user button -->
              <VBtn
                prepend-icon="tabler-plus"
                @click="goToAddTrainerPage"
              >
                إضافة مدرب 
              </VBtn>
            </div>
          </VCardText>

          <!--
            <pre>{{ trainers }}</pre>
            <br> /////////////////////////////////// <br>
            <pre>{{ specialization }}</pre> 
          -->

          <VDivider />

          <!-- SECTION datatable -->
          <VDataTableServer
            :items="trainers"
            :headers="headers"
            class="text-no-wrap"
          >
            <!-- User -->
            
            <template #item.first_name="{ item }">
              <div class="d-flex align-center">
                <!--
                  <VAvatar
                  size="34"
                  :variant="!item.image ? 'tonal' : undefined"
                  :color="!item.raw.avatar ? resolveUserRoleVariant(item.raw.role).color : undefined"
                  class="me-3"
                  >
                  <VImg
                  v-if="item.raw.avatar"
                  :src="item.raw.avatar"
                  />
                  <span v-else>{{ avatarText(item.raw.fullName) }}</span>
                  </VAvatar> 
                -->

                <div class="d-flex flex-column">
                  <h6 class="text-base">
                    <RouterLink
                      :to="{ name: 'apps-user-view-id', params: { id: item.raw.CoachID } }"
                      class="font-weight-medium user-list-name"
                    >
                      {{ item.raw.first_name }}
                    </RouterLink>
                  </h6>

                  <span class="text-sm text-medium-emphasis">@{{ item.raw.email }}</span>
                </div>
              </div>
            </template> 
           

            <!-- 👉 Role -->
            
            <template #item.CoachID="{ item }">
              <div class="d-flex align-center gap-4">
                <VAvatar
                  :size="30"
                  :color="resolveUserRoleVariant(item.raw.CoachID).color"
                  variant="tonal"
                >
                  <VIcon
                    :size="20"
                    :icon="resolveUserRoleVariant(item.raw.CoachID).icon"
                  />
                </VAvatar>
                <span class="text-capitalize">{{ item.raw.CoachID }}</span>
              </div>
            </template> 
           

            <!-- Plan -->
            
            <template #item.pathSelected_id="{ item }">
              <!-- <span class="text-capitalize font-weight-medium">{{ item.raw.pathSelected_id }}</span> -->
              <VChip
              
                size="small"
                label
              >
                {{ pathSelected.find(el => el.id === item.raw.pathSelected_id)?.name }}
              </VChip>
            </template> 
           

            <!-- Status -->
            
            <template #item.specializetion_id="{ item }">
              <VChip
              
                size="small"
                label
              >
                {{ specialization.find(el => el.id === item.raw.specializetion_id)?.name }}
              </VChip>
            </template> 
           

            <!-- Actions -->
            
            <template #item.actions="{ item }">
              <IconBtn
                @click="() => {
                  currentId = item.raw.id
                  isDialogVisible = !isDialogVisible
                }"
              >
                <VIcon
                  icon="tabler-trash"
                  style="color: red;"
                />
              </IconBtn>

              <IconBtn @click="updateTrainer(item.raw.id)">
                <VIcon
                  icon="tabler-edit"
                  style="color: green;"
                />
              </IconBtn>

              <!--
                <VBtn
                icon
                variant="text"
                size="small"
                color="medium-emphasis"
                >
                <VIcon
                size="24"
                icon="tabler-dots-vertical"
                />

                <VMenu activator="parent">
                <VList>
                <VListItem :to="{ name: 'apps-user-view-id', params: { id: item.raw.id } }">
                <template #prepend>
                <VIcon icon="tabler-eye" />
                </template>

                <VListItemTitle>View</VListItemTitle>
                </VListItem>

                <VListItem link>
                <template #prepend>
                <VIcon icon="tabler-pencil" />
                </template>
                <VListItemTitle>Edit</VListItemTitle>
                </VListItem>

                <VListItem @click="deleteUser(item.raw.id)">
                <template #prepend>
                <VIcon icon="tabler-trash" />
                </template>
                <VListItemTitle>Delete</VListItemTitle>
                </VListItem>
                </VList>
                </VMenu>
                </VBtn> 
              -->
            </template> 
           

            <!-- pagination -->
            <!--
              <template #bottom>
              <VDivider />
              <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
              <p class="text-sm text-disabled mb-0">
              {{ paginationMeta(options, totalUsers) }}
              </p>

              <VPagination
              v-model="options.page"
              :length="Math.ceil(totalUsers / options.itemsPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : Math.ceil(totalUsers / options.itemsPerPage)"
              >
              <template #prev="slotProps">
              <VBtn
              variant="tonal"
              color="default"
              v-bind="slotProps"
              :icon="false"
              >
              Previous
              </VBtn>
              </template>

              <template #next="slotProps">
              <VBtn
              variant="tonal"
              color="default"
              v-bind="slotProps"
              :icon="false"
              >
              Next
              </VBtn>
              </template>
              </VPagination>
              </div>
              </template> 
            -->
          </VDataTableServer>
          <!-- SECTION -->
        </VCard>

        <!-- 👉 Add New User -->
        <AddNewUserDrawer
          v-model:isDrawerOpen="isAddNewUserDrawerVisible"
          @user-data="addNewUser"
        />
      </vcol>
    </vrow>
  </section>
</template>

<style lang="scss">
.app-user-search-filter {
  inline-size: 31.6rem;
}

.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
}
</style>
