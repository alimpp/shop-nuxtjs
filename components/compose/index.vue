<template>
  <div
    class="orders-content-style border-rounded w-200-px h-40-px bg-primary-2 slid-left-animation-3"
    v-if="activeCompose"
    @click="emited('')"
  >
    <BaseIcon class="mx-5" color="#7d7be5" size="20" name="hugeicons:note" />
    <span class="f-s-12 f-w-500 color-primary">Orders</span>
  </div>
  <div
    class="basket-content-style border-rounded w-200-px h-40-px bg-primary-2 slid-left-animation-5"
    v-if="activeCompose"
    @click="emited('')"
  >
    <BaseIcon
      class="mx-5"
      color="#7d7be5"
      size="20"
      name="solar:bag-2-linear"
    />
    <span class="f-s-12 f-w-500 color-primary">Basket</span>
  </div>
  <div
    class="profile-content-style border-rounded w-200-px h-40-px bg-primary-2 slid-left-animation-8"
    v-if="activeCompose"
    @click="emited('profile')"
  >
    <BaseIcon class="mx-5" color="#7d7be5" size="20" name="solar:user-broken" />
    <span class="f-s-12 f-w-500 color-primary">Profile</span>
  </div>
  <div
    class="support-content-style border-rounded w-200-px h-40-px bg-primary-2 slid-left-animation-1s"
    v-if="activeCompose"
    @click="emited('support')"
  >
    <BaseIcon
      color="#7d7be5"
      class="mx-5"
      size="20"
      name="clarity:chat-bubble-line"
    />
    <span class="f-s-12 f-w-500 color-primary">Support</span>
  </div>
  <div
    class="float-button bg-primary-2"
    v-if="route.path != '/profile' && route.path != '/profile/address'"
  >
    <BaseIcon
      color="#7d7be5"
      name="line-md:close"
      v-if="activeCompose"
      @click="handleActiveCompose"
    />
    <BaseIcon
      v-else
      color="#7d7be5"
      name="solar:user-rounded-linear"
      width="28"
      height="28"
      @click="handleActiveCompose"
    />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();

const applicationStore = useApplicationStore();

const emit = defineEmits(['signal']);

const activeCompose = computed(() => {
  return applicationStore.getComposeState;
});

const emited = (data) => {
  emit('signal', data);
  applicationStore.setCompose();
};

const handleActiveCompose = () => {
  applicationStore.setCompose();
};
</script>

<style scoped>
.float-button {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
  bottom: 0;
  right: 0;
  margin-bottom: 12px;
  margin-right: 12px;
  cursor: pointer;
}

.orders-content-style {
  position: fixed;
  z-index: 10;
  bottom: 0;
  right: 0;
  margin-bottom: 65px;
  margin-right: 35px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.basket-content-style {
  position: fixed;
  z-index: 10;
  bottom: 0;
  right: 0;
  margin-bottom: 112px;
  margin-right: 35px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.profile-content-style {
  position: fixed;
  z-index: 10;
  bottom: 0;
  right: 0;
  margin-bottom: 159px;
  margin-right: 35px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.support-content-style {
  position: fixed;
  z-index: 10;
  bottom: 0;
  right: 0;
  margin-bottom: 206px;
  margin-right: 35px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.active-style {
  transform: rotate(135deg);
  transition: 1s;
}

.deactive-style {
  transform: rotate(0deg);
  transition: 1s;
}
</style>
