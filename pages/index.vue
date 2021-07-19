<template>
  <div class="home">
    <h1>I am a <span id="about_words">{{ word }}</span></h1>
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
      words: ['Developer.', 'Gamer.', 'Animal Lover.', 'Privacy Advocate.', 'Traveler.'],
      wordsIndex: 0,
      initialLoadWordInterval: null,
      mainWordInterval: null,
    };
  },
  created() {
    this.initialInterval();
    this.mainInterval();
  },
  beforeDestroy() {
    clearInterval(this.mainWordInterval);
  },
  methods: {
    initialInterval() {
      let wordIndex = 0;
      const word = this.words[this.wordsIndex];
      this.initialLoadWordInterval = setInterval(() => {
        if (wordIndex < word.length) {
          this.word += word.charAt(wordIndex);
          ++wordIndex;
        } else {
          clearInterval(this.initialLoadWordInterval);
        }
      }, 50);
    },
    mainInterval() {
      this.mainWordInterval = setInterval(() => {
        this.word = '';
        this.wordsIndex < this.words.length - 1 ? ++this.wordsIndex : this.wordsIndex = 0;
        let wordIndex = 0;
        const word = this.words[this.wordsIndex];
        const wordInterval = setInterval(() => {
          if (wordIndex < word.length) {
            this.word += word.charAt(wordIndex);
            ++wordIndex;
          } else {
            clearInterval(wordInterval);
          }
        }, 50);
        ++this.wordsIndex;
      }, 4000);
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
