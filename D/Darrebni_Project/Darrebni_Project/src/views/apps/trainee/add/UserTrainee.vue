<script setup>
import { useTraineeStore } from "../useTraineeStore"
import  { VForm } from 'vuetify/components/VForm'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import {
  emailValidator,
  requiredValidator,
} from '@validators'

const isDialogVisible = ref(false)

const Trainee=ref({
  first_name_ar: '',
  middle_name_ar: '',
  last_name_ar: '',
  first_name_en: '',
  middle_name_en: '',
  last_name_en: '',
  email: '',
  phone_number: '',
  date: '',
})

const now = new Date()
const currentYear = now.getFullYear()
const yearAhead = new Date(currentYear + 1, now.getMonth(), now.getDate())
const eighteenYearsAgo = new Date(currentYear - 18, now.getMonth(), now.getDate())
const refForm = ref('')

const traineStore = useTraineeStore()

const notify = () => {
  
  toast.success("تم اضافة المتدرب بنجاح!", {
    autoClose: 2000,
    position: toast.POSITION.TOP_LEFT,
  })
}


const  saveTra = () =>{
 
  refForm?.value?.validate().then(res =>{
    if(res.valid){
       isDialogVisible.value = true
      traineStore.addTrainee(Trainee.value).then(response => {
        notify()
        isDialogVisible.value = false
      })
    }
  })
  
 
   
}
</script>

<template>
  <div class="mx-1"> 
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
    <VForm 
      ref="refForm"
      @submit.prevent="() => {}"
    >
      <VRow class=" my-3 ms-16">
        <!-- 👉 First Name -->
        <VCol
     
          cols="12"
          md="3"
          class="me-10"
        >
          <AppTextField
            v-model="Trainee.first_name_ar"
            label="الاسم الأول "
            :rules="[requiredValidator]"
            prepend-inner-icon="tabler-user"
            placeholder="John " 
          />
        </VCol>
        <!-- 👉 Middle Name -->
        <VCol
          cols="12"
          md="3"
          class="me-10"
        >
          <AppTextField
            v-model="Trainee.middle_name_ar"
            label="اسم الأب "
            :rules="[requiredValidator]"
            prepend-inner-icon="tabler-user"
            placeholder="Ahmad "
          />
        </VCol>

        <!-- 👉 Last Name -->
        <VCol
          cols="12"
          md="3"
        >
          <AppTextField
       
            v-model="Trainee.last_name_ar"
            label="الاسم الأخير "
            :rules="[requiredValidator]"
            prepend-inner-icon="tabler-user"
            placeholder="Doe"
          />
        </VCol>

        <!-- 👉 First Name -->
        <VCol
          cols="12"
          md="3"
          class="me-10 mt-4"
        >
          <AppTextField
            v-model="Trainee.first_name_en"
            label=" الاسم الأول بالانكليزي"
            :rules="[requiredValidator]"
            prepend-inner-icon="tabler-user"
            placeholder="John "
          />
        </VCol>
        <!-- 👉 First Name -->
        <VCol
          cols="12"
          md="3"
          class="me-10 mt-4"
        >
          <AppTextField
            v-model="Trainee.middle_name_en"
            label=" اسم الأب بالانكليزي"
            :rules="[requiredValidator]"
            prepend-inner-icon="tabler-user"
            placeholder="John "
          />
        </VCol>
        <!-- 👉 Last Name -->

        <VCol
          cols="12"
          md="3"
          class="mt-4"
        >
          <AppTextField
            v-model="Trainee.last_name_en"
            label=" الاسم الأخير بالانكليزي"
            :rules="[requiredValidator]"
            prepend-inner-icon="tabler-user"
            placeholder="Doe  "
          />
        </VCol>

        <!-- 👉 المواليد -->
        <VCol
          cols="12"
          md="4"
          class="me-2  mt-4"
        >
          <AppDateTimePicker
            v-model="Trainee.date"
            label="المواليد"
            :rules="[requiredValidator]"
            :config="{ dateFormat: 'Y-m-d ', disable: [{ from: eighteenYearsAgo.toISOString().split('T')[0], to: yearAhead.toISOString().split('T')[0] }] }"
            prepend-inner-icon="tabler-address-book"
            placeholder="1-7-2003"
          />
        </VCol>

        <!-- 👉 الهاتف -->
        <VCol
          cols="12"
          md="4"
          class=" mt-4"
        >
          <AppTextField
            v-model="Trainee.phone_number"
            label="الهاتف"
            :rules="[requiredValidator]"
            prepend-inner-icon="tabler-device-mobile"
            placeholder="963+"
          />
        </VCol>
        <!-- 👉 Email -->
        <VCol
          cols="12"
          md="8"
          class=" mt-4"
        >
          <AppTextField
            v-model="Trainee.email"
            label="ايميل"
            :rules="[requiredValidator, emailValidator]"
            prepend-inner-icon="tabler-mail"
            placeholder="john@gmail.com"
          />
        </VCol>
      
        <VCol
          cols="12"
          class="d-flex justify-end gap-4 my-1"
        >
          <VBtn
            type="submit"
            @click="saveTra"
          >
            إرسال
          </VBtn>

          <VBtn
            type="reset"
            color="secondary"
            variant="tonal"
          >
            حذف
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>

<style  scoped>
    *{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    .alert{
      width: 200px;
      position: absolute;
      top: -50px;
      left: 0;
      

    }
</style>
