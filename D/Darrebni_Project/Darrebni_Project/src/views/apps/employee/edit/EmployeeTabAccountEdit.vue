<script setup>
//import empty from '@/assets/avatars/empty.jpg'

import { useEmployeeListStore } from '@/pages/apps/employee/useEmployeeStore.js'
import {
emailValidator,
requiredValidator
} from '@validators'

const router=useRouter()
const requiredField = ref('أملأ هذا الحقل رجاء')
const EmployeeListStore = useEmployeeListStore()

// For Template
const employeeForm=ref()
const tab = ref("personal-info")
const route=useRoute()

//Data
const specializations=ref([''])
const refInputE3 =ref('')

//onMounted
onMounted(async()=>{
//GetEmployeeIndex
  EmployeeListStore.getEmployee(Number(route.params.id)).then(response => {
  form.value= response.data.data
  })  
//GetSpecializations
  EmployeeListStore.getSpecializations().then(response => {
  specializations.value = response.data.data.data
  })

})

const form = ref(
  {
    brunch_id:null,
    darrebni_id:'',
    first_name:"",
    middle_name:"",
    last_name:"",
    specializetion_id:'',
    birth_date:'',
    email:"",
    phone:null,
    address:"",
    salary:null,
    image:"",
    note:""
    // frontIdentityPic:'',
    // rearIdentityPic:'',
    // unJudgedFile:'',
    // unEmployeedFile:''
  }
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

const uploadNewImage=(i)=>{

}
//backToListPage
const backToListPage=()=>
{
  router.replace({name:'apps-employee-list'})
 setTimeout(
  ()=>
  {
    location.reload()
  },2000
 )
}
//isAssuranceDialog
const isAssuranceDialog=ref(false)
//Edit 
const editEmployee= () => {
  employeeForm.value?.validate().then(({ valid }) => {
      if(valid){
      EmployeeListStore.updateEmployee({...form.value})
      isAssuranceDialog.value=true
      setTimeout(
        ()=>
        {
          router.replace({name:'apps-employee-list'})
        },1000
      )
    }
  }
  )
}

</script>

<template>
  <VDialog
    v-model="isAssuranceDialog"
    max-width="600"
  >    
    <!-- Dialog Content -->
    <VCard>
      <VCardText class="d-flex justify-end flex-wrap gap-3">
        تم التعديل بنجاح 
      </VCardText>
    </VCard>
  </VDialog>
  <VTabs v-model="tab">
    <VTab value="personal-info">
      المعلومات الشخصية
    </VTab>
  </VTabs>

  <VCard flat>
    <VCardText>
      <VWindow
        v-model="tab"
        class="disable-tab-transition"
      >
        <VWindowItem value="personal-info">
          <VForm class="mt-2" @submit="prevent" ref="employeeForm"> 
            <VRow>
              <VCol
                cols="12"
              >
                
                <!--Image-->
                
                  <VRow>
                    <!-- SECTION Employee Details -->
                    
                    <VCol cols="6">
                      <div class="mb-8">
                        <VCard title="الصورة الشخصية">
                          <VCardText class="d-flex justify-center">
                            <!-- 👉 Upload Photo -->
                            <VAvatar
                              v-model="image"
                              rounded
                              :size="200"
                              class="me-6 "
                            >
                              <img
                                :src="empty"
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
                            <span class="d-none d-sm-block"> صورة الموظف الشخصية</span>
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
                </VCol>
                </VRow>
                
              </VCol>        
              <VCol
                cols="6"
              >
                <VRow>
                  <VCol
                  cols="12"
                  sm="12"
                  md="6"
                  lg="4"
                  >
                    <AppTextField
                      v-model="form.first_name"
                      label="الأسم الأول"
                      :rules="[requiredValidator]"
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
                      label="الأسم الثاني"
                      :rules="[requiredValidator]"
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
                      label="الأسم الأخير"
                      :rules="[requiredValidator]"
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
                    label="العنوان"
                    :rules="[requiredValidator]"
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
                    label="الإيميل"
                    :rules="[requiredValidator,emailValidator]"
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
                      label=" رقم تعريف الموظف "
                      :rules="[requiredValidator]"
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
                  label="تاريخ الميلاد"
                  :rules="[requiredValidator]"
                />
                  </VCol>
                  <VCol
                  sm="12"
                md="6"
                lg="4"
                  >
                    <AppTextField
                      v-model="form.phone"
                      :rules="[requiredValidator]"
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
                      :rules="[requiredValidator]"
                      type="number"
                      label="الراتب"
                    />
                  </VCol>
                  <!-- <VCol
                    md="4"
                    cols="12"
                  >
                  <AppSelect
                  v-model="form.brunch_id"
                  :items="branches"
                  item-title="name" 
                  item-value="id"
                  label="الفرع"
                />
                  </VCol> -->
                </VRow>
              </VCol>           
              <!-- <VCol
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
              </VCol> -->
               
              <VCol
                cols="12"
                sm="12"
                md="12"
                lg="12"
              >
                <AppTextarea
                  v-model="form.note"
                  label="ملاحظات"
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

    <VCardText class="d-flex gap-4">
      <VCol class="first" cols="2" lg="2" md="2" sm="2">
      <VBtn  class="first" @click="editEmployee" type="submit" >
        تأكيد 
      </VBtn>
    </VCol>
    <VCol    cols="6" lg="6" md="6" sm="6">
     
    </VCol>
    </VCardText>
  </VCard>
</template>
<style scoped>
.first{
  margin: auto;
  width: 100%;
}
</style>
