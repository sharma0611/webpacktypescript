import merge from 'webpack-merge'
import { resolve } from 'path'
import { getCommonConfig } from './webpack.common'
import { Configuration as WebpackConfiguration } from 'webpack'
import 'webpack-dev-server'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration
}

export const getDevConfig = (): Configuration => ({
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: resolve('dist'),
    port: 3000,
    open: false,
    hot: true,
    compress: true,
    overlay: true,
    historyApiFallback: {
      index: '/',
    },
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              envName: 'dev',
            },
          },
        ],
      },
    ],
  },
  plugins: [new ReactRefreshWebpackPlugin()],
})

export default merge(getCommonConfig(), getDevConfig())
