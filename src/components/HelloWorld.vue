<template>
  <div class="home-container">
    <div class="info-item">
      <h1>Home Page</h1>
    </div>
    <div class="file-item">
        <div class="grid-buttons">
            <grid-button-animated class="btn" text="Download" @click="writeExcel" />
        </div>
          <ag-grid-vue
            class="ag-theme-material"
            style="height: 70vh; width: 100%"
            :columnDefs="columnsDef"
            :defaultColDef="defaultColDef"
            :rowData="rowsData"
            :overlayNoRowsTemplate="noRowsOverlay"
            @gridReady="onGridReady"
          ></ag-grid-vue>
          <!-- <button @click="calculateTotal">Total Sum</button>-->
          <!-- <button v-if="this.arrayForExport.length > 0" @click="writeExcel">Download</button>-->
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
import 'ag-grid-community/styles/ag-theme-material.css'
import gridButtonAnimated from "@/components/GridButtonAnimated.vue";


export default defineComponent({
  data () {
    return {
      // ------- XLSX ------- //
      currentFile: new Array(), // TODO: fix this error, "[]" returns "never[]" type which creates another errors.
      arrayForExport: new Array(),
      currExcelTotal: {
          "TOTAL" : 0
      },
      currFileName: "",

      // ------- AG-Grid ------- //
      columnsDef: new Array(),
      rowsData: new Array(),
      defaultColDef: {
          resizable: true,
          flex: 1
      },
      noRowsOverlay: "<input class='inputOverlay' type='file' @change='() => console.log(this)' />"
    }
  },
  components: {
      AgGridVue,
      gridButtonAnimated
  },
  props: {
    msg: {
      type: String,
      default: ():string => "404: No message found"
    }
  },
  methods: {
    // ------- XLSX Methods ------- //
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

    // ------- AG-Grid Methods------- //
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
    },

    /**
     * Method that is called by AG-Grid when the grid is ready to be mounted to DOM.
     */
    onGridReady(): void {
        let overlayInput = document.querySelector(".inputOverlay");
        // @ts-ignore
        if(overlayInput) overlayInput.addEventListener('change', this.readFile) // TODO: FIX TS ERROR FOR QUERY SELECTOR.
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
  grid-area: main;

  display: grid;
  align-items: center;
  justify-items: center;
  height: 100%;
  width: 95%;
  box-shadow: 0 0 0.75rem #8080803C;

  grid-template-areas:
    "buttons"
    "grid";
  grid-template-rows: 7vh 70vh;
  grid-template-columns: 100%;
}

.ag-theme-material {
  grid-area: grid;
}

.grid-buttons {
    height: 100%;
    width: 100%;
    grid-area: buttons;
    display: flex;
    justify-content: end;
    align-items: center;
}

.grid-buttons > * {
    margin-right: 10px;
}

:global(.ag-header-cell-label) {
  justify-content: center;
}

:global(.inputOverlay) {
    pointer-events: auto;
}
</style>
