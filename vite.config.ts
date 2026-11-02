import { defineConfig, type Plugin, type Connect } from 'vite'
import vue from '@vitejs/plugin-vue'
import { customers } from './src/packages/smart-datatable/data.ts'
function fixtureApi(): Plugin {
  const middleware: Connect.NextHandleFunction = (req, res, next) => {
    const url = new URL(req.url ?? '/', 'http://localhost')
    if (url.pathname !== '/api/customers') return next()
    const search = (url.searchParams.get('name') ?? '').toLowerCase()
    const rows = customers.filter(row => row.name.toLowerCase().includes(search))
    const sort = url.searchParams.get('sort')
    if (sort === 'name' || sort === 'amount') rows.sort((a, b) => {
      const result = sort === 'amount' ? a.amount - b.amount : a.name.localeCompare(b.name)
      return url.searchParams.get('direction') === 'desc' ? -result : result
    })
    const page = Math.max(1, Number(url.searchParams.get('page')) || 1)
    const size = Math.max(1, Math.min(100, Number(url.searchParams.get('size')) || 10))
    const timer = setTimeout(() => { if (!res.destroyed) { res.setHeader('Content-Type','application/json'); res.end(JSON.stringify({items:rows.slice((page-1)*size,page*size),total:rows.length})) } }, 300)
    res.on('close',()=>clearTimeout(timer))
  }
  const attach = (server: {middlewares: {use: (fn: Connect.NextHandleFunction) => unknown}}) => { server.middlewares.use(middleware) }
  return { name:'lab-fixture-api', configureServer: attach, configurePreviewServer: attach }
}
export default defineConfig({ plugins: [vue(), fixtureApi()], resolve: { dedupe: ['vue'] } })
