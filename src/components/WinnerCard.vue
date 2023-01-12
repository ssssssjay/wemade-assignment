<template>
  <div class="sect-winner">
    <p class="text-celebrate">축하합니다!</p>
    <div class="img-wrapper">
      <img :src="props.img_url" :alt="`${props.name} 이미지`" />
    </div>
    <p class="text-winner">
      <strong>{{ props.name }}</strong> 님
    </p>
    <strong>{{ props.winGoods }}</strong>
    <p class="text-description">수령하러 나와주세요🥰</p>
  </div>
</template>

<script setup>
const props = defineProps({
  id: String,
  img_url: String,
  name: String,
  company: String,
  winGoods: String,
});
</script>

<style scoped>
.sect-winner {
  text-align: center;
}
.text-celebrate {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.img-wrapper {
  overflow: hidden;
  margin-bottom: 1rem;
  width: 240px;
  height: 240px;
  margin: 0 auto 1rem;
  background-color: var(--vt-c-divider-dark-1);
  border-radius: 1rem;
}
.img-wrapper img {
  border-radius: 1rem;
  object-fit: cover;
  height: 100%;
}

.text-winner {
  line-height: 1.5rem;
  margin: 0 auto 0.5rem;
}
.text-description {
  margin-top: 0.5rem;
}
/* 공통 strong 스타일 */
strong {
  font-size: 1.5rem;
  font-weight: 700;
}
</style>
