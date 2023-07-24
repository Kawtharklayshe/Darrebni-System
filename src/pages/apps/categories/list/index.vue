<script setup lang="ts">
import { useCategoriesstore } from '@/views/apps/categories/useCategoriesstore'

// 👉 Store
const categoriesstore = useCategoriesstore()
const swal = inject('$swal')

const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const totalcategoriess = ref(0)
const categoriess = ref<any[]>({})
const categoryType = ref('category')

const categoryTypeList = ref([{
  name: 'Category', id: 'category',
},
{
  name: 'Sub Category', id: 'sub_category',
},
{
  name: 'Company', id: 'company',
}])

const isDialogVisible = ref(false)

watch(isDialogVisible, value => {
  if (!value)
    return

  setTimeout(() => {
    isDialogVisible.value = false
  }, 4000)
})

const FetchData = () => {
  // let Category=null
  // let subCategory=null
  // if(categoryType.value=='category'){
  //   Category=1
  //   subCategory=0
  // }
  // else{
  //   Category=0
  //   subCategory=1
  // }
  isDialogVisible.value = true
  categoriesstore.fetchcategories(
    {
   
      need: categoryType.value,
      page_size: rowPerPage.value,
      page: currentPage.value,

    },
  ).then(response => {

    categoriess.value = response.data.data
    isDialogVisible.value = false
    totalPage.value = response.data.last_page
    totalcategoriess.value = response.data.total
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
      categoriesstore.Deletecategories(id).then(response => {
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

// 👉 Fetch categoriess
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
  const firstIndex = categoriess.value.length ? ((currentPage.value - 1) * rowPerPage.value) + 1 : 0
  const lastIndex = categoriess.value.length + ((currentPage.value - 1) * rowPerPage.value)

  return `Showing ${firstIndex} to ${lastIndex} of ${totalcategoriess.value} entries`
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
    <div class="d-flex my-6  mx-5">
      <h6 class="d-flex me-2  align-center font-weight-medium justify-sm-end text-xl mb-3">
        <VSelect
          v-model="categoryType"
          :items="categoryTypeList"

          item-title="name"
          item-value="id"
          label="Select Category Type"
          style="width: 20.9rem;"
        />
      </h6>
    </div>
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
            slug
          </th>

          <th scope="col">
            ACTIONS
          </th>
        </tr>
      </thead>

      <!-- 👉 Table Body -->
      <tbody>
        <tr
          v-for="item in categoriess"
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
            {{ item.slug }}
          </td>
          <!-- 👉 Actions -->
          <td style="width: 8rem;">
            <VBtn
              icon
              size="x-small"
              color="info"
              variant="text"
              :to="{ name: 'apps-categories-edit-id', params: { id: item.id } }"
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
      <tfoot v-show="!categoriess">
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
