<script setup>
import { useSpecializationsStore } from "@/views/apps/specializetions/useSpecializationsStore"
import { requiredValidator } from '@validators'
import { onMounted, ref } from "vue"

const store = useSpecializationsStore()
const specArray = ref([])
const vform = ref("")
const isDialogVisible = ref(false)
const isDialogVisible1 = ref(false)

const form = ref({
  name: '' })

const isSure = ref(false)
const isUpdate = ref(false)


onMounted(() => {
  // read data 
  store.fetchAllSpecializetion().then(res=>{
    console.log(res)
    specArray.value = res
  })
 
  

})

// delete 

const currentId=ref(null)

const deleteSpecializetion = id => {
  currentId.value=id
  isDialogVisible1.value= true
  if(isSure.value){
    store.deleteSpecializetion(id)
    isSure.value=false
    refresh()
    isDialogVisible1.value= false
  }
   
 
}

const confirmDelete = id => {
 

  store.deleteSpecializetion(currentId.value)
  isSure.value=false
  refresh()
  isDialogVisible1.value= false

   
 
}

//add
const add = () => {
  isDialogVisible.value = true
  isUpdate.value = false
  form.value = { name: '' }
}

const sendSpec = () => {
  if (isUpdate.value) {
    store.updateSpecializetion(form.value.id, form.value).then(() => {
      isDialogVisible.value = false
  
      refresh()
    })
    
  }
  else{
    vform.value?.validate()
      .then( async res => {
        if(res.valid)
        { await store.addSpecialization(form.value)
          isDialogVisible.value = false
         

          //rest form
          form.value = { name: '' }
        }
        refresh()

      })
  }

  
}




//update
const updateSpec = item => {
  isDialogVisible.value = true
  isUpdate.value=true
  form.value = { ...item }
  
}

const refresh = () => {
  store.fetchAllSpecializetion().then(res=>{
    specArray.value = res
  })



}
</script>

<template>
  <h1 class="mb-3">
    الاختصاصات
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
        @click="add"
      >
        <span>إضافة اختصاص</span>
      </VBtn>
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard :title=" isUpdate ? `تعديل اختصاص `: `إضافة اختصاص`">
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
                label="اسم الاختصاص"
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
        <VBtn @click="sendSpec">
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
        
        <th class="text-uppercase  text-center">
          الاجراءات
        </th>
      </tr>
    </thead>

    <tbody v-for="item in specArray">
      <tr>
        <td>{{ item.name }}</td>
        <td class="text-center">
          {{ item.id }}
        </td>
        <td class="text-center ">
          <VIcon
            size="22"
            icon="tabler-edit"
            color="#00b341"
            class="mt-1 mx-5"
            style="opacity: 1;"
            @click="updateSpec(item)"
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
                @click="deleteSpecializetion(item.id)"
              />
            </template>

            <!-- Dialog close btn -->
            <DialogCloseBtn @click="isDialogVisible1 = !isDialogVisible1" />
            <!-- Dialog Content -->
             <VCard title="تأكيد الحذف">
              <VCardText>
                هل أنت متأكد من حذف هذا 
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
