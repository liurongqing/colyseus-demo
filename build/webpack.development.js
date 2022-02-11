const path = require('path')
const packageInfo = require('../package.json')
const getIPAddress = require('./getIPAddress')
const generatePort = require('./generatePort')

const host = getIPAddress()
const port = generatePort(packageInfo.name)
module.exports = {
  mode: 'development',
  entry: {
    app: './src/main.ts',
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'inline-source-map',
  stats: 'minimal',
  devServer: {
    host,
    port,
    static: './src',
  },
}
