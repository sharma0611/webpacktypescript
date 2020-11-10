import merge from 'webpack-merge'
import { getCommonConfig } from './webpack.common'
// import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
// import TerserJSPlugin from 'terser-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import {
  Configuration as WebpackConfiguration,
  EnvironmentPlugin,
} from 'webpack'

export const getProdConfig = (): WebpackConfiguration => ({
  mode: 'production',
  // optimization: {
  //   minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  // },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            envName: 'prod',
          },
        },
      },
    ],
  },
  plugins: [
    new EnvironmentPlugin([
      'BACKEND_URL',
      'GOOGLE_MAPS_KEY',
      'BASE_URL',
      'STRIPE_KEY',
      'MIXPANEL_TOKEN',
      'GTM_ID',
      'USE_HOTJAR',
      'SENTRY_DSN',
      'SENTRY_ORG',
      'SENTRY_PROJECT',
      'SENTRY_AUTH_TOKEN',
      'NODE_OPTIONS',
      'IS_STAGING',
      'NODE_ENV',
    ]),
    // new MiniCssExtractPlugin({
    //   filename: '[name].css',
    //   chunkFilename: '[id].css',
    //   ignoreOrder: false,
    // }),
  ],
})

export default merge(getCommonConfig(), getProdConfig())
