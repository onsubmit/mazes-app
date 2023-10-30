import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/mazes-app/',
  plugins: [react()],
  test: {
    mockReset: true,
  },
});
