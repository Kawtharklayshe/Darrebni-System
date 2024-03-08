<script setup>
import { computed } from 'vue'

const items = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعة']
const selected = ref([])
const time = ref('')
const dateRange = ref('')
let courseHoures = ref('')
const salaryDetails=ref({
  salaryInHours: "",
  salaryDate: "",

  // الحضور بالساعات
  attendanceHours: "",

  //الخصم
  salaryDeduction: "",
})
// let numOfDays = ref("")

//computed values
let numOfDays = computed(() => {
  return selected.value.length
})
courseHoures.value = computed(() => {
  return dateRange.value * numOfDays.value * (2)
})

const salaryArray=ref([])

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


const saveData = () =>{
  
  salaryArray.value.push(salaryDetails.value)
  
  console.log("عدد ايام المسار  " + numOfDays.value);

  // reset data 
  // salaryDetails.value.salaryInHours = ""
}
</script>

<template>

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
        md="6"
      >
      <AppDateTimePicker
    v-model="dateRange"
    label="مدة المسار"
    :config="{ mode: 'range' }"
  />
      </VCol>
              
            </VRow>
            <VRow>
              <VCol
                cols="12"
                md="3"
              >
                <AppDateTimePicker
                  v-model="time"
                  label="ساعة البدء"
                  :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i' }"
                />
              </VCol> 
              <VCol
              cols="12"
                md="3"
                >
                <AppDateTimePicker
                  v-model="time"
                  label="ساعة  الانتهاء"
                  :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i' }"/>
              </VCol>
              <VCol
              cols="12"
                md="6"
                >
                <AppTextField
                  v-model="courseHoures"
                  label=" إجمالي ساعات المسار "
                  type="number"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12" class="text-left">
                <VBtn
                  type="submit"
                  @click="saveData"
                >
                  التالي
                </VBtn>
              </VCol>
            </VRow>
          </VForm>


  <!-- 👉 Enable One Time Password Dialog -->
  <TwoFactorAuthDialog
    v-model:isDialogVisible="isTwoFactorDialogOpen"
    :sms-code="smsVerificationNumber"
  />
</template>
