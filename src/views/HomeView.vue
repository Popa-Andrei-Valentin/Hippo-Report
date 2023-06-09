<template>
  <div class="home">
    <FileListComp />
  </div>
</template>

<script lang="ts">
import FileListComp from '@/components/FileListComp.vue'; // @ is an alias to /src
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    FileListComp,
  },
})
</script>
