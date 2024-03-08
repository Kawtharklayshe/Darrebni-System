
<script setup lang="ts">
import { useSorted } from "@vueuse/core"
import { onUnmounted, ref } from "vue"

import { useChatStore } from '@/views/apps/chat/useChatStore'
import {useSpecializationsStore} from "./useSpecializationsStore"
const store = useSpecializationsStore()
store.addSpecialization({name:'test'})
const isDialogVisible = ref(false)
const Name = ref('')

</script>

<template>
<h1>الاختصاصات</h1>

<VDialog
    v-model="isDialogVisible"
    max-width="600"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VBtn v-bind="props">
        <IconBtn>
  <VIcon icon="tabler-circle-plus" />
</IconBtn>
      </VBtn>
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard title="إضافة اختصاص">
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <AppTextField
              v-model="Name"
              label="اسم الاختصاص"
            />
          </VCol>
          
        </VRow>
      </VCardText>

      <VCardText class="d-flex justify-end flex-wrap gap-3">
        <VBtn
          variant="tonal"
          color="secondary"
          @click="isDialogVisible = false"
        >
          إغلاق
        </VBtn>
        <VBtn @click="isDialogVisible = false">
          حفظ 
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
  <VTable class="text-no-wrap">
    <thead>
      <tr>
        <th class="text-uppercase">
          الاختصاصات
        </th>
        <th class="text-uppercase text-center">
          id
        </th>
       
      </tr>
    </thead>

    <tbody>
      <tr
      
      >
        <td>
          
        </td>
        <td class="text-center">
          
        </td>
        
      </tr>
    </tbody>
  </VTable>
</template>


