<script setup>
import { AkEdit, AnOutlinedDelete  } from "@kalimahapps/vue-icons";

const props = defineProps({
    book: {
        type: Object,
        required: true,
    }
})
</script>
<template>
    <div class="book">
        <img alt="book cover image" :src="book.coverImage" id="coverImage">
        <div class="data">
            <h2>{{ book.name }}</h2>
            <p><span class="blue">Catégorie</span> : {{ book.category }}</p>
            <p><span class="blue">Nombre de pages</span> : {{ book.nbrPage }}</p>
            <p><span class="blue">Auteur</span> : {{ book.author }}</p>
            <p><span class="blue">Éditeur</span> : {{ book.editor }}</p>
            <p><span class="blue">Année d'édition</span> : {{ book.releasedYear }}</p>
        </div>
        <div class="updateBook">
            <AkEdit class="icon"/>
            <AnOutlinedDelete class="icon" />
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
    margin-top: 200px;
}

p,
h2 {
    color: white;
}

.blue {
    color: #80C99C;
}
</style>