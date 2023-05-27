export interface HeaderType {
   field: string,
   cellRenderer?: (param: any)=>void,
   resizable?: boolean,
   width?: number,
   maxWidth?: number,
   minWidth?: number,
}