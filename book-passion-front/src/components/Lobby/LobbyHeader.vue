<template>
  <header>
    <div class="text">
      <div>
        <h1>BookPassion</h1>
        <h2>A passion for reading...</h2>
      </div>
    </div>
    <div class="image">
      <img src="/pile-de-livres.webp" alt="" />
    </div>
  </header>
</template>
<script>
export default {};
</script>
<style scoped>
header {
  height: 100vh;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),
    url("/bookWallPaper.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: end;
}

h1,
h2 {
  font-family: kanit;
  font-size: 3.5rem;
  margin: 0;
}

h2 {
    font-weight: normal;
}

.text {
  width: 50%;
  border-right: 5px white solid;
  display: flex;
  align-items: center;
}

.image {
  width: 50%;
  display: flex;
  align-items: center;
}

.image img {
  width: 30%;
}

.text,
.image {
  height: 200px;
  margin-bottom: calc(20% - 200px);
}

.text div, .image img {
    margin-left: 15%;
}
</style>
