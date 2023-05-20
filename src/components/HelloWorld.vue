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

      <div
        v-else-if="currentFile.length > 1"
        class="gridContainer"
      >
          <ag-grid-vue
            v-if="rowsData.length > 0"
            class="ag-theme-alpine"
            style="height: 500px; width: 95%"
            :columnDefs="columnsDef"
            :rowData="rowsData"
          ></ag-grid-vue>
          <!-- <button @click="calculateTotal">Total Sum</button>-->
          <!-- <button v-if="this.arrayForExport.length > 0" @click="writeExcel">Download</button>-->
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import * as XLSX from "xlsx"
import { defineComponent } from 'vue'
import { RestaurantType } from "@/typings/RestaurantType";
import { HeaderType } from "@/typings/DataTableType";
import {AgGridVue} from "ag-grid-vue3";
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'


export default defineComponent({
  data () {
    return {
      currentFile: new Array(), // TODO: fix this error, "[]" returns "never[]" type which creates another errors.
      arrayForExport: new Array(),
      columnsDef: new Array(),
      rowsData: new Array(),
      currExcelTotal: {
          "TOTAL" : 0
      },
      currFileName: ""
    }
  },
  components: {
      AgGridVue
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
            if(arr.length < 1 || arr.length < rowObj.length) arr = rowObj;
          }
        })
        if(arr.length > 0) callback(arr)
      };
      reader.readAsArrayBuffer(file);
    },

    writeFile(arr: object[]) {
      this.setHeaders(arr[0]);
      this.rowsData = arr;
      this.currentFile.push(...arr);
    },

    /**
    * PROTOTYPE: Calculate total and add up any duplicates,
    * Return an object without duplicates.
    */
    calculateTotal():void {
        let filteredTable: {[key: string]: RestaurantType} = {}
        let verifiedTables: string[] = [];
        let total = 0;

        if (this.currentFile.length > 0) {
            this.currentFile.map((obj: RestaurantType) => {
                total = obj["Total"] + total
                let name = obj["Produs"].toLowerCase()
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
    },

    /**
     * Set the column headers for data-table.
     * @param {Object} arr
     */
    setHeaders(arr: object) : void {
        Object.keys(arr).map((header: string) => {
          let toAdd: HeaderType = {
              field: header,
          }

          this.columnsDef.push(toAdd);
        })
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
      "main main";
  grid-template-rows: 10% 90%;
  grid-template-columns: 30% 70%;

  align-items: center;
  justify-items: center;
}

.info-item {
  grid-area: info;
}

.file-item {
  align-items: center;
  justify-items: center;
  height: 100%;
  width: 100%;
  grid-area: main;
  padding: 2% 0
}

.gridContainer {
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
}
</style>
