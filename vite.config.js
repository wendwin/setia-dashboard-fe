import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools()
  ],
  resolve: {
    alias: {
      '@': '/src',
      'vue': 'vue/dist/vue.esm-bundler.js'
    },
  },
  optimizeDeps: {
    include: ['vue-countup-v3']
  }
})
