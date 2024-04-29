<template>
    <div class="bookCard" :style="[imageSrc != null ? {backgroundColor: 'black'} : {backgroundImage: `url(${imageSrc})`}]">
        <h2>{{ title }}</h2>
        <p>Author : {{ authorname }}</p>
        <p>Posted by : {{ userName }}</p>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        imageSrc: String,
        authorname: String,
        userName: String
    }
}
</script>
<style>
    
</style>