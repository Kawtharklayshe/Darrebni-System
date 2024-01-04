<script setup lang="ts">
import { useUserListStore } from '@/views/apps/user/useUserListStore'
import UserBioPanel from '@/views/apps/user/edit/UserBioPanel.vue'
import UserTabBillingsPlans from '@/views/apps/user/edit/UserTabBillingsPlans.vue'
import UserTabConnections from '@/views/apps/user/edit/UserTabConnections.vue'
import UserTabNotifications from '@/views/apps/user/edit/UserTabNotifications.vue'
import UserTabOverview from '@/views/apps/user/edit/UserTabOverview.vue'
import UserTabSecurity from '@/views/apps/user/edit/UserTabSecurity.vue'

// 👉 Store
const userListStore = useUserListStore()

const route = useRoute()
const userData = ref()
const userTab = ref(null)

const tabs = [
  { icon: 'tabler-user-check', title: 'Overview' },
  { icon: 'tabler-lock', title: 'Security' },
  { icon: 'tabler-currency-dollar', title: 'Billing & Plan' },
  { icon: 'tabler-bell', title: 'Notifications' },
  { icon: 'tabler-link', title: 'Connections' },
]

userListStore.fetchUser(Number(route.params.id)).then(response => {
  userData.value = response.data
})
</script>

<template>
  <VRow v-if="userData">
    <VCol
      cols="12"
      md="6"
      lg="6"
    >

      <UserBioPanel :user-data="userData" />
    </VCol>

  
  </VRow>
</template>
