<script setup lang="ts">
import { usefaqsstore } from '@/views/apps/faq/usefaqsstore'

// 👉 Store
const faqsstore = usefaqsstore()
const swal = inject('$swal')

const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const totalfaqss = ref(0)
const faqss = ref<any[]>({})

const selectedLangs = ref(1)

const LanguagesList = ref([])

const FetchData = () => {
  faqsstore.fetchfaqs(
    {
      page_size: rowPerPage.value,
      page: currentPage.value,

      language_id: selectedLangs.value,
    },
  ).then(response => {
    // .data)
    faqss.value = response.data.data

    // totalPage.value = response.data.data.last_page
    // totalfaqss.value = response.data.data.total
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
      faqsstore.Deletefaqs(id).then(response => {
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

// 👉 Fetch faqss
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
  const firstIndex = faqss.value.length ? ((currentPage.value - 1) * rowPerPage.value) + 1 : 0
  const lastIndex = faqss.value.length + ((currentPage.value - 1) * rowPerPage.value)

  return `Showing ${firstIndex} to ${lastIndex} of ${totalfaqss.value} entries`
})
</script>

<template>
  <VCard id="invoice-list">
    <VDivider />

    <!-- SECTION Table -->
    <VTable class="text-no-wrap invoice-list-table">
      <!-- 👉 Table head -->
      <thead class="text-uppercase">
        <tr>
          <th scope="col">
            question
          </th>

          <th scope="col">
            ACTIONS
          </th>
        </tr>
      </thead>

      <!-- 👉 Table Body -->
      <tbody>
        <tr
          v-for="item in faqss"
          :key="item.id"
          style="height: 3.75rem;"
        >
          <!-- 👉 Trending -->
          <td class="text-c">
            <VChip
              color="primary"
              label
            >
              {{ item.question }}
            </VChip>
          </td>

          <!-- 👉 Actions -->
          <td style="width: 8rem;">
            <VBtn
              icon
              size="x-small"
              color="info"
              variant="text"
              :to="{ name: 'apps-faq-edit-id', params: { id: item.id } }"
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
      <tfoot v-show="!faqss">
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
