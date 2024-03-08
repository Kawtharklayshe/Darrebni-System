
<script setup>
import { requiredValidator } from '@validators'
import { onMounted, ref } from "vue"

import { useCoursesStore } from "@/views/apps/courses/useCoursesStore"

const form = ref({
  name: '',
  prefix: '',
})

const store = useCoursesStore()
const isDialogVisible1 = ref(false)
const specArray = ref([])

const isSure = ref(false)
const isDialogVisible = ref(false)
const isUpdate = ref(false)
const vform = ref("")

onMounted(() => {
  store.fetchAllCourses().then(res=>{
    specArray.value = res
  })
 
  

})

const save = async () => {
  if (isUpdate.value) {
    store.updateCourse(form.value.id, form.value).then(() => {
      isDialogVisible.value = false
  
      refresh()
    })
    
  }
  else{
    vform.value?.validate()
    store.addCourse(form.value).then(() => {
      isDialogVisible.value = false
      isUpdate.value=false
      form.value = {
        name: '',
        prefix: '',
      }
    })
    refresh()
  }
  

}

const updateCourse = item => {
  isDialogVisible.value = true
  isUpdate.value=true
  form.value = { ...item }

}
const currentId=ref(null)

const deleteCourse = id => {
  currentId.value=id
  isDialogVisible1.value= true
  if(isSure.value){
    store.deleteCourse(id)
    isSure.value=false
    refresh()
    isDialogVisible1.value= false
  }
   
 
}

const confirmDelete = id => {
 

  store.deleteCourse(currentId.value)
  isSure.value=false
  refresh()
  isDialogVisible1.value= false

   
 
}

const refresh = () => {
  store.fetchAllCourses().then(res=>{
    specArray.value = res
  })
}
</script>

<template>
  <h1 class="mb-3">
    المسارات
  </h1>

  <VDialog
    v-model="isDialogVisible"
    max-width="600"
  >
    <!-- Dialog Activator -->
    
    <template #activator="{ props }">
      <VBtn
        v-bind="props"
        class="mb-8"
      >
        <span>إضافة كورس</span>
        <!--
          <IconBtn>
          <VIcon icon="tabler-circle-plus" />
          </IconBtn> 
        -->
      </VBtn>
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard :title=" isUpdate ? `تعديل المسار` : `إضافة مسار`">
      <VCardText>
        <VForm
          ref="vform"
          @submit.prevent="() => {}"
        >
          <VRow>
            <VCol cols="12">
              <AppTextField
                v-model="form.name"
                :rules="[requiredValidator]"
                label="اسم المسار"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <AppTextField
                v-model="form.prefix"
                :rules="[requiredValidator]"
                label=" الدفعة التدريبية"
              />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>

      <VCardText class="d-flex justify-end flex-wrap gap-3">
        <VBtn
          variant="tonal"
          color="secondary"
          @click="isDialogVisible = false"
        >
          إغلاق
        </VBtn>
        <VBtn @click="save">
          حفظ 
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
  <VTable class="text-no-wrap">
    <thead>
      <tr>
        <th class="text-uppercase">
          المسارات
        </th>
        <th class="text-uppercase text-center">
          الدفعة التدريبية
        </th>
       
        <th class="text-uppercase  text-center">
          الاجراءات
        </th>
      </tr>
    </thead>

    <tbody v-for="item in specArray">
      <tr>
        <td>{{ item.name }}</td>
        <td class="text-center">
          {{ item.prefix }}
        </td>
        <td class="text-center ">
          <VIcon
            size="22"
            icon="tabler-edit"
            color="#00b341"
            class="mt-1 mx-5"
            style="opacity: 1;"
            @click="updateCourse(item)"
          />
      
          <VDialog
            v-model="isDialogVisible1"
            width="500"
          >
            <!-- Activator -->
            <template #activator="{ props }">
              <VIcon
                v-bind="props"
                size="22"
                icon="tabler-trash"
                color="#ff2825"
                class="mt-1"
                style="opacity: 1;"
                @click="deleteCourse(item.id)"
              />
            </template>

            <!-- Dialog close btn -->
            <DialogCloseBtn @click="isDialogVisible1 = !isDialogVisible1" />

            <!-- Dialog Content -->
            <VCard title="تأكيد الحذف">
              <VCardText>
                هل أنت متأكد من حذف هذا الكورس؟
              </VCardText>

              <VCardText class="d-flex justify-end gap-3 flex-wrap">
                <VBtn
                  color="secondary"
                  variant="tonal"
                  class="mx-3"
                  @click="isDialogVisible1 = false"
                >
                  إلغاء
                </VBtn>
                <VBtn @click="confirmDelete">
                  تأكيد
                </VBtn>
              </VCardText>
            </VCard>
          </VDialog>
        </td>
      </tr>
    </tbody>
  </VTable>
</template>

