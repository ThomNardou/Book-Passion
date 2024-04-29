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
    console.log(typeof this.lastBooks);
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
            for (let i = 0; i<result.data.data.rows.length; i++) {
                this.lastBooks.push(result.data.data.rows[i])
            }

            console.log(this.lastBooks[0])
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
  <div v-if="lastBooks.length > 0">
    <bookCompent
      :userName="'test'"
      :authorname="lastBooks[0].writer"
      :title="lastBooks[0].title"
    />
  </div>
  <div v-else>
    <!-- Affichez un message pendant le chargement des données -->
    <p>Chargement des livres...</p>
  </div>
</template>

<style></style>
