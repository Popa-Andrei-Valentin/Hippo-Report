<template>
  <div class="home-container">
    <div class="info-item">
      <h1>Home Page</h1>
    </div>
    <div class="file-item">
      <p>Upload excel file here</p>
      <br/>
      <input type="file" @change="readFile" />
      <p v-if="currentFile.length > 0">Upload succesful</p>
    </div>
  </div>
</template>

<script lang="ts">
import * as XLSX from "xlsx"
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      currentFile: new Array() // TODO: fix this error, "[]" returns "never[]" type which creates another errors.
    }
  },
  props: {
    msg: {
      type: String,
      default: ():string => "404: No message found"
    }
  },
  methods: {
    /**
     * Read file and save it to currentFile variable.
     */
    async readFile(e: HTMLInputElement) {
      this.processFile(e, this.writeFile)
    },

    /**
     * Process xlsx/xls files and transform its content to JSON.
     */
    processFile(e:HTMLInputElement, callback: (arr: object[]) => void) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = function (e: any) { // TODO: fix "any" type
        let arr: object[] = []
        let data = e.target.result;
        let workbook = XLSX.read(data, {type: "binary"});
        workbook.SheetNames.map(sheet => {
          let rowObj: Array<object> = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
          if (rowObj && rowObj.length > 0) {
            arr.push(rowObj);
          }
        })
        if(arr.length > 0) callback(arr)
      };
      reader.readAsArrayBuffer(file);
    },

    writeFile(arr: object[]) {
      this.currentFile = [...arr]
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
