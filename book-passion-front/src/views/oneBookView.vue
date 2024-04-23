<template>
    <div id="information">
        <img :src="book.coverImage" alt="image de couverture" id="coverImage">
        <h1>{{ book.title }}</h1>
        <p><span class="data">Catégorie : </span>{{ book.category }}</p>
        <p><span class="data">Nombre de pages : </span>{{ book.nbrPage }}</p>
        <p><span class="data">Auteur : </span>{{ book.auteur }}</p>
        <p><span class="data">Éditeur : </span>{{ book.editeur }}</p>
        <p><span class="data">Année d'édition : </span>{{ book.editionYear }}</p>
    </div>
</template>

<script setup>
let book = {title: "De la petite taupe qui voulait savoir qui lui avait fait sur la tête", coverImage: "taupecover.png", category: "enfant", nbrPage: 25, auteur: "Werner Holzwarth / Wolf Erlbruch", editeur: "inconnu", editionYear: 2010}


</script>

<style scoped>
*{
    background-color: black;
}
p, h1{
    color: white;
}
#information{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(6, 1fr);
}
#coverImage{
    margin-top: 100px;
    margin-left: 100px;
    max-width: 500px;
    min-width: 200px;
    grid-row: 1/6;
    grid-column: 1;
}
#information>p, #information>h1{
    grid-column: 2;
    margin-right: 50px;
}
.data{
    color: rgb(128, 201, 156);
}
</style>