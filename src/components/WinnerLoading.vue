<template>
  <div class="loading-overlay">
    <div class="loading-window">
      <p>당첨자를 뽑고 있습니다...</p>
      <strong>0%</strong>
      <hr />
    </div>
  </div>
</template>

<script setup>
import { onUpdated } from 'vue';

onUpdated(() => {
  let counter = 0;
  let c = 0;
  const $strong = document.querySelector(
    '.loading-overlay .loading-window strong',
  );
  const $hr = document.querySelector('.loading-overlay .loading-window hr');
  let i = setInterval(() => {
    $strong.textContent = `${c}%`;
    $hr.style.width = `${c}%`;
    counter++;
    c++;

    if (counter == 101) {
      clearInterval(i);
    }
  }, 10);
});
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  background: #0d0d0daa;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading-overlay .loading-window {
  text-align: center;
}
.loading-overlay .loading-window p {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-wemade-theme);
  margin-bottom: 1rem;
}
.loading-overlay .loading-window strong {
  color: white;
  font-size: 4rem;
  font-weight: 700;
}
.loading-overlay .loading-window hr {
  background: var(--color-wemade-theme);
  border: none;
  height: 3px;
}
</style>
