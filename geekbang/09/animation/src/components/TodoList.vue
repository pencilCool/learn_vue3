<template>
  <div class="dustin">🗑</div>
  <div class="animate-wrap">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="animate" v-show="animate.show">📋</div>
    </transition>
  </div>
  <div>
    <transition name="modal">
      <div class="info-wrapper" v-if="showModal">
        <div class="info">bro. no data input!</div>
      </div>
    </transition>

    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <button v-if="active < all" @click="clear">clear</button>
    <ul v-if="todos.length">
      <transition-group name="flip-list" tag="ul">
        <li v-for="(todo, i) in todos" :key="todo.title">
          <input type="checkbox" v-model="todo.done" />
          <span :class="{ done: todo.done }"> {{ todo.title }}</span>
          <span class="remove-btn" @click="removeTodo($event, i)"> ❌ </span>
        </li>
      </transition-group>
    </ul>
    <div v-else>no data</div>
    <div>
      select all
      <input type="checkbox" v-model="allDone" />
      <span> {{ active }} / {{ all }}</span>
    </div>
  </div>
  <div>
    <h1 @click="add">{{ count }}</h1>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
let showModal = ref(false)

let title = ref('')
let todos = ref([{ title: '学习Vue', done: false }])

function addTodo() {
  if (!title.value) {
    showModal.value = true
    setTimeout(() => {
      showModal.value = false
    }, 1500)
    return
  }
  todos.value.push({
    title: title.value,
    done: false
  })
  title.value = ''
}
function clear() {
  todos.value = todos.value.filter((v) => !v.done)
}
let active = computed(() => {
  return todos.value.filter((v) => !v.done).length
})

let all = computed(() => todos.value.length)

let allDone = computed({
  get: function () {
    return active.value === 0
  },
  set: function (value) {
    todos.value.forEach((todo) => {
      todo.done = value
    })
  }
})

let count = ref(1)
let color = ref('red')
function add() {
  count.value++
  color.value = Math.random() > 0.5 ? 'blue' : 'red'
}

let animate = reactive({ show: false, el: null })

function beforeEnter(el) {
  let dom = animate.el
  let rect = dom.getBoundingClientRect()
  let x = window.innerWidth - rect.left - 60
  let y = rect.top - 10
  el.style.transform = `translate(-${x}px, ${y}px)`
}

function enter(el, done) {
  document.body.offsetHeight
  el.style.transform = `translate(0,0)`
  el.addEventListener('transitionend', done)
}

function afterEnter(el) {
  animate.show = false
  el.style.display = 'none'
}

function removeTodo(e, i) {
  animate.el = e.target
  animate.show = true
  todos.value.splice(i, 1)
}
</script>

<style scoped>
h1 {
  color: v-bind(color);
}

.info-wrapper {
  position: fixed;
  top: 20px;
  width: 200px;
}

.info {
  padding: 20px;
  color: white;
  background: #d889d8;
}

.modal-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}

.modal-enter-active {
  transform: all 0.3s ease;
}

.modal-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}

.modal-leave-active {
  transform: all 0.3s ease;
}

.flip-list-move {
  transition: transform 0.8s ease;
}
.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 1s ease;
}
.flip-list-enter-from,
.flip-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.animate-wrap .animate {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 100;
  transition: all 0.5s linear;
}
</style>
