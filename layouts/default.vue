<template>
  <div>
    <Navbar />
    <div class="content">
      <div v-if="$nuxt.isOffline">
        <h1>Internet Connection: Offline</h1>
        <p>
          Seems to be an issue with your internet.
        </p>
      </div>
      <Nuxt v-else />
      <FloatingTip />
    </div>
  </div>
</template>
