<template>
  <div
    class="container flex flex-column custom-style"
    v-if="isOpen"
    :class="{
      'bg-app-dark': appTheme == 'dark',
      'bg-app-light': appTheme == 'light',
    }"
  >
    <div class="w-100 flex justify-end py-10 close-container">
      <BaseIcon
        class="cursor-pointer mx-20 mt-10"
        @click="chnageSideMenuState"
        name="line-md:menu-to-close-alt-transition"
      />
    </div>
    <div class="flex flex-column px-10 pt-10">
      <div class="flex justify-center">
        <img src="/public/logo/logo.png" alt="logo" width="150" />
      </div>
      <BaseDivider class="mt-10" />
      <div
        class="f-s-12 f-w-400 h-30-px flex align-center color-gray cursor-pointer mt-5"
        v-for="item in menuItems"
        :key="item.id"
        @click="navigate(`${item.path}`)"
        :class="{ 'active-path': route.path == item.path }"
      >
        <span class="px-5">
          {{ item.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

import { useRoute } from 'vue-router';
const route = useRoute();

const emit = defineEmits(['chnageSideMenuState']);

const props = defineProps({
  isOpen: {
    default: 'true',
    type: Boolean,
  },
});

const chnageSideMenuState = () => {
  emit('chnageSideMenuState');
};

const menuItems = ref([
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Products',
    path: '/products',
  },
  {
    name: 'Blogs',
    path: '/blogs',
  },
  {
    name: 'Support',
    path: '/support',
  },
]);
const navigate = (path) => {
  const osWidth = window.screen.width;
  router.push(path);
  if (osWidth < 650) {
    emit('chnageSideMenuState');
  }
};

const applicationStore = useApplicationStore();
const appTheme = computed(() => {
  return applicationStore._state.theme;
});
</script>

<style scoped lang="scss">
@import url('@/assets/scss/theme_colors.scss');

.custom-style {
  box-shadow: 1px 0px 0px 0px #53535320;
}

.container {
  width: 350px;
  height: 100dvh;
}

.close-container {
  display: none;
}

.active-path {
  background: var(--primary-);
  color: var(--white-);
  border-radius: 5px;
  padding: 0 10px;
  transition: 1s;
}

@media (max-width: 650px) {
  .container {
    position: fixed;
    z-index: 100;
    width: 80%;
  }
  .close-container {
    display: flex;
  }
}
</style>
