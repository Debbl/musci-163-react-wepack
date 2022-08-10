// 相同的配置 Common
const path = require('path');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const getWebpackCommonConfig = (isEnvDevelopment, isEnvProduction) => ({
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'static/js/[name].[contenthash:8].bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.wasm'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
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
          isEnvDevelopment && 'style-loader',
          isEnvProduction && {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ].filter(Boolean),
        exclude: /\.module.css$/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isEnvDevelopment && 'style-loader',
          isEnvProduction && {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'sass-loader',
        ].filter(Boolean),
        exclude: /\.module\.s[ac]ss$/,
      },
      {
        test: /\.css$/i,
        use: [
          isEnvDevelopment && 'style-loader',
          isEnvProduction && {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: isEnvProduction
                  ? '[hash:base64:6]'
                  : '[local]-[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
        ].filter(Boolean),
        include: /\.module\.css$/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isEnvDevelopment && 'style-loader',
          isEnvProduction && {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                localIdentName: isEnvProduction
                  ? '[hash:base64:6]'
                  : '[local]-[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ].filter(Boolean),
        include: /\.module\.s[ac]ss$/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'static/img/[name].[contenthash:8][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      BASE_URL: '"./"',
    }),
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
});

module.exports = getWebpackCommonConfig;
