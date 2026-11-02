<script setup lang="ts">
import { ref } from 'vue'
import SmartDataTable from '@reydi-dev/vue3-smart-datatable'
import '@reydi-dev/vue3-smart-datatable/styles.css'
import type { DataProvider } from '@reydi-dev/vue3-smart-datatable'
import { customers, columns, type Customer } from './data.js'
const scenario = ref<'error' | 'empty' | 'ready'>('error')
const tableKey = ref(0)
const provider: DataProvider<Customer> = async ({ signal, page, itemsPerPage }) => {
  await new Promise<void>((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason)
    const done = () => { signal?.removeEventListener('abort', abort); resolve() }
    const timer = setTimeout(done, 500)
    const abort = () => { clearTimeout(timer); signal?.removeEventListener('abort', abort); reject(signal?.reason) }
    signal?.addEventListener('abort', abort, { once: true })
  })
  if (scenario.value === 'error') throw new Error('Simulated server error')
  const rows = scenario.value === 'empty' ? [] : customers
  return { items: rows.slice((page - 1) * itemsPerPage, page * itemsPerPage), total: rows.length }
}
function choose(value: 'error' | 'empty' | 'ready') { scenario.value = value; tableKey.value++ }
</script>
<template>
  <section><h2>Loading, error and empty states</h2><p>Use the controls to switch the simulated provider response. Retry is available inside the table.</p>
  <div class="scenario-buttons"><button @click="choose('error')">Simulate error</button><button @click="scenario = 'ready'">Restore server for retry</button><button @click="choose('empty')">Empty result</button><button @click="choose('ready')">Successful result</button></div>
  <SmartDataTable :key="tableKey" mode="server" :columns="columns" :data-provider="provider" />
  </section>
</template>
