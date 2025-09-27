<template>
  <BaseCard px="px-10">
    <div class="flex flex-column">
      <div class="flex">
        <div class="flex w-50">
          <span class="f-s-14 f-w-500">Creator</span>
        </div>
        <div class="flex w-50 justify-end pt-5">
          <BaseIconContent
            class="mx-4"
            bgClass="bg-primary-2"
            width="25px"
            height="25px"
            v-if="!updateState"
          >
            <BaseIcon
              name="solar:pen-linear"
              size="17"
              class="cursor-pointer mx-5"
              @click="changeUpdateState"
            />
          </BaseIconContent>
          <BaseIconContent
            bgClass="bg-danger-3"
            width="25px"
            height="25px"
            v-if="!updateState"
          >
            <BaseIcon
              name="line-md:menu-to-close-alt-transition"
              size="17"
              class="cursor-pointer"
            />
          </BaseIconContent>
        </div>
      </div>
      <div class="flex align-center">
        <BaseIcon name="solar:user-linear" size="20" color="#7d7be5" />
        <span class="f-s-14 f-w-600 pt-5 px-5 color-primary">{{
          data.submiter
        }}</span>
      </div>
      <BaseDivider />
      <div class="flex flex-column" v-if="updateState">
        <BaseInput
          validate="true"
          v-model:access="access"
          v-model="name"
          rules="length"
          min-length="3"
          max-length="15"
          palceholder="Enter category name"
        />
        <div class="flex py-10">
          <BaseButton
            name="Update"
            bg="bg-primary-2"
            icon="gg:check-o"
            :disabled="!access"
          />
          <BaseButton
            name="Cancel"
            bg="bg-danger-3"
            class="mx-5"
            icon="line-md:close"
            @click="updateState = !updateState"
          />
        </div>
      </div>
      <div class="flex align-center" v-else>
        <BaseIcon name="iconamoon:category-thin" size="25" color="#9e9393" />
        <span class="f-s-15 f-w-600 pt-5 px-5 color-gray">{{ data.name }}</span>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});

const updateState = ref(false);
const access = ref(false);

const name = ref('');

const changeUpdateState = () => {
  updateState.value = !updateState.value;
  name.value = props.data.name;
};

watch(updateState, (o, n) => {
  if (name) {
    access.value = true;
  }
});
</script>
