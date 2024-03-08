<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import axiosIns from '@/plugins/axios'
import { useTrainerListStore } from "@/views/apps/trainer/TrainerListStore"
import { emailValidator, regexValidator, requiredValidator } from '@validators'
import { onMounted, ref } from 'vue'


const now = new Date()
const currentYear = now.getFullYear()
const yearAhead = new Date(currentYear + 1, now.getMonth(), now.getDate())
const eighteenYearsAgo = new Date(currentYear - 18, now.getMonth(), now.getDate())


const formData = ref({
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
  salary_sp: '0',
  salary_us: '0',

  specializetion_id: '',  
  pathSelected_id: '',
  branchSelected_id: '',
})



const refForm = ref('')


const myStore = useTrainerListStore()

const specialization = ref([])
const pathSelected = ref([])

const branchSelected = ref([])

const route = useRoute()
const router = useRouter()

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

    salary_sp: '0',
    salary_us: '0',
    address: '',

    specializetion_id: '',  
    pathSelected_id: '',
    branchSelected_id: '',
  }
}

const onSubmit = async () => {
  refForm.value?.validate().then(async res => {
    if(res.valid) {
      await myStore.updateTrainer(formData.value)
      router.push('/apps/trainer/list')
    }})
  

}

onMounted(async () => {
  myStore.fetchTrainer(Number(route.params.id)).then(response => {
    formData.value = response
  })
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
  <VCard style="padding: 40px;">
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
            v-model="formData.salary_sp"
            placeholder="0"
            :rules="[requiredValidator, regexValidator(formData.salary_sp, '^[0-9]+$', 'Enter an approperiate salary in syrian pounds')]"
            label="الراتب بالليرة السورية  ( SP )"
          />
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <AppTextField
            v-model="formData.salary_us"
            placeholder="0"
            :rules="[requiredValidator, regexValidator(formData.salary_us, '^[0-9]+$', 'Enter an approperiate salary in US dollars')]"
            label="الراتب بالدولار ( $ ) "
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
  </VCard>
</template>
