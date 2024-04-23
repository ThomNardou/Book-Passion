<template>
    <div id="information">
        <img :src="book.coverImage" alt="image de couverture" id="coverImage">
        <h1>{{ book.title }}</h1>
        <p><span class="data">Catégorie : </span>{{ book.category }}</p>
        <p><span class="data">Nombre de pages : </span>{{ book.nbrPage }}</p>
        <p><span class="data">Auteur : </span>{{ book.auteur }}</p>
        <p><span class="data">Éditeur : </span>{{ book.editeur }}</p>
        <p><span class="data">Année d'édition : </span>{{ book.editionYear }}</p>
        <p><span :class="index <= book.rating ? 'colorYellow' : ''" v-for="index in 5" :key="index">*</span></p>
    </div>
    <h2 style="text-decoration: dashed;" id="Synopsis">Synopsis</h2>
    <p>{{ book.synopsis }}</p>
</template>

<script setup>

let book = {title: "De la petite taupe qui voulait savoir qui lui avait fait sur la tête", coverImage: "taupeCover.png", category: "enfant", nbrPage: 25, auteur: "Werner Holzwarth / Wolf Erlbruch", editeur: "inconnu", editionYear: 2010, rating: 4, synopsis: "Lorem Ipsum"}
</script>

<style scoped>
*{
    background-color: black;
    margin: 0;
}
p, h1, h2{
    color: white;
}
#information{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(7, 1fr);
}
#coverImage{
    margin-top: 100px;
    margin-left: 100px;
    max-width: 500px;
    min-width: 200px;
    grid-row: 1/7;
    grid-column: 1;
}
#information>p, #information>h1{
    grid-column: 2;
    margin-right: 50px;
}
#information>p:last-child{
    font-size: 30px;
}
.data{
    color: rgb(128, 201, 156);
}
.colorYellow{
    color: yellow;
}
#Synopsis{
    padding-left: 50px;
    text-decoration: underline white;
}
</style>