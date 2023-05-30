export default {
    state: {
        isPopUpOpen: false,
        popUpTitle: "",
        popUpText: "",
        popUpBtn: []
    },
    getters: {
        isPopUpOpenStatus(state: {isPopUpOpen: boolean}): boolean {
            return state.isPopUpOpen;
        },

        getPopUpTitle(state: {popUpTitle: string}): string {
            return state.popUpTitle;
        },

        getPopUpText(state: {popUpText: string}): string {
            return state.popUpText;
        },

        getPopUpBtn(state: {popUpBtn: []}): [] {
            return state.popUpBtn
        }
    },
    mutations: {
        setPopUpStatus(state: {isPopUpOpen: boolean}, status: boolean): void {
            state.isPopUpOpen = status;
        },

        setPopUpTitle(state: {popUpTitle: string}, titleText: string): void {
            state.popUpTitle = titleText;
        },

        setPopUpText(state: {popUpText: string}, popUpText: string): void {
            state.popUpText = popUpText;
        },

        setPopUpBtn(state: {popUpBtn: []}, buttons: []): void {
            state.popUpBtn = buttons
        }
    },
    actions: {
        //@ts-ignore
       updatePopUpStatus({commit}, status: boolean): void {
           commit('setPopUpStatus', status)
       },

        //@ts-ignore
        updatePopUpTitle({commit}, title: string): void {
            commit('setPopUpTitle', title)
        },

        //@ts-ignore
        updatePopUpText({commit}, text: string): void {
            commit('setPopUpText', text)
        },

        //@ts-ignore
        updatePopUpBtn({commit}, button: []): void {
           commit('setPopUpBtn', button)
        }
    },
}
