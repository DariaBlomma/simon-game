<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
      <div class='container'>
        <div class='circle'>
            <div v-bind:class='{lighter: clicked1}' class='red' data-index='0'></div>
            <!-- <part></part> -->
            <div v-bind:class='{lighter: clicked2}' class='green' data-index='1'></div>
            <div v-bind:class='{lighter: clicked3}' class='blue' data-index='2'></div>
            <div v-bind:class='{lighter: clicked4}' class='yellow' data-index='3'></div>
        </div>
        <div class='game-info'>
            <p><b>Round:</b><span class='round'> {{ round }} </span></p>
            <button v-bind:disabled='disabled' @click='startGame' class='start'>Start</button>
            <p class='lost-message d-none'>Sorry, you lost after <span class='round'>{{ round }}</span> rounds</p>
        </div>
        <div class='game-levels'>
            <h3>Game Levels</h3>
            <p><input type='radio' name='level' class='light' value='1500' checked>Light</p>
            <p><input type='radio' name='level' class='normal' value='1000'>Normal</p>
            <p><input type='radio' name='level' class='hard' value='0.4'>Hard</p>
        </div>
        <div v-html='sound' class='audio-files'></div>
    </div>
</template>

<script>
// import part from './components/circle-part.vue'
// console.log('part: ', part);


export default {
  name: 'App',
  components: {
    // part
  },
  data() {
    return {
      round: 0,
      arr: [],
      sound: '',
      disabled: false,
      clicked1: false,
      clicked2: false,
      clicked3: false,
      clicked4: false,
      parts: document.querySelectorAll('.circle div')
    };
  },
  methods: {
    startGame() {
      this.round++;
    //   this.showRoundNumber(this.round);
      this.showPart(this.round);
      //console.log('this.parts[item]: ', part);
    },
    showRoundNumber() {
      // console.log(number);
    },
    renderRandom() {
      return Math.floor(Math.random() * 4);
    },
    // doesnt work
    renderSound(number) {
      this.sound = `
        <audio autoplay>
            <source src="./sounds/sound${number}.mp3">
        </audio>`;
    },
    showPart(row) {
      console.log('row: ', row);
      this.disabled = true;
      for (let i = 0; i < row; i++) {
        this.arr.push(this.renderRandom());
      }
      console.log('arr: ', this.arr);
      this.arr.forEach((item, index) => {
        if (index === 0) {
            // this.clicked = true;
            
            // this.parts[item].classList.add('lighter');
            
            this.renderSound(index + 1);
            // setTimeout(() => {
            //     this.parts[item].classList.remove('lighter');
            //     if (index === this.arr.length - 1) {
            //         gamerAction(arr, row);
            //         // return arr;
            //     }
            // }, time); //1500
        } else {
        //     parts.forEach(elem => {
        //         if (!elem.classList.contains('lighter')) {
        //             setTimeout(() => {
        //                 parts[item].classList.add('lighter');
        //                 renderSound(index + 1);
        //             }, time * index);
        //             //1500, index 1
        //             // 3000, index 2
        //             setTimeout(() => {
        //                 parts[item].classList.remove('lighter');
        //                 // if (index === arr.length - 1) {
        //                 //     console.log('row: ', row);
        //                 //     gamerAction(arr, row);
        //                 // }
        //             }, time * (index + 1));
        //             //3000, index 1
        //             // 4500, index 2
        //         }
        //     });
        //     // setTimeout(() => {
        //     //     if (index === arr.length - 1) {
        //     //         console.log('row: ', row);
        //     //         gamerAction(arr, row);
        //     //         //return arr;
        //     //     }
        //     // }, time * (index + 1));

        //     if (index === arr.length - 1) {
        //         setTimeout(() => {
        //             //console.log('row: ', row);
        //             gamerAction(arr, row);
                    
        //             //return arr;
        //         }, time * (index + 1));
        //     }
        }

    });
    }
  }
}
</script>

<style src='./style.css'></style>
