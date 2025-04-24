// @ts-check
 
/** @type {import('next').NextConfig} */

const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')


const nextConfig = {
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		config.plugins.push(
      			new CopyWebpackPlugin({
        			patterns: [{
            				from: path.join(__dirname, 'node_modules/three/examples/jsm/libs/draco/draco_decoder.wasm'),
            				to: path.join(__dirname, 'public/draco'),
          			},{
            				from: path.join(__dirname, 'node_modules/three/examples/jsm/libs/draco/draco_wasm_wrapper.js'),
            				to: path.join(__dirname, 'public/draco'),
          			}],
      			})
    		);

		const fileLoaderRule = config.module.rules.find((rule) =>
			rule.test?.test?.('.svg'),
    		)

		config.module.rules.push({
			...fileLoaderRule,
        		test: /\.svg$/i,
        		resourceQuery: /url/,
		},{
        		test: /\.svg$/i,
        		issuer: fileLoaderRule.issuer,
			resourceQuery: { 
				not: [...fileLoaderRule.resourceQuery.not, /url/] 
			},
          		use: ['@svgr/webpack'],
		})

		fileLoaderRule.exclude = /\.svg$/i
    		return config;
  },

  // Image optimization configuration
  images: {
    domains: [
      'cdn.sanity.io', // If using Sanity for image hosting
    ],
    formats: ['image/avif', 'image/webp'],
    // Ensure reasonable image quality while maintaining performance
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
 
module.exports = nextConfig
