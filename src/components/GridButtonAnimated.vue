<template>
  <button type="button" class="button-animated" @click="emitClick" :disabled="disabled">
    <span class="button-animated__text">{{text}}</span>
    <span class="button-animated__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name:"GridButtonAnimated",
    data(){return{}},
    props: {
        text: {
            type: String,
            required: true,
            default:(): string => "Error"
        },
        disabled: {
            type: Boolean,
            default: (): boolean => false
        }
    },
    methods: {
        emitClick() {
            this.$emit('clickEvent')
        }
    }
})
</script>

<style scoped>
.button-animated {
    position: relative;
    width: 150px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px solid #34974d;
    background-color: #3aa856;
}

.button-animated:disabled {
    background-color: gray;
    pointer-events: none;
    border: 1px solid gray;
}

.button-animated:disabled .button-animated__icon {
    background-color: gray;
}

.button-animated, .button-animated__icon, .button-animated__text {
    transition: all 0.3s;
}

.button-animated .button-animated__text {
    transform: translateX(20px);
    color: #fff;
    font-weight: 600;
}

.button-animated .button-animated__icon {
    position: absolute;
    transform: translateX(109px);
    height: 100%;
    width: 39px;
    background-color: #34974d;
    display: flex;
    align-items: center;
    justify-content: center;
}

.button-animated .svg {
    width: 30px;
    stroke: #fff;
}

.button-animated:hover {
    background: #34974d;
}

.button-animated:hover .button-animated__text {
    color: transparent;
}

.button-animated:hover .button-animated__icon {
    width: 148px;
    transform: translateX(0);
}

.button-animated:active .button-animated__icon {
    background-color: #2e8644;
}

.button-animated:active {
    border: 1px solid #2e8644;
}
</style>