<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import { useCourseStore } from '@/views/apps/course/useCoursestore'

interface Permission {
  name: string
  read: boolean
  write: boolean
  create: boolean
}

interface Roles {
  name: string
  description?: string
  permissions: Permission[]
}

interface Props {
  rolePermissions?: Roles
  isDialogVisible: boolean
}
interface Emit {
  (e: 'update:isDialogVisible', value: boolean): void
  (e: 'update:rolePermissions', value: Roles): void
}

const props = withDefaults(defineProps<Props>(), {
  rolePermissions: () => ({
    name: '',
    description: '',
    permissions: [],
  }),
})

const emit = defineEmits<Emit>()
const coursestore = useCourseStore()

// 👉 Permission List
const permissions = ref<Permission[]>([])

coursestore.fetchPermission().then(response => {

  permissions.value = response.data
})

const isSelectAll = ref(false)
const role = ref('')
const description = ref('')
const refPermissionForm = ref<VForm>()

const checkedCount = computed(() => {
  let counter = 0

  permissions.value.forEach(permission => {
    Object.entries(permission).forEach(([key, value]) => {
      if (key !== 'name' && value)
        counter++
    })
  })

  return counter
})

const isIndeterminate = computed(() => checkedCount.value > 0 && checkedCount.value < (permissions.value.length * 3))

// select all
watch(isSelectAll, val => {
  permissions.value = permissions.value.map(permission => ({
    ...permission,
    read: val,
    write: val,
    create: val,
  }))
})

// if Indeterminate is false, then set isSelectAll to false
watch(isIndeterminate, () => {
  if (!isIndeterminate.value)
    isSelectAll.value = false
})

// if all permissions are checked, then set isSelectAll to true
watch(permissions, () => {
  if (checkedCount.value === (permissions.value.length * 3))
    isSelectAll.value = true
}, { deep: true })

// if rolePermissions is not empty, then set permissions
watch(props, () => {
  if (props.rolePermissions && props.rolePermissions.permissions.length) {
    role.value = props.rolePermissions.name
    description.value = props.rolePermissions.description
    permissions.value = permissions.value.map(permission => {
      const rolePermission = props.rolePermissions?.permissions.find(item => item.name === permission.name)

      if (rolePermission) {
        return {
          ...permission,
          ...rolePermission,
        }
      }

      return permission
    })
  }
})

const swal = inject('$swal')

const onSubmit = () => {
  const rolePermissions = {
    name: role.value,
    permissions: permissions.value,
    description: description.value,
  }


  emit('update:rolePermissions', rolePermissions)
  emit('update:isDialogVisible', false)
  coursestore.addRole(rolePermissions).then(res => {
    swal({
      title: ' Added ',
      icon: 'success',
      customClass: {
        confirmButton: 'btn btn-primary',
      },
      buttonsStyling: false,
    })
  })
    .catch(error => {
      loading.value = false
      swal({
        title: '',
        text: `${error.response.data.message}`,
        icon: 'error',
        confirmButtonText: 'ok',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
    })
  isSelectAll.value = false
  refPermissionForm.value?.reset()
}

const onReset = () => {
  emit('update:isDialogVisible', false)
  isSelectAll.value = false
  refPermissionForm.value?.reset()
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 900"
    :model-value="props.isDialogVisible"
    @update:model-value="onReset"
  >
    <!-- 👉 Dialog close btn -->
    <DialogCloseBtn @click="onReset" />

    <VCard class="pa-sm-8 pa-5">
      <!-- 👉 Title -->
      <VCardItem class="text-center">
        <VCardTitle class="text-h3 mb-3">
          {{ props.rolePermissions.name ? 'Edit' : 'Add New' }} Role
        </VCardTitle>
        <p class="text-base mb-0">
          Set Role Permissions
        </p>
      </VCardItem>

      <VCardText class="mt-6">
        <!-- 👉 Form -->
        <VForm ref="refPermissionForm">
          <!-- 👉 Role name -->
          <AppTextField
            v-model="role"
            label="Role Name"
            placeholder="Enter Role Name"
          />
          <AppTextField
            v-model="description"
            label="Role Descripation"
            placeholder="Enter Role Name"
          />

          <h6 class="text-h4 mt-8 mb-3">
            Role Permissions
          </h6>

          <!-- 👉 Role Permissions -->

          <VTable class="permission-table text-no-wrap">
            <!-- 👉 Admin  -->
            <tr>
              <td>
                Administrator Access
              </td>
              <td colspan="3">
                <div class="d-flex justify-end">
                  <VCheckbox
                    v-model="isSelectAll"
                    v-model:indeterminate="isIndeterminate"
                    label="Select All"
                  />
                </div>
              </td>
            </tr>

            <!-- 👉 Other permission loop -->
            <template
              v-for="permission in permissions"
              :key="permission.name"
            >
              <tr>
                <td>{{ permission.name }}</td>
                <td>
                  <div class="d-flex justify-end">
                    <VCheckbox
                      v-model="permission.read"
                      label="Read"
                    />
                  </div>
                </td>
                <td>
                  <div class="d-flex justify-end">
                    <VCheckbox
                      v-model="permission.write"
                      label="Write"
                    />
                  </div>
                </td>
                <td>
                  <div class="d-flex justify-end">
                    <VCheckbox
                      v-model="permission.create"
                      label="Create"
                    />
                  </div>
                </td>
              </tr>
            </template>
          </VTable>

          <!-- 👉 Actions button -->
          <div class="d-flex align-center justify-center gap-3 mt-6">
            <VBtn @click="onSubmit">
              Submit
            </VBtn>

            <VBtn
              color="secondary"
              variant="tonal"
              @click="onReset"
            >
              Cancel
            </VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.permission-table {
  td {
    border-block-end: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    padding-block: 0.5rem;

    .v-checkbox {
      min-inline-size: 4.75rem;
    }

    &:not(:first-child) {
      padding-inline: 0.5rem;
    }

    .v-label {
      white-space: nowrap;
    }
  }
}
</style>
