import { createRouter, createWebHistory } from "vue-router";
import LobbyView from "@/views/LobbyView.vue";
import OneBookView from "@/views/oneBookView.vue";
import LoginView from "@/views/LoginView.vue";
import AllBooksView from "@/views/AllBooksView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LobbyView,
    },
    {
      path: "/book/:id",
      name: "book",
      component: OneBookView,
      props: true,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/books",
      name: "books",
      component: AllBooksView
    }
  ],
});

export default router;
