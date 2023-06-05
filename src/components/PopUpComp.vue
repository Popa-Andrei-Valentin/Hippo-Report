<template>
    <div class="pop-container">
        <div class="pop-rectangle">
            <h1 class="pop-title">{{ getPopUpObj['Produs'] }}</h1>
<!--            <p class="pop-text">{{ getPopUpText }}</p>-->
            <div>
                <v-btn
                    v-show="isPopUpOpenStatus.type === 'approve'"
                    class="confirm-btn"
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

export default defineComponent({
    methods: {
        ...mapActions({
            updatePopUpStatus: "updatePopUpStatus"
        })
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
    color: white
}

.confirm-btn {
    background-color: #3aa856;
    color: white
}

</style>