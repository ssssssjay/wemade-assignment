<template>
  <div>
    <ul class="container">
      <li class="item">저희가 준비한 선물은 어떠셨나요?</li>
      <li class="item">마음에 드셨으면 좋겠습니다</li>
      <li class="item">내년에도 잘 부탁드립니다!</li>
    </ul>
  </div>
</template>

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
</style>
