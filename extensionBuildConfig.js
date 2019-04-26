const path = require('path')
const webpack = require('webpack')

const exposedLibraries = ['react', 'react-dom', 'superagent', 'react-list', 'bluebird', 'socket.io-client', 'filesaver.js-npm']

module.exports = {
  // we use 'none' to avoid webpack adding any plugin
  // optimization
  mode: 'none',
  devtool: 'hidden-source-map',
  entry: {
    main: './studio/main_dev'
  },
  output: {
    filename: 'main.js',
    path: path.join(process.cwd(), 'studio'),
    pathinfo: false
  },
  performance: {
    hints: 'warning'
  },
  optimization: {
    nodeEnv: 'production',
    namedModules: false,
    namedChunks: false,
    occurrenceOrder: true,
    flagIncludedChunks: true
  },
  externals: [
    (context, request, callback) => {
      if (/babel-runtime/.test(request)) {
        return callback(null, 'Studio.runtime[\'' + request.substring('babel-runtime/'.length) + '\']')
      }

      if (exposedLibraries.indexOf(request) > -1) {
        return callback(null, 'Studio.libraries[\'' + request + '\']')
      }

      if (request === 'jsreport-studio') {
        return callback(null, 'Studio')
      }

      callback()
    }
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              require.resolve('babel-preset-es2015'),
              require.resolve('babel-preset-react'),
              require.resolve('babel-preset-stage-0')
            ]
          }
        }]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              sourceMap: true,
              localIdentName: '[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: getPostcssPlugins
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      'node_modules/jsreport-studio-dev/node_modules'
    ]
  },
  resolveLoader: {
    modules: [
      'node_modules',
      'node_modules/jsreport-studio-dev/node_modules'
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEVELOPMENT__: false
    })
  ]
}

function getPostcssPlugins () {
  return [
    require('postcss-flexbugs-fixes'),
    require('autoprefixer')
  ]
}
