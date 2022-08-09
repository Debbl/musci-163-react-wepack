// 开发环境配置 Development
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const webpackDevConfig = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  plugins: [new ReactRefreshWebpackPlugin()],
};

module.exports = webpackDevConfig;
