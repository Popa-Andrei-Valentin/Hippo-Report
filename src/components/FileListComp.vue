<template>
  <div class="home-container">
    <div class="info-item">
      <h1>Process Document</h1>
    </div>
    <div class="file-item">
        <div class="grid-buttons">
            <grid-button-animated
              class="btn"
              text="Download"
              :disabled="isDownloadPossible"
              @click="writeExcel" />
        </div>
          <ag-grid-vue
            class="ag-theme-material"
            style="height: 70vh; width: 100%"
            :columnDefs="getHeadersData"
            :defaultColDef="defaultColDef"
            :rowData="getRowData"
            :overlayNoRowsTemplate="noRowsOverlay"
            :getRowStyle="getRowStyle"
            :deltaRowDataMode="true"
            :getRowId="getRowId"
            :animateRows="true"
            :suppressRowHoverHighlight=true
            @gridReady="onGridReady"
            @cellClicked="onCellClicked"
          />
    </div>
  </div>
</template>

<script lang="ts">
import * as XLSX from "xlsx"
import { defineComponent, toRaw } from 'vue'
import { RestaurantType } from "@/typings/RestaurantType";
import { HeaderType } from "@/typings/DataTableType";
import {AgGridVue} from "ag-grid-vue3";
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import gridButtonAnimated from "@/components/GridButtonAnimated.vue";
import {GridApi, GridOptions} from "ag-grid-community";
import ActionIconComp from "@/components/ActionIconComp.vue";
import { mapGetters, mapActions } from "vuex";

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
      defaultColDef: {
          resizable: true,
          flex: 1
      },
      noRowsOverlay: "<input class='inputOverlay' type='file'/>",
      gridApi: null,
    }
  },
  components: {
      AgGridVue,
      gridButtonAnimated,
      ActionIconComp
  },
  props: {
    msg: {
      type: String,
      default: ():string => "404: No message found"
    }
  },
  computed: {
    ...mapGetters({
      getRowData: 'getRowData',
      getHeadersData: 'getHeadersData'}),

    /**
     * Computed value used to determine if download button should be disabled.
     * Used for additional buttons on top of Ag-Grid.
     */
    isDownloadPossible(): boolean {
        return this.getRowData.length < 1
    }
  },
  methods: {
    ...mapActions({
      setNewRowData: 'setNewRowData',
      setNewHeaderData: 'setNewHeaderData'
    }),

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
      this.currentFile.push(...arr);
      this.calculateTotal();
    },

    /**
    * PROTOTYPE: Calculate total and add up any duplicates,
    * Return an object without duplicates.
    */
    async calculateTotal(): Promise<void> {
        let processedTable: {[key: string]: RestaurantType} = {}
        let verifiedTables: string[] = [];
        let total = 0;

        if (this.currentFile.length > 0) {
            this.currentFile.map((obj: RestaurantType, index: number) => {
                obj = toRaw(obj);
                obj.customId = index;
                total = obj["Total"] + total
                let name = obj["Produs"].toLowerCase()
                if (verifiedTables.length < 1 || verifiedTables.indexOf(name) === -1) {
                   verifiedTables.push(name);
                    processedTable[name] = obj;
                } else {
                    obj.duplicate = true;
                    if (!processedTable[name].children) {
                      let initialObj = {...processedTable[name]}
                      initialObj.duplicate = true
                      // In order to avoid ag-grid auto-adding it to the list.
                      initialObj.customId = Math.floor(Math.random() * (999999 - this.getRowData.length + 1) + this.getRowData.length);

                      processedTable[name].children = [initialObj,obj];
                    } else {
                        processedTable[name].children?.push(obj);
                    }
                    processedTable[name].expanded = false;
                    processedTable[name]["Cantitate"] += obj["Cantitate"]
                    processedTable[name]["Total"] += obj["Total"]
                }
            })
        }

        Object.values(processedTable).forEach(obj => this.arrayForExport.push(obj));

        // Set Rows for AG-Grid.
        await this.setNewRowData(this.arrayForExport)

        this.currExcelTotal["TOTAL"] = total;
        this.arrayForExport.push(this.currExcelTotal);
    },

    /**
     * Export Processed document as excel.
     */
    writeExcel(): void {
        let worksheet = XLSX.utils.json_to_sheet(this.getRowData);

        let wb = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(wb, worksheet, "test");

        XLSX.writeFile(wb,"test.xlsx")
    },

    // ------- AG-Grid Methods------- //

    /**
     * Set the column headers for data-table.
     * @param {Object} arr
     */
    async setHeaders(arr: object) : Promise<void> {
      let columnsDef = []
      Object.keys(arr).map((header: string) => {
        let toAdd: HeaderType = {
            field: header,
        }

        // if (header === "Sectie") toAdd.cellRenderer = this.addArrowForNestedRows

        columnsDef.push(toAdd);
      })

      columnsDef.push({
          field: "Action",
          resizable: false,
          width: 100,
          maxWidth: 100,
          minWidth: 50,
          cellRenderer: ActionIconComp
      });

      await this.setNewHeaderData(columnsDef)
    },

    /**
     * Method that is called by AG-Grid when the grid is ready to be mounted to DOM.
     */
    onGridReady(params: GridApi<RestaurantType>): void {
        window.addEventListener('error', e => {
            if (e.message === 'ResizeObserver loop limit exceeded') {
                const resizeObserverErrDiv = document.getElementById(
                    'webpack-dev-server-client-overlay-div'
                );
                const resizeObserverErr = document.getElementById(
                    'webpack-dev-server-client-overlay'
                );
                if (resizeObserverErr) {
                    resizeObserverErr.setAttribute('style', 'display: none');
                }
                if (resizeObserverErrDiv) {
                    resizeObserverErrDiv.setAttribute('style', 'display: none');
                }
            }
        });
        // @ts-ignore
        this.gridApi = params.api;

        let overlayInput = document.querySelector(".inputOverlay");
        // @ts-ignore
        if(overlayInput) overlayInput.addEventListener('change', this.readFile) // TODO: FIX TS ERROR FOR QUERY SELECTOR.
    },

    /**
     * Update Ag-Grid with rows when user clicks on highlighted row.
     * Expands/Shrinks nested rows.
     * @param e
     */
    async onRowClicked(e: any): Promise<void> {
      let rowData = this.getRowData
      if (e.data.children && e.data.children.length > 0) {
        for (let i=0; i < rowData.length; i++) {
          if(e.data.customId === rowData[i].customId) {
            rowData[i].expanded = !rowData[i].expanded ;

              if (rowData[i].expanded) {
                rowData.splice(i + 1, 0, ...e.data.children)
              } else {
                rowData.splice(i+1, e.data.children.length);
              }

              await this.setNewRowData(rowData)

              //@ts-ignore
              this.gridApi.setRowData(this.getRowData)
            break
          }
        }
      }
    },

    /**
     * Add icon which shows if nested row is expanded/shrunk.
     */
    addArrowForNestedRows(param: any){
        if (Object.prototype.hasOwnProperty.call(param.data, "expanded")) {
            return `${param.data.expanded ? "-" : "+"} ${param.value}`
        }
        return param.value
    },

    getRowStyle(params: any) {
        if (params.data.children) {
            return {background: '#ffdd00'}
        }
        if (params.data.duplicate) {
            return {background: '#fcf588'}
        }
    },

    getRowId(params: any) {
      return params.data.customId
    },

    onCellClicked (params: any) {
      if (
          params.event.target.dataset.action == 'toggle' &&
          params.column.getColId() == 'Action'
      ) {
        const cellRendererInstances = params.api.getCellRendererInstances({
          rowNodes: [params.node],
          columns: [params.column],
        });
        if (cellRendererInstances.length > 0) {
          const instance = cellRendererInstances[0];
          instance.togglePopup();
        }
      } else {
        this.onRowClicked(params);
      }
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
    border-bottom: 1px solid #e2e2e2;
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
