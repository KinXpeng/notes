const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(png|gif|jpe?g)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 12 * 1024,
          },
        },
        generator: {
          filename: './images/[name][ext]',
        },
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
};
