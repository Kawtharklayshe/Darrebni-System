<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import { ref } from 'vue'

const firstName = ref('')
const middleName = ref('')
const lastName = ref('')
const trainerId = ref('sp21')
const birthDate = ref('')
const email = ref('')
const phoneNumber = ref('09')
const training = ref('')
const nots= ref('')
const TrainingBatch =ref('')
// const startDate = ref('')
// const salaryStartDate = ref('')
// const salary = ref('')
// const sessionSalary = ref('')
// const sessionTotalHours = ref('')
// const sessionTime = ref('')
const checkbox = ref(false)

const specializationSelected = ref([])
const specialization = ref(['مهندس معلوماتية ', 'مهندس اتصالات'])
const sessionDaysSelected = ref([])
const sessionDays = ref(['السبت ', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'])
const pathSelected = ref([])
const path = ref(['Front End', 'Back End', 'Mopile Application'])
const branchSelected = ref([])
const branch = ref(['ايميسا', 'التربية', 'online'])

const idErrorMsg = ref(false)
const phoneErrorMsg = ref(false)
const numErrorMsg = ref(false)


const onIdChange = e => {
  const regex = /^sp21\d{4}$/

  if (!e.target.value.match(regex)) {
    idErrorMsg.value = true
  } else {
    idErrorMsg.value = false

    trainerId.value =  e.target.value    
  }
}

const onPhoneNumberChange = e => {
  const regex = /^09\d{8}$/

  if (!e.target.value.match(regex)) {
    phoneErrorMsg.value = true
  } else {
    phoneErrorMsg.value = false

    phoneNumber.value =  e.target.value    
  }
}
const NumberOfTrainingBatch = e => {
  const numberRegex = /^\d+$/;
if (!e.target.value.match(numberRegex)) {
    numErrorMsg.value = true
  } else {
    numErrorMsg.value = false

    TrainingBatch.value =  e.target.value    
  }}
</script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <!-- 👉 First Name -->
      <VCol
        cols="12"
        md="4"
      >
        <AppTextField
          v-model="firstName"
          label="الاسم الأول "
        />
      </VCol>

      <!-- 👉 Middle Name -->
      <VCol
        cols="12"
        md="4"
      >
        <AppTextField
          v-model="middleName"
          label="اسم الأب"
        />
      </VCol>

      <!-- 👉 Last Name -->
      <VCol
        cols="12"
        md="4"
      >
        <AppTextField
          v-model="lastName"
          label="الاسم الأخير"
        />
      </VCol>

      <!-- 👉 Trainer Id -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="trainerId"
          label="معرف المدرب"
          @change="onIdChange"
        />
        <p
          v-if="idErrorMsg"
          class="mt-2 red--text"
        >
         الرجاء إدخال Sp12 يتبعها 4 أرقام
        </p>
      </VCol>

      
      <!-- 👉 Birth Date -->
      <VCol
        cols="12"
        md="6"
      >
        <AppDateTimePicker
          v-model="birthDate"
          label="تاريخ الميلاد "
        />
      </VCol>

      <!-- 👉 Email -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="email"
          label="البريد الالكتروني"
        />
      </VCol>

      <!-- 👉 Phone Number -->
      <VCol  
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="phoneNumber"
          label="رقم الهاتف"
          @change="onPhoneNumberChange"
        />
        <p
          v-if="phoneErrorMsg"
        >
          -- --- ---الرجاء إدخال رقم هاتف صحيح
        </p>
      </VCol>

      <VCol cols="12" 
      md="12" 
      >
       <AppTextarea 
       label="العنوان" 
       v-model="address"
/>
  </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <AppSelect
          v-model="specializationSelected"
          v-col
          :items="specialization"
          label="الاختصاص"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppSelect
          v-model="pathSelected"
          v-col
          :items="path"
          label="المسار"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="TrainingBatch"
          label="الدفعة التدريبية"
          @change="NumberOfTrainingBatch"
        />
        <p
          v-if="numErrorMsg"
          class="danger"

        >
          -- --- ---الرجاء إدخال رقم
        </p>
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppSelect
          v-model="branchSelected"
          v-col
          :items="branch"
          label="الفرع"
        />
      </VCol>
         <VCol cols="12" 
      md="12" 
      >
       <AppTextarea 
       label="الملاحظات"
       v-model="nots" />
  </VCol>

      <!-- <VCol
        cols="12"
        md="4"
      >
        <AppDateTimePicker
          v-model="startDate"
          label="تاريخ البداية "
        />
      </VCol>

      <VCol
        cols="12"
        md="4"
      >
        <AppTextField
          v-model="salary"
          type="number"
          label="الراتب"
        />
      </VCol>
      
      <VCol
        cols="12"
        md="4"
      >
        <AppDateTimePicker
          v-model="salaryStartDate"
          label="تاريخ أول راتب"
        />
      </VCol> 

      <VDivider class="my-5" />

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="sessionSalary"
          type="number"
          label="راتب الجلسة"
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="sessionTotalHours"
          type="number"
          label="اجمالي الساعات "
        />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <AppSelect
          v-model="sessionDaysSelected"
          v-col
          :items="sessionDays"
          label="ايام الجلسات"
          chips

          multiple
        />
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <AppDateTimePicker
          v-model="sessionTime"
          label="موعد الجلسة"
          :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i' }"
        />
      </VCol> -->

      <VCol cols="12">
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol> 

      <VCol
        cols="12"
        class="d-flex gap-4"
      >
        <VBtn type="submit">
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
