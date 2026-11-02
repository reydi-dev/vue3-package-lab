import type { Component } from 'vue'
import Local from './smart-datatable/LocalExample.vue'
import Async from './smart-datatable/AsyncExample.vue'
import Slots from './smart-datatable/SlotsExample.vue'
import Rtl from './smart-datatable/RtlExample.vue'
import States from './smart-datatable/StatesExample.vue'
export interface LabPackage { id:string; name:string; version:string; status:string; npm:string; source:string; demo:string; scenarios: {id:string;label:string;component:Component}[] }
export const packages: LabPackage[] = [{ id:'smart-datatable', name:'Smart DataTable', version:'0.1.0', status:'stable', npm:'@reydi-dev/vue3-smart-datatable', source:'https://github.com/reydi-dev/vue3-smart-datatable', demo:'https://reydi-dev.github.io/vue3-smart-datatable/', scenarios:[
  {id:'local',label:'Local data',component:Local}, {id:'async',label:'Async provider',component:Async}, {id:'states',label:'States',component:States}, {id:'slots',label:'Slots & actions',component:Slots}, {id:'rtl',label:'فارسی / RTL',component:Rtl}
]}]
