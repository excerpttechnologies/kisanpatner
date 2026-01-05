// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       // Proxy for external Kisan Admin API
//       '/api/cropcare': {
//         target: 'https://kisanadmin.etpl.ai/',
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/api\/cropcare/, '/api/cropcare')
//       },
//       // Proxy for your local backend (other APIs)
//       '/api': {
//         target: 'http://localhost:8080',
//         changeOrigin: true,
//         secure: false,
//       }
//     }
//   }
// })





// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       // IMPORTANT: More specific routes must come FIRST
//       // Proxy for external Kisan Admin API (categories, products)
//       '/api/cropcare/categories': {
//         target: 'https://kisanadmin.etpl.ai',
//         changeOrigin: true,
//         secure: false,
//       },
//       '/api/cropcare/subcategories': {
//         target: 'https://kisanadmin.etpl.ai',
//         changeOrigin: true,
//         secure: false,
//       },
//       '/api/cropcare/products': {
//         target: 'https://kisanadmin.etpl.ai',
//         changeOrigin: true,
//         secure: false,
//       },
//       // Proxy for your local backend (cart and other APIs)
//       '/api': {
//         target: 'http://localhost:8080',
//         changeOrigin: true,
//         secure: false,
//       }
//     }
//   }
// })



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       // Only proxy the admin API for categories/subcategories/products
//       '/api/cropcare/categories': {
//         target: 'https://kisanadmin.etpl.ai',
//         changeOrigin: true,
//         secure: false,
//       },
//       '/api/cropcare/subcategories': {
//         target: 'https://kisanadmin.etpl.ai',
//         changeOrigin: true,
//         secure: false,
//       },
//       '/api/cropcare/products': {
//         target: 'https://kisanadmin.etpl.ai',
//         changeOrigin: true,
//         secure: false,
//       }
//     }
//   }
// })






import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/cropcare': {
        target: 'https://kisanadmin.etpl.ai',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cropcare/, '/api/cropcare'),
      }
    }
  }
});