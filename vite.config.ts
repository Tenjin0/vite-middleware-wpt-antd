import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      followSymlinks: false,
      ignored: ['!**/node_modules/@wynd/redux-wps-middleware/**']
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: '' }
    ],  
  },
  optimizeDeps:{
    force: true,
    include: ["@wynd/redux-wps-middleware"],
    exclude: ["@wynd/redux-wps-middleware"]
  },
  plugins: [react()],
})
