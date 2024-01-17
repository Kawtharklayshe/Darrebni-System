<script setup lang="ts">

import AddNewUserDrawer from '@/views/apps/user/list/AddNewUserDrawer.vue'
import { useUserListStore } from '@/views/apps/user/useUserListStore'
import { avatarText } from '@core/utils/formatters'


// 👉 Store
const userListStore = useUserListStore()
const searchQuery = ref('')

const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const YesDelete = ref(false)
const totalUsers = ref(0)
const users = ref([])
const isDialogVisible = ref(false)
const swal = inject('$swal')
// 👉 Fetching users

const fetchUsers = () => {
  userListStore.fetchUsers({
    search_text: searchQuery.value,
    page_size: rowPerPage.value,
      page: currentPage.value,

    currentPage: currentPage.value,
  }).then(response => {
    users.value = response.data.data
    // totalPage.value = response.data.totalPage
    totalUsers.value = response.data.total
  }).catch(error => {
    console.error(error)
  })
}

watchEffect(fetchUsers)

const deleteUser = (id: number) => {
  swal({
    icon: 'warning',
    title: 'Are You Sure?',
    confirmButtonText: 'YES',
    cancelButtonText: 'Cancel',
    customClass: {
      confirmButton: 'btn btn-primary',
    },
  }).then(result => {
    if (result.value) {
      userListStore.DeleteUser(id).then(response => {
    swal({
      title: ' Deleted ',
      icon: 'success',
      customClass: {
        confirmButton: 'btn btn-primary',
      },
      buttonsStyling: false,
    })
    FetchData()
  })
    .catch(error => {
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
    }
  )
}


const confirmDelete = () => {
  YesDelete.value = true
}

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

// 👉 search filters
const roles = [
  { title: 'Admin', value: 'admin' },
  { title: 'Author', value: 'author' },
  { title: 'Editor', value: 'editor' },
  { title: 'Maintainer', value: 'maintainer' },
  { title: 'Subscriber', value: 'subscriber' },
]

const plans = [
  { title: 'Basic', value: 'basic' },
  { title: 'Company', value: 'company' },
  { title: 'Enterprise', value: 'enterprise' },
  { title: 'Team', value: 'team' },
]

const status = [
  { title: 'Pending', value: 'pending' },
  { title: 'Active', value: 'active' },
  { title: 'Inactive', value: 'inactive' },
]

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
    return { color: 'secondary', icon: 'tabler-device-laptop' }

  return { color: 'primary', icon: 'tabler-user' }
}

const resolveUserStatusVariant = (stat: string) => {
  if (stat === 'pending')
    return 'warning'
  if (stat === 'active')
    return 'success'
  if (stat === 'inactive')
    return 'secondary'

  return 'primary'
}

const isAddNewUserDrawerVisible = ref(false)

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = users.value.length ? ((currentPage.value - 1) * rowPerPage.value) + 1 : 0
  const lastIndex = users.value.length + ((currentPage.value - 1) * rowPerPage.value)

  return `Showing ${firstIndex} to ${lastIndex} of ${totalUsers.value} entries`
})

const getConfirm = (id: number) => {

  userListStore.DeleteUser(id)
}

// 👉 Add new user
const addNewUser = (userData: any) => {
  userListStore.addUser(userData).then(() => {
  // refetch User
    fetchUsers()
  })
}

// 👉 List
const userListMeta = [
  {
    icon: 'tabler-user',
    color: 'primary',
    title: 'Session',
    stats: '21,459',
    percentage: +29,
    subtitle: 'Total Users',
  },
  {
    icon: 'tabler-user-plus',
    color: 'error',
    title: 'Paid Users',
    stats: '4,567',
    percentage: +18,
    subtitle: 'Last week analytics',
  },
  {
    icon: 'tabler-user-check',
    color: 'success',
    title: 'Active Users',
    stats: '19,860',
    percentage: -14,
    subtitle: 'Last week analytics',
  },
  {
    icon: 'tabler-user-exclamation',
    color: 'warning',
    title: 'Pending Users',
    stats: '237',
    percentage: +42,
    subtitle: 'Last week analytics',
  },
]
</script>

<template>
  <section>
    <VRow>
   
   

      <VCol cols="12">
        <VCard >
        

          <VCardText class="d-flex flex-wrap py-4 gap-4">
          

            <VSpacer />
            <VSpacer />
            <div class="d-flex align-end flex-wrap gap-4">
           

              <!-- 👉 Export button -->
            

              <!-- 👉 Add user button -->
              <VBtn
                prepend-icon="tabler-plus"
                @click="isAddNewUserDrawerVisible = true"
              >
                Add New User
              </VBtn>
            </div>
          </VCardText>

          <VDivider />

          <VTable class="text-no-wrap">
            <!-- 👉 table head -->
            <thead>
              <tr>
               
                <th scope="col">
                 FIRST NAME
                </th>
                <th scope="col">
                  EMAIL
                </th>

                <th scope="col">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <!-- 👉 table body -->
            <tbody>
              <tr
                v-for="user in users"
                :key="user.id"
                style="height: 3.75rem;"
              >
                <!-- 👉 User -->
                <td>
                  <div class="d-flex align-center">
                    <VAvatar
                      variant="tonal"
                      :color="resolveUserRoleVariant(user.role).color"
                      class="me-3"
                      size="38"
                    >
                     
                    
                      <span>{{ avatarText(user.first_name) }}</span>
                    </VAvatar>

                    
                    </div>
                
                </td>
                <!-- <td>
                  <div class="d-flex flex-column">
                      <h6 class="text-base">
                        <RouterLink
                          :to="{ name: 'apps-user-view-id', params: { id: user.id } }"
                          class="font-weight-medium user-list-name"
                        >
                          {{ user.name }}
                        </RouterLink>
                      </h6>
                      </div>
                      
                </td> -->
                <!-- 👉 Role -->

                <!-- 👉 Plan -->
                <td>
                  <span class="text-sm text-disabled">{{ user.email }}</span>
                </td>


                <!-- 👉 Actions -->
                <td
                  class="text-center"
                  style="width: 5rem;"
                >
                  <VBtn
                    icon
                    size="x-small"
                    color="info"
                    variant="text"
                    :to="{ name: 'apps-user-edit-id', params: { id: user.id } }"
                  >
                    <VIcon
                      size="22"
                      icon="tabler-edit"
                    />
                  </VBtn>

                  <VBtn
                    icon
                    size="x-small"
                    color="error"
                    variant="text"
                    @click="deleteUser(user.id)"
                  >
                    <VIcon
                      size="22"
                      icon="tabler-trash"
                    />
                  </VBtn>

               
                </td>
              </tr>
            </tbody>

            <!-- 👉 table footer  -->
            <tfoot v-show="!users.length">
              <tr>
                <td
                  colspan="7"
                  class="text-center"
                >
                  No data available
                </td>
              </tr>
            </tfoot>
          </VTable>

          <VDivider />

          <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5">
            <span class="text-sm text-disabled">
              {{ paginationData }}
            </span>

            <VPagination
              v-model="currentPage"
              size="small"
              :total-visible="5"
              :length="totalPage"
            />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- 👉 Add New User -->
    <AddNewUserDrawer
      v-model:isDrawerOpen="isAddNewUserDrawerVisible"
      @user-data="addNewUser"
    />
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
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>
