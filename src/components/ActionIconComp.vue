<template>
    <!-- Icon -->
    <i
        v-if="!isDuplicate"
        ref="trigger"
        data-action="toggle"
        class="fa-solid fa-ellipsis-vertical fa-xl"
    />

    <!-- Menu -->
    <div v-if="isOpen" ref="content" class="menu-container">
        <div
            @click="onClickHandler('visualize')"
            class="menu-item">
            <i class="fa-regular fa-eye"></i> Visualize param
        </div>

        <div
            v-if="isRoot"
            @click="onClickHandler('approve')"
            class="menu-item">
            <i class="fa-regular fa-circle-check"></i> Confirm calculus
        </div>
    </div>

</template>

<script>
//TODO: Change component script language to "ts" and bind proper types.
import tippy from 'tippy.js';
import { hideAll } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { mapActions } from "vuex";

export default {
    data() {
        return {
            isOpen: false,
            tippyInstance: null,
            isDuplicate: false,
            isRoot: false,
            currentRowId: -1,
            currentRowData: {}
        }
    },
    mounted() {
        // Disabled action elipsis for nested rows.
        if (this.params.data.duplicate && !this.params.data.children) this.isDuplicate = true

        // Enable Confirm Calculus operation only for root rows ( which show nested rows when clicked upon )
        if (this.params.data.children && this.params.data.children.length > 0) this.isRoot = true

        this.currentRowId = this.params.rowIndex;
        this.currentRowData = this.params

        this.tippyInstance = tippy(this.$refs.trigger);
        this.tippyInstance.disable();
    },
    methods: {
        ...mapActions({
            updateRowDataAfterCalcul: 'updateRowDataAfterCalcul',
            updatePopUpOpenStatus: 'updatePopUpStatus',
            updatePopUpObj: 'updatePopUpObj'
        }),

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
            this.updatePopUpObj(this.currentRowData);
            this.updatePopUpOpenStatus({
                status: true,
                type: option
            })
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
    display: block;
    padding: 0.25rem 1rem;
    clear: both;
    font-weight: 400;
    color: #212529;
    text-align: inherit;
    text-decoration: none;
    white-space: nowrap;
}
</style>