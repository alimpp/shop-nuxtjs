<template>
  <BaseTable :data="dataSource" :columns="columns" searchable showColumnToggle>
    <template #actions="{ row }">
      <div class="flex">
        <BaseIconContent
          bgClass="bg-primary-2"
          name="solar:info-circle-linear"
          size="20"
          class="mx-5 cursor-pointer"
          width="28px"
          height="28px"
          @Click="getData(row)"
        />
        <BaseIconContent
          bgClass="bg-primary-1"
          name="solar:flag-2-broken"
          size="20"
          class="mx-5 cursor-pointer"
          width="28px"
          height="28px"
        />
        <BaseIconContent
          bgClass="bg-primary-4"
          name="streamline-freehand:shopping-basket-1"
          size="20"
          class="mx-5 cursor-pointer"
          width="28px"
          height="28px"
        />
      </div>
    </template>
  </BaseTable>

  <CustomersTabsUsersOsDataModal
    :isOpen="osDataModalState"
    :data="userData"
    :info="osUserData"
    @close="osDataModalState = false"
  />
</template>

<script setup>
import { customersController } from '../../../../controllers/Customers';

const dataStore = useCustomersStore();

const osDataModalState = ref(false);

const userData = ref({ name: '', phone: '' });
const osUserData = ref(null);

const columns = ref([
  { key: 'fristname', label: 'Fristname', sortable: true, visible: true },
  { key: 'lastname', label: 'Lastname', sortable: true, visible: true },
  { key: 'email', label: 'Email', sortable: true, visible: true },
  { key: 'phone', label: 'Phone', sortable: true, visible: true },
  { key: 'created_at', label: 'Created At', sortable: true, visible: true },
]);

const dataSource = computed(() => {
  return dataStore.getCustomersList;
});

const getData = async (data) => {
  const res = await customersController.getUserData(data.id);

  if (res) {
    osDataModalState.value = !osDataModalState.value;
    userData.value = {
      name: data.fristname ? data.fristname + '-' + data.lastname : data.phone,
      phone: data.fristname ? data.phone : '',
    };
    osUserData.value = res;
  }
};
</script>
