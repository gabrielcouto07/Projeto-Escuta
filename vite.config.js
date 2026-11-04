import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // '/' no dev e no Firebase Hosting; o workflow do GitHub Pages define BASE_PATH
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  build: {
    // Sem source maps em produção: o código do site já é público,
    // mas não há por que facilitar a leitura.
    sourcemap: false,
    // O SDK do Firestore sozinho passa de 500 kB; o aviso padrão não ajuda aqui
    chunkSizeWarningLimit: 1000,
  },
});
