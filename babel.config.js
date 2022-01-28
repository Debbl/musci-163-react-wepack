const isEnvProduction = process.env.NODE_ENV == 'production';

module.exports = {
  presets: [
    '@babel/preset-env', //
    '@babel/preset-react',
  ],
  plugins: [!isEnvProduction && ['react-refresh/babel']].filter(Boolean),
};
