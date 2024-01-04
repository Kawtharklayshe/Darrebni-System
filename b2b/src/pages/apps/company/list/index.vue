<script setup lang="ts">
import { useCompanystore } from '@/views/apps/company/useCompanystore'

// 👉 Store
const companystore = useCompanystore()
const swal = inject('$swal')

const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const totalcompanys = ref(0)
const companys = ref<any[]>({})

const selectedLangs = ref(1)
const isDialogVisible = ref(false)

watch(isDialogVisible, value => {
  if (!value)
    return

  setTimeout(() => {
    isDialogVisible.value = false
  }, 4000)
})

const FetchData = () => {
  isDialogVisible.value = true
  companystore.fetchcompany(
    {
      page_size: rowPerPage.value,
      page: currentPage.value,

    },
  ).then(response => {
    // )
    companys.value = response.data.data
    isDialogVisible.value = false
    totalPage.value = response.data.last_page
    totalcompanys.value = response.data.total
  }).catch(error => {
    console.log(error)
  })
}

const deleteLang = (id: number) => {
  swal({
    icon: 'warning',
    title: 'Are You Sure?',
    confirmButtonText: 'YES',
    cancelButtonText: 'Cancel',
    customClass: {
      confirmButton: 'btn btn-primary',
    },
  }).then(result => {
    if (result.value) {
      companystore.Deletecompany(id).then(response => {
        swal({
          title: ' Deleted ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        FetchData()
      })
        .catch(error => {
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
    }
  },
  )
}

// 👉 Fetch companys
watchEffect(() => {
  FetchData()
})

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = companys.value.length ? ((currentPage.value - 1) * rowPerPage.value) + 1 : 0
  const lastIndex = companys.value.length + ((currentPage.value - 1) * rowPerPage.value)

  return `Showing ${firstIndex} to ${lastIndex} of ${totalcompanys.value} entries`
})
</script>

<template>
  <VCard id="invoice-list">
    <VDialog
      v-model="isDialogVisible"
      width="300"
    >
      <VCard
        color="primary"
        width="300"
      >
        <VCardText class="pt-3">
          Loading Data ....
          <VProgressLinear
            indeterminate
            class="mb-0"
          />
        </VCardText>
      </VCard>
    </VDialog>

    <!-- SECTION Table -->
    <VTable class="text-no-wrap invoice-list-table">
      <!-- 👉 Table head -->
      <thead class="text-uppercase">
        <tr>
          <th scope="col">
            Icon
          </th>

          <th scope="col">
            Name
          </th>

          <th scope="col">
            description
          </th>

          <th scope="col">
            ACTIONS
          </th>
        </tr>
      </thead>

      <!-- 👉 Table Body -->
      <tbody>
        <tr
          v-for="item in companys"
          :key="item.id"
          style="height: 3.75rem;"
        >
          <!-- 👉 Id -->
          <td
            class="text-center"
            style="font-size:20px"
          >
            <span :class="item.icon" />
          </td>

          <!-- 👉 Trending -->
          <td class="text-c">
            <VChip
              color="primary"
              label
            >
              {{ item.name }}
            </VChip>
          </td>

          <td class="text-c">
            {{ item.description }}
          </td>
          <!-- 👉 Actions -->
          <td style="width: 8rem;">
            <VBtn
              icon
              size="x-small"
              color="info"
              variant="text"
              :to="{ name: 'apps-company-edit-id', params: { id: item.id } }"
            >
              <VIcon
                size="22"
                icon="tabler-edit"
              />
            </VBtn>

            <VBtn
              icon
              variant="text"
              color="error"
              size="x-small"
              @click="deleteLang(item.id)"
            >
              <VIcon
                :size="22"
                icon="tabler-trash"
              />
            </VBtn>
          </td>
        </tr>
      </tbody>

      <!-- 👉 table footer  -->
      <tfoot v-show="!companys">
        <tr>
          <td
            colspan="8"
            class="text-center text-body-1"
          >
            No data available
          </td>
        </tr>
      </tfoot>
    </VTable>
    <!-- !SECTION -->

    <VDivider />

    <!-- SECTION Pagination -->
    <VCardText class="d-flex align-center flex-wrap gap-4 py-3">
      <!-- 👉 Pagination meta -->
      <span class="text-sm text-disabled">
        {{ paginationData }}
      </span>

      <VSpacer />

      <!-- 👉 Pagination -->
      <VPagination
        v-model="currentPage"
        size="small"
        :total-visible="5"
        :length="totalPage"
        @next="FetchData"
        @prev="FetchData"
      />
    </VCardText>
    <!-- !SECTION -->
  </VCard>
</template>

<style lang="scss">
#invoice-list {
  .invoice-list-actions {
    inline-size: 8rem;
  }

  .invoice-list-filter {
    inline-size: 12rem;
  }
}

div#invoice-list {
  margin: 13px;
}
</style>
