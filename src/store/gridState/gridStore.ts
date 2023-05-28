import {RestaurantType} from "@/typings/RestaurantType";
import {HeaderType} from "@/typings/DataTableType";
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
        // TODO: FIND A TYPE COMMIT / DISPATCH FUNCTIONS.
        //@ts-ignore
        setNewRowData({commit}, newData: RestaurantType[]): void {
            commit("setRowData", newData);
        },
        //@ts-ignore
        setNewHeaderData({commit}, newData: HeaderType[]): void {
            commit("setHeadersData", newData)
        }
    },
}
