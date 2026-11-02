<script setup lang="ts">
import { ref } from 'vue'
import SmartDataTable from '@reydi-dev/vue3-smart-datatable'
import '@reydi-dev/vue3-smart-datatable/styles.css'
import type {
  DataProvider,
  DataTableColumn,
} from '@reydi-dev/vue3-smart-datatable'
import type { Customer } from './data.js'
const columns: readonly DataTableColumn<Customer>[] = [
  {
    key: 'name',
    label: 'Customer',
    sortable: true,
    filterable: true,
    filter: { operators: ['contains'] },
  },
  { key: 'amount', label: 'Amount', type: 'number', sortable: true },
]
// A real fetch boundary to the lab's local, synthetic API.
const provider: DataProvider<Customer> = async (request) => {
  const query = new URLSearchParams({ page: String(request.page), size: String(request.itemsPerPage), name: String(request.filters.name?.value ?? '') })
  if (request.sort) { query.set('sort', request.sort.columnKey); query.set('direction', request.sort.direction) }
  const response = await fetch('/api/customers?' + query, { signal: request.signal })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const raw: unknown = await response.json()
  if (!raw || typeof raw !== 'object' || !('items' in raw) || !Array.isArray(raw.items) || !('total' in raw) || typeof raw.total !== 'number') throw new Error('Invalid response')
  const items: Customer[] = raw.items.map((item: unknown) => {
    if (!item || typeof item !== 'object' || !('id' in item) || typeof item.id !== 'number' || !('name' in item) || typeof item.name !== 'string' || !('email' in item) || typeof item.email !== 'string' || !('amount' in item) || typeof item.amount !== 'number' || !('status' in item) || typeof item.status !== 'string') throw new Error('Invalid customer')
    return { id: item.id, name: item.name, email: item.email, amount: item.amount, status: item.status }
  })
  return { items, total: raw.total }
}
const itemsPerPage = ref(10)
</script>
<template>
  <section aria-labelledby="async-title">
    <h2 id="async-title">Async provider</h2>
    <p>
      The local mock API responds after 300 ms. Change the filter while a
      request is pending to try cancellation.
    </p>
    <SmartDataTable
      v-model:items-per-page="itemsPerPage"
      mode="server"
      :columns="columns"
      :data-provider="provider"
      :filter-debounce="150"
    />
  </section>
</template>
