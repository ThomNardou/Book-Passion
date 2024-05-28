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
        console.log(res)

        if (res.data.data) {
            usersBook.value = res.data.data.rows;
        }
        console.log(usersBook.value.length)
    })
    .catch((err) => {
        console.log(err)
    })
}
</script>
<template>
    <div v-if="haveError" class="container">
        <router-link to="/addBook" class="addBook">Ajouter un livre</router-link>
        <p>Une erreur est survenue lors de la récupération de vos livres</p>
    </div>
    <div v-else-if="usersBook.length <= 0" class="container">
        <router-link to="/addBook" class="addBook">Ajouter un livre</router-link>
        <p>Vous n'avez pas encore enregistré de livre</p>
    </div>
    <div v-else class="container" >
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
    padding: 10px;
    margin: 50px;
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
    min-height: calc(100vh - 120px);
}

.container p {
    color: white;
    font-size: 30px;
    text-align: center;
}

.book {
    /* backdrop-filter: blur(50px); */
    margin: 20px 0;
}
</style>