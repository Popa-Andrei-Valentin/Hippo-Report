<template>
  <button type="button" class="button" @click="emitClick">
    <span class="button__text">{{text}}</span>
    <span class="button__icon"></span>
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
    },
    methods: {
        emitClick() {
            this.$emit('clickEvent')
        }
    }
})
</script>

<style scoped>
.button {
    position: relative;
    width: 150px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px solid #34974d;
    background-color: #3aa856;
}

.button, .button__icon, .button__text {
    transition: all 0.3s;
}

.button .button__text {
    transform: translateX(30px);
    color: #fff;
    font-weight: 600;
}

.button .button__icon {
    position: absolute;
    transform: translateX(109px);
    height: 100%;
    width: 39px;
    background-color: #34974d;
    display: flex;
    align-items: center;
    justify-content: center;
}

.button .svg {
    width: 30px;
    stroke: #fff;
}

.button:hover {
    background: #34974d;
}

.button:hover .button__text {
    color: transparent;
}

.button:hover .button__icon {
    width: 148px;
    transform: translateX(0);
}

.button:active .button__icon {
    background-color: #2e8644;
}

.button:active {
    border: 1px solid #2e8644;
}
</style>