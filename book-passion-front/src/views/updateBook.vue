<script setup>
import { onMounted } from 'vue';

let categories = [];

const props = defineProps({
    book: {
        type: Object,
        required: true,
    }
})

onMounted(() => {
    if (!localStorage.getItem('token')) {
        alert("Vous n'avez pas accès à cette ressource, merci de bien vouloir vous authentifier")
        location.href = '/'
    }
})

async function editBook() {
            await axios.post('http://localhost:3000/api/books', {
                title: this.newBook.title,
                numberPages: this.newBook.nbrPage,
                excerpt: this.newBook.extrait,
                summary: this.newBook.resume,
                writer: this.newBook.author,
                editor: this.newBook.editor,
                releaseYear: this.newBook.releasedYear,
                avgRating: 0,
                coverImage: this.newBook.coverImage,
                fk_user: decodeToken(localStorage.token).userId,
                fk_category: this.newBook.category
            },
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.token
                    }
                })
                .then((res) => {
                    console.log(res)
                })
        }
</script>
<template>
    <div id="container">
        <h1>Modifier un livre</h1>
        <form>
            <div id="left">
                <img :src="book.coverImage" alt="cover image" id="coverImage">
            </div>
            <div id="right">
                <label>Titre du livre</label>
                <input type="text" :placeholder="book.title">

                <label>Catégorie</label>
                <select required v-model="book.category">
                    <option disabled selected>-- Categorie --</option>
                    <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                </select>

                <label>Résumé</label>
                <input type="text" :placeholder="book.excerpt">

                <label>Auteur</label>
                <input type="text" :placeholder="book.writer">

                <label>Éditeur</label>
                <input type="text" :placeholder="book.editor">

                <label>Image de couverture</label>
                <input type="text" :placeholder="book.coverImage">

                <label>Année d'édition</label>
                <input type="text" :placeholder="book.releaseYear">

                <label>Nombre de pages</label>
                <input type="text" :placeholder="book.numberPages">

                <button @submit.prevent="editBook">Modifier</button>
            </div>
        </form>
    </div>
</template>
<style scoped>
#right {
    display: grid;
    grid-template: 1fr 1fr / repeat(12, 1fr);
}

#coverImage {
    height: 400px;
}

form {
    background-color: #FFFFFF41;
}

#container {
    display: flex;
    justify-content: center;
    flex-direction: column;
}

p,
h1 {
    color: white;
}

h1 {
    margin-top: 120px;
}
</style>