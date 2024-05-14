<script setup>
import { AnFilledStar } from "@kalimahapps/vue-icons";
import { onMounted } from "vue";
import axios from "axios";
let overStarSelected = 0;
let starSelected = 0;
import { decodeToken } from "@/utils/decodeTokenTool.mjs";
import { defineEmits } from "vue";

const props = defineProps(["bookId"])
const emit = defineEmits(["update-rate"])

function starClicked(index) {
    starSelected = index;
}
function updateSelect(index) {
    overStarSelected = index;
    changeStarColor()
}
function changeStarColor() {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star, index) => {

        if (index < overStarSelected) {
            star.style.color = "yellow";
        } else {
            if (index < starSelected) {
                star.style.color = "yellow";
            } else {
                star.style.color = "";
            }
        }
    });
}

function postComment() {
    const commentTitle = document.getElementById("commentTitleInput").value;
    const commentContent = document.getElementById("commentCommentInput").value;
    const commentRate = starSelected;


    if (commentTitle == '') return;
    if (commentContent == '') return;
    if (commentRate == 0) return;

    const APICall = 'http://localhost:3000/api/comments'

    const utilisateurId = decodeToken(localStorage.token).userId

    axios.post(APICall, 
    {
        title: commentTitle,
        comment: commentContent,
        rate: commentRate,
        fk_user: utilisateurId,
        fk_book: parseInt(props.bookId),
    },
    {
        headers: {
            Authorization:
                "Bearer " + localStorage.token,
        }

    })
        .then((result) => {
            emit('update-rate', commentRate)
            location.reload()
        })
        .catch((err) => {
            console.log(err);
        });

}
</script>
<template>
    <div class="addComment">
        <div class="input">
            <label for="Title" id="commentTitle">Titre du commentaire :</label>
            <input type="text" id="commentTitleInput">
            <p id="commentNote">Note :</p>
            <p id="commentNoteInput">
                <AnFilledStar class="star" v-for="index in 5" :key="index" @mouseover="updateSelect(index)"
                    @click="starClicked(index)" />
            </p>
            <label for="comment" id="commentComment">Commentaire :</label>
            <input id="commentCommentInput" type="text">
            <button @click="postComment()">Envoyer</button>
        </div>
    </div>
</template>
<style scoped>
.colorYellow {
    color: yellow;
}

button {
    height: 50%;
}

input,
button {
    width: 50%;
    margin-left: 25%;
}

.input>input {
    display: flex;
    justify-content: center;
}

.input>p,
.input>input,
.input>button,
.input>label {
    display: flex;
    justify-content: center;
    align-items: center;
}

button {
    grid-row: 3;
    grid-column: 2;
}

#commentCommentInput {
    grid-row: 4;
    grid-column: 1;
}

#commentComment {
    grid-row: 3;
    grid-column: 1;
}

#commentNoteInput {
    grid-row: 2;
    grid-column: 2;
}

#commentNote {
    grid-row: 1;
    grid-column: 2;
}

#commentTitleInput {
    grid-row: 2;
    grid-column: 1;
}

#commentTitle {
    grid-row: 1;
    grid-column: 1;
}

input {
    border-radius: 10px;
    outline: none;
    color: black;
}

* {
    color: white;
    font-family: kanit;
}

p,
label {
    color: black;
}

.addComment {
    background-color: rgb(128, 201, 156);
    border-radius: 30px 30px 0 0;
    width: 50%;
}

.input {
    display: grid;
    grid-template: repeat(4, 1fr) 25px / 50% 50%;
}

/*Snippet*/

button {
    background-color: #EA4C89;
    border-radius: 8px;
    border-style: none;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    height: 40px;
    line-height: 20px;
    list-style: none;
    margin: 0;
    outline: none;
    padding: 10px 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: color 100ms;
    vertical-align: baseline;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}

button:hover,
button:focus {
    background-color: #F082AC;
}

button {
    margin-left: 25%;
}
</style>