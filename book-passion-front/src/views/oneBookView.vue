<script>
import addComment from '@/components/oneBook/addComment.vue';
import { AnFilledStar } from "@kalimahapps/vue-icons";
</script>
<template>
    <div v-if="Object.keys(resultAPI).length > 0">
        <div id="information">
            <img :src="resultAPI.coverImage" alt="image de couverture" id="coverImage">
            <div class="values">
                <h1>{{ resultAPI.title }}</h1>
                <p><span class="data">Catégorie : </span>{{ resultAPI.t_category.name }}</p>
                <p><span class="data">Nombre de pages : </span>{{ resultAPI.numberPages }}</p>
                <p><span class="data">Auteur : </span>{{ resultAPI.writer }}</p>
                <p><span class="data">Éditeur : </span>{{ resultAPI.editor }}</p>
                <p><span class="data">Année d'édition : </span>{{ resultAPI.releaseYear }}</p>
                <p><span :class="index <= resultAPI.rating ? 'colorYellow' : ''" v-for="index in 5" :key="index">
                        <AnFilledStar />
                    </span></p>
            </div>
        </div>
        <br><br><br>
        <h2 class="part-heading">Synopsis</h2>
        <p class="part">{{ resultAPI.excerpt }}</p>
        <h2 class="part-heading" id="part-heading-comment">Commentaires</h2>

        <div v-for="comment in comments" :key="comment.id">
            <div class="comment">

                <div class="userPart">
                    <p class="comment_name">{{ comment.name }}</p>
                    <p class="comment_note">
                        <span :class="index <= comment.note ? 'colorYellow' : ''" v-for="index in 5" :key="index">
                            <AnFilledStar />
                        </span>
                    </p>
                </div>

                <div class="commentPart">
                    <p class="comment_title">{{ comment.title }}</p>
                    <p class="comment_comment">{{ comment.comment }}</p>
                </div>

            </div>
        </div>

        <div class="addComment">
            <addComment />
        </div>
    </div>

    <div v-else>
        <p>Chargement en cours...</p>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

let comments = [{ id: 1, name: "Kyle", title: "Cool", note: 4, comment: "shfbwbfebafbeafbheafha" }, { id: 2, name: "Khaille", title: "Colo", note: 4, comment: "shfbwbfebafbeafbheafha" }]

const props = defineProps(["id", "userId"]);
let resultAPI = ref({});

onMounted(() => {
    console.log(props)
    getBook();
})

const getBook = async () => {

    axios
        .get(`http://localhost:3000/api/books/${props.id}`, {
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcxMzg3NTA5OSwiZXhwIjoxNzQ1NDMyNjk5fQ.kZlgeCnH1RHoFw1N4mhnU8BLDYY1TNsa4onihyRymoI",
            },
        })
        .then((result) => {
            resultAPI.value = result.data.data;
        })
        .catch((err) => {
            console.log(err);
        });
}


</script>

<style scoped>
* {
    background-color: black;
    font-family: kanit;
}

p,
h1,
h2 {
    color: white;
}

#information {
    margin-top: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.values {
    margin-left: 100px
}

#coverImage {
    margin-right: 100px;
    width: 400px;
    height: 500px;
    /* grid-row: 1/7; */
    /* grid-column: 1; */
}

#information>p,
#information>h1 {
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
    width: 50%;
}

hr {
    margin-left: 150px;
    margin-right: 150px;
    margin-bottom: 10px;
}

.comment {
    padding-left: 10%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px gray solid;
    padding: 30px 0;
    /* background-color: aqua; */
}

.userPart {
    margin-left: 10%;
}

.userPart, .commentPart {
    width: 50%;
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