<template>
  <div
    class="bookCard"
    :style="[
      imageSrc == null
        ? { backgroundColor: 'black' }
        : {
            background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),url(${imageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          },
    ]"
  >
    <h2>{{ title }}</h2>
    <p>Author : {{ authorname }}</p>
    <p>Posted by : {{ userName }}</p>
    <p>Posted At : {{ new Date(createdAt).toLocaleDateString("fr-FR", {day : '2-digit', month: '2-digit', year: 'numeric'} ) }}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    imageSrc: String,
    authorname: String,
    userName: String,
    createdAt: Date
  }
};
</script>
<style scoped>
.bookCard {
  color: white;
  font-family: kanit;
  border: grey 1px solid;
  width: 300px;
  height: 150px;
  border-radius: 10px;
  padding: 40px;
  background-size: cover;
  background-position: center;
  margin: 20px;
}

.bookCard:hover h2, .bookCard:hover p {
    opacity: 1;
    transition: .35s;
}

.bookCard:not(:hover) p, .bookCard:not(:hover) h2 {
    opacity: 0;
    transition: .35s;
}

.bookCard h2 {
  color: #94e8b4;
}

.bookCard p {
  margin: 0;
}
</style>
