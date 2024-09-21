const webpack = require('@cypress/webpack-preprocessor');

module.exports = (on, config) => {
  const options = {
    // Configuration Webpack
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
  };

  on('file:preprocessor', webpack(options));
  return config;
};