const path = require('path');
const WebpackBar = require('webpackbar');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: [
    '../editor/App.js',
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  plugins: [
    new WebpackBar(),
    new MinifyPlugin(),
    new DuplicatePackageCheckerPlugin(),
    new BundleAnalyzerPlugin({
      generateStatsFile: true,
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
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
