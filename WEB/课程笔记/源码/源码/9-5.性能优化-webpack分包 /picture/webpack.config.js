const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    mine: './src/mine.js',
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
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

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'mine.html',
      chunks: ['mine'],
    }),
  ],
};
