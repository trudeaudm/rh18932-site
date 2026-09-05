import { defineConfig } from 'vite';

// Dev-server only. Production publishes the raw files and never runs Vite.
export default defineConfig({
  root: '.',
  server: {
    host: true,
    port: 5180,
    proxy: {
      '/sbdb.api': {
        target: 'https://ssd-api.jpl.nasa.gov',
        changeOrigin: true
      }
    }
  }
});
