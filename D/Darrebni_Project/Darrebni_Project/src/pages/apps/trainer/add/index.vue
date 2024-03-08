<script setup>
import { useTrainerListStore } from "@/views/apps/trainer/TrainerListStore"
import UseInfoTrainer from '@/views/apps/trainer/add/UseInfoTrainer.vue'
import UseTrainerCourseInfo from '@/views/apps/trainer/add/UseTrainerCourseInfo.vue'
import UseTrainerSalary from '@/views/apps/trainer/add/UseTrainerSalary.vue'
import { useUserListStore } from '@/views/apps/user/useUserListStore'
import { computed, watch, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import axiosIns from '../../../../plugins/axios'

const userListStore = useUserListStore()
const store = useTrainerListStore()
const route = useRoute()
const userData = ref()
const userTab = ref(null)

const tabs = [
  {
    icon: 'tabler-user-check',
    title: 'المعلومات الشخصية',
  },
  {
    icon: 'tabler-home-question',
    title: 'معلومات المسار',
  },
  {
    icon: 'tabler-currency-dollar',
    title: 'الراتب',
  },
 
]

userListStore.fetchUser(4).then(response => {
  userData.value = response.data
})

const refInputE3 =ref('')

const isNotification = computed(() => store.valid)

watch(isNotification, newIsNotification => {
  if(newIsNotification) {
    notify()
  }
} )

const img = ref(null)

const loading = ref([''])

const uploadNewImage = async i => {
  loading.value = true

  const file = i.target.files[0]

  const fd = new FormData()

  fd.append('image', file)

  const res =await axiosIns.post('imageApi', fd)

  img.value=res.data.data

  store.trainerImage = img.value

  console.log(store.trainerImage)




}

const notify = () => {
  toast.success("تمت الإضافة بنجاح", {
    autoClose: 2000,
    position: toast.POSITION.TOP_LEFT,
  })

  store.valid = false
}

const image = ref(img.value ? `https://managment.cliprz.org/${img}`: `@images/avatars/empty.jpg`)
</script>

<template>
  <VRow v-if="userData">
    <!--
      <div v-if="">

      </div> 
    -->
    <VCol
      cols="12"
      md="7"
      lg="8"
    >
      <VTabs
        v-model="userTab"
        class="v-tabs-pill"
      >
        <VTab
          v-for="tab in tabs"
          :key="tab.icon"
        >
          <VIcon
            :size="18"
            :icon="tab.icon"
            class="me-1"
          />
          <span>{{ tab.title }}</span>
        </VTab>
      </VTabs>

      <VWindow
        v-model="userTab"
        class="mt-6 disable-tab-transition"
        :touch="false"
      >
        <VWindowItem>
          <UseInfoTrainer />
        </VWindowItem>
        <VWindowItem>
          <UseTrainerCourseInfo />
        </VWindowItem>
        <VWindowItem>
          <UseTrainerSalary />
        </VWindowItem>
      </VWindow>
    </VCol>

    <VCol
      cols="12"
      md="5"
      lg="4"
      class="mt-15"
    >
      <div class="mb-8">
        <VCard title="الصورة الشخصية">
          <VCardText class="d-flex justify-center">
            <!-- 👉 Upload Photo -->
            <VAvatar
              v-model="img"
              rounded
              :size="200"
              class="me-6 "
            >
              <img
                :src="img? `https://managment.cliprz.org/${img}`: `/assets/images/avatars/empty.jpg`"
                alt=""
              >
            </VAvatar>
          </VCardText>
        </VCard>
        <div class="d-flex flex-wrap gap-2 mt-5">
          <VBtn
            color="primary"
            @click="refInputE3?.click()"
          >
            <VIcon
              icon="tabler-cloud-upload"
              class="d-sm-none"
            />
            <span class="d-none d-sm-block">ضع صورتك الشخصية</span>
          </VBtn>

          <input
            ref="refInputE3"
            type="file"
            name="file"
            accept=".jpeg,.png,.jpg,GIF"
            hidden
            @input="uploadNewImage"
          >
        </div>
      </div>
      <!-- <UserBioPanel :user-data="userData" /> -->
    </VCol>
  </VRow>
</template>
