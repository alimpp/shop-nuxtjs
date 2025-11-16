<template>
  <div class="w-100 h-60-px custom-style flex">
    <div class="w-50 flex px-10 align-center">
      <BaseAvatar width="45px" height="45px" :character="admin.username[0]" />
    </div>
    <div class="w-50 flex justify-end px-10 align-center">
      <BaseIcon
        @click="router.push('/dashboard/settings')"
        class="cursor-pointer mx-5"
        name="solar:settings-outline"
        width="25"
        height="25"
      />
      <BaseIcon
        class="cursor-pointer"
        width="30"
        name="gg:menu-right"
        @click="chnageSideMenuState"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const adminStore = useAdminStore();

const admin = computed(() => {
  return adminStore.getAdmin();
});

const emit = defineEmits(['chnageSideMenuState']);

const chnageSideMenuState = () => {
  emit('chnageSideMenuState');
};
</script>

<style scoped>
.custom-style {
  border-bottom: 1px solid #aca5a542;
}
</style>
