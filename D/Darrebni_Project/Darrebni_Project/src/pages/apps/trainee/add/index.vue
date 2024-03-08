<script setup>

import UserTrainee from '@/views/apps/trainee/add/UserTrainee.vue'

const userTab = ref(null)

const tabs = [
  {
    icon: 'tabler-user-check',
    title: 'المعلومات',
  },
]


</script>

<template>
  
  <VRow >
   

    <VCol
      cols="12"
      md="12"
      lg="18"
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
      
        class="mt-4 disable-tab-transition"
        :touch="false"
      >
      <div style="background-color: white;">
   
        <VWindowItem>
          <UserTrainee />
        </VWindowItem>

     
        </div>
      </VWindow>
    </VCol>
  </VRow>
</template>

