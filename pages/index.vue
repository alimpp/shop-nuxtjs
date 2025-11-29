<template>
  <div class="container flex">
    <BaseCarousel
      :slides="slides"
      :auto-slide="true"
      :slide-interval="4000"
      :show-indicators="true"
      :show-navigation="true"
    >
      <template #slide="{ slide, index }">
        <div class="custom-slide">
          <img :src="slide.image" :alt="slide.alt" />
        </div>
      </template>
    </BaseCarousel>
  </div>
</template>

<script setup>
const slides = [
  {
    image:
      'https://wpengine.com/wp-content/uploads/2021/05/optimize-images-1024x681.jpg',
    alt: 'First slide',
    title: 'عنوان اول',
    description: 'توضیحات اسلاید اول',
  },
  {
    image:
      'https://wpengine.com/wp-content/uploads/2021/05/optimize-images-1024x681.jpg',
    alt: 'Second slide',
    title: 'عنوان دوم',
    description: 'توضیحات اسلاید دوم',
  },
  {
    image:
      'https://wpengine.com/wp-content/uploads/2021/05/optimize-images-1024x681.jpg',
    alt: 'Third slide',
    title: 'عنوان سوم',
    description: 'توضیحات اسلاید سوم',
  },
  {
    image:
      'https://wpengine.com/wp-content/uploads/2021/05/optimize-images-1024x681.jpg',
    alt: 'First slide',
    title: 'عنوان اول',
    description: 'توضیحات اسلاید اول',
  },
  {
    image:
      'https://wpengine.com/wp-content/uploads/2021/05/optimize-images-1024x681.jpg',
    alt: 'Second slide',
    title: 'عنوان دوم',
    description: 'توضیحات اسلاید دوم',
  },
  {
    image:
      'https://wpengine.com/wp-content/uploads/2021/05/optimize-images-1024x681.jpg',
    alt: 'Third slide',
    title: 'عنوان سوم',
    description: 'توضیحات اسلاید سوم',
  },
  {
    image:
      'https://wpengine.com/wp-content/uploads/2021/05/optimize-images-1024x681.jpg',
    alt: 'First slide',
    title: 'عنوان اول',
    description: 'توضیحات اسلاید اول',
  },
  {
    image:
      'https://wpengine.com/wp-content/uploads/2021/05/optimize-images-1024x681.jpg',
    alt: 'Second slide',
    title: 'عنوان دوم',
    description: 'توضیحات اسلاید دوم',
  },
  {
    image:
      'https://wpengine.com/wp-content/uploads/2021/05/optimize-images-1024x681.jpg',
    alt: 'Third slide',
    title: 'عنوان سوم',
    description: 'توضیحات اسلاید سوم',
  },
];
</script>
