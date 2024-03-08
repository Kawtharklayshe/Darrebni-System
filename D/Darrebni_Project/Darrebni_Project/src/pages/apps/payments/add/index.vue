<script setup>
import { avatarText } from '@/@core/utils/formatters'
import data from '@/views/demos/forms/tables/data-table/datatable'
import { VDataTable } from 'vuetify/labs/VDataTable'

// import dz


const paths = ['FrontEnd', 'BackEnd', 'Mobile Application', 'UI/UX']
const sections = ['إيميسا', " التربية"]
const pathSelected = ref('')
const sectionSelected = ref('')

const headers = [
  { title: ' الاسم', key: 'full_name' },
  { title: 'المسار', key: 'email' },
  { title: 'تاريخ بداية المسار', key: 'start_date' },
  { title: 'التكلفة', key: 'salary' },

  // { title: 'AGE', key: 'age' },
  { title: 'مكتمل؟', key: 'status' },
]



const resolveStatusVariant = status => {
 
  if (status === 1)
    return { color: 'success', text: 'Professional' }
  else 
    return { color: 'error', text: 'Rejected' }
}


// functions
const print = obj => {
  console.log(obj) 
  console.log(obj.age + "  " + obj.email)
}

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
      <VCard title=" الدفعات">
        <VCardText>
          <VForm @submit.prevent="() => { }">
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="sectionSelected"
                  :items="sections"
                  label="الفرع"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="pathSelected"
                  :items="paths"
                  label="المسار"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol
                cols="12"
                md="6"
              />
            </VRow>
            <VRow class="mt-8">
              <AppTextField
                v-model="search"
                prepend-inner-icon="tabler-search"
                placeholder="البحث عن اسماء..."
                class=" chat-list-search"
              />
              <VDataTable
                :headers="headers"
                :items="data"
                :items-per-page="5"
              >
                <!-- full name -->
              
                <template #item.full_name="{ item }">
                  <div
                    class="d-flex align-center"
                    @click="print(item.raw)"
                  >
                    <VAvatar
                      size="32"
                      :color="item.raw.avatar ? '' : 'primary'"
                      :class="item.raw.avatar ? '' : 'v-avatar-light-bg primary--text'"
                      :variant="!item.raw.avatar ? 'tonal' : undefined"
                    >
                      <VImg
                        v-if="item.raw.avatar"
                        :src="item.raw.avatar"
                      />
                      <span v-else>{{ avatarText(item.raw.full_name) }}</span>
                    </VAvatar>
                    <div class="d-flex flex-column ms-3">
                      <span class="d-block font-weight-medium text--primary text-truncate">{{ item.raw.full_name }}</span>
                      <small>{{ item.raw.post }}</small>
                    </div>
                  </div>
                </template>
          
                <template #item.status="{ item }">
                  <VChip
                    :color="resolveStatusVariant(item.raw.status).color"
                    density="comfortable"
                    class="font-weight-medium"
                    size="small"
                  >
                    {{ resolveStatusVariant(item.raw.status).text }}
                  </VChip>
                </template>
              </VDataTable>
           
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
