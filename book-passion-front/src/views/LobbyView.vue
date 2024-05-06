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


  <div class="description">
    <h1>About <span>Us</span></h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Sed sed risus pretium quam vulputate dignissim suspendisse. Magna fermentum iaculis eu non diam
      phasellus vestibulum lorem. Diam donec adipiscing tristique risus nec feugiat. Ipsum dolor sit amet consectetur
      adipiscing elit duis tristique sollicitudin. Elit eget gravida cum sociis natoque penatibus. Quis risus sed
      vulputate odio ut enim. Molestie ac feugiat sed lectus vestibulum. Mattis nunc sed blandit libero volutpat sed
      cras. Id leo in vitae turpis massa sed elementum tempus egestas. Id nibh tortor id aliquet lectus. Nunc id cursus
      metus aliquam eleifend mi in nulla posuere. Malesuada pellentesque elit eget gravida cum sociis natoque. Nec
      ultrices dui sapien eget mi proin sed libero. Adipiscing elit duis tristique sollicitudin nibh sit. Enim sed
      faucibus turpis in eu mi.
    </p>
  </div>


  <div v-if="lastBooks.length > 0" class="bookContainer">
    <bookCompent v-for="book in lastBooks" :userName="'test'" :authorname="book.writer" :title="book.title"
      :imageSrc="book.coverImage" />
  </div>
  <div v-else>
    <!-- Affichez un message pendant le chargement des données -->
    <div class="custom-loader"></div>
  </div>


</template>

<style scoped>
* {
  font-family: kanit;
  color: white;
}

.description {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 60px 0;
}

.description h1,
.description p {
  width: 60%;
}

span {
  color: #94e8b4;
}

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
  flex-wrap: wrap;
  justify-content: center;
}
</style>
