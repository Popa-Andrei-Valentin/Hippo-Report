<template>
    <div class="pop-container">
        <div class="pop-rectangle">
            <h1 class="pop-title">{{ getPopUpObj['Produs'] }}</h1>
            <div v-if="isPopUpOpenStatus.type === 'approve'">
              <v-data-table-virtual
                  :headers="columnsDef"
                  :items="tableRows"
                  class="elevation-1 ma-2"
                  min-height="200"
                  item-value="Produs"
              ></v-data-table-virtual>
              <p>Is the calculus correct ?</p>
              <p><b>Total Cantitate:</b> {{getPopUpObj.Cantitate}} <b>Total:</b> {{getPopUpObj.Total}}</p>
            </div>
            <div class="btns-container">
                <v-btn
                    v-show="isPopUpOpenStatus.type === 'approve'"
                    class="confirm-btn"
                    @click="confirmAction"
                >
                    Confirm
                </v-btn>
                <v-btn
                    class="cancel-btn"
                    @click="updatePopUpStatus(false)"
                >
                    <i class='fa-solid fa-circle-xmark' style='color: #ffffff;'/>
                    {{isPopUpOpenStatus.type === 'approve' ? "Cancel" : "Close" }}
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {mapActions, mapGetters} from "vuex";
import {VDataTableVirtual} from "vuetify/labs/VDataTable";
import {toRaw} from "vue";

export default defineComponent({
    data(){
        return {
            columnsDef: new Array(),
            tableRows: new Array()
        }
    },
    beforeMount() {
      // Assign headers.
        Object.keys(this.getPopUpObj.data.children[0]).map((header: string) => {

          if (header === "customId" || header === "duplicate") return

          let toAdd = {
            title: header,
            align: 'start',
            sortable: false,
            key: header,
          }
            this.columnsDef.push(toAdd);
        });

      // Assign rows.
        this.tableRows = this.getPopUpObj.data.children
    },
    components:{
      VDataTableVirtual
    },
    methods: {
        ...mapActions({
            updatePopUpStatus: "updatePopUpStatus",
            updateRowDataAfterCalcul: "updateRowDataAfterCalcul"
        }),

        async confirmAction() {
            await this.updateRowDataAfterCalcul({id: this.getPopUpObj.rowIndex, data: toRaw(this.getPopUpObj.data) })
            await this.updatePopUpStatus(false)
        }
    },
    computed: {
        ...mapGetters({
            getPopUpObj: "getPopUpObj",
            isPopUpOpenStatus: "isPopUpOpenStatus"
        })
    }
})

</script>

<style scoped>
.pop-container {
    background-color: rgba(0, 0, 0, 0.55);
    position: absolute;
    z-index: 9999;
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
}

.pop-rectangle {
    background-color: white;
    padding: 40px;
}

.pop-title {
    padding: 10px;
}

.pop-text {
    padding: 30px;
}

.cancel-btn {
    background-color: red;
    color: white;
}

.confirm-btn {
    background-color: #3aa856;
    color: white;
    margin-right: 0.5rem;
}

.btns-container {
  margin-top: 8px;
}

</style>