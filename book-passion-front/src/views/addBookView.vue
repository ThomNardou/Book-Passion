<script setup>
// let title, category, resume, extrait, author, editor, coverImage, releasedYear, nbrPage

// function checkInput() {
//     title = document.getElementById("title").value;
//     category = document.getElementById("category").value;
//     resume = document.getElementById("resume").value;
//     extrait = document.getElementById("extrait").value;
//     author = document.getElementById("author").value;
//     editor = document.getElementById("editor").value;
//     coverImage = document.getElementById("coverImage").value;
//     releasedYear = document.getElementById("releasedYear").value;
//     nbrPage = document.getElementById("nbrPage").value;
//     alert(`${title} ${category} ${resume} $`)
// }
</script>

<script>
export default {
    mounted() {
        let title, category, resume, extrait, author, editor, coverImage, releasedYear, nbrPage
    },
    methods: {
        checkInput() {
            title = document.getElementById("title").value;
            category = document.getElementById("category").value;
            resume = document.getElementById("resume").value;
            extrait = document.getElementById("extrait").value;
            author = document.getElementById("author").value;
            editor = document.getElementById("editor").value;
            coverImage = document.getElementById("coverImage").value;
            releasedYear = document.getElementById("releasedYear").value;
            nbrPage = document.getElementById("nbrPage").value;

        }
    }
}
</script>
<template><!--TODO background-image-->
    <div class="container">
        <h1>Ajouter un livre</h1>
        <form> <!--TODO Should i put the form in a global component? not now-->
            <div> <!--TODO v-model??-->
                <div class="title">
                    <label for="title">Titre du livre<span class="star">*</span></label>
                    <input type="text" name="title" id="title" required>
                </div>
                <div class="category">
                    <label for="category">Catégorie<span class="star">*</span></label>
                    <!--TODO select the category from the database (TODO later)-->
                    <input type="text" name="category" id="category" required />
                </div>
                <div class="resume">
                    <label for="resume">Résumé<span class="star">*</span></label>
                    <input type="text" name="resume" id="resume" required />
                </div>
                <div class="extrait">
                    <label for="extrait">Extrait<span class="star">*</span></label>
                    <input type="text" name="extrait" id="extrait" required />
                </div>
                <div class="author">
                    <label for="author">Auteur<span class="star">*</span></label>
                    <input type="text" name="author" id="author" required />
                </div>
                <div class="editor">
                    <label for="editor">Éditeur<span class="star">*</span></label>
                    <input type="text" name="editor" id="editor" required />
                </div>
                <div class="coverImage">
                    <label for="coverImage">Image de couverture<span class="star">*</span></label>
                    <input type="text" name="coverImage" id="coverImage" required />
                </div>
                <div class="releasedYear">
                    <label for="releasedYear">Année d'édition<span class="star">*</span></label>
                    <input type="text" name="releasedYear" id="releasedYear" required />
                </div>
                <div class="nbrPage">
                    <label for="nbrPage">Nombre de pages<span class="star">*</span></label>
                    <input type="number" name="nbrPage" id="nbrPage" required />
                </div>
                <button @submit="checkInput()">Ajouter</button>
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
    background-image: url("/addBook.png");
    background-size: cover;
    height: 100vh;
}

h1 {
    padding-top: 120px;
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
    background-color: rgb(255, 255, 255, 41%);
    border-radius: 30px;
    width: 50%;
    margin-left: 25%;
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