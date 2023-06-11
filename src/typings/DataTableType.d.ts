import type {Component} from "vue";
export interface HeaderType {
   field: string,
   cellRenderer?: (param: any) => void | Component,
   resizable?: boolean,
   width?: number,
   maxWidth?: number,
   minWidth?: number,
   hide?: boolean
}