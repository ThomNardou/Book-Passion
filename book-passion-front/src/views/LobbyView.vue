<script setup>
import LobbyHeader from "@/components/Lobby/LobbyHeader.vue";
import bookCompent from "@/components/Lobby/bookCompent.vue";
import webSiteDesription from '@/components/Lobby/webSiteDescription.vue';
import ourTeamComponent from '@/components/Lobby/ourTeamComponent.vue';
import { RouterLink } from "vue-router";
import axios from "axios";
</script>

<script>
import { decodeToken } from '@/utils/decodeTokenTool.mjs'
export default {
  data() {
    return {
      lastBooks: [],
      error: {
        message: String,
        status: Number
      },
      tokenExist: false,
      token: ''
    };
  },
  mounted() {
    localStorage.getItem('token') ? (this.tokenExist = true, this.token = decodeToken(localStorage.token)) : this.tokenExist = false;
    
    this.getAllbooks();
  },
  methods: {
    async getAllbooks() {
      axios
        .get("http://localhost:3000/api/books?order=createdAt")
        .then((result) => {
          this.lastBooks = result.data.data.rows;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<template>

  <LobbyHeader />
  <webSiteDesription />

  <h1 class="lastBooks">5 last <span>Book</span></h1>

  <div v-if="lastBooks.length > 0" class="bookContainer">

    <div v-for="book in lastBooks" :key="book.id">
      <RouterLink v-if="tokenExist"
        :to="{ name: 'book', params: { id: book.id } }" class="routerLink">
  
        <bookCompent :userName="book.t_user.username" :authorname="book.writer" :title="book.title"
          :imageSrc="book.coverImage" :createdAt="book.createdAt" />
  
      </RouterLink>
  
      <div v-else class="routerLink">
        <bookCompent :userName="book.t_user.username" :authorname="book.writer" :title="book.title"
          :imageSrc="book.coverImage" :createdAt="book.createdAt" />
      </div>

    </div>


  </div>

  <div v-else class="loader">
    <div class="custom-loader"></div>
    <p>Chargement en Cours...</p>
  </div>

  <ourTeamComponent />

</template>

<style scoped>
* {
  font-family: kanit;
  color: white;
}

span {
  color: #94e8b4;
}

.lastBooks {
  text-align: center;
  font-size: 50px
}

.custom-loader {
  justify-self: center;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: conic-gradient(#0000 10%, #94e8b4);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: s3 1s infinite linear;
}

.routerLink {
  text-decoration: none;
}

.loader {
  display: grid;
  justify-content: center;
  height: 50vh;
  text-align: center;
  margin: 120px 0;
}

@keyframes s3 {
  to {
    transform: rotate(1turn);
  }
}

.bookContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 120px;
}
</style>
