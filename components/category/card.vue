<template>
  <BaseCard minHeight="290px">
    <div class="flex flex-column px-10 py-10">
      <div class="w-100 flex">
        <div class="w-40 flex align-start">
          <BaseDropMenu v-model:dropMenu="dropMenu">
            <div
              class="flex align-center color-secondary-1 cursor-pointer"
              @click="
                (emit('edit', { ...item, type: 'success' }), (dropMenu = false))
              "
            >
              <BaseIcon name="solar:pen-broken" size="20" />
              <span class="f-s-12 f-w-500 px-5">Update Category</span>
            </div>
            <div
              class="flex align-center color-danger-3 mt-10 cursor-pointer"
              @click="
                (emit('remove', { id: item.id, type: 'danger' }),
                (dropMenu = false))
              "
            >
              <BaseIcon name="solar:trash-bin-trash-linear" size="20" />
              <span class="f-s-12 f-w-500 px-5">Remove Category</span>
            </div>
          </BaseDropMenu>
        </div>
        <div class="w-60 flex flex-column align-end">
          <BaseIcon
            name="line-md:menu-to-close-alt-transition"
            class="cursor-pointer"
            size="20"
            @click="
              (emit('remove', { id: item.id, type: 'danger' }),
              (dropMenu = false))
            "
          />
        </div>
      </div>

      <div class="w-100 flex mt-10">
        <div class="w-40 flex flex-column align-start">
          <BaseTitle class="pt-5">Category Name :</BaseTitle>
        </div>
        <div class="w-60 flex flex-column align-end">
          <BaseSubTitle class="color-primary-1 pt-5">{{
            item.name
          }}</BaseSubTitle>
        </div>
      </div>

      <div class="w-100 flex">
        <div class="w-40 flex flex-column align-start">
          <BaseTitle class="f-s-12 f-w-500 pt-5">Created at :</BaseTitle>
        </div>
        <div class="w-60 flex flex-column align-end">
          <BaseSubTitle class="f-s-12 f-w-500 color-primary-1 pt-5">{{
            item.created_at
          }}</BaseSubTitle>
        </div>
      </div>

      <div class="w-100 flex">
        <div class="w-40 flex flex-column align-start">
          <BaseTitle class="f-s-12 f-w-500 pt-5">Creator :</BaseTitle>
        </div>
        <div class="w-60 flex flex-column align-end">
          <BaseSubTitle class="f-s-12 f-w-500 color-primary-1 pt-5">{{
            item.submiter
          }}</BaseSubTitle>
        </div>
      </div>

      <div class="w-100 flex mt-5">
        <div class="w-40 flex flex-column align-start">
          <BaseTitle class="f-s-12 f-w-500 pt-5">Image :</BaseTitle>
        </div>
        <div class="w-60 flex flex-column align-end">
          <img
            :src="item.preViewImage"
            alt="Cateory Image"
            class="w-100-px border-rounded mt-5"
          />
        </div>
      </div>

      <div class="w-100 flex mt-5">
        <div class="w-40 flex flex-column align-start">
          <BaseTitle class="f-s-12 f-w-500 pt-5">Icon :</BaseTitle>
        </div>
        <div class="w-60 flex flex-column align-end">
          <img
            :src="item.preViewIcon"
            alt="Cateory Image"
            class="w-100-px border-rounded mt-5"
          />
        </div>
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

const dropMenu = ref(false);
</script>
