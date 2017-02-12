const path = require("path");

module.exports = {
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(bower_components|node_modules)/,
      loader: 'babel'
    }]
  },
  entry: './src/index.js',
  output: {
    libraryTarget: 'umd',
    library: 'redux-asco',
    path: __dirname + '/../dist',
    filename: 'asco.js'
  },
  resolve: {
    extensions: [
      '',
      '.js'
    ]
  }
};
