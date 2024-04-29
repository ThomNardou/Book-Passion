<script setup>
import { AnFilledStar } from "@kalimahapps/vue-icons";
let nbrNote = 0;
</script>
<template>
    <div class="addComment">
        <div class="input">
            <p id="commentTitle">Titre du commentaire :</p>
            <input id="commentTitleInput">
            <p id="commentNote">Note :</p>
            <p id="commentNoteInput"><span :class="index <= 0 ? 'colorYellow' : ''" v-for="index in 5" :key="index" class="star"><AnFilledStar /></span></p>
            <p id="commentComment">Commentaire :</p>
            <input id="commentCommentInput">
            <button>Envoyer</button>
        </div>
    </div>
</template>
<style scoped>
.star:hover {
    background-color: yellow;
}
button {
    height: 50%;
}
input, button {
    width: 50%;
    margin-left: 25%;
}
.input>input {
    display: flex;
    justify-content: center;
}
.input>p, .input>input, .input>button {
    display: flex;
    justify-content: center;
    align-items: center;
}
button {
    grid-row: 3;
    grid-column: 2;
}
#commentCommentInput{
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
    border-radius: 10%;
}

* {
    color: white;
}

p {
    -webkit-text-stroke-width: 0.5px;
    -webkit-text-stroke-color: black;
}

.addComment {
    background-color: rgb(128, 201, 156);
    border-radius: 25% 25% 0% 0% / 25% 25% 0% 0%;
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
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
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