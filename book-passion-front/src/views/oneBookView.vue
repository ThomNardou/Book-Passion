<script>
import addComment from '@/components/oneBook/addComment.vue';
import { AnFilledStar } from "@kalimahapps/vue-icons";
</script>
<template>
    <div id="information">
        <img :src="book.coverImage" alt="image de couverture" id="coverImage">
        <h1>{{ book.title }}</h1>
        <p><span class="data">Catégorie : </span>{{ book.category }}</p>
        <p><span class="data">Nombre de pages : </span>{{ book.nbrPage }}</p>
        <p><span class="data">Auteur : </span>{{ book.auteur }}</p>
        <p><span class="data">Éditeur : </span>{{ book.editeur }}</p>
        <p><span class="data">Année d'édition : </span>{{ book.editionYear }}</p>
        <p><span :class="index <= book.rating ? 'colorYellow' : ''" v-for="index in 5" :key="index"><AnFilledStar /></span></p>
    </div>
    <br><br><br>
    <h2 class="part-heading">Synopsis</h2>
    <p class="part">{{ book.synopsis }}</p>
    <h2 class="part-heading" id="part-heading-comment">Commentaires</h2>
    <div v-for="comment in comments" :key="comment.id">
        <div class="comment">
            <p class="comment_name">{{ comment.name }}</p>
            <p class="comment_title">{{ comment.title }}</p>
            <p class="comment_note"><span :class="index <= comment.note ? 'colorYellow' : ''" v-for="index in 5"
                    :key="index">
                    <AnFilledStar />
                </span></p>
            <p class="comment_comment">{{ comment.comment }}</p>
        </div>
        <hr>
    </div>
    <div class="addComment">
        <addComment />
    </div>
</template>

<script setup>

let book = { title: "De la petite taupe qui voulait savoir qui lui avait fait sur la tête", coverImage: "taupeCover.png", category: "enfant", nbrPage: 25, auteur: "Werner Holzwarth / Wolf Erlbruch", editeur: "inconnu", editionYear: 2010, rating: 4, synopsis: "Lorem Ipsum" }
let comments = [{ id: 1, name: "Kyle", title: "Cool", note: 4, comment: "shfbwbfebafbeafbheafha" }, { id: 2, name: "Khaille", title: "Colo", note: 4, comment: "shfbwbfebafbeafbheafha" }]
</script>

<style scoped>
* {
    background-color: black;
    margin: 0;
}

p,
h1,
h2 {
    color: white;
}

#information {
    margin-top: 120px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 100px repeat(6, 33px);
}

#coverImage {
    margin-left: 100px;
    max-width: 500px;
    min-width: 200px;
    grid-row: 1/7;
    grid-column: 1;
}

#information>p,
#information>h1 {
    grid-column: 2;
    margin-right: 50px;
    height: 30px;
}

#information>p:last-child {
    font-size: 30px;
}

.data {
    color: rgb(128, 201, 156);
}

.colorYellow {
    color: yellow;
}

.part-heading {
    padding-left: 100px;
    margin-bottom: 25px;
    text-decoration: underline white;
}

.part {
    padding-left: 150px;
    padding-bottom: 25px;
}

hr {
    margin-left: 150px;
    margin-right: 150px;
    margin-bottom: 10px;
}

.comment {
    padding-left: 10%;
    display: grid;
    grid-template: 60px 30px / 50% 50%;
}

.comment_name {
    font-size: 40px;
    grid-area: 1/1;
    width: auto;
}

.comment_title {
    font-size: 25px;
    grid-area: 1/2;
}

.comment_note {
    grid-area: 2/1;
}

.comment_comment {
    grid-area: 2/2;
}

.comment_underline {
    text-decoration: underline white;
    width: 100%;
    margin-right: 10%;
    margin-left: 10%;
    margin-bottom: 10%;
}

.part-heading-comment {
    margin-bottom: 100px;
}

.addComment {
    position: sticky;
    bottom: 0;
    left: 25%;
}
</style>