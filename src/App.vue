<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
      <div class='container'>
        <div class='circle'>
          
            <!-- <part v-for="(item, i) in parts" v-bind:key="item" v-bind:class='[item, showActivePart(i)]'></part> -->
            <div 
            v-for="(item, i) in parts" 
            v-bind:key="item" 
            :class="[item, {lighter: showActivePart(i)}]" 
            @click='handleClick' 
            style="color: white; text-align: center; padding-top: 40px"
            data-index='0'>
            {{i}}
            </div>
            <!-- <div :class="{lighter: showActivePart(0)}" v-bind:disabled='disabled' @click='handleClick' class='red' data-index='0' ></div>
            <div :class="{lighter: showActivePart(1)}" v-bind:disabled='disabled' @click='handleClick' class='green' data-index='1' ></div>
            <div :class="{lighter: showActivePart(2)}" v-bind:disabled='disabled' @click='handleClick' class='blue' data-index='2'></div>
            <div :class="{lighter: showActivePart(3)}" v-bind:disabled='disabled' @click='handleClick' class='yellow' data-index='3'></div> -->
        </div>
        <div class='game-info'>
            <p><b>Round:</b><span class='round'> {{ round }} </span></p>
            <button v-bind:disabled='disabled' @click='startGame' class='start'>Start</button>
            <p class='lost-message d-none'>Sorry, you lost after <span class='round'>{{ round }}</span> rounds</p>
        </div>
        <div class='game-levels'>
            <h3>Game Levels</h3>
            <p><input type='radio' name='level' class='light' value='1500'  checked>Light</p>
            <p><input type='radio' name='level' class='normal' value='1000'>Normal</p>
            <p><input type='radio' name='level' class='hard' value='0.4'>Hard</p>
        </div>
        <div  class='audio-files'>
          <audio v-bind="{autoplay: playSound}">
            <source :src="require(`./assets/sounds/sound${soundNumber}.mp3`)">
            <!-- <source src="./assets/sounds/sound3.mp3"> -->
            <!-- <source src="../public/sounds/sound3.mp3"> -->
            <!-- <source :src="getUrl(soundNumber)"> -->
          </audio>
        </div>
        <!-- v-html='sound' -->
    </div>
</template>

<script>
// import part from './components/part.vue'

export default {
  name: 'App',
  components: {
    // part
  },
  data() {
    return {
      round: 3,
      arr: [],
      sound: '',
      playSound: false,
      disabled: false,
      show: false,
      gameStarted: false,
      soundNumber: 1,
      parts: ['red', 'green', 'blue', 'yellow'],
      activePartIndex: 5,
      time: 1500,
      timeDelay: 1
    };
  },
  methods: {
    showActivePart(ind) {
        // to prevent click, when index > 5
        this.disabled = true;
        if (this.activePartIndex < 5) {
          setTimeout(() => {
          console.log('this.time * timeDelay: ', this.time * this.timeDelay);
            // to remove class
            console.log('in timeout');
            this.activePartIndex = 5;
            this.disabled = false;
        }, this.time * this.timeDelay); //1500
        }

        console.log('this.activePartIndex: ', this.activePartIndex);
        // to prevent click, when index > 5
        this.disabled = false;
        return ind === this.activePartIndex;
    },
    getUrl(n) {
      return require(`./assets/sounds/sound${n}.mp3`)
      // return require(`C:/media/sound${n}.mp3`)
    //   return require(`../public/sounds/sound${n}.mp3`)
    },
    startGame() {
      console.log('in start game');
      this.round++;
      this.showPart(this.round);
    },
    renderRandom() {
      return Math.floor(Math.random() * 4);
    },
    renderSound(number) {
      this.sound = `
        <audio autoplay>
            <source src="../public/sounds/sound${number}.mp3">
        </audio>`;
    },
    handleClick(event){
      // cant click before parts are shown
      if (this.disabled) {
        return
      }
      console.log('in handle click');
      console.log(event.target.dataset.index);
    },
    gamerAction(arr, row) {
      console.log('row: ', row);
      console.log('arr: ', arr);
      console.log('in gameraction');
    },
    showPart(row) {
      // console.log('row: ', row);
      console.log('in showpart');
      this.disabled = true;
      for (let i = 0; i < row; i++) {
        this.arr.push(this.renderRandom());
      }
      console.log('arr: ', this.arr);
      this.arr.forEach((item, index) => {
        setTimeout(() => {
            this.timeDelay = (index + 1) * this.arr.length;
            this.activePartIndex = item;
            console.log('this.activePartindex: ', this.activePartIndex);
        }, this.time * index)

        if (index === 0) {
          // to add a class Lighter
            // this.showParts = true;
            // this.index = item;
            //to play audio
            // this.renderSound(index + 1);
            this.playSound = true;
            this.soundNumber = item;
            // if (index === this.arr.length - 1) {
            //         this.gamerAction(this.arr, row);
            //         // return arr;
            // }
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
