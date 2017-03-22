const webpack = require('webpack');
const baseConfig = require('./webpack.config.base.js');

const config = Object.create(baseConfig);
config.plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  })
];

config.entry = [
  'babel-polyfill',
  './demo/index.jsx'
];

config.output =  {
  libraryTarget: 'umd',
  library: 'redux-asco',
  path: __dirname + '/../demo',
  filename: 'demo.js'
}

module.exports = config;
