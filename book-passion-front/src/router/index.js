import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import('@/views/LobbyView.vue'),
    },
    {
      path: "/book/:id",
      name: "book",
      component: () => import("@/views/oneBookView.vue"),
      props: true,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/books",
      name: "books",
      component: () => import("@/views/AllBooksView.vue"),
    },
    {
      path: "/addBook",
      name: "addBook",
      component: () => import("@/views/addBookView.vue"),
    },
    {
      path: "/userPage",
      name: "userPage",
      component: () => import("@/views/userPage.vue"),
    },
    {
      path: "/updateBook/:bookId",
      name: "updateBook",
      component: () => import("@/views/updateBook.vue"),
      props: true
    }
  ],
});

export default router;
