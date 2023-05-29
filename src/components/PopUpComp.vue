<template>
    <div class="pop-container">
        <div class="pop-rectangle">
            <h1 class="pop-title">{{ title }}</h1>
            <p class="pop-text">{{ text }}</p>
            <div>
                <v-btn>
                    Button 1
                </v-btn>
                <v-btn>
                    Button 2
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true,
            default: () => "404: No title for pop-up was found."
        },
        text: {
            type: String,
            required: true,
            default: () => "404: No text for pop-up was found."
        },
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