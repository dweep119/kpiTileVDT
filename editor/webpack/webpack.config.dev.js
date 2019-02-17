const path = require('path');
const WebpackBar = require('webpackbar');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  entry: [
    '../editor/App.js',
  ],
  watch: true,
  devtool: 'source-map',
  plugins: [
    new WebpackBar(),
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },

    {
      test: /\.js(x?)$/,
      loader: 'babel-loader',
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000',
    },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'bifrost-editor-panels': '@visualbi/bifrost-editor-rx/dist/panels',
    },
  },
  output: {
    filename: 'bifrostEditor.js',
    libraryTarget: 'window',
    library: 'Editor',
    path: path.resolve(__dirname, '../../external/'),
  },
};
