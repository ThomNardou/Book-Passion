<script setup>
import { RouterLink } from "vue-router";
import axios from "axios";
import booksCategoryComponent from "@/components/AllBooks/booksCategoryComponent.vue";
</script>

<script>
export default {
  data() {
    return {
      categories: []
    };
  },
  mounted() {
    this.getApiBooks();
  },
  methods: {
    getApiBooks() {
      axios.get("http://localhost:3000/api/categories")
        .then((res) => {
          res.data.data.rows.forEach(element => {

            axios.get(`http://localhost:3000/api/categories/${element.id}/books`)
              .then((resBooks) => {

                if (resBooks.data.data) {
                  this.categories.push({
                    categoryName: element.name,
                    categoryId: element.id,
                    books: resBooks.data.data.rows
                  });
                }
              })
          });
        })
    }
  },
};
</script>

<template>
  <div class="book-list">
    <div v-if="categories.length > 0" v-for="category in categories" :key="category.categoryId">
      <booksCategoryComponent :Books="category" class="container"/>
    </div>
    <div v-else class="error">
      <p>Il n'y pas de livre enregistré</p>
    </div>

  </div>
</template>

<style scoped>
.book-list {
  margin-top: 200px;
}

.container {
  margin: 30px 0;
}

.error {
  height: calc(100vh - 120px);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: kanit;
  font-size: 30px;
}
</style>
