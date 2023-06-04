import {RestaurantType} from "@/typings/RestaurantType";

export default {
    state: {
        isPopUpOpen: false,
        popUpObj: {},
    },
    getters: {
        isPopUpOpenStatus(state: {isPopUpOpen: boolean}): boolean {
            return state.isPopUpOpen;
        },

        getPopUpObj(state: {popUpObj: RestaurantType}): RestaurantType {
            return state.popUpObj;
        }
    },
    mutations: {
        setPopUpStatus(state: {isPopUpOpen: boolean}, status: boolean): void {
            state.isPopUpOpen = status;
        },

        setPopUpObj(state: {popUpObj: RestaurantType}, currentPopObj: RestaurantType): void {
            state.popUpObj = currentPopObj
        }
    },
    actions: {
        //@ts-ignore
       updatePopUpStatus({commit}, status: boolean): void {
           commit('setPopUpStatus', status)
       },
        
        //@ts-ignore
        updatePopUpObj({commit}, currentPopObj: RestaurantType): void {
           commit('setPopUpObj', currentPopObj);
        }
    },
}
