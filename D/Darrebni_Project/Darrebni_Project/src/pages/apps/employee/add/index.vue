<script setup>
import EmployeeTabAccount from '@/views/apps/employee/add/EmployeeTabAccount.vue';


//For Template
const EmployeeTab = ref(null)
const tabs = [
  {
    icon: 'tabler-user-check',
    title: 'إضافة حساب',
  },
]

</script>

<template>
  <VRow>
    

    <VCol
      cols="12"
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
          <EmployeeTabAccount/>
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>
