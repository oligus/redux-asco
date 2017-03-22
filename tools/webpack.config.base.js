const path = require("path");

var libraryName = 'redux-asco';
var outputFile = libraryName + '.js';

module.exports = {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(bower_components|node_modules)/,
      loaders: ['babel-loader']
    }]
  },
  entry: './src/index.js',
  output: {
    libraryTarget: 'umd',
    library: libraryName,
    path: __dirname + '/../lib',
    filename: outputFile,
    umdNamedDefine: true
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'
    ]
  }
};
