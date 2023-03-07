import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
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
    include: ["@wynd/redux-wps-middleware"]
  },
  plugins: [react()],
})
