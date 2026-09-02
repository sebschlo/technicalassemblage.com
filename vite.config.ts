import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Static product one-pagers live in public/<slug>/index.html. Production hosting
// serves /<slug>/ as a directory index; Vite's dev server would instead fall
// back to the SPA, so rewrite those requests in dev.
function publicDirIndex(): Plugin {
  return {
    name: 'public-dir-index',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url?.split('?')[0]
        if (url && url !== '/' && url.endsWith('/')) {
          if (existsSync(join(server.config.publicDir, url, 'index.html'))) {
            req.url = `${url}index.html`
          }
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), publicDirIndex()],
})
