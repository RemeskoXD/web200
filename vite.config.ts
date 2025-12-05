import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // TOTO JE KLÍČOVÉ PRO COOLIFY A OPRAVU BÍLÉ OBRAZOVKY
  base: './', 
  server: {
    port: 3001, // Požadovaný port
    host: '0.0.0.0', // Povolí přístup zvenčí (důležité pro Docker/Coolify)
  },
  build: {
    outDir: 'dist',
  }
});