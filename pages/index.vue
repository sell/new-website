<template>
  <div class="home">
    <h1>
      I am a
      <span id="about_words">
        <keep-alive>
          {{ word }}
        </keep-alive>
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
    const status = await $http.$get('/api/status');
    return {
      status,
    };
  },
  data() {
    return {
      word: '',
      wordIndex: 0,
      words: ['Developer.', 'Gamer.', 'Animal Lover.', 'Privacy Advocate.', 'Traveler.'],
      wordsIndex: 0,
      initialLoadWordInterval: null,
      mainWordInterval: null,
      status: 'started',
    };
  },
  created() {
    this.initialInterval();
    this.mainInterval();
  },
  beforeDestroy() {
    clearInterval(this.mainWordInterval);
  },
  mounted() {
    this.init();
  },
  methods: {
    initialInterval() {
      const word = this.words[this.wordsIndex];
      this.initialLoadWordInterval = setInterval(() => {
        /*
          If the word index is less than the word lengths it'll keep adding characters
         */
        if (this.wordIndex < word.length) {
          this.word += word.charAt(this.wordIndex);
          ++this.wordIndex;
        } else {
          clearInterval(this.initialLoadWordInterval);
        }
      }, 50);
    },
    mainInterval() {
      this.mainWordInterval = setInterval(() => {
        if (this.status !== 'started') {
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
          } else {
            /*
              Clearing the interval then setting it to null to run the interval below.
              *
             */
            clearInterval(removeWordInterval);
            removeWordInterval = null;
          }
        }, 75);
        /*
          Checking if the wordsIndex is the same size as the array
          * If so we set the index back to 0
          * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
         */
        this.wordsIndex < this.words.length - 1 ? ++this.wordsIndex : this.wordsIndex = 0;
        const word = this.words[this.wordsIndex];

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
          } else {
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
      this.status = 'started';
    },
    pauseTimer() {
      this.status = 'paused';
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
