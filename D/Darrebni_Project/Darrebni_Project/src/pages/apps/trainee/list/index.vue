<script setup>
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import AddNewUserDrawer from '@/views/apps/user/list/AddNewUserDrawer.vue'
import { useTraineeStore } from '@/views/apps/trainee/useTraineeStore'
import { useRouter } from "vue-router"
import { ref } from 'vue'


const traineeListStore = useTraineeStore()
const searchQuery = ref('')
const selectedRole = ref()

// const totalPage = ref(1)
const totalUsers = ref(0)
const users = ref([])
const arr=ref([])

const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

const router = useRouter()

const updateTrainer=id =>{
  router.push(`/apps/trainee/update/${id}`)
}



// Headers
const headers = [
  {
    title: 'اسم المتدرب',
    key: 'first_name_ar',
  },
  {
    title: 'الايميل',
    key: 'email',
  }, 
  {
    title: 'رقم الهاتف',
    key: 'phone_number',
  }, 
  {
    title: 'المواليد',
    key: 'date',
  }, 
  {
    title: 'الخيارات',
    key: 'actions',
    sortable: false,

    
  },
 
]

// 👉 Fetching users
const fetchTrainee = () => {
  traineeListStore.fetchTraineeList().then(response => {
    console.log("uio", response.data.data.data)
    arr.value=response.data.data.data

    // console.log(arr)


  }).catch(error => {
    // console.error(error)
  })
}

onMounted(()=>{
  fetchTrainee()
  

})

// 👉 search filters
const roles = [
  {
    title: 'Front End',
    value: 'front',
  },
  {
    title: 'Back End',
    value: 'back',
  },
  {
    title: 'Data Science',
    value: 'data',
  },

]

const isAddNewUserDrawerVisible = ref(false)

const addNewUser = userData => {
  traineeListStore.addUser(userData)
  fetchTrainee()
}

const isDialogVisible = ref(false)

const deleteTrainer = id => {
  traineeListStore.deleteTrainee(id)
  isDialogVisible.value = !isDialogVisible.value
}
</script>

<template>
  <section>
    <VDialog
      v-model="isDialogVisible"
      persistent
      class="v-dialog-sm"
    >
      <!-- Dialog close btn -->
      <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

      <!-- Dialog Content -->
      <VCard title="تأكيد الحذف">
        <VCardText>
          هل أنت متأكد أنك تريد حذف هذا المتدرب ؟
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
        <VCard title="Search Filter">
          <!-- 👉 Filters -->
          <VCardText>
            <VRow>
              <!-- 👉 Select Role -->
              <VCol
                cols="12"
                sm="4"
              >
                <AppSelect
                  v-model="selectedRole"
                  label="اختار المسار :"
                  :items="roles"
                  clearable
                  clear-icon="tabler-x"
                />
              </VCol>
            </VRow>
          </VCardText>

          <VDivider />

          <VCardText class="d-flex flex-wrap py-4 gap-4">
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
            <VSpacer />
            <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
              <!-- 👉 Search  -->
              <div style="inline-size: 10rem;">
                <AppTextField
                  v-model="searchQuery"
                  placeholder="بحث"
                  density="compact"
                />
              </div>
            </div>
          </VCardText>

          <VDivider />

          <!-- SECTION datatable -->
          <VDataTableServer
            :items="arr"
            :headers="headers"
            class="text-no-wrap"
          >
            <template #item.first_name_ar="{ item }">
              <div class="d-flex align-center">
                <div class="d-flex flex-column">
                  <h6 class="text-base">
                    {{ item.raw.first_name_ar + item.raw.last_name_ar }}
                  </h6>
                </div>
              </div>
            </template>
            <template #item.email="{ item }">
              <div class="d-flex align-center">
                <div class="d-flex flex-column">
                  <h6 class="text-base">
                    {{ item.raw.email }}
                  </h6>
                </div>
              </div>
            </template>
            <template #item.phone_number="{ item }">
              <div class="d-flex align-center">
                <div class="d-flex flex-column">
                  <h6 class="text-base">
                    {{ item.raw.phone_number }}
                  </h6>
                </div>
              </div>
            </template>
            <template #item.date="{ item }">
              <div class="d-flex align-center">
                <div class="d-flex flex-column">
                  <h6 class="text-base">
                    {{ item.raw.date }}
                  </h6>
                </div>
              </div>
            </template>
            <template #item.actions="{ item }">
              <IconBtn
                @click="() => {
                  currentId = item.raw.id
                  isDialogVisible = !isDialogVisible
                }"
              >
                <VIcon
                  icon="tabler-trash"
                  class="del"
                />
              </IconBtn>
              <!-- 
                <IconBtn @click="updateTrainer(item.raw.id)">
                <VIcon icon="tabler-edit"  class="update" />
                </IconBtn> 
              -->
            </template>
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
.del{
  color: rgb(235, 20, 20);
}
.update{
  color: rgb(103, 216, 216);
}
</style>