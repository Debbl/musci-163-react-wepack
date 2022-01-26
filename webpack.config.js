const path = require('path');
const { merge } = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');
// 相同的配置 Common
const webpackCommonConfig = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'static/js/[name].[contenthash:8].bundle.js',
    chunkFilename: '[id].[name].chunk.js',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.wasm'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
    runtimeChunk: {
      name: function (entrypoint) {
        return `runtime-${entrypoint.name}`;
      },
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vender: {
          test: /[\\/]node_modules[\\/]/,
          filename: 'static/js/[name].[contenthash:8].vender.js',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/.DS_Store', '**/index.html'],
          },
        },
      ],
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'mjs'],
    }),
  ],
};

// 开发环境配置 Development
const webpackDevConfig = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    open: true,
    compress: true,
  },
};

// 生产环境配置 Production
const webpackProdConfig = {
  mode: 'production',
  devtool: false,
};

module.exports = (env) => {
  const config = env.production ? webpackProdConfig : webpackDevConfig;
  return merge(webpackCommonConfig, config);
};
