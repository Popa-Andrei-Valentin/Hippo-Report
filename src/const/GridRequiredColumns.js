import ActionIconComp from "@/components/ActionIconComp.vue";

export const RequiredHeaders = [
    {
        field: "Action",
        resizable: false,
        width: 100,
        maxWidth: 100,
        minWidth: 50,
        cellRenderer: ActionIconComp
    },
    {
        field: "duplicate",
        hide: true,
    }
]