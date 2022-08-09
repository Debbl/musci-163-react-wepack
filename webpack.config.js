const { merge } = require('webpack-merge');

const getWebpackCommonConfig = require('./config/webpack.common.config');
const webpackDevConfig = require('./config/webpack.dev.config');
const webpackProdConfig = require('./config/webpack.prod.config');

module.exports = (env) => {
  const isEnvProduction = env.production || false;
  const isEnvDevelopment = env.development || false;
  process.env.NODE_ENV = isEnvDevelopment ? 'development' : 'production';
  const webpackCommonConfig = getWebpackCommonConfig(
    isEnvDevelopment,
    isEnvProduction,
  );
  const config = isEnvProduction ? webpackProdConfig : webpackDevConfig;
  return merge(webpackCommonConfig, config);
};
