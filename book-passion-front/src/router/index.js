import { createRouter, createWebHistory } from "vue-router";
import LobbyView from "@/views/LobbyView.vue";
import OneBookView from "@/views/oneBookView.vue";
import LoginView from "@/views/LoginView.vue";
import AllBooksView from "@/views/AllBooksView.vue";
import AddBookView from "@/views/addBookView.vue";
import userPage from "@/views/userPage.vue";

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
    },
    {
      path: "/addBook",
      name: "addBook",
      component: AddBookView
    },
    {
      path: "/userPage",
      name: "userPage",
      component: userPage
    }
  ],
});

export default router;
