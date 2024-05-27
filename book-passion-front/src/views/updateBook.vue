<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { ref } from 'vue';

let categories = ref([]);

const props = defineProps(["bookId"])
let oldBook = ref({});
let newBook = ref({});


onMounted(() => {
    if (!localStorage.getItem('token')) {
        alert("Vous n'avez pas accès à cette ressource, merci de bien vouloir vous authentifier")
        location.href = '/'
    }
    getOldValues();
    console.log(props)
})

async function getOldValues() {
    await axios.get(`http://localhost:3000/api/books/${props.bookId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.token }
    })
        .then((res) => {
            oldBook.value = res.data.data;
            console.log(oldBook.value)
        })
        .catch((err) => {
            console.log(err)
        })
}

async function getCategories() {
    await axios.get('http://localhost:3000/api/categories')
        .then((res) => {
            categories.value = res.data.data.rows;
        })
        .catch((err) => {
            console.log(err)
        })
}

async function editBook() {



    await axios.put(`http://localhost:3000/api/books/${props.bookId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.token },
    })

}
</script>
<template>
    <div id="container">
        <h1>Modifier un livre</h1>
        <form>
            <div id="left">
                <img :src="oldBook.coverImage" alt="cover image" id="coverImage">
            </div>
            <div id="right">
                <label style="grid-area: 1/1;">Titre du livre</label>
                <input style="grid-area: 2/1;" type="text" :placeholder="oldBook.title" v-model="newBook.title">

                <label style="grid-area: 1/2;">Catégorie</label>
                <select required style="grid-area: 2/2;">
                    <option disabled selected>-- Categorie --</option>
                    <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                </select>

                <label style="grid-row: 3;">Résumé</label>
                <input style="grid-row: 4;" type="text" :placeholder="oldBook.summary">

                <label>Extrait</label>
                <input type="text" :placeholder="oldBook.excerpt">

                <label style="grid-area: 4/1;">Auteur</label>
                <input style="grid-area: 5/1;" type="text" :placeholder="oldBook.writer">

                <label style="grid-area: 4/2;">Éditeur</label>
                <input style="grid-area: 5/2;" type="text" :placeholder="oldBook.editor">

                <label >Image de couverture</label>
                <input type="text" :placeholder="oldBook.coverImage">

                <label>Année d'édition</label>
                <input type="text" :placeholder="oldBook.releaseYear">

                <label>Nombre de pages</label>
                <input type="text" :placeholder="oldBook.numberPages">

                <button @submit.prevent="editBook">Modifier</button>
            </div>
        </form>
    </div>
</template>
<style scoped>
#right {
    display: grid;
    grid-template: repeat(12, 1fr) / 1fr 1fr;
}

#coverImage {
    height: 400px;
}

form {
    background-color: #FFFFFF41;
    display: flex;
}

#container {
    display: flex;
    justify-content: center;
    flex-direction: column;
}

p,
h1, label {
    color: white;
}

h1 {
    margin-top: 120px;
}
</style>