<template>
  <div
    class="container-sidebar flex flex-column custom-style bg-app-dark"
    v-if="isOpen"
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
        <img src="/public/logo/logo.png" alt="logo" width="100" />
      </div>
      <BaseDivider class="mt-10" />
      <div
        class="f-s-14 f-w-400 h-30-px flex align-center color-gray cursor-pointer mt-10"
        v-for="item in items"
        :key="item.id"
        @click="navigate(`${item.path}`)"
        :class="{ 'active-path': route.path == item.path }"
      >
        <BaseIcon :name="item.icon" size="25" />
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

const items = ref([
  {
    id: 0,
    name: 'Dashboard',
    path: '/admin/dashboard',
    icon: 'mage:dashboard-chart',
  },
  {
    id: 1,
    name: 'CMS',
    path: '/admin/cms',
    icon: 'streamline-plump:content-statistic',
  },
  {
    id: 2,
    name: 'Support',
    path: '/admin/support',
    icon: 'mynaui:message-dots',
  },
  {
    id: 3,
    name: 'Category',
    path: '/admin/category',
    icon: 'iconamoon:category-light',
  },
  {
    id: 4,
    name: 'Property',
    path: '/admin/property',
    icon: 'hugeicons:property-new',
  },
  {
    id: 5,
    name: 'Products',
    path: '/admin/products',
    icon: 'eos-icons:products',
  },
  {
    id: 6,
    name: 'Blogs',
    path: '/admin/blogs',
    icon: 'carbon:blog',
  },
  {
    id: 7,
    name: 'Orders',
    path: '/admin/orders',
    icon: 'icon-park-outline:order',
  },
  {
    id: 8,
    name: 'Settings',
    path: '/admin/settings',
    icon: 'uil:setting',
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

.container-sidebar {
  width: 350px;
  height: 100dvh;
  border-radius: 0 20px 20px 0;
}

.close-container {
  display: none;
}

.active-path {
  background: var(--secondary3-);
  color: var(--secondary1-);
  border-radius: 5px;
  padding: 0 10px;
  transition: 1s;
}

@media (max-width: 650px) {
  .container-sidebar {
    position: fixed;
    z-index: 100;
    width: 95%;
  }
  .close-container {
    display: flex;
  }
}
</style>
