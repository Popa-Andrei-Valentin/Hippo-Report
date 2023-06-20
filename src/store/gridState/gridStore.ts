import {RestaurantType} from "@/typings/RestaurantType";
import {HeaderType} from "@/typings/DataTableType";
import {toRaw, nextTick} from "vue";
import { Commit } from 'vuex';

export default {
    state: {
        rowData: new Array(),
        headers: new Array(),
        duplicateRows: 0,
    },
    getters: {
        getRowData(state: {rowData: RestaurantType[]}): RestaurantType[] {
            return state.rowData;
        },

        getHeadersData(state: {headers: HeaderType[]}): HeaderType[] {
            return state.headers;
        },

        getDuplicateRows(state: {duplicateRows: number }): number {
            return  state.duplicateRows
        }
    },
    mutations: {
        setRowData(state: {rowData: RestaurantType[], duplicateRows: number}, array: RestaurantType[]): void {
            state.rowData = array;

            state.duplicateRows = state.rowData.filter((obj: RestaurantType) => obj.children && obj.duplicate).length;
        },

        setHeadersData(state: {headers: HeaderType[]}, array: HeaderType[]): void {
            state.headers = array;
        }
    },
    actions: {
        /** ------- Rows State------- **/

        setNewRowData({commit}: { commit: Commit }, newData: RestaurantType[]): void {
            commit("setRowData", newData);
        },

        async updateRowDataAfterCalcul({commit, state}: {commit: Commit, state: {rowData: [], headers: []}}, currentRowObj: {id: number, data: RestaurantType}): Promise<void> {
            const rowData:RestaurantType[] = toRaw(state.rowData);
            const index = rowData.findIndex((obj: RestaurantType): boolean => obj === currentRowObj.data);
            if (index >= 0 && rowData[index] === currentRowObj.data) {

                if (rowData[index].expanded) {
                    rowData.splice(index + 1, rowData[index].children!.length)
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

        setNewHeaderData({commit}:{ commit: Commit }, newData: HeaderType[]): void {
            commit("setHeadersData", newData)
        }
    },
}
