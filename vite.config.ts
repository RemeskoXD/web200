
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    
    // Ensures assets are found correctly on deployment
    base: './', 
    
    server: {
      host: '0.0.0.0',
      port: 3000, // Port reverted to 3000 as requested
    },
    
    // This is crucial! It maps the Coolify environment variable to process.env.API_KEY
    // so the React code can read it without crashing.
    define: {
      'process.env.API_KEY': JSON.stringify(env.VITE_GOOGLE_GENAI_API_KEY || env.API_KEY || '')
    },

    build: {
      outDir: 'dist',
      emptyOutDir: true,
    }
  };
});
