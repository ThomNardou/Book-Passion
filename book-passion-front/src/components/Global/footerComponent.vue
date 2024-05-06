<template>
    <div class="center">
        <footer>
            <div class="name">
                <p>Thomas Nardou</p>
                <p>Joachim Berchel</p>
            </div>
            <div class="email">
                <a href="mailto:thomas.nardou@eduvaud.ch">
                    <p>thomas.nardou@eduvaud.ch</p>
                </a>
                <a href="mailto:joachim.berchel@eduvaud.ch">
                    <p>joachim.berchel@eduvaud.ch</p>
                </a>
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
    margin-top: 120px;
}

.center {
    display: flex;
    justify-content: center;
}

.name,
.email {
    margin: 20px 0;
}

a {
    text-decoration: none;
    color: white;
}
</style>
