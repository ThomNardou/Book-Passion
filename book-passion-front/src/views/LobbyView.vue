<script setup>
import LobbyHeader from "@/components/Lobby/LobbyHeader.vue";
import bookCompent from "@/components/Lobby/bookCompent.vue";
import axios from "axios";
</script>

<script>
export default {
  data() {
    return {
      lastBooks: [],
    };
  },
  mounted() {
    this.getAllbooks();
  },
  methods: {
    async getAllbooks() {
      axios
        .get("http://localhost:3000/api/books?order=createdAt", {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcxMzg3NTA5OSwiZXhwIjoxNzQ1NDMyNjk5fQ.kZlgeCnH1RHoFw1N4mhnU8BLDYY1TNsa4onihyRymoI",
          },
        })
        .then((result) => {
          this.lastBooks = result.data.data.rows
          console.log(this.lastBooks)
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
  <div v-if="lastBooks.length > 0" class="bookContainer">
      <bookCompent
        v-for="book in lastBooks"
        :userName="'test'"
        :authorname="book.writer"
        :title="book.title"
        :imageSrc="book.coverImage"
      />
  </div>
  <div v-else>
    <!-- Affichez un message pendant le chargement des données -->
    <div class="custom-loader"></div>
  </div>
</template>

<style scoped>
.custom-loader {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: conic-gradient(#0000 10%, #94e8b4);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: s3 1s infinite linear;
}
@keyframes s3 {
  to {
    transform: rotate(1turn);
  }
}

.bookContainer {
  display: flex;
}
</style>
