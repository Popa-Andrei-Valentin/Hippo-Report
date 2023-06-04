<template>
    <div class="pop-container">
        <div class="pop-rectangle">
            <h1 class="pop-title">{{ getPopUpObj['Produs'] }}</h1>
<!--            <p class="pop-text">{{ getPopUpText }}</p>-->
            <div>
                <v-btn>
                    Button 1
                </v-btn>
                <v-btn style="background-color: red; color: white" @click="updatePopUpStatus(false)">
                    {{getPopUpObj.children.length > 0 ? "<i class='fa-solid fa-circle-xmark' style='color: #ffffff;'></i> Cancel" : "Close" }}
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
            getPopUpObj: "getPopUpObj"
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

</style>