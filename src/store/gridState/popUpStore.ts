import {RestaurantType} from "@/typings/RestaurantType";

export default {
    state: {
        isPopUpOpen: {status: false, type: null},
        popUpObj: {},
    },
    getters: {
        isPopUpOpenStatus(state: {isPopUpOpen: { status: boolean, type: string }}): {status: boolean, type: string} {
            return state.isPopUpOpen;
        },

        getPopUpObj(state: {popUpObj: RestaurantType}): RestaurantType {
            return state.popUpObj;
        }
    },
    mutations: {
        setPopUpStatus(state: {isPopUpOpen: { status: boolean, type: string }}, objStatus: { status: boolean, type: string }): void {
            state.isPopUpOpen = objStatus;
        },

        setPopUpObj(state: {popUpObj: RestaurantType}, currentPopObj: RestaurantType): void {
            state.popUpObj = currentPopObj
        }
    },
    actions: {
        //@ts-ignore
       updatePopUpStatus({commit}, status: { status: boolean, type: string }): void {
           commit('setPopUpStatus', status)
       },

        //@ts-ignore
        updatePopUpObj({commit}, currentPopObj: RestaurantType): void {
           commit('setPopUpObj', currentPopObj);
        }
    },
}
