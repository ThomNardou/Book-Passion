<script setup>
import userBook from "@/components/userPage/userBook.vue"
import { onMounted, ref } from "vue";
import { decodeToken } from "@/utils/decodeTokenTool.mjs";
import axios from "axios";


let usersBook = ref([]);
let haveError = ref(false);

onMounted(() => {
    if (!localStorage.getItem('token')) {
        alert("Vous n'avez pas accès à cette ressource, merci de bien vouloir vous authentifier")
        location.href = '/'
    }
    getUserBooks()
})

async function getUserBooks() {
    axios.get(`http://localhost:3000/api/user/${decodeToken(localStorage.token).userId}/books`)
    .then((res) => {
        usersBook.value = res.data.data.rows;
        console.log(usersBook.value)
    })
    .catch((err) => {
        console.log(err)
    })
}
</script>
<template>
    <div class="container" v-if="!haveError || userBook.length > 0">
        <router-link to="/addBook" class="addBook">Ajouter un livre</router-link>
        <userBook class="book" v-for="book in usersBook" :book="book"></userBook>
    </div>
</template>
<style scoped>

* {
    font-family: kanit;
}

p {
    margin-top: 120px;
}

.addBook {
    margin-top: 120px;
    margin-left: 20px;
    padding: 10px;
    background-color: #f1f1f1;
    border-radius: 5px;
    text-decoration: none;
    color: black;
}

.container {
    background-image: url('/teamWallpaper.webp');
    background-attachment: fixed;
    background-size: cover;
    padding-top: 200px;
}

.book {
    /* backdrop-filter: blur(50px); */
    margin: 20px 0;
}
</style>