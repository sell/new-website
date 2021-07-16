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
        <nuxt-link to="/redirect?url=https://github.com/sell">
          <i class="bx bxl-github" />
          <span class="links_name">Github</span>
        </nuxt-link>
        <span class="tooltip">Github</span>
      </li>
      <li>
        <nuxt-link to="/redirect?url=https://botlists.com">
          <i class="bx bx-link" />
          <span class="links_name">Discord Bots List</span>
        </nuxt-link>
        <span class="tooltip">Botlists</span>
      </li>
      <li>
        <nuxt-link to="/redirect?url=https://old.jayson.codes">
          <i class="bx bx-link" />
          <span class="links_name">Old Website</span>
        </nuxt-link>
        <span class="tooltip">OldWebsite</span>
      </li>
      <li>
        <nuxt-link to="/privacy">
          <i class="bx bx-check-shield" />
          <span class="links_name">Privacy Policy</span>
        </nuxt-link>
        <span class="tooltip">PrivacyPolicy</span>
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
  methods: {
    burger() {
      this.active = !this.active;
    },
  },
};
</script>

<style scoped>

</style>
