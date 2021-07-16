<template>
  <div class="container">
    <h1>Page Redirect</h1>
    <div class="box container">
      <h3>You are being redirected to another page</h3>
      {{ link }}
      <div class="buttons">
        <button @click="redirect">
          Continue {{ redirectTime }}
        </button>
        <button @click="cancel">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      link: this.$route.query.url,
      redirectInterval: null,
      redirectTime: 5,
    };
  },
  created() {
    const routes = ['https://github.com/sell', 'https://botlists.com', 'https://old.jayson.codes'];
    if (!this.$route.query || !this.$route.query.url || !routes.includes(this.$route.query.url)) {
      return this.$router.push('/');
    }
    this.redirectInterval = setInterval(() => {
      if (this.redirectTime === 0) {
        this.redirect();
        clearInterval(this.redirectInterval);
      } else {
        --this.redirectTime;
      }
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.redirectInterval);
  },
  methods: {
    redirect() {
      window.location = this.$route.query.url;
    },
    cancel() {
      clearInterval(this.redirectInterval);
      this.$router.push('/');
    },
  },
};
</script>
