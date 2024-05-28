<template>
    <div class="memberList">
        <h1>Our <span>Team</span></h1>
        <div class="member">
            <img src="https://avatars.githubusercontent.com/u/122774874?v=4" />
            <p>Thomas Nardou - Développeur</p>
        </div>
        <div class="member">
            <img src="https://avatars.githubusercontent.com/u/122774888?v=4" />
            <p>Joachim Berchel - Développeur</p>
        </div>
    </div>
</template>

<style scoped>
* {
    color: white;
    font-family: kanit;
    font-size: 25px;
}

h1 {
    margin-left: 60px;
    width: calc(100% - 60px);
}

h1,
span {
    font-size: 50px;
}

.member {
    display: flex;
    align-items: center;
    width: calc(50% - 80px);
    padding: 40px;
}

span {
    color: #94e8b4;
}

.member img {
    width: 100px;
    border: 1px gray solid;
    border-radius: 100%;
    margin: 20px;
}

.memberList {
    padding: 40px 0;
    background-image: url(/teamWallpaper.webp);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}
</style>