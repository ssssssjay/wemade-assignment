<template>
  <div class="sect-goods">
    <p class="text-intro">고생하신 위플인을 위한 상품은</p>
    <p class="text-highlight">
      <strong>{{ props.name }}</strong> 입니다
    </p>
    <div class="img-wrapper">
      <img :src="props.img_prefix + props.img" :alt="`${props.name} 이미지`" />
    </div>
    <p class="text-quantity">{{ computedQuantity }}</p>
    <p class="text-animation">{{ props.description }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  id: Number,
  name: String,
  quantity: Number,
  img_prefix: String,
  img: String,
  description: String,
});

const computedQuantity = computed(() => {
  if (props.quantity === 1) {
    return '마지막 상품입니다...!!!';
  }
  if (props.quantity === 0) {
    return '아쉽게도 모두 가져가셨어요ㅜㅜ';
  }
  return `${props.quantity}개 남았습니다`;
});
</script>

<style scoped>
.sect-goods {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 2rem;
  border-radius: 0.5rem;
  max-width: 960px;
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
}
.text-intro {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
/* text-intro dots */
.text-intro:after {
  content: ' .';
  animation: dots 1s steps(5, end) infinite;
}

@keyframes dots {
  0%,
  20% {
    color: rgba(0, 0, 0, 0);
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  40% {
    color: #000;
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  60% {
    text-shadow: 0.25em 0 0 #000, 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  80%,
  100% {
    text-shadow: 0.25em 0 0 #000, 0.5em 0 0 #000;
  }
}
.text-highlight {
  font-size: 1.5rem;
}
.text-highlight strong {
  font-weight: 700;
}
.img-wrapper {
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  margin: 1rem 0;
}
.img-wrapper img {
  height: 100%;
}
.text-quantity {
  font-size: 1.2rem;
  line-height: 1.2rem;
  margin-bottom: 0.5rem;
}
.text-animation {
  animation-duration: 1s;
  animation-name: textAnimation;
  animation-iteration-count: infinite;
  animation-direction: alternate;

  line-height: 2rem;
  margin: 0;
}

@keyframes textAnimation {
  from {
    font-size: 2rem;
  }

  to {
    font-size: 1.5rem;
  }
}
</style>
