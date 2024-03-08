<script setup>



const items = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء','الاربعاء', 'الخميس', 'الجمعة']
const selected = ref([])
const time = ref('')

const salaryDetails=ref({
  salaryInHours: "",
  salaryDate: "",

  // الحضور بالساعات
  attendanceHours: "",

  //الخصم
  salaryDeduction: "",
})

const salaryArray=ref([

])

// Recent devices Headers
const recentDeviceHeader = [
  {
    title: 'الراتب بالساعة',
    key: 'salaryInHours',
  },
  {
    title: 'تاريخ الراتب',
    key: 'salaryDate',
  },
  {
    title: 'عدد ساعات الحضور',
    key: 'attendanceHours',
  },
  {
    title: 'الخصم',
    key: 'salaryDeduction',
  },
  {
    title: 'الراتب المستحق',
    key: 'total',
  },
]

// const recentDevices = [
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

const saveData = () =>{
  
  salaryArray.value.push(salaryDetails.value)

  // reset data 
  // salaryDetails.value.salaryInHours = ""
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <!-- 👉 Change password -->
      <VCard title="مدة المسار">
        <VCardText>
          <VForm @submit.prevent="() => { }">
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
              <AppSelect
              v-model="selected"
              :items="items"
              label="أيام المسار"
              chips
              multiple
            />
              </VCol>
              <VCol
                cols="12"
                md="3"
              >
               <AppDateTimePicker
              v-model="time"
              label="ساعة البدء"
              :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i' }"
            /></VCol> <VCol>
           <AppDateTimePicker
    v-model="time"
    label="ساعة  الانتهاء"
    :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i' }"
  /> </VCol>
             
            </VRow>
            <VRow>
            
              <VCol cols="12">
                <VBtn
                  type="submit"
                  @click="saveData"
                >
                  حفظ
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

   

    
  </VRow>

  <!-- 👉 Enable One Time Password Dialog -->
  <TwoFactorAuthDialog
    v-model:isDialogVisible="isTwoFactorDialogOpen"
    :sms-code="smsVerificationNumber"
  />
</template>
