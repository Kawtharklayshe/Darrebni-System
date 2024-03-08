
<script setup>
import { useEmployeeListStore } from '@/pages/apps/employee/useEmployeeStore.js'
import { ref } from "vue"

const EmployeeListStore = useEmployeeListStore()

const router = useRouter()

//Edit Employee 
const editEmployee = x => 
{
 router.replace({name:'apps-employee-edit-id',params:{id:x}})
 setTimeout(
  ()=>
  {
    location.reload()
  },500
 )
}

//GET All
//onMounted
onMounted(async()=>{
EmployeeListStore.getEmployees().then(response => {
  employees.value = response.data.data.data
  })
})
//activateDeleteDialog
const activateDeleteDialog=(id)=>
{
  deletedEmployee.value=id
  isDialogVisible.value=true
}
//Delete Employee
const deleteEmployee =(id)=> {
  isDialogVisible.value = false
   EmployeeListStore.deleteEmployee(id).then(response => {
     EmployeeListStore.getEmployees().then(response => {
     employees.value = response.data.data.data
     }
     )
})}
//Data 
const deletedEmployee=ref()
const employees=ref([''])
const isDialogVisible = ref(false)

const updateEmployee=id=>
{

}

</script>

<template>
  <h1 class="mb-3">
    الموظفين
  </h1>

  <VDialog
    v-model="isDialogVisible"
    max-width="600"
  >    
 <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard title="تأكيد الحذف">
     
      <VCardText class="d-flex justify-end flex-wrap gap-3">
        هل تريد فعلا حذف هذا الموظف
        <VBtn
          variant="tonal"
          color="secondary"
          @click="isDialogVisible = false"
        >
          تراجع
        </VBtn>
        <VBtn @click="deleteEmployee(deletedEmployee)">
          تأكيد 
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
  <VTable class="text-no-wrap">
    <thead>
      <tr>
        <th>
        </th>
        <th class="text-center">
          الاسم 
        </th>
        <th class="text-center">
          اسم الأب
        </th>
        <th class="text-center">
          رقم الهاتف 
        </th>
        <th class="text-center">
          العنوان
        </th>
        <th class="text-center">
        البريد الإلكتروني 
        </th>
        <th class="text-center">
          إجراءات
        </th>
      </tr>
    </thead>

    <tbody v-for="item in employees">
      <tr>
        <td>
          <p></p>
          {{ item.id }}
          <p></p>
        </td>
        <td><span>{{ item.first_name}}</span> <span>{{ item.last_name }}  </span> </td>
        <td class="text-center">
          {{item.middle_name}}
        </td>
        <td>
          {{ item.phone }}
        </td>
        <td>
          {{ item.address }}
        </td>
        <td>
          {{ item.email }}
        </td>
        <td>
          <IconBtn  variant="elevated"  @click="activateDeleteDialog(item.id)">
            <VIcon icon="tabler-trash" color="error"/>
          </IconBtn>
          
          <IconBtn variant="elevated"  @click="editEmployee(item.id)">
            <VIcon icon="tabler-edit" color="primary" />
          </IconBtn>
          
        </td>
      </tr>
    </tbody>
  </VTable>
</template>

