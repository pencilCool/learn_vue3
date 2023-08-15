<script setup>
import Rate from "./components/Rate.vue";
import { ref } from "vue";
let score = ref(3.5);
</script>

<template>
  <h1>your score is {{ score }}</h1>
  <Rate v-model="score">课程评分</Rate>
  <Rate v-model="score">
    <img width="14" src="/favicon.ico" />
  </Rate>
</template>
