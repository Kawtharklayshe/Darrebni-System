<script setup>
import EmployeeTabAccountEdit from '@/views/apps/employee/edit/EmployeeTabAccountEdit.vue';

const route = useRoute()

//For Template
const EmployeeTab = ref(null)

//For Router
const router = useRouter()
const shownEmployee=ref(null)
const tabs = [
  {
    icon: 'tabler-user-check',
    title: 'تعديل حساب',
  },
]
</script>
<template>
  <VRow>
    

    <VCol
      cols="12"  md="12" sm ="12" lg="12"
    
    >
      <VTabs
        v-model="EmployeeTab"
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
        v-model="EmployeeTab"
        class="mt-6 disable-tab-transition"
        :touch="false"
      >
        <VWindowItem>
         <EmployeeTabAccountEdit :item="shownEmployee"/> 
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>
