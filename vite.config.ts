// vite.config.ts (Version Finale et Corrigée)

// CORRECTION : On importe 'path' depuis 'node:path' pour être compatible.
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// On supprime 'loadEnv' car le frontend n'a plus besoin des clés secrètes.
export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@constants': path.resolve(__dirname, 'constants'),
    }
  },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['@supabase/supabase-js', '@stripe/stripe-js']
        }
      }
    }
  }
});