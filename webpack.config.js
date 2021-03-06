global.Promise = require('bluebird');

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var publicPath = 'http://localhost:2012/public/assets';
var cssName = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';
var jsName = process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js';

var plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new ExtractTextPlugin(cssName),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
      new CleanWebpackPlugin([ 'public/assets' ], {
        root: __dirname,
        verbose: true,
        dry: false
      })
  );
  plugins.push(new webpack.optimmize.DedupePlugin());
  plugins.push(new webpack.optimize.OccurenceOrderPlugin());
}

module.exports = {
  entry: [
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    'babel-polyfill',
    './src/client.js'],
  debug: process.env.NODE_ENV !== 'production',
  resolve: {
    root: path.join(__dirname, 'src'),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  plugins,
  eslint: { configFile: '.eslintrc' },
  output: {
    path: `${__dirname}/public/assets`,
    filename: jsName,
    publicPath
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
      },
      { test: /\.gif$/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
      { test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
      { test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png' },
      { test: /\.svg/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
      { test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1' },
      { test: /\.jsx?$/, loader: process.env.NODE_ENV !== 'production' ? 'babel!eslint-loader' : 'babel', exclude: [/node_modules/, /public/] },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  devtool: process.env.NODE_ENV !== 'production' ? 'eval-source-map' : null,
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
};