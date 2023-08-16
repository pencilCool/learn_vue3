import HelloWorld from "../components/HelloWorld.vue";
import Welcome from "../components/TheWelcome.vue";
import { createRouter, createWebHashHistory } from "./grouter/index";
const routes = [
  {
    path: "/",
    name: "home",
    component: HelloWorld,
  },
  {
    path: "/welcome",
    name: "welcome",
    component: Welcome,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
