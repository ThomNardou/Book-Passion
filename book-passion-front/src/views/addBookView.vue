<script setup>
import axios from 'axios';
import { decodeToken } from '@/utils/decodeTokenTool.mjs';
</script>

<script>
export default {
    data() {
        return {
            newBook: {},
            haveError: false,
            categories: []
        }
    },
    mounted() {
        if (!localStorage.getItem('token')) {
            alert("Vous n'avez pas accès à cette resource merci de bien vouloir vous authentifier")
            location.href = '/'
        }
        this.getCategories()
    },
    methods: {
        async getCategories() {
            await axios.get('http://localhost:3000/api/categories', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.token
                }
            })
                .then((res) => {
                    this.categories = res.data.data.rows;
                    this.haveError = false;
                })
                .catch((err) => {
                    console.log(err);
                    this.haveError = true;
                })
        },
        async addBook() {
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
    }
}
</script>
<template>
    <div class="container" v-if="!haveError || categories.length > 0">
        <form> <!--TODO Should i put the form in a global component? not now-->
            <h1>Ajouter un livre</h1>
            <div>

                <div class="title">
                    <label for="title">Titre du livre<span class="star">*</span></label>
                    <input type="text" v-model="newBook.title" name="title" id="title" required>
                </div>

                <div class="category">
                    <label for="category">Catégorie<span class="star">*</span></label>

                    <select required v-model="newBook.category">
                        <option disabled selected>-- Categorie --</option>
                        <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                    </select>

                </div>

                <div class="resume">
                    <label for="resume">Résumé<span class="star">*</span></label>
                    <input type="text" v-model="newBook.resume" name="resume" id="resume" required />
                </div>

                <div class="extrait">
                    <label for="extrait">Extrait<span class="star">*</span></label>
                    <input type="text" v-model="newBook.extrait" name="extrait" id="extrait" required />
                </div>

                <div class="author">
                    <label for="author">Auteur<span class="star">*</span></label>
                    <input type="text" v-model="newBook.author" name="author" id="author" required />
                </div>

                <div class="editor">
                    <label for="editor">Éditeur<span class="star">*</span></label>
                    <input type="text" v-model="newBook.editor" name="editor" id="editor" required />
                </div>

                <div class="coverImage">
                    <label for="coverImage">Image de couverture<span class="star">*</span></label>
                    <input type="text" v-model="newBook.coverImage" name="coverImage" id="coverImage" required />
                </div>

                <div class="releasedYear">
                    <label for="releasedYear">Année d'édition<span class="star">*</span></label>
                    <input type="number" v-model="newBook.releasedYear" name="releasedYear" id="releasedYear"
                        required />
                </div>

                <div class="nbrPage">
                    <label for="nbrPage">Nombre de pages<span class="star">*</span></label>
                    <input type="number" v-model="newBook.nbrPage" name="nbrPage" id="nbrPage" required />
                </div>

                <button @submit.prevent="addBook">Ajouter</button>
            </div>
        </form>
    </div>
</template>
<style scoped>
* {
    margin: 0;
    font-family: kanit;
}

.container {
    background-image: url("/addBookWallPaper.jpeg");
    background-size: cover;
    height: calc(100vh - 120px);
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

h1 {
    display: flex;
    justify-content: center;
}

h1 {
    color: white;
}

template {
    display: flex;
    flex-direction: column;
}

/* Componant then */
form>div>div {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-top: 10px;
}

label {
    color: white
}

form {
    backdrop-filter: blur(50px);
    border: white 1px solid;
    border-radius: 30px;
    width: 50%;
    padding: 30px;
}

form>div {
    display: grid;
    grid-template: repeat(6, 1fr) / 1fr 1fr;
}

.title {
    grid-area: 1/1;
}

.category {
    grid-area: 1/2;
}

.resume {
    grid-row: 2;
    grid-column: 1/3;
}

.extrait {
    grid-row: 3;
    grid-column: 1/3;
}

.author {
    grid-area: 4/1;
}

.editor {
    grid-area: 4/2;
}

.coverImage {
    grid-area: 5/1;
}

.releasedYear {
    grid-area: 5/2;
}

.nbrPage {
    grid-row: 6;
    grid-column: 1/3;
}

.star {
    color: red;
}

button {
    margin-left: 25%;
    width: 50%;
    grid-row: 7;
    grid-column: 1/3;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>