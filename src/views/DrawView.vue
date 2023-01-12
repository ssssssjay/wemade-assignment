<template>
  <div>
    <HeaderLayout></HeaderLayout>
    <div class="sect-draw">
      <GoodsCard v-bind="currentGoods"></GoodsCard>
      <button class="btn-draw" @click="drawWinner">추첨하기</button>
      <Teleport to="body">
        <DefaultModal @close="closeWinnerModal" v-show="modal">
          <WinnerCard
            v-bind="winner"
            :winGoods="currentGoods.name"
          ></WinnerCard>
        </DefaultModal>
      </Teleport>
      <Teleport to="body">
        <WinnerLoading v-show="isLoading"></WinnerLoading>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
// components
import GoodsCard from '@/components/GoodsCard.vue';
import WinnerLoading from '@/components/WinnerLoading.vue';
import DefaultModal from '@/components/DefaultModal.vue';
import WinnerCard from '@/components/WinnerCard.vue';
import HeaderLayout from '@/components/layouts/HeaderLayout.vue';

import goods from '../data/goods.json';
import members from '../data/members.json';

// vue api
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const goodsList = ref(goods);
const membersList = ref(Object.values(members));

const currentGoods = ref(
  localStorage.getItem('currentGoods') === null
    ? goodsList.value[0]
    : JSON.parse(localStorage.getItem('currentGoods')),
);

// 깊이 감시하여 currentGoods의 quantity를 탐지
watch(
  currentGoods,
  (newVal, _) => {
    localStorage.setItem('currentGoods', JSON.stringify(newVal));
  },
  { deep: true },
);

// 당첨자 id 리스트
const winnerList = ref(
  localStorage.getItem('winnerList') === null
    ? []
    : JSON.parse(localStorage.getItem('winnerList')),
);

const winner = computed(() => {
  const id = winnerList.value[winnerList.value.length - 1];
  return membersList.value.find(member => member.id === id);
});

const totalGoodsCount = goods.reduce((acc, cur) => acc + cur.quantity, 0);

function drawWinner() {
  // 계속 뽑는걸 방지
  const memberCountForDraw = membersList.value.length;
  console.log(totalGoodsCount);
  if (winnerList.value.length === totalGoodsCount) {
    return router.push('/draw');
  }

  // 로딩창 활성화
  isLoading.value = true;

  // 당첨자 뽑기
  const winnerIdx = Math.floor(Math.random() * memberCountForDraw);
  const winnerId = membersList.value[winnerIdx].id;

  // 하나라도 같은게 있다면 true
  const isDuplicate = winnerList.value.some(memberId => memberId === winnerId);
  if (isDuplicate) return drawWinner();

  winnerList.value.push(winnerId);
  saveWinners();
  currentGoods.value.quantity -= 1;

  // 기다리는 효과를 주기위한 의도적 지연
  setTimeout(() => {
    isLoading.value = false;
    openWinnerModal();
  }, 1500);
}
function changeGoods() {
  if (currentGoods.value.quantity === 0) {
    currentGoods.value = goodsList.value[currentGoods.value.id + 1];
  }
}
// 당첨자 로컬 저장
function saveWinners() {
  localStorage.setItem('winnerList', JSON.stringify(winnerList.value));
}
// 모달 기능
const isLoading = ref(false);
const modal = ref(false);

function openWinnerModal() {
  modal.value = true;
}
function closeWinnerModal() {
  modal.value = false;
  changeGoods();
}
</script>

<style scoped>
.btn-draw {
  display: block;
  margin: 2rem auto;
}
</style>
