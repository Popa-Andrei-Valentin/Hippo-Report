<template>
    <!-- Icon -->
    <i
        ref="trigger"
        data-action="toggle"
        class="fa-solid fa-ellipsis-vertical fa-xl"
    />

    <!-- Menu -->
    <div v-if="isOpen" ref="content" class="menu-container">
        <div v-on:click="onClickHandler('visualize')" class="menu-item">
            <i class="fa-regular fa-eye"></i> Visualize param
        </div>

        <div v-on:click="onClickHandler('approve')" class="menu-item">
            <i class="fa-regular fa-circle-check"></i> Confirm calculus
        </div>
    </div>

</template>

<script>
import tippy from 'tippy.js';
import { hideAll } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
export default {
    data() {
        return {
            isOpen: false,
            tippyInstance: null,
        }
    },
    mounted() {
        this.tippyInstance = tippy(this.$refs.trigger);
        this.tippyInstance.disable();
    },
    methods: {
        togglePopup() {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                this.$nextTick(() => {
                    this.configureTippyInstance();
                    this.tippyInstance.setContent(this.$refs.content);
                });
            } else {
                this.tippyInstance.unmount();
            }
        },
        configureTippyInstance() {
            this.tippyInstance.enable();
            this.tippyInstance.show();
            this.tippyInstance.setProps({
                trigger: 'manual',
                placement: 'right',
                allowHTML: true,
                arrow: false,
                interactive: true,
                appendTo: document.body,
                hideOnClick: false,
                onShow: (instance) => {
                    hideAll({ exclude: instance });
                },
                onClickOutside: (instance, event) => {
                    this.isOpen = false;
                    instance.unmount();
                },
            });
        },
        onClickHandler(option) {
            this.togglePopup();
            if (option === 'visualize') {
                console.log("Visualize")
            }
            if (option === 'approve') {
                console.log("Approve")
            }
        },
    },
}
</script>

<style scoped>
.menu-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    position: absolute;
    z-index: 1000;
    min-width: 10rem;
    padding: 0.5rem 0;
    margin: 0;
    font-size: 1rem;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
}
.menu-item:hover {
    cursor: pointer;
    background: rgb(240, 240, 240);
}

.menu-item.active {
    background-color: #dc3545;
    border-color: #dc3545;
    color: white;
}
.menu-item {
    border: 2px solid red;
    display: block;
    padding: 0.25rem 1rem;
    clear: both;
    font-weight: 400;
    color: #212529;
    text-align: inherit;
    text-decoration: none;
    white-space: nowrap;
    border: 0;
}
</style>