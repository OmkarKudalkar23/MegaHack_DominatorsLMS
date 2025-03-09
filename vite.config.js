import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace 'your-repo-name' with the actual GitHub repository name
export default defineConfig({
  plugins: [react()],
  base: "/MegaHack_DominatorsLMS/"  // 👈 Add this line for GitHub Pages
});
