<script setup>
import LobbyHeader from "@/components/Lobby/LobbyHeader.vue";
import bookComponent from "@/components/Lobby/bookCompent.vue";
import webSiteDescription from '@/components/Lobby/webSiteDescription.vue';
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
      token: '',
      thereHaveError: false
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
          console.log(result);
          
          if (result.data.data) {
            this.lastBooks = result.data.data.rows;
          }

          this.thereHaveError = false;
        })
        .catch((err) => {
          console.log(err);
          this.thereHaveError = true;
        });
    },
  },
};
</script>

<template>

  <LobbyHeader />
  <webSiteDescription />

  <h1 class="lastBooks">5 last <span>Book</span></h1>

  <div class="error" v-if="thereHaveError == true">
    <p>Une erreur est survenue lors de la récupération des derniers livres</p>
  </div>

  <div class="error" v-else-if="lastBooks.length <= 0">
    <p>Il n'y a pas de livre enregistrer pour l'instant</p>
  </div>
  
  <div v-else class="bookContainer">
    <div v-for="book in lastBooks" :key="book.id">
      <RouterLink v-if="tokenExist"
        :to="{ name: 'book', params: { id: book.id } }" class="routerLink">
  
        <bookComponent :userName="book.t_user.username" :authorname="book.writer" :title="book.title"
          :imageSrc="book.coverImage" :createdAt="book.createdAt" />
  
      </RouterLink>
  
      <div v-else class="routerLink">
        <bookComponent :userName="book.t_user.username" :authorname="book.writer" :title="book.title"
          :imageSrc="book.coverImage" :createdAt="book.createdAt" />
      </div>

    </div>
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

.error {
  
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
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
