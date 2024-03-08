<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'

const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const smsVerificationNumber = ref('+1(968) 819-2547')
const isTwoFactorDialogOpen = ref(false)

const salaryDetails = ref({
  salarySy: "",
  salaryDoller: "",
  dateFirstSession: "",
  costOfSession: "",
  notes:""
})

const salaryArray = ref([

])

// Recent devices Headers
// const recentDeviceHeader = [
//   {
//     title: 'الراتب بالساعة',
//     key: 'salaryInHours',
//   },
//   {
//     title: 'تاريخ الراتب',
//     key: 'salaryDate',
//   },
//   {
//     title: 'عدد ساعات الحضور',
//     key: 'attendanceHours',
//   },
//   {
//     title: 'الخصم',
//     key: 'salaryDeduction',
//   },
//   {
//     title: 'الراتب المستحق',
//     key: 'total',
//   },
// ]

//   {
//     browser: ' Chrome on Windows',
//     icon: 'tabler-brand-windows',
//     color: 'info',
//     device: 'HP Spectre 360',
//     location: 'Switzerland',
//     activity: '10, July 2021 20:07',
//   },
//   {
//     browser: 'Chrome on iPhone',
//     icon: 'tabler-device-mobile',
//     color: 'error',
//     device: 'iPhone 12x',
//     location: 'Australia',
//     activity: '13, July 2021 10:10',
//   },
//   {
//     browser: 'Chrome on Android',
//     icon: 'tabler-brand-android',
//     color: 'success',
//     device: 'Oneplus 9 Pro',
//     location: 'Dubai',
//     activity: '14, July 2021 15:15',
//   },
//   {
//     browser: 'Chrome on MacOS',
//     icon: 'tabler-brand-apple',
//     color: 'secondary',
//     device: 'Apple iMac',
//     location: 'India',
//     activity: '16, July 2021 16:17',
//   },
//   {
//     browser: 'Chrome on Windows',
//     icon: 'tabler-brand-windows',
//     color: 'info',
//     device: 'HP Spectre 360',
//     location: 'Switzerland',
//     activity: '20, July 2021 21:01',
//   },
//   {
//     browser: 'Chrome on Android',
//     icon: 'tabler-brand-android',
//     color: 'success',
//     device: 'Oneplus 9 Pro',
//     location: 'Dubai',
//     activity: '20, July 2021 21:01',
//   },
// ]

// functions

const saveData = () => {

  salaryArray.value.push(salaryDetails.value)


  // reset data 
 
  salaryDetails.value.salarySy= "",
  salaryDetails.value.salaryDoller= "",
  salaryDetails.value.dateFirstSession= "",
  salaryDetails.value.costOfSession= "",
  salaryDetails.value.notes= ""
}
</script>

<template>
  <VRow>
    {{ salaryDe }}
    <VCol cols="12">
      <!-- 👉 Change password -->
      <VCard title=" الراتب">
        <VCardText>
          <VForm @submit.prevent="() => { }">
            <VRow>
              <VCol cols="12" md="6">
                <AppTextField v-model="salaryDetails.salaryInHours" label=" الراتب 'SY' " type="number" />
              </VCol>
              <VCol cols="12" md="6">
                <AppTextField v-model="salaryDetails.salaryDate" label=" الراتب '$' " type="number" />
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12" md="6">
                <AppTextField v-model="salaryDetails.dateFirstSession" label="تاريخ أول جلسة" type="date" />
              </VCol>
              <VCol cols="12" md="6">
                <AppTextField v-model="salaryDetails.costOfSession" label="تكلفة الجلسة" type="number" />
              </VCol>

              <VCol cols="12" >
                <AppTextarea v-model="salaryDetails.notes" label="ملاحظات" />
              </VCol>

              <VCol cols="12" class="text-left">
                <VBtn type="submit" @click="saveData">
                  التالي
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol><VCol cols="12">
  <!-- 👉 Recent devices -->
  <VCard title="الرواتب">
    <VDivider />
  
    <!-- <VDataTable :items="salaryArray" :headers="recentDeviceHeader" hide-default-footer> -->
      <!--
        <template #item.browser="{ item }">
        <div class="d-flex">
        <VIcon
        :icon="item.raw.icon"
        :color="item.raw.color"
        :size="22"
        class="me-3"
        />
        {{ item.raw.browser }}
        </div>
        </template> 
      -->
      <!-- TODO Refactor this after vuetify provides proper solution for removing default footer -->
      <!-- <template #bottom /> -->
    <!-- </VDataTable> -->
  </VCard>
</VCol>
</VRow>

<!-- 👉 Enable One Time Password Dialog -->
<TwoFactorAuthDialog v-model:isDialogVisible="isTwoFactorDialogOpen" :sms-code="smsVerificationNumber" />
</template>
