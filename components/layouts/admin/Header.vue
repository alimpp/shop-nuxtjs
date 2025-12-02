<template>
  <div class="w-100 h-80-px flex align-center justify-center">
    <div
      class="flex align-center w-96 h-55-px custom-border"
      :class="{
        'sidebar-header-bg': appTheme == 'dark',
        'bg-white': appTheme == 'light',
      }"
    >
      <div class="w-50 flex px-10 align-center">
        <BaseIcon
          class="cursor-pointer"
          width="30"
          name="gg:menu-right"
          @click="chnageSideMenuState"
        />
      </div>
      <div class="w-50 flex justify-end px-10 align-center">
        <BaseIcon
          @click="settingModal = true"
          class="cursor-pointer mx-5"
          name="solar:settings-outline"
          width="25"
          height="25"
          v-if="route.path != '/admin/settings'"
        />
        <NotificationCount :sideMenuState="sideMenuState" />
        <BaseAvatar
          v-if="!sideMenuState"
          width="45px"
          height="45px"
          :character="admin.username[0]"
        />
      </div>
    </div>

    <SettingsModal :isOpen="settingModal" @close="settingModal = false" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();

const props = defineProps({ sideMenuState: { default: false } });

const settingModal = ref(false);

const applicationStore = useApplicationStore();
const appTheme = computed(() => {
  return applicationStore._state.theme;
});

const adminStore = useAdminStore();

const admin = computed(() => {
  return adminStore.getAdmin;
});

const emit = defineEmits(['chnageSideMenuState']);

const chnageSideMenuState = () => {
  emit('chnageSideMenuState');
};
</script>

<style scoped>
.custom-border {
  border: 1px solid #aca5a542;
  border-radius: 10px;
}
</style>
