<template>
  <div @click="add">
    {{ count }}
  </div>
  <div>{{ count }} * 2 = {{ double }}</div>
  <div @click="asyncAdd">async add</div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
// import { useStore } from '../store/gvuex'
let store = useStore()
let count = computed(() => store.state.count)
let double = computed(() => store.getters.double)

function add() {
  store.commit('add')
}

function asyncAdd() {
  store.dispatch('asyncAdd')
}
</script>
