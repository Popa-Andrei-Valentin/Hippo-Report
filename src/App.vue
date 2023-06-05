<template>
  <pop-up-comp
      v-if="isPopUpOpen.status"
      title="Test header"
      text="Test text"
  />

  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<script>
import PopUpComp from "@/components/PopUpComp.vue";
import {mapGetters} from "vuex";

export default {
  components: {
    PopUpComp
  },
  computed: {
    ...mapGetters({
      isPopUpOpen: "isPopUpOpenStatus"
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
