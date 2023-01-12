<template>
  <Transition name="modal" appear>
    <div class="modal modal-overlay">
      <div class="modal-window">
        <div class="modal-content">
          <slot />
        </div>
        <footer class="modal-footer">
          <slot name="footer">
            <button @click="$emit('close')">다음 당첨자 뽑기</button>
          </slot>
        </footer>
      </div>
      <canvas id="canvas" @click.self="$emit('close')"></canvas>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  let W = window.innerWidth;
  let H = window.innerHeight;
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const maxConfettis = 150;
  const particles = [];

  const possibleColors = [
    'DodgerBlue',
    'OliveDrab',
    'Gold',
    'Pink',
    'SlateBlue',
    'LightBlue',
    'Gold',
    'Violet',
    'PaleGreen',
    'SteelBlue',
    'SandyBrown',
    'Chocolate',
    'Crimson',
  ];

  function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }

  function confettiParticle() {
    this.x = Math.random() * W; // x
    this.y = Math.random() * H - H; // y
    this.r = randomFromTo(11, 33); // radius
    this.d = Math.random() * maxConfettis + 11;
    this.color =
      possibleColors[Math.floor(Math.random() * possibleColors.length)];
    this.tilt = Math.floor(Math.random() * 33) - 11;
    this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
    this.tiltAngle = 0;

    this.draw = function () {
      context.beginPath();
      context.lineWidth = this.r / 2;
      context.strokeStyle = this.color;
      context.moveTo(this.x + this.tilt + this.r / 3, this.y);
      context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
      return context.stroke();
    };
  }

  function Draw() {
    const results = [];

    // Magical recursive functional love
    requestAnimationFrame(Draw);

    context.clearRect(0, 0, W, window.innerHeight);

    for (let i = 0; i < maxConfettis; i++) {
      results.push(particles[i].draw());
    }

    let particle = {};
    let remainingFlakes = 0;
    for (let i = 0; i < maxConfettis; i++) {
      particle = particles[i];

      particle.tiltAngle += particle.tiltAngleIncremental;
      particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
      particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

      if (particle.y <= H) {
        remainingFlakes = remainingFlakes + 1;
      }

      // If a confetti has fluttered out of view,
      // bring it back to above the viewport and let if re-fall.
      if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
        particle.x = Math.random() * W;
        particle.y = -30;
        particle.tilt = Math.floor(Math.random() * 10) - 20;
      }
    }

    return results;
  }

  window.addEventListener(
    'resize',
    function () {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    },
    false,
  );

  // Push new confetti objects to `particles[]`
  for (var i = 0; i < maxConfettis; i++) {
    particles.push(new confettiParticle());
  }

  // Initialize
  canvas.width = W;
  canvas.height = H;
  Draw();
});
</script>

<style scoped>
/* 오버레이 스타일 */
.modal.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.224);
}
.modal-window {
  background: #fff;
  border-radius: 0.5rem;
  overflow: hidden;
}
.modal-content {
  padding: 1.5rem 2rem 1rem;
}
.modal-footer {
  background: var(--color-wemade-theme);
  padding: 1rem;
  text-align: center;
}
.modal-footer button {
  color: #fff;
  font-weight: 700;
  border: 1px solid #fff;
  transition: all 0.3s;
}
.modal-footer button:hover {
  background-color: #fff;
  color: var(--color-wemade-theme);
  border: 1px solid #fff;
}
/* 오버레이 트랜지션 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}
/* 오버레이에 포함되어 있는 모달 윈도의 트랜지션 */
.modal-enter-active .modal-window,
.modal-leave-active .modal-window {
  transition: opacity 0.4s, transform 0.4s;
}
/* 딜레이가 적용된 모달 윈도가 제거된 후에 오버레이가 사라짐 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease 0.4s;
}
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-window,
.modal-leave-to .modal-window {
  opacity: 0;
  transform: translateY(-20px);
}
/* confettie 오버레이 */
canvas {
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: hidden;
  overflow-x: hidden;
  z-index: -10;
  width: 100vw;
}
</style>
