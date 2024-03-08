<script setup>
//import empty from '@/assets/avatars/empty.jpg'
import { useEmployeeListStore } from '@/pages/apps/employee/useEmployeeStore.js'
import {
  requiredValidator,
} from '@validators'

import axiosIns from '../../../../plugins/axios'

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const EmployeeListStore = useEmployeeListStore()

//For Validating
const requiredField = ref('')

// For Template
const tab = ref("personal-info")

//Data
const specializations=ref([''])
const refInputE3 =ref('')
const branchSelected = ref([])

//onMounted
onMounted(async()=>{
  EmployeeListStore.getSpecializations().then(response => {
    console.log(response)
    specializations.value = response.data.data.data
    console.log(specializations.value)
  })
  EmployeeListStore.getBranch().then(response => {
    console.log(response)
    branchSelected.value = response.data.data.data
    console.log(specializations.value)
  })


})


const isDialogVisible = ref(false)

const form = ref(
  {
    brunch_id: null,
    darrebni_id: '',
    first_name: "",
    middle_name: "",
    last_name: "",
    specializetion_id: '',
    birth_date: '',
    email: "",
    phone: null,
    address: "",
    salary: 0,
    image: "images\no.png",
    note: "",

    // frontIdentityPic:'',
    // rearIdentityPic:'',
    // unJudgedFile:'',
    // unEmployeedFile:''
  },
)

const loading = ref(true)

watch(form.frontIdentityPic, () => {
  loading.value = !form.frontIdentityPic.value[0]
})

const loading1 = ref(true)

watch(form.rearIdentityPic, () => {
  loading1.value = !form.rearIdentityPic.value[0]
})

const loading2 = ref(true)

watch(form.unJudgedFile, () => {
  loading2.value = !form.unJudgedFile.value[0]
})

const loading3 = ref(true)

watch(form.unEmployeedFile, () => {
  loading3.value = !form.unEmployeedFile.value[0]
})

//Image

const uploadNewImage=i=>{

}

const employeeRef=ref()

const notify = () => {
  
  toast.success("تم اضافة الموظف بنجاح!", {
    autoClose: 2000,
    position: toast.POSITION.TOP_LEFT,
  })
}




//Submit
const addEmployee= () => {
 


  
  employeeRef?.value?.validate().then(res =>{
    
    if(res.valid){
      isDialogVisible.value = true
      EmployeeListStore.addEmployee({ ...form.value }).then(response => {
        notify()
        isDialogVisible.value = false
      })
    }
  })
  
}
</script>

<template>
  <VTabs v-model="tab">
    <VTab value="personal-info">
      المعلومات الشخصية
    </VTab>
  </VTabs>
  <VDialog
    v-model="isDialogVisible"
    width="300"
  >
    <VCard
      color="primary"
      width="300"
    >
      <VCardText class="pt-3">
        Loading
        <VProgressLinear
          indeterminate
          class="mb-0"
        />
      </VCardText>
    </VCard>
  </VDialog>
  <VCard flat>
    <VCardText>
      <VWindow
        v-model="tab"
        class="disable-tab-transition"
      >
        <VWindowItem value="personal-info">
          <VForm
            ref="employeeRef"
            class="mt-2"
            @submit="prevent"
          >
            <VRow>
              <VCol cols="6">
                <VRow>
                  <VCol
                    cols="12"
                    sm="12"
                    md="6"
                    lg="4"
                  >
                    <AppTextField
                      v-model="form.first_name"
                      :rules="[requiredValidator]"
                      label="الأسم الأول"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    sm="12"
                    md="6"
                    lg="4"
                  >
                    <AppTextField
                      v-model="form.middle_name"
                      :rules="[requiredValidator]"
                      label="الأسم الثاني"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    sm="12"
                    md="6"
                    lg="4"
                  >
                    <AppTextField
                      v-model="form.last_name"
                      :rules="[requiredValidator]"
                      label="الأسم الأخير"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    sm="12"
                    md="6"
                    lg="4"
                  >
                    <AppTextField
                      v-model="form.address" 
                      :rules="[requiredValidator]"
                      label="العنوان"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    sm="12"
                    md="6"
                    lg="4"
                  >
                    <AppTextField
                      v-model="form.email" 
                      :rules="[requiredValidator,emailValidator]"
                      label="الإيميل"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    sm="12"
                    md="6"
                    lg="4"
                  >
                    <AppTextField
                      v-model="form.darrebni_id"
                      :rules="[requiredValidator]"
                      label=" رقم تعريف الموظف "
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    sm="12"
                    md="6"
                    lg="4"
                  >
                    <AppDateTimePicker
                      v-model="form.birth_date"
                      placeholder="YYYY-MM-DD"
                      :rules="[requiredValidator]"
                      label="تاريخ الميلاد"
                    />
                  </VCol>
                  <VCol
                    sm="12"
                    md="6"
                    lg="4"
                  >
                    <AppTextField
                      v-model="form.phone"
                      label="رقم الهاتف"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    sm="12"
                    md="6"
                    lg="4"
                  >
                    <AppSelect
                      v-model="form.specializetion_id"
                      :items="specializations"
                      item-title="name"
                      item-value="id"
                     
                      label="الاختصاص"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    sm="12"
                    md="6"
                    lg="4"
                  >
                    <AppTextField
                      v-model="form.salary"
                      type="number"
                      :rules="[requiredValidator]"
                      label="الراتب"
                    />
                  </VCol>
                  
                  <VCol
                    md="4"
                    cols="12"
                  >
                    <AppSelect
                      v-model="form.brunch_id"
                      :items="branchSelected"
                      item-title="name" 
                      item-value="id"
                      label="الفرع"
                    />
                  </VCol>
                </VRow>
              </VCol>
              <!--
                <VCol
                cols="12"
                md="6"
                >
                <VFileInput
                v-model="form.frontIdentityPic"
                :loading="loading"
                color="primary"
                label="الوجه الأمامي للهوية الشخصية"
                />
                </VCol>
            
                <VCol
                cols="12"
                md="6"
                >
                <VFileInput
                v-model="form.rearIdentityPic"
                :loading="loading1"
                color="primary"
                label="الوجه الخلفي للهوية الشخصية"
                />
                </VCol>

                <VCol
                cols="12"
                md="6"
                >
                <VFileInput
                v-model="form.unJudgedFile"
                :loading="loading2"
                color="primary"
                label="ورقة لا حكم عليه"
                />
                </VCol>
               
                <VCol
                cols="12"
                md="6"
                >
                <VFileInput
                v-model="form.unEmployeedFile"
                :loading="loading3"
                color="primary"
                label="ورقة غير موظف"
                />
                </VCol> 
              -->

              <VCol
                cols="12"
                sm="12"
                md="12"
                lg="12"
              >
                <AppTextarea
                  v-model="form.note"
                  label="ملاحظات"
                  :rules="[requiredValidator]"
                  no-resize
                  rows="2"
                />
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>
      </VWindow>
    </VCardText>

    <VDivider />

    <VCol
      class="first"
      cols="2"
      lg="2"
      md="2"
      sm="2"
    >
      <VBtn
        class="first"
        type="submit"
        @click="addEmployee"
      >
        إرسال
      </VBtn>
    </VCol>
  </VCard>
</template>

<style scoped>
.first {
  margin: auto;
  width: 100%;
}
</style>
