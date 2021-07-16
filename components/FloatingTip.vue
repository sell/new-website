<template>
  <div class="bug__report__container">
    <div v-if="!open" class="bug__report__button" @click="open = true">
      <span>
        <i class="bx bx-bug" />
      </span>
    </div>
    <div v-if="open" class="bug__report__box">
      <div class="bug__report__box__info">
        <span @click="open = false">
          <i class="bx bx-x" />
        </span>
        <h3 style="display: inline-block">
          Found a Bug?
        </h3>
        <p>
          If you have found a bug and would like to report it
          <br>
          Please visit: <a href="//github.com/sell/new-website/issues">here</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FloatingTip',
  data() {
    return {
      open: false,
    };
  },
};
</script>

<style lang="scss">
  .bug__report__button {
    position: fixed;
    bottom: 30px;
    right: 20px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: #1d1b31;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      color: white;
    }
    &:hover {
      cursor: pointer;
    }
  }

  .bug__report__box {
    position: absolute;
    bottom: 30px;
    right: 20px;
    height: 140px;
    width: 300px;
    background: #1d1b31;
    border-radius: 5px;
    padding: 5px;
    animation: open 2s forwards;

    @keyframes open {
      0% {
        width: 0;
        height: 0;
      }
      100% {
        width: 300px;
        height: 140px;
      }
    }

    .bug__report__box__info {
      position: relative;
      width: 100%;
      padding: 10px 12px;
      color: white;
      h3 {
        margin: 0;
        padding: 0;
      }
      span {
        position: absolute;
        right: 5px;
        top: 12px;
        i {
          font-size: 1.3rem;
        }
      }
      a {
        color: white;
      }
    }
  }
</style>
