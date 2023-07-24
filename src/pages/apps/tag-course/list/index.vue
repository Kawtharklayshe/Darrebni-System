<script setup lang="ts">
import { useassignmentstore } from '@/views/apps/assignment/useassignmentstore'
import { useCourseStore } from '@/views/apps/course/useCoursestore'

// 👉 Store
const assignmentstore = useassignmentstore()
const coursestore = useCourseStore()
const swal = inject('$swal')

const rowPerPage = ref(10)
const course_id = ref('')
const currentPage = ref(1)
const totalPage = ref(1)
const totalassignments = ref(0)
const assignments = ref<any[]>({})

const courseList = ref([])

const photo = ref('@images/avatars/avatar-14.png')

const FetchCourse = () => {
  coursestore.fetchcourselist(
    {
      page_size: 10000,
      page: 1,

    },
  ).then(response => {
    // )
    courseList.value = response.data.data
  }).catch(error => {
    console.log(error)
  })
}

// 👉 Fetch categoriess
watchEffect(() => {
  FetchCourse()
})

const isDialogVisible = ref(false)

const FetchData = id => {
  console.log(id)
  isDialogVisible.value = true
  assignmentstore.fetchassignment(
    {
      id,
      page_size: rowPerPage.value,
      page: currentPage.value,

    },
  ).then(response => {
    // )
    assignments.value = response.data.data
    isDialogVisible.value = false
    totalPage.value = response.data.last_page
    totalassignments.value = response.data.total
  }).catch(error => {
    console.log(error)
  })
}

watch(course_id, value => {
  FetchData(course_id.value)
})

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
      assignmentstore.Deleteassignment(id).then(response => {
        swal({
          title: ' Deleted ',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        FetchData(course_id.value)
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

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = assignments.value.length ? ((currentPage.value - 1) * rowPerPage.value) + 1 : 0
  const lastIndex = assignments.value.length + ((currentPage.value - 1) * rowPerPage.value)

  return `Showing ${firstIndex} to ${lastIndex} of ${totalassignments.value} entries`
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
          v-model="course_id"
          :items="courseList"

          item-title="name"
          item-value="id"
          label="Select Course"
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
            title
          </th>

          <th scope="col">
            ACTIONS
          </th>
        </tr>
      </thead>

      <!-- 👉 Table Body -->
      <tbody>
        <tr
          v-for="item in assignments"
          :key="item.id"
          style="height: 3.75rem;"
        >
          <!-- 👉 Trending -->
          <td class="text-c">
            <VChip
              color="primary"
              label
            >
              {{ item.title }}
            </VChip>
          </td>

          <!--
            <td class="text-c">
            {{ item.price }}
            </td>
          -->
          <!-- 👉 Actions -->
          <td style="width: 8rem;">
            <VBtn
              icon
              size="x-small"
              color="info"
              variant="text"
              :to="{ name: 'apps-assignment-edit-id', params: { id: item.id } }"
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
      <tfoot v-show="!assignments">
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
