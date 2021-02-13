const path = require('path');

module.exports = {
  entry: './src/js/app.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|test)/,
        use: {
          loader: 'babel-loader',
          options: {presets: ['babel-preset-env']}
        }
      }
    ]
  }
};