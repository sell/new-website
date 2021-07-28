<template>
  <div class="home">
    <h1>
      I am a
      <span id="about_words">
        {{ word }}
      </span>
    </h1>
    <p>
      I am currently
      <span :style="{ color: status.color }">{{ status.status }}</span>
      <i :style="{ color: status.color }" :class="`bx ${status.emoji} bx-tada-hover`" /> .
    </p>
  </div>
</template>

<script>
export default {
  async asyncData({ $http }) {
    try {
      const status = await $http.$get('/api/status');
      return {
        status,
      };
    } catch (e) {
      console.log(e);
    }
  },
  data() {
    return {
      word: '',
      wordIndex: 0,
      words: ['Web Developer.', 'Bot Developer.', 'Occasional Pentester.', 'Privacy Advocate.', 'Traveler.'],
      wordsIndex: 0,
      initialLoadWordInterval: null,
      mainWordInterval: null,
      intervalStatus: 'started',
      refreshPageInterval: null,
      typingSound: null,
    };
  },
  beforeDestroy() {
    clearInterval(this.refreshPageInterval);
    clearInterval(this.mainWordInterval);
    this.typingSound.pause();
    this.typingSound = null;
  },
  mounted() {
    // I do not own this file, have a issue? Contact me, i'll remove.
    this.typingSound = new Audio('https://assets.codepen.io/162656/audio-old-typewriter.wav');
    this.typingSound.play();
    this.initialInterval();
    this.mainInterval();
    this.init();
    this.refreshPage();
  },
  methods: {
    refreshPage() {
      this.refreshPageInterval = setInterval(() => {
        window.location.reload(true);
        // reloading page to stop interval bug
      }, 60000);
    },
    initialInterval() {
      const word = this.words[this.wordsIndex];
      this.initialLoadWordInterval = setInterval(() => {
        /*
          If the word index is less than the word lengths it'll keep adding characters
         */
        if (this.wordIndex < word.length) {
          this.word += word.charAt(this.wordIndex);
          ++this.wordIndex;
          this.typingSound.play();
        } else {
          this.typingSound.pause();
          this.wordsIndex += 1;
          clearInterval(this.initialLoadWordInterval);
        }
      }, 50);
    },
    mainInterval() {
      this.mainWordInterval = setInterval(() => {
        if (this.intervalStatus !== 'started') {
          return;
        }
        /*
          This interval is to remove the characters, aka
          making a substring and getting the characters from 0 to x
         */
        let removeWordInterval = setInterval(() => {
          if (this.wordIndex > 0) {
            this.word = this.word.substr(0, this.wordIndex - 1);
            --this.wordIndex;
            this.typingSound.play();
          } else {
            /*
              Clearing the interval then setting it to null to run the interval below.
              *
             */
            this.typingSound.pause();
            clearInterval(removeWordInterval);
            removeWordInterval = null;
          }
        }, 75);
        /*
          Checking if the wordsIndex is the same size as the array
          * If so we set the index back to 0
          * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
         */
        const word = this.words[this.wordsIndex < this.words.length - 1 ? this.wordsIndex : this.wordsIndex = 0];

        /*
          Creating a word interval, this is to add characters to the string.
          * Typing effect
         */
        const wordInterval = setInterval(() => {
          if (removeWordInterval != null) {
            return;
          }
          if (this.wordIndex < word.length) {
            this.word += word.charAt(this.wordIndex);
            ++this.wordIndex;
            this.typingSound.play();
          } else {
            this.typingSound.pause();
            clearInterval(wordInterval);
          }
        }, 50);
        /*
          We increase the word index to move onto the next word.
         */
        ++this.wordsIndex;
      }, 5000);
    },
    /*
      Followed this to stop interval on tab switch to refrain from word spazzing.
      * https://forum.vuejs.org/t/stop-setinterval-when-switching-to-another-tab/89647/2
     */
    startTimer() {
      this.intervalStatus = 'started';
    },
    pauseTimer() {
      this.intervalStatus = 'paused';
    },
    windowOnFocus(event) {
      this.startTimer();
    },
    windowOnBlur(event) {
      this.pauseTimer();
    },
    init() {
      window.onfocus = this.startTimer;
      window.onblur = this.pauseTimer;
    },
  },
};
</script>

<style scoped>
  p {
    margin-top: 10px;
    font-size: 1.1rem;
  }
</style>
