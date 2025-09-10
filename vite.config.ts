import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  },
  esbuild: {
    loader: 'tsx',
    include: [
      'src/**/*.tsx',
      'src/**/*.ts',
      'src/**/*.jsx',
      'src/**/*.js',
      'node_modules/**/*.tsx',
      'node_modules/**/*.ts',
      'node_modules/**/*.jsx',
      'node_modules/**/*.js'
    ]
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx'
      }
    }
  }
});
