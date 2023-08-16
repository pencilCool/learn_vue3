<script setup>
import { ref } from 'vue'

import TodoList from './components/TodoList.vue'
let width = ref(100)
function change() {
  width.value += 100
}

let showTitle = ref(true)
function toggle() {
  showTitle.value = !showTitle.value
}
</script>

<template>
  <div style="background-color: rgb(69, 52, 9)">
    <div class="box" :style="{ width: width + 'px' }"></div>
    <button @click="change">click</button>
    <div class="box1"></div>
    <button @click="toggle">toggle</button>
    <transition name="fade">
      <h1 v-if="showTitle">Hello Vue 3</h1>
    </transition>
    <TodoList></TodoList>
  </div>
</template>

<style scoped>
.box {
  background: red;
  height: 100px;
  transition: width 1s linear;
}

.box1 {
  width: 30px;
  height: 30px;
  position: relative;
  background: red;
  animation: movie 2s linear infinite;
}

@keyframes movie {
  0% {
    left: 0px;
  }
  50% {
    left: 200px;
  }
  100% {
    left: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
