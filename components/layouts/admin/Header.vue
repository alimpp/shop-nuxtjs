<template>
  <div class="w-100 h-60-px custom-style flex">
    <div class="w-50 flex px-10 align-center">
      <BaseAvatar width="45px" height="45px" :character="admin.username[0]" />
      <div class="flex flex-column justify-center px-5">
        <span class="f-s-14 f-w-600">{{ admin.username }}</span>
        <span class="f-s-12 f-w-500 color-gray">{{ admin.role }}</span>
      </div>
    </div>
    <div class="w-50 flex justify-end px-10 align-center">
      <BaseIcon
        @click="goTo('/dashboard/settings')"
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
const { goTo } = useNavigate();

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
  box-shadow: 0px 1px 0px 0px #53535320;
}
</style>
