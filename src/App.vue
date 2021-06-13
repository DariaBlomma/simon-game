<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
      <div class='container'>
        <div class='circle'>
            <div class='red' data-index='0'></div>
            <div class='green' data-index='1'></div>
            <div class='blue' data-index='2'></div>
            <div class='yellow' data-index='3'></div>
        </div>
        <div class='game-info'>
            <p><b>Round:</b><span class='round'>0</span></p>
            <button class='start'>Start</button>
            <p class='lost-message d-none'>Sorry, you lost after <span class='round'>0</span> rounds</p>
        </div>
        <div class='game-levels'>
            <h3>Game Levels</h3>
            <p><input type='radio' name='level' class='light' value='1500' checked>Light</p>
            <p><input type='radio' name='level' class='normal' value='1000'>Normal</p>
            <p><input type='radio' name='level' class='hard' value='0.4'>Hard</p>
        </div>
        <div class='audio-files'></div>
    </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // }
}
</script>

<style src='./style.css'></style>
