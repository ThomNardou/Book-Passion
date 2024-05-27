<script setup>
import { AkEdit, AnOutlinedDelete  } from "@kalimahapps/vue-icons";
import { ref } from "vue";
import axios from "axios";

let haveError = ref(false);

const props = defineProps({
    book: {
        type: Object,
        required: true,
    }
})

async function deleteBook(bookId) {
    axios.delete(`http://localhost:3000/api/books/${bookId}`, {
        headers: {
            Authorization: 'Bearer ' + localStorage.token
        }
    })
    .then((res) => {
        alert("Vous avez bien supprimer le livre !!")
        haveError.value = false;
        location.reload();
    })
    .catch((err) => {
        console.log(err)
        haveError.value = true;
    })
}
</script>
<template>
    <div class="book" v-if="!haveError && book">
        <img alt="book cover image" :src="book.coverImage" id="coverImage">
        <div class="data">
            <h2>{{ book.title }}</h2>
            <p><span class="blue">Catégorie</span> : {{ book.t_category.name }}</p>
            <p><span class="blue">Nombre de pages</span> : {{ book.numberPages }}</p>
            <p><span class="blue">Auteur</span> : {{ book.writer }}</p>
            <p><span class="blue">Éditeur</span> : {{ book.editor }}</p>
            <p><span class="blue">Année d'édition</span> : {{ book.releaseYear }}</p>
        </div>
        <div class="updateBook">
            <router-link :to="{name: 'updateBook', params: { bookId: book.id } }"><AkEdit class="icon"/></router-link>
            <AnOutlinedDelete class="icon" @click="deleteBook(book.id)"/>
        </div>
    </div>
</template>
<style scoped>
* {
    font-family: kanit;
}

.icon {
    color: white;
    font-size: 50px;
    margin: 0 10px;
    cursor: pointer;
}

#delete {
    margin-left: 10%;
}
.updateBook {
    margin-left: 30%;
    display: flex;
}
#coverImage {
    height: 250px;
    margin-right: 5%;
}

.book {
    display: flex;
    align-items: center;
    background-color: #D9D9D925;
    border: solid black 1px;
}

.book:hover {
    background-color: #00000025;
}

p,
h2 {
    color: white;
}

.blue {
    color: #80C99C;
}
</style>