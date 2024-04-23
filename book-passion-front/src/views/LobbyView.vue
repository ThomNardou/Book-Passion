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
    console.log(this.lastBooks);
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
        //   console.log(result);

          this.lastBooks[0] = result.data.data.rows[0].editor;
          console.log(this.lastBooks);
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
  <bookCompent
    :userName="'test'"
    :authorname="lastBooks.writer"
    :title="lastBooks.title"
  />
</template>

<style></style>
