<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import { useTrainerListStore } from "@/views/apps/trainer/TrainerListStore"
import { emailValidator, regexValidator, requiredValidator } from '@validators'
import { onMounted, ref } from 'vue'
import axiosIns from '../../../plugins/axios'
import { useSpecializetionListStore } from '../../../views/apps/specializetion/SpecializetionListStore'

// import type { VForm } from 'vuetify/components/VForm'
// const now = new Date()


// // const currentMonth = now.toLocaleString('default', { month: '2-digit' })
// const currentYear = now.getFullYear()
// const date = ref('')

const formData = ref({
  first_name: '',
  middle_name: '',
  last_name: '',
  CoachID: '',
  birth_date: '2000-01-01 00:00',
  email: '',
  phone: '',
  notes: '',

  image: 'test',
  address: '',

  specializetion_id: '',  
  pathSelected_id: '',
  branchSelected_id: '',
})


const now = new Date()
const currentYear = now.getFullYear()
const yearAhead = new Date(currentYear + 1, now.getMonth(), now.getDate())
const eighteenYearsAgo = new Date(currentYear - 18, now.getMonth(), now.getDate())




const refForm = ref("")

const myStore = useTrainerListStore()
const specializationStore = useSpecializetionListStore()

const specializetion_id = ref([])
const specialization = ref([''])
const pathSelected = ref([])

const branchSelected = ref([])



const resetForm =() => {
  formData.value = {
    first_name: '',
    middle_name: '',
    last_name: '',
    CoachID: '',
    birth_date: '',
    email: '',
    phone: '',
    notes: '',
    image: 'test',
    address: '',

    specializetion_id: '',  
    pathSelected_id: '',
    branchSelected_id: '',
  }
}

const onSubmit = async () => {
  if(myStore.trainerImage) {

    formData.value.image = myStore.trainerImage
  }

  refForm.value?.validate().then(async s => {
    if(s.valid) {
      await myStore.addTrainer(formData.value)
      myStore.valid = true
      refForm.value.reset()
    }
  }).catch(err => {
    myStore.valid = false
  })


}


      

onMounted(async () => {
  try {
    const response = await axiosIns.get('specializetion/index')


    // console.log(response.data)
    specialization.value = response.data.data.data
    console.log(specialization.value )

    const response2 = await axiosIns.get('course')


    // console.log(response.data)
    pathSelected.value = response2.data.data.data
    console.log(pathSelected.value )

    const response3 = await axiosIns.get('brunch/index')


    // console.log(response.data)
    branchSelected.value = response3.data.data.data
    console.log(branchSelected.value )
        
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>


<template>
  <VForm
    ref="refForm"
    @submit.prevent="() => {}"
  >
    <VRow>
      <!-- 👉 First Name -->
      <VCol
        cols="12"
        md="4"
      >
        <AppTextField
          v-model="formData.first_name"
          :rules="[requiredValidator]"
          label="الاسم الأول "
        />
      </VCol>

      <!-- 👉 Middle Name -->
      <VCol
        cols="12"
        md="4"
      >
        <AppTextField
          v-model="formData.middle_name"
          :rules="[requiredValidator]"
          label="اسم الأب"
        />
      </VCol>

      <!-- 👉 Last Name -->
      <VCol
        cols="12"
        md="4"
      >
        <AppTextField
          v-model="formData.last_name"
          :rules="[requiredValidator]"
          label="الاسم الأخير"
        />
      </VCol>

      <!-- 👉 Trainer Id -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="formData.CoachID"
          :rules="[requiredValidator, regexValidator(formData.CoachID, '^sp21[0-9]{4}$', 'Please enter sp21 followed by 4 numbers')] "
          label="معرف المدرب"
        />
      </VCol>

      
      <!-- 👉 Birth Date -->
      <VCol
        cols="12"
        md="6"
      >
        <AppDateTimePicker
          v-model="formData.birth_date"
          :rules="[requiredValidator]"
          label="تاريخ الميلاد "
          :config="{ dateFormat: 'Y-m-d H:i', disable: [{ from: eighteenYearsAgo.toISOString().split('T')[0], to: yearAhead.toISOString().split('T')[0] }] }"
        />
        <!--
          <AppDateTimePicker
          v-model="date"
          label="Disabled Range"
          /> 
        -->
      </VCol>

      <!-- 👉 Email -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="formData.email"
          :rules="[requiredValidator, emailValidator]"
          persistent-placeholder
          label="البريد الالكتروني"
        />
      </VCol>

      <!-- 👉 Phone Number -->
      <VCol  
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="formData.phone"
          :rules="[requiredValidator, regexValidator(formData.phone, '^09[0-9]{8}$', 'Please enter a syrian phone number')]"
          label="رقم الهاتف"
        />
      </VCol>

      <VCol
        cols="12" 
        md="12" 
      >
        <AppTextField 
          v-model="formData.address" 
          :rules="[requiredValidator]"
          label="العنوان"
        />
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <AppSelect
          v-model="formData.specializetion_id"
          :items="specialization"
          item-title="name" 
          item-value="id"
          :rules="[requiredValidator]"
          label="الاختصاص"
        /> 
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppSelect
          v-model="formData.pathSelected_id"
          :items="pathSelected"
          item-title="name" 
          item-value="id"
          :rules="[requiredValidator]"
          label="المسار"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="formData.TrainingBatch"
          :rules="[requiredValidator, regexValidator(formData.TrainingBatch, '^[0-9]+$', 'Enter an approperiate Training Batch Number')]"
          label="الدفعة التدريبية"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppSelect
          v-model="formData.branchSelected_id"
          :items="branchSelected"
          :rules="[requiredValidator]"
          item-title="name" 
          item-value="id"
          label="الفرع"
        />
      </VCol>
      <VCol
        cols="12" 
        md="12" 
      >
        <AppTextarea 
          v-model="formData.notes"
          label="الملاحظات"
        />
      </VCol>

      <VCol
        cols="12"
        class="d-flex gap-4"
      >
        <VBtn @click="onSubmit">
          Submit
        </VBtn>

        <VBtn
          type="reset"
          color="secondary"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
