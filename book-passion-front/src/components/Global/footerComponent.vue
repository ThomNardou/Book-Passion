<template>
  <div class="center">
    <footer>
        <div class="name">
            <p>Thomas Nardou</p>
            <p>Joachim Berchel</p>
        </div>
        <div class="email">
            <p>thomas.nardou@eduvaud.ch</p>
            <p>joachim.berchel@eduvaud.ch</p>
        </div>
    </footer>
  </div>
</template>

<style scoped>
footer {
    width: 90%;
    border-top: 3px white solid;
    display: flex;
    justify-content: space-between;
    font-family: kanit;
    color: white;
}

.center {
    display: flex;
    justify-content: center;
}

.name, .email {
    margin: 20px 0;
}
</style>
