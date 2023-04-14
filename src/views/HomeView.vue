<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    HelloWorld,
  },
})
</script>
