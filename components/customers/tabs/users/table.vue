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
          @Click="getOsData(row)"
        />
        <BaseIconContent
          bgClass="bg-primary-1"
          name="solar:flag-2-broken"
          size="20"
          class="mx-5 cursor-pointer"
          width="28px"
          height="28px"
          @click="getUserAddress(row)"
        />
        <BaseIconContent
          bgClass="bg-primary-4"
          name="streamline-freehand:shopping-basket-1"
          size="20"
          class="mx-5 cursor-pointer"
          width="28px"
          height="28px"
        />
        <BaseIcon
          v-if="loading"
          name="svg-spinners:bars-scale-middle"
          size="20"
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
  <CustomersTabsUsersAddressModal
    :isOpen="addressModalState"
    :data="userData"
    :info="userAddress"
    @close="addressModalState = false"
  />
</template>

<script setup>
import { addressController } from '../../../../controllers/Address';
import { customersController } from '../../../../controllers/Customers';

const dataStore = useCustomersStore();
const appStore = useApplicationStore();

const osDataModalState = ref(false);
const addressModalState = ref(false);

const userData = ref({ name: '', phone: '' });
const osUserData = ref(null);
const userAddress = ref(null);

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

const getOsData = async (data) => {
  appStore.setLoading(
    true,
    'Fetching Data',
    'Please waiting for server response'
  );
  const serverResponse = await customersController.getUserData(data.id);
  if (serverResponse) {
    osDataModalState.value = !osDataModalState.value;
    userData.value = {
      name: data.fristname ? data.fristname + '-' + data.lastname : data.phone,
      phone: data.fristname ? data.phone : '',
    };
    osUserData.value = serverResponse;
  }
  appStore.resetLoading();
};

const getUserAddress = async (data) => {
  appStore.setLoading(
    true,
    'Fetching User Address Data',
    'Please waiting for server response'
  );
  const serverResponse = await addressController.getAddressByUserId(data.id);
  if (serverResponse) {
    addressModalState.value = !addressModalState.value;
    userData.value = {
      name: data.fristname ? data.fristname + '-' + data.lastname : data.phone,
      phone: data.fristname ? data.phone : '',
    };
    userAddress.value = serverResponse;
  }
  appStore.resetLoading();
};
</script>
