<template>
  <div class="home-container">
    <div class="info-item">
      <h1>Home Page</h1>
    </div>
    <div class="file-item">

      <div v-if="currentFile.length < 1">
          <p>Upload excel file here</p>
          <br/>
          <input type="file" @change="readFile" />
      </div>

      <div v-else-if="currentFile.length > 1">
          <p>Upload succesful</p>
          <button @click="calculateTotal">Total Sum</button>
          <button v-if="this.arrayForExport.length > 0" @click="writeExcel">Download</button>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import * as XLSX from "xlsx"
import { defineComponent } from 'vue'
import { RestaurantType } from "@/typings/RestaurantType";

export default defineComponent({
  data () {
    return {
      currentFile: new Array(), // TODO: fix this error, "[]" returns "never[]" type which creates another errors.
      arrayForExport: new Array(),
      currExcelTotal: {
          "TOTAL" : 0
      }
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
    },

    /**
    * PROTOTYPE: Calculate total and add up any duplicates, return an object without duplicates.
    */
    calculateTotal():void {
        let filteredTable: {[key: string]: RestaurantType} = {}
        let verifiedTables: string[] = [];
        let total = 0;

        if (this.currentFile[0].length > 0) {
            this.currentFile[0].map((obj: RestaurantType) => {
                total = obj["Total"] + total
                let name = obj["Produs"]
                if (verifiedTables.length < 1 || verifiedTables.indexOf(name) === -1) {
                   verifiedTables.push(name);
                   filteredTable[name] = obj;
                } else {
                    filteredTable[name]["Cantitate"] += obj["Cantitate"]
                    filteredTable[name]["Total"] += obj["Total"]
                }
            })
        }

        Object.values(filteredTable).forEach(obj => this.arrayForExport.push(obj));
        this.currExcelTotal["TOTAL"] = total;
        this.arrayForExport.push(this.currExcelTotal);
    },

    /**
     * Export Processed document as excel.
     */
    writeExcel(): void {
        let worksheet = XLSX.utils.json_to_sheet(this.arrayForExport);

        let wb = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(wb, worksheet, "test");

        XLSX.writeFile(wb,"test.xlsx")
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
