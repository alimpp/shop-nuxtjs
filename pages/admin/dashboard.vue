<template>
  <div class="w-100 flex flex-column">
    <BaseBreadCrumbs />
    <BaseTable
      :data="users"
      :columns="columns"
      searchable
      exportable
      editable
      deletable
      show-column-toggle
      :page-size="10"
      :page-size-options="[5, 10, 25, 50]"
      search-placeholder="Search users..."
      @row-click="handleRowClick"
      @edit="handleEdit"
      @delete="handleDelete"
      @export="handleExport"
    >
      <template #actions="{ row }"></template>
      <template #empty>
        <div class="w-100 flex flex-column align-center justify-center">
          <span class="f-s-14 f-w-500">User Not Found</span>
          <BaseButton
            width="150px"
            name="Refresh Table Data"
            @click="refreshData"
            bg="bg-secondary-1"
            icon="system-uicons:refresh"
          />
        </div>
      </template>
    </BaseTable>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'admin',
});
const users = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    role: 'User',
  },
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    role: 'User',
  },
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    role: 'User',
  },
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    role: 'User',
  },
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    role: 'User',
  },
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    role: 'User',
  },
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    role: 'User',
  },
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    role: 'User',
  },
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    role: 'User',
  },
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    role: 'User',
  },
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    role: 'User',
  },
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    role: 'User',
  },
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    role: 'User',
  },
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    role: 'User',
  },
]);

const columns = ref([
  { key: 'name', label: 'Name', sortable: true, visible: true },
  { key: 'email', label: 'Email', sortable: true, visible: true },
  { key: 'status', label: 'Status', sortable: true, visible: true },
  { key: 'role', label: 'Role', sortable: true, visible: true },
]);

const handleRowClick = (row) => {
  console.log('Row clicked:', row);
};

const handleEdit = (row) => {
  console.log('Edit:', row);
};

const handleDelete = (row) => {
  console.log('Delete:', row);
};

const handleExport = () => {
  console.log('Export data');
};

const viewDetails = (row) => {
  console.log('View details:', row);
};

const refreshData = () => {
  // Refresh data logic
};
</script>

<style scoped>
.status-active {
  color: green;
  font-weight: bold;
}

.status-inactive {
  color: orange;
  font-weight: bold;
}

.btn-view {
  background: #17a2b8;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  cursor: pointer;
}

.custom-empty {
  text-align: center;
  padding: 3rem;
  color: #6c757d;
}
</style>
