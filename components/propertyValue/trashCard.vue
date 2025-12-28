<template>
  <BaseCard minHeight="150px" :loading="item.loading">
    <div class="flex flex-column px-10 py-10">
      <div class="w-100 flex">
        <div class="w-100 flex flex-column align-end">
          <BaseIcon
            name="line-md:menu-to-close-alt-transition"
            class="cursor-pointer"
            size="20"
            @click="emit('restore', { id: item.id, type: 'danger' })"
          />
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
          <BaseTitle class="pt-5">Property :</BaseTitle>
        </div>
        <div class="w-60 flex flex-column align-end">
          <BaseSubTitle class="color-primary-1 pt-5">{{
            item.name
          }}</BaseSubTitle>
        </div>
      </div>

      <div class="w-100 flex mt-5">
        <div class="w-40 flex flex-column align-start">
          <BaseTitle class="pt-5">Value Name :</BaseTitle>
        </div>
        <div class="w-60 flex flex-column align-end">
          <BaseSubTitle class="color-primary-1 pt-5">{{
            item.properttyId.name
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
