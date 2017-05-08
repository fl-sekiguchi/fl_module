require('babel-polyfill')

const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('[name].bundle.css')

const extractCommons = new webpack.optimize.CommonsChunkPlugin({
  name: 'commons',
  filename: 'commons.js'
})

const DEBUG = !process.argv.includes('--env.release');

const dir = {
  src: 'src',
  dev: DEBUG ? '.tmp' : 'build'
}

const config = {
  context: path.resolve(__dirname, dir.src),
  entry: {
    app: './app.js',
    app2: './app2.js'
  },
  output: {
    path: path.resolve(__dirname, dir.dev),
    filename: '[name].bundle.js',
    publicPath: dir.dev
  },
  devServer: {
    contentBase : dir.src
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 10000 }
        }]
      },
      {
        test: /\.scss$/,
        loader: extractCSS.extract(['css-loader','sass-loader'])
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, dir.src),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }]
            ]
          }
        }]
      }
    ]
  },
  plugins: [
    extractCSS,
    extractCommons
  ]
}

module.exports = config
