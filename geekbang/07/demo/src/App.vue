<script setup>
import Rate from "./components/Rate.vue";
</script>

<template>
  <main>
    <Rate :value="3"></Rate>
    <Rate :value="4" theme="red"></Rate>
    <Rate :value="1" theme="green"></Rate>
  </main>
</template>
