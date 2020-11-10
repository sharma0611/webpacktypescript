import { join, resolve } from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import Dotenv from 'dotenv-webpack'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import WorkboxPlugin from 'workbox-webpack-plugin'

export interface WebpackEnv {
  mode?: string
  debug?: boolean
}
export const getCommonConfig = (
  env: WebpackEnv = {}
): webpack.Configuration => {
  const { mode = 'development', debug = true } = env
  return {
    mode: 'none',
    entry: join(resolve('src'), 'index.tsx'),
    output: {
      pathinfo: debug === true,
      path: resolve('dist'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new Dotenv(),
      new CopyWebpackPlugin({
        patterns: [{ from: 'src/public', to: 'public', flatten: true }],
      }),
      new HtmlWebpackPlugin({
        title: 'c️urbee',
        template: join(resolve('src'), 'index.html'),
      }),
      new ForkTsCheckerWebpackPlugin(),
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        navigateFallback: 'index.html',
      }),
    ],
  }
}
