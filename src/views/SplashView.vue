<template>
  <div>
    <TransitionGroup tag="ul" name="fade" class="container">
      <li v-for="item in items" class="item" :key="item">
        {{ item }}
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const messages = [
  '한 해 동안 고생하신 여러분을 위해',
  '위메이드플레이가 준비했습니다',
  '진심으로 감사드립니다',
];

const items = ref([]);
for (let i = 1; i < 4; i++) {
  setTimeout(() => {
    items.value.push(messages[i - 1]);
  }, 1500 * i);
}

setTimeout(() => {
  router.replace('/draw');
}, 8000);
</script>

<style scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--vt-c-white);
  color: var(--vt-c-black);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: fadeout 8s;
}
@keyframes fadeout {
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.item {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  word-break: keep-all;
  text-align: center;
}
.item:nth-child(2) {
  color: var(--color-wemade-theme);
}
.item:last-child {
  margin-bottom: 0;
}
/* 1. 트랜지션 선언 */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. 진입 및 진출 상태 선언 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. 진출하는 리스트 아이템이 레이아웃에서 제외되어,
움직이는 아이템들이 올바르게 계산되도록 합니다. */
.fade-leave-active {
  position: absolute;
}
</style>
