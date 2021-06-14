<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
      <div class='container'>
        <div class='circle'>
          
            <!-- <part v-for="(item, i) in parts" v-bind:key="item" v-bind:class='[item, showActivePart(i)]'></part> -->
            <div 
            v-for="(item, i) in parts" 
            v-bind:key="item" 
            :class="[item, {disabled: disabledParts}, {lighter: showActivePart(i)}]" 
            @click='handleClick' 
            style="color: white; text-align: center; padding-top: 40px"
            :data-index=i>
            {{i}}
            </div>
            <!-- <div :class="{lighter: showActivePart(0)}" v-bind:disabled='disabled' @click='handleClick' class='red' data-index='0' ></div>
            <div :class="{lighter: showActivePart(1)}" v-bind:disabled='disabled' @click='handleClick' class='green' data-index='1' ></div>
            <div :class="{lighter: showActivePart(2)}" v-bind:disabled='disabled' @click='handleClick' class='blue' data-index='2'></div>
            <div :class="{lighter: showActivePart(3)}" v-bind:disabled='disabled' @click='handleClick' class='yellow' data-index='3'></div> -->
        </div>
        <div class='game-info'>
            <p><b>Round:</b><span class='round'> {{ round }} </span></p>
            <button v-bind:disabled='disabledBtn' @click='startGame' class='start'>Start</button>
            <p v-show='lost' class='lost-message'>Sorry, you lost after <span class='round'>{{ round }}</span> rounds</p>
        </div>
        <div @change='changeLevel' class='game-levels'>
            <h3>Game Levels</h3>
            <p><input type='radio' name='level' class='light' value='1500'  checked>Light</p>
            <p><input type='radio' name='level' class='normal' value='1000'>Normal</p>
            <p><input type='radio' name='level' class='hard' value='400'>Hard</p>
        </div>
        <div  class='audio-files'>
          <audio v-bind="{autoplay: playSound}">
            <!-- <source :src="require(`./assets/sounds/sound${soundNumber}.mp3`)"> -->
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
      round: 0,
      arr: [],
      hasClass: [],
      sound: '',
      playSound: false,
      disabledBtn: false,
      disabledParts: true,
      lost: false,
      soundNumber: 1,
      btnClick: 0,
      partsClick: 0,
      partsIndex: 0,
      parts: ['red', 'green', 'blue', 'yellow'],
      activePartIndex: 5,
      time: 1500,
      timeDelay: 1
    };
  },
  methods: {
    // waitToStart() {
    //   console.log('in wait');
    //     setTimeout(() => {
    //       this.disabledBtn = false;
    //     }, 1000)
    // },
    changeLevel(event) {
        this.time = Number(event.target.value);
        this.round = 1;
        this.arr = [];
    },
    showActivePart(ind) {
        // to prevent click, when index > 5  
        if (this.activePartIndex < 5) {
          setTimeout(() => {
          // console.log('this.time * timeDelay: ', this.time * this.timeDelay);
            // to remove class
            // console.log('in timeout');
            this.activePartIndex = 5;
            this.disabledBtn = false;
            this.disabledParts = false;
        }, this.time * this.timeDelay); //1500
        }

        // console.log('this.activePartIndex: ', this.activePartIndex);
        // to prevent click, when index > 5
        return ind === this.activePartIndex;
    },
    getUrl(n) {
      return require(`./assets/sounds/sound${n}.mp3`)
      // return require(`C:/media/sound${n}.mp3`)
    //   return require(`../public/sounds/sound${n}.mp3`)
    },
    startGame() {
      // console.log('in start game');
      this.lost = false;
      this.btnClick++;
      if (this.btnClick > 1) {
        return;
      }
      this.disabledBtn = true;
      this.round = 1;
      this.showPart(1);
      
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
      if (this.disabledBtn || this.disabledParts) {
        return
      }
      console.log('in handle click');

      event.target.classList.add('lighter');
      this.hasClass.push(event.target);
      if (this.hasClass.length > 1) {
        this.hasClass[0].classList.remove('lighter');
        this.hasClass.shift(0);
      }

      if (this.arr[this.partsClick] !== Number(event.target.dataset.index)) {
        // console.log('event.target.dataset.index: ', event.target.dataset.index);
        // console.log('this.arr[this.partsClick]: ', this.arr[this.partsClick]);
        //   console.log('stop');
        this.lost = true;
        this.partsClick = 0;
        this.btnClick = 0;
        setTimeout(() => {
            event.target.classList.remove('lighter');
            this.arr = [];
        }, 200);
      } else {
        // console.log('continue');
        // console.log(event.target.classList);
        event.target.classList.add('lighter');
        this.partsClick++;
        if (this.partsClick === this.arr.length) {
          // console.log('this.arr.length - 1: ', this.arr.length - 1);
          // console.log('this.partsClick: ', this.partsClick);
          setTimeout(() => {
            event.target.classList.remove('lighter');
          }, 200);
          this.round++;
          this.partsClick = 0;
          setTimeout(() => {
            this.showPart(this.round);
          }, 1500)
          
        }       
      }
    },
    showPart(row) {
      // console.log('row: ', row);
      // console.log('in showpart');

      for (let i = 0; i < row; i++) {
        this.arr.push(this.renderRandom());
      }
      console.log('arr: ', this.arr);
      this.arr.forEach((item, index) => {
        setTimeout(() => {
            if (index === this.arr.length - 1) {
                this.disabledBtn = false;
                this.disabledParts = false;
            }
            this.timeDelay = (index + 1) * this.arr.length;
            this.activePartIndex = item;
            // если элементы дублируются, то будет эффект мигания прозрачности
            if (this.arr.length > 0 || index + 1 <= this.arr.length) {
              if (this.arr[index] === this.arr[index - 1] || this.arr[index] === this.arr[index + 1]) {
                this.activePartIndex = 5;
                setTimeout(() => {
                  this.activePartIndex = item;
                }, 300);
              }
            }
            // console.log('this.activePartindex: ', this.activePartIndex);
        }, this.time * index)

            // this.playSound = true;
            // this.soundNumber = item;
      });
    }
  }
}
</script>

<style src='./style.css'></style>
