<template>
  <BaseCard>
    <div class="flex flex-column px-10 py-10">
      <div class="w-100 flex mt-5">
        <div class="w-40 flex flex-column align-start">
          <span class="f-s-12 f-w-500">Category Name :</span>
        </div>
        <div class="w-60 flex flex-column align-end">
          <span class="f-s-12 f-w-500 color-primary-1 pt-5">{{
            item.name
          }}</span>
        </div>
      </div>
      <div class="w-100 flex mt-5">
        <div class="w-40 flex flex-column align-start">
          <span class="f-s-12 f-w-500 pt-5">Creator :</span>
        </div>
        <div class="w-60 flex flex-column align-end">
          <span class="f-s-12 f-w-500 color-primary-1 pt-5">{{
            item.submiter
          }}</span>
        </div>
      </div>
      <div class="w-100 flex mt-5">
        <div class="w-40 flex flex-column align-start">
          <span class="f-s-12 f-w-500 pt-5">Image :</span>
        </div>
        <div class="w-60 flex flex-column align-end">
          <img
            :src="item.imageId"
            alt="Cateory Image"
            class="w-100-px border-rounded mt-5"
          />
        </div>
      </div>
      <div class="w-100 flex mt-5">
        <div class="w-40 flex flex-column align-start">
          <span class="f-s-12 f-w-500 pt-5">Icon :</span>
        </div>
        <div class="w-60 flex flex-column align-end">
          <img
            :src="item.iconId"
            alt="Cateory Image"
            class="w-100-px border-rounded mt-5"
            @click="emit('edit', item)"
          />
        </div>
      </div>
      <BaseDivider class="mt-10" />
      <div class="w-100 flex justify-end pt-10">
        <BaseButton
          icon="solar:pen-broken"
          bg="bg-primary-2"
          @click="emit('edit', { ...item, type: 'success' })"
        />
        <BaseButton
          class="mx-5"
          icon="solar:trash-bin-trash-linear"
          bg="bg-danger-2"
          @click="emit('remove', { id: item.id, type: 'danger' })"
        />
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
const emit = defineEmits(['remove', 'edit']);
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});
</script>
