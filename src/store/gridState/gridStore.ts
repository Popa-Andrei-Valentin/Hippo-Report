import {RestaurantType} from "@/typings/RestaurantType";
import {HeaderType} from "@/typings/DataTableType";
import {toRaw, nextTick} from "vue";

export default {
    state: {
        rowData: new Array(),
        headers: new Array()
    },
    getters: {
        getRowData(state: {rowData: RestaurantType[]}): RestaurantType[] {
            return state.rowData;
        },

        getHeadersData(state: {headers: HeaderType[]}): HeaderType[] {
            return state.headers;
        }
    },
    mutations: {
        setRowData(state: {rowData: RestaurantType[]}, array: RestaurantType[]): void {
            state.rowData = array;
        },

        setHeadersData(state: {headers: HeaderType[]}, array: HeaderType[]): void {
            state.headers = array;
        }
    },
    actions: {
        /** ------- Rows State------- **/

        // TODO: FIND A TYPE COMMIT / DISPATCH FUNCTIONS.
        //@ts-ignore
        setNewRowData({commit}, newData: RestaurantType[]): void {
            commit("setRowData", newData);
        },

        //@ts-ignore
        async updateRowDataAfterCalcul({commit, state}, currentRowObj: {id: number, data: RestaurantType}): void {
            const rowData = toRaw(state.rowData);
            const index = rowData.findIndex((obj: RestaurantType): boolean => obj === currentRowObj.data);
            if (index >= 0 && rowData[index] === currentRowObj.data) {

                if (rowData[index].expanded) {
                    rowData.splice(index + 1, rowData[index].children.length)
                }

                delete rowData[index].children
                delete rowData[index].duplicate
                delete rowData[index].expanded

                commit("setRowData", []);
                await nextTick();

                commit("setRowData", rowData);
            } else {
                console.warn("Something went wrong with calculus confirmation")
            }
        },

        /** ------- Headers State------- **/
        //@ts-ignore
        setNewHeaderData({commit}, newData: HeaderType[]): void {
            commit("setHeadersData", newData)
        }
    },
}
