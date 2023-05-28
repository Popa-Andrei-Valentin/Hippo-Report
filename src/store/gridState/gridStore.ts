import {RestaurantType} from "@/typings/RestaurantType";
export default {
    state: {
        rowData: new Array(),
    },
    getters: {
        getRowData(state: {rowData: RestaurantType[]}): RestaurantType[] {
            return state.rowData
        }
    },
    mutations: {
        setRowData(state: {rowData: RestaurantType[]}, array: RestaurantType[]): void {
            state.rowData = array
        }
    },
    actions: {
        // TODO: FIND A TYPE COMMIT / DISPATCH FUNCTIONS.
        //@ts-ignore
        setNewRowData({commit}, newData: RestaurantType[]): void {
            commit("setRowData", newData);
        }
    },
}
