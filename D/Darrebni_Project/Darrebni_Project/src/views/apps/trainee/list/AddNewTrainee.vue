<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import {
  emailValidator,
  requiredValidator,
} from '@validators'

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'userData',
])

const Trainee=ref({
  first_name_ar:'',
  middle_name_ar:'',
  last_name_ar:'',
  first_name_en:'',
  middle_name_en:'',
  last_name_en:'',
  email:'',
  phone_number:'',
  date:''
})
// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      emit('userData', {
        id: 0,
        first_name_ar:  first_name_ar.value,
        middle_name_ar: middle_name_ar.value,
        last_name_ar:  last_name_ar.value,
        first_name_en:  first_name_en.value,
        middle_name_en: middle_name_en.value,
        last_name_en: last_name_en.value,
        email: email.value,
        phone_number: phone_number.value,
        date: date.value,
      })
      emit('update:isDrawerOpen', false)
      nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
  })
}

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="400"
    location="end"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- 👉 Title -->
    <AppDrawerHeaderSection
      title="Add User"
      @cancel="closeNavigationDrawer"
    />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- 👉 first name -->
              <VCol cols="12">
                <AppTextField
                  v-model="first_name_ar"
                  :rules="[requiredValidator]"
                  label="first_name_ar"
                />
              </VCol>
              <!-- 👉 middle name -->
              <VCol cols="12">
                <AppTextField
                  v-model="first_name_ar"
                  :rules="[requiredValidator]"
                  label="first_name_ar"
                />
                </VCol>
              <!-- 👉 last name -->
              <VCol cols="12">
                <AppTextField
                  v-model="first_name_ar"
                  :rules="[requiredValidator]"
                  label="first_name_ar"
                />
              </VCol>
              <!-- 👉 first name en -->
              <VCol cols="12">
                <AppTextField
                  v-model="first_name_en"
                  :rules="[requiredValidator]"
                  label="first_name_en"
                />
              </VCol>
              <!-- 👉 middle name en-->
              <VCol cols="12">
                <AppTextField
                  v-model="middle_name_en"
                  :rules="[requiredValidator]"
                  label="middle_name_en"
                />
              </VCol>
              <!-- 👉 last name en-->
              <VCol cols="12">
                <AppTextField
                  v-model="last_name_en"
                  :rules="[requiredValidator]"
                  label="last_name_en"
                />
              </VCol>                                          
              <!-- 👉 Email -->
              <VCol cols="12">
                <AppTextField
                  v-model="email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                />
              </VCol>
              <!-- 👉 phone number -->
              <VCol cols="12">
                <AppTextField
                  v-model="phone_number"
                  :rules="[requiredValidator]"
                  label="Email"
                />
              </VCol>
              <!-- 👉 date -->
              <VCol cols="12">
                <AppTextField
                  v-model="date"
                  :rules="[requiredValidator]"
                  label="Email"
                />
              </VCol>                            
              <!-- 👉 Submit and Cancel
              <VCol cols="12">
                <VBtn
                  type="submit"
                  class="me-3"
                >
                  Submit
                </VBtn>
                <VBtn
                  type="reset"
                  variant="tonal"
                  color="secondary"
                  @click="closeNavigationDrawer"
                >
                  Cancel
                </VBtn>
              </VCol> -->
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
