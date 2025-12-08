<template>
  <div class="flex flex-column">
    <div class="w-100">
      <BaseCarousel
        :slides="slides"
        :auto-slide="true"
        :slide-interval="4000"
        :show-indicators="true"
        :show-navigation="true"
        :height="carouselHeight"
        @updateHeight="updateHeight"
      >
        <template #slide="{ slide, index }">
          <div class="custom-slide">
            <img class="w-100" :src="slide.image" :alt="slide.alt" />
          </div>
        </template>
      </BaseCarousel>
    </div>
    <div class="container">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur
      laudantium minima, fugit impedit ea id molestiae inventore? Asperiores
      quas, rem debitis possimus ratione harum esse neque, natus ab, voluptas
      tempora.
    </div>
  </div>
</template>

<script setup>
const carouselHeight = ref('600px');

const updateHeight = (height) => {
  carouselHeight.value = height;
};

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
