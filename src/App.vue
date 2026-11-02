<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { packages } from './packages/registry'
const selectedPackage = ref(packages[0].id)
const pkg = computed(() => packages.find(item => item.id === selectedPackage.value) ?? packages[0])
const active = ref('local')
const scenario = computed(() => pkg.value.scenarios.find(x => x.id === active.value) ?? pkg.value.scenarios[0])
function sync() { const value=location.hash.slice(1); active.value=pkg.value.scenarios.some(x=>x.id===value)?value:'local' }
function choose(id:string) { location.hash=id; active.value=id }
onMounted(()=>{sync();addEventListener('hashchange',sync)})
onBeforeUnmount(()=>removeEventListener('hashchange',sync))
</script>
<template>
  <div class="shell"><aside><p class="brand">VUE 3 / LAB</p><h1>Package Lab</h1><p class="muted">An independent workspace for testing published Vue packages.</p><div class="side-label">PACKAGES</div><button v-for="item in packages" :key="item.id" class="package" :aria-pressed="selectedPackage === item.id" @click="selectedPackage = item.id; choose(item.scenarios[0].id)"><strong>{{item.name}}</strong><small>{{item.version}} · beta</small></button><a :href="pkg.source">Source repository ↗</a></aside>
  <main><header><div><p class="eyebrow">PACKAGE WORKSPACE</p><h2>{{pkg.name}}</h2><p class="muted">{{pkg.npm}} <span class="badge">{{pkg.version}}</span></p></div><a class="outline" :href="pkg.demo">Public demo ↗</a></header>
  <div class="notice"><strong>Independent npm consumer</strong><span> Real registry package · Synthetic data · Vue 3.5.44</span></div>
  <nav aria-label="Test scenarios"><button v-for="item in pkg.scenarios" :key="item.id" :aria-pressed="active===item.id" @click="choose(item.id)">{{item.label}}</button></nav>
  <div class="workspace"><component :is="scenario.component" :key="scenario.id" /></div>
  <footer>Package-specific scenarios live separately, ready for more Vue 3 packages.</footer></main></div>
</template>
<style>
*{box-sizing:border-box}body{margin:0;background:#f4f7f5;color:#20342d;font:14px/1.5 system-ui,sans-serif}button,a{font:inherit}.shell{display:grid;grid-template-columns:240px minmax(0,1fr);min-height:100vh}aside{background:#142e27;color:#e9f3ee;padding:30px 22px}aside h1{font-size:22px;margin:4px 0}aside .muted{color:#b8cdc2}aside a{color:#a8d7bf;font-size:13px}.brand,.eyebrow,.side-label{font-size:11px;letter-spacing:.12em;font-weight:700}.brand{color:#8bd7b3}.side-label{color:#8ca99b;margin:36px 0 12px}.package{display:block;width:100%;text-align:left;color:inherit;cursor:pointer;background:#24483a;border:1px solid #3c6653;padding:14px;border-radius:9px;margin-bottom:20px}.package small{display:block;color:#b8cdc2;margin-top:4px}main{min-width:0;padding:36px 42px;max-width:1600px;width:100%;margin:auto}header{display:flex;justify-content:space-between;align-items:center;gap:20px}header h2{font-size:28px;margin:3px 0}.eyebrow{color:#3b8b68}.muted{color:#647970}.badge{border:1px solid #c4ddcf;background:#e5f4e9;color:#25724b;padding:3px 8px;border-radius:20px;font-size:12px}.outline,nav button,.scenario-buttons button{border:1px solid #ccdcd3;background:white;color:#274d3c;border-radius:7px;padding:9px 13px;text-decoration:none;cursor:pointer}.notice{display:flex;gap:8px;flex-wrap:wrap;background:#e7f4ec;border:1px solid #c8e6d2;color:#2d6344;border-radius:8px;padding:12px 16px;margin:28px 0 22px}nav{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}nav button[aria-pressed=true]{background:#1d7250;color:white;border-color:#1d7250}.workspace{background:white;border:1px solid #dae6df;border-radius:12px;padding:24px;min-width:0}.workspace h2{font-size:20px;margin:0}.workspace section>p{color:#647970;margin:8px 0 18px}.scenario-buttons{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}footer{margin-top:28px;color:#71867a;font-size:12px}@media(max-width:760px){.shell{display:block}aside{padding:20px}aside .side-label,aside>a{display:none}aside .package{margin:12px 0 0}aside h1{font-size:20px}aside .muted{margin-bottom:0}main{padding:24px 14px}header{align-items:flex-start}header h2{font-size:23px}.workspace{padding:12px}.outline{white-space:nowrap}}
</style>
