<script setup>
import { RouterLink } from "vue-router";
import axios from "axios";
import booksCategoryCompent from "@/components/AllBooks/booksCategoryCompent.vue";
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

          // this.categories = res.data.data.rows;

          // console.log(res.data.data.rows);

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
      <booksCategoryCompent :Books="category" class="container"/>
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
</style>
