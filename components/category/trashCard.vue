<template>
  <BaseCard minHeight="150px" :loading="item.loading">
    <div class="flex flex-column px-10 py-10">
      <div class="w-100 flex">
        <div class="w-40 flex align-start">
          <BaseDropMenu v-model:dropMenu="dropMenu">
            <div
              class="flex align-center color-secondary-1 cursor-pointer"
              @click="
                (emit('restore', { ...item, type: 'success' }),
                (dropMenu = false))
              "
            >
              <BaseIcon name="solar:refresh-bold" size="20" />
              <span class="f-s-12 f-w-500 px-5">Restore</span>
            </div>
          </BaseDropMenu>
        </div>

        <div class="w-60 flex flex-column align-end">
          <!-- remove side -->
        </div>
      </div>

      <div class="flex align-center w-100 mt-5">
        <BaseTitle class="pt-2">Created By</BaseTitle>
        <BaseAvatar
          width="35px"
          height="35px"
          :character="item.submiter[0]"
          :name="item.submiter"
          class="mx-8"
        />
      </div>

      <div class="w-100 flex mt-5">
        <div class="w-40 flex flex-column align-start">
          <BaseTitle class="pt-5">Category Name :</BaseTitle>
        </div>
        <div class="w-60 flex flex-column align-end">
          <BaseSubTitle class="color-primary-1 pt-5">{{
            item.name
          }}</BaseSubTitle>
        </div>
      </div>

      <div class="w-100 flex mt-5">
        <div class="w-40 flex flex-column align-start">
          <BaseTitle class="f-s-12 f-w-500 pt-5">Created at :</BaseTitle>
        </div>
        <div class="w-60 flex flex-column align-end">
          <BaseDate class="color-gray-1 pt-5">{{ item.created_at }}</BaseDate>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
const emit = defineEmits(['restore']);
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});

const dropMenu = ref(false);
</script>
