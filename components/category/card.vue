<template>
  <BaseCard minHeight="290px">
    <div class="flex flex-column px-10 py-10">
      <div class="w-100 flex">
        <div class="w-40 flex align-start" style="position: relative">
          <BaseIcon
            name="ant-design:more-outlined"
            class="cursor-pointer"
            size="20"
            @click="dropMenu = !dropMenu"
          />
          <div
            v-if="dropMenu"
            class="fade-animation-1s custom-style flex flex-column bg-secondary-3 border-rounded px-10 py-10"
          >
            <div
              class="flex align-center color-secondary-1 cursor-pointer"
              @click="
                (emit('edit', { ...item, type: 'success' }), (dropMenu = false))
              "
            >
              <BaseIcon name="solar:pen-broken" size="20" />
              <span class="f-s-12 f-w-500 px-5">Update Category<</span>
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
          </div>
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
          <span class="f-s-12 f-w-500 pt-5">Category Name :</span>
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

<style scoped>
.custom-style {
  position: absolute;
  z-index: 100;
  left: 20px;
  width: 150px;
}
</style>
