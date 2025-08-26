<template>
  <BaseModal
    @close="close"
    :isOpen="isOpen"
    title="Profile"
    text="Update Profile Information"
  >
    <template #icon>
      <BaseIcon name="fluent:data-usage-edit-20-regular" />
    </template>
    <template #content>
      <div class="flex flex-column w-100 px-5">
        <BaseInput
          class="w-100 mt-5"
          placeholder="Enter fristname"
          label="Fristname"
          v-model="form.fristname"
        />

        <BaseInput
          class="w-100 mt-5"
          placeholder="Enter lastname"
          label="Lastname"
          v-model="form.lastname"
        />
        <BaseInput
          class="w-100 mt-5"
          placeholder="Enter email"
          label="Email"
          v-model="form.email"
        />
        <BaseInput
          class="w-100 mt-5"
          placeholder="Enter phone"
          label="Phone"
          v-model="form.phone"
          disabled="true"
        />
      </div>
    </template>
    <template #footer>
      <div class="flex w-100 align-center py-5 px-5">
        <BaseButton
          name="Submit Profile"
          @click="submit"
          width="130px"
          icon="gg:check-o"
          :loading="loading"
        />
        <BaseButton
          name="Cancel"
          @click="emit('close')"
          icon="line-md:close"
          class="mx-5"
          bg="bg-red"
        />
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import { userController } from '@/controllers/User';

const userStore = useUserStore();

const loading = ref(false);
const form = ref({
  fristname: '',
  lastname: '',
  email: '',
  phone: '',
});

const emit = defineEmits(['close']);
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const close = () => {
  emit('close');
};

watch(
  () => props.isOpen,
  (oldVal, newVal) => {
    if (props.isOpen) {
      form.value.fristname = userStore.getUser.fristname;
      form.value.lastname = userStore.getUser.lastname;
      form.value.email = userStore.getUser.email;
      form.value.phone = userStore.getUser.phone;
    }
  },
  { deep: true }
);

const submit = async () => {
  loading.value = true;
  await userController.updateProfile({
    fristname: form.value.fristname,
    lastname: form.value.lastname,
    email: form.value.email,
    avatarUrl: '',
  });
  loading.value = false;
  emit('close');
};
</script>
