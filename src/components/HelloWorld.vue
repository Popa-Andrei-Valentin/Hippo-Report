<template>
  <div class="home-container">
    <div class="info-item">
      <h1>Home Page</h1>
    </div>
    <div class="file-item">
      <p>Upload excel file here</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    msg: {
      type: String,
      default: ():string => "404: No message found"
    }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-container {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-areas:
      "info info"
      "main main"
      "main main";
  grid-template-rows: 10% auto;
  grid-template-columns: auto auto;

  align-items: center;
  justify-items: center;
}

.info-item {
  grid-area: info;
}

.file-item {
  grid-area: main;
  padding: 10rem;
}
</style>
