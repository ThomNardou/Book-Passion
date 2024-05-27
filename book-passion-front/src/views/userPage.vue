<script setup>
import userBook from "@/components/userPage/userBook.vue"

//TODO - fetch the book of the user
let usersBook = [{}, {}];
</script>
<template>
    <userBook v-for="book in usersBook" :book="book"></userBook>
</template>
<style scoped>
p {
    margin-top: 120px;
}
</style>