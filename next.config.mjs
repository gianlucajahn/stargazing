/** @type {import('next').NextConfig} */
// next.config.mjs

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /\.(mp3|wav|ogg|flac|m4a)$/i, // Adjust the extensions as needed
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next/static/sounds',
              outputPath: 'static/sounds',
              name: '[name].[hash].[ext]',
              esModule: false,
            },
          },
        ],
      });
  
      return config;
    },
  };
  
  export default nextConfig;
