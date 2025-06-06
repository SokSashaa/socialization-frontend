import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@pages': '/src/pages',
			'@routes': '/src/routes',
			'@hooks': '/src/hooks',
			'@dto': '/src/dto',
			'@components': '/src/components',
			'@app': '/src/app',
			'@UI': '/src/UI',
			'@modules': '/src/modules',
			'@utils': '/src/utils',
			'@assets': '/src/assets',
			'@src': '/src',
		},
	},
	plugins: [react()],
	server: {
		proxy: {
			'/api-sozialization': {
				target: 'http://5.35.89.117:8084',
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api-sozialization/, ''),
				configure: (proxy, _options) => {
					proxy.on('error', (err, _req, _res) => {
						console.log('proxy error', err);
					});
					proxy.on('proxyReq', (proxyReq, req, _res) => {
						console.log('Sending Request to the Target:', req.method, req.url);
					});
					proxy.on('proxyRes', (proxyRes, req, _res) => {
						console.log(
							'Received Response from the Target:',
							proxyRes.statusCode,
							req.url
						);
					});
				},
			},
		},
	},
});
