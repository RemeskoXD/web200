import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // TOTO JE KLÍČOVÉ: Zajistí, že prohlížeč najde soubory i na podstránkách
  base: './', 
  
  server: {
    // Povolí přístup zvenčí (nezbytné pro Docker/Coolify)
    host: '0.0.0.0', 
    // Nastaveno na 3001 dle požadavku
    port: 3000, 
  },
  
  build: {
    outDir: 'dist',
    emptyOutDir: true, // Pro jistotu vyčistí složku před každým buildem
  }
});