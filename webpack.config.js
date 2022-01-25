const path = require('path');
const { merge } = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');
// 相同的配置 Common
const webpackCommonConfig = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: './js/[name].bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.wasm'],
    alias: {
      '@': path.resolve(__dirname, './src'),
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
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        venders: {
          test: /[\\/]node_modules[\\/]/,
          filename: './js/[id].venders.js',
        },
      },
    },
  },
};

module.exports = (env) => {
  const config = env.production ? webpackProdConfig : webpackDevConfig;
  return merge(webpackCommonConfig, config);
};
