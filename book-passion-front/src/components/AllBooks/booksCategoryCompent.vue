<script setup>
import bookCompent from '../Lobby/bookCompent.vue';
</script>

<script>
import { decodeToken } from '@/utils/decodeTokenTool.mjs'
export default {
    props: {
        Books: Object
    },
    data() {
        return {
            tokenExist: false,
            token: ''
        }
    },
    mounted() {
        
        localStorage.getItem('token') ? (this.tokenExist = true, this.token = decodeToken(localStorage.token)) : this.tokenExist = false;
    },
    methods: {

    }
}

</script>

<template>
    <div class="categoryContainer">
        <h1>{{ Books.categoryName }}</h1>
        <div class="bookContainer">




            <div v-if="!tokenExist" v-for="book in Books.books" :key="book.id">

                <bookCompent :userName="book.t_user.username" :authorname="book.writer" :title="book.title"
                    :imageSrc="book.coverImage" :createdAt="book.createdAt" />
            </div>

            <RouterLink v-else v-for="book in Books.books" :to="{ name: 'book', params: { id: book.id } }"
                class="routerLink">

                <bookCompent :userName="book.t_user.username" :authorname="book.writer" :title="book.title"
                    :imageSrc="book.coverImage" :createdAt="book.createdAt" />

            </RouterLink>

        </div>
    </div>
</template>

<style scoped>
* {
    color: white;
    font-family: kanit;
}

.categoryContainer h1 {
    padding-left: 30px;
}

.routerLink {
    text-decoration: none;
}

.bookContainer {
    display: flex;
    overflow-x: scroll;
}

.bookContainer::-webkit-scrollbar-track {
    border-radius: 10px;
}

.bookContainer::-webkit-scrollbar {
    height: 12px;
    width: 15px;
}

.bookContainer::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #3B322C;
}
</style>