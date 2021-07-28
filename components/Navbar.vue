<template>
  <div :class="`sidebar ${active && 'open'}`">
    <div class="logo-details">
      <i class="bx bx-code-alt icon" />
      <div class="logo_name">
        Jay.Codes
      </div>
      <i id="btn" :class="`bx ${active ? 'bx-x' : 'bx-menu'}`" @click="burger" />
    </div>
    <ul class="nav-list">
      <li>
        <nuxt-link to="/">
          <i class="bx bx-home" />
          <span class="links_name">Home Page</span>
        </nuxt-link>
        <span class="tooltip">Home</span>
      </li>
      <li>
        <nuxt-link to="/about">
          <i class="bx bx-user-circle" />
          <span class="links_name">About Me</span>
        </nuxt-link>
        <span class="tooltip">About</span>
      </li>
      <li>
        <nuxt-link to="/projects">
          <i class="bx bxl-javascript" />
          <span class="links_name">Projects</span>
        </nuxt-link>
        <span class="tooltip">Projects</span>
      </li>
      <li>
        <nuxt-link to="/contact">
          <i class="bx bx-mail-send" />
          <span class="links_name">Contact</span>
        </nuxt-link>
        <span class="tooltip">Contact</span>
      </li>
      <li>
        <a target="_blank" href="https://github.com/sell" rel="noreferrer">
          <i class="bx bxl-github" />
          <span class="links_name">Github</span>
        </a>
        <span class="tooltip">Github</span>
      </li>
      <li>
        <a target="_blank" href="https://t.me/rookie" rel="noreferrer">
          <i class="bx bxl-telegram" />
          <span class="links_name">Telegram</span>
        </a>
        <span class="tooltip">Telegram</span>
      </li>
      <li>
        <span class="links_section" @click="changeTheme(theme === 'light' ? 'dark' : 'light')">
          <i :class="`bx ${theme === 'light' ? 'bx-moon' : 'bx-sun'}`" />
          <span class="links_name">{{ theme === 'light' ? 'Dark' : 'Light' }} Mode</span>
        </span>
        <span class="tooltip">Dark Mode</span>
      </li>
      <li>
        <nuxt-link to="/privacy">
          <i class="bx bx-check-shield" />
          <span class="links_name">Privacy Policy</span>
        </nuxt-link>
        <span class="tooltip">Privacy Policy</span>
      </li>
      <li>
        <hr>
      </li>
      <li>
        <a target="_blank" href="https://old.jayson.codes" rel="noreferrer">
          <i class="bx bx-link" />
          <span class="links_name">Old Website</span>
        </a>
        <span class="tooltip">External</span>
      </li>
    </ul>
    <!-- Navbar was created by me, but was modified by me -->
    <!-- Navbar Source: -->
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      active: false,
    };
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
  },
  // update state
  mounted() {
    this.changeTheme((localStorage.getItem('theme') || 'light'));
  },
  methods: {
    burger() {
      this.active = !this.active;
    },
    changeTheme(theme) {
      this.$store.dispatch('changeTheme', theme);
    },
  },
};
</script>

<style scoped>

</style>
