const path = require('path')
const merge = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackFtpUpload = require('webpack-ftp-upload-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const cosmiconfig = require('cosmiconfig')
const explorer = cosmiconfig('thunder')

let isProduction = process.env.NODE_ENV === 'production'

function getThunderConfig () {
  const result = explorer.searchSync()
  return result ? result.config : {}
}

function initWebpackConfig (option, isProduction) {
  let hashDigestLength = option.hashDigestLength
  let entry = option.entry
  let template = option.template
  let publicPath = option.publicPath
  let __cacheDir = option.__cacheDir
  let __destination = option.__destination
  let __ftp = option.__ftp

  let config = {
    mode: isProduction ? 'production' : 'development',
    entry: entry,
    output: {
      hashDigestLength: hashDigestLength,
      path: path.resolve(process.cwd(), __cacheDir),
      filename: 'js/[name].js',
      chunkFilename: 'chunk[id].js',
      publicPath: publicPath
    },
    devtool: isProduction ? false : 'cheap-module-eval-source-map',
    // 在第一个错误出现时抛出失败结果，而不是容忍它
    bail: isProduction,
    // 从输出的 bundle 中排除依赖
    externals: {
      jquery: 'jQuery',
      zepto: 'Zepto'
    },
    module: {
      loaders: [
        // {
        //   test: /\.js$/,
        //   enforce: 'pre',
        //   exclude: /node_modules/,
        //   loader: 'eslint-loader',
        //   options: {
        //     formatter: require('eslint-friendly-formatter'),
        //     fix: true
        //   }
        // },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ['stage-2', 'es2015']
          }
        },
        {
          test: /\.css$/,
          loaders: [
            `file-loader?name=[path][name].[ext]?v=[hash:${hashDigestLength}]`,
            'extract-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|jp(e)?g|gif|svg)$/,
          loader: `file-loader?name=[path][name].[ext]?v=[hash:${hashDigestLength}]`
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: `file-loader?name=[path][name].[ext]?v=[hash:${hashDigestLength}]`
        },
        {
          test: /\.tpl/,
          loader: 'raw-loader'
        },
        {
          test: /\.html/,
          loader: 'html-loader'
        }
      ]
    },
    htmlLoader: {
      minimize: true,
      removeComments: false, // 保留 ssi
      removeAttributeQuotes: false, // 保留引号
      collapseWhitespace: true,
      // more options:
      // https://github.com/webpack-contrib/html-loader/blob/v0.4.4/index.js#L100-L113
      attrs: ['img:src', 'link:href']
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin(),
      new CleanWebpackPlugin([__cacheDir], {
        verbose: false
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: template,
        hash: true, // 清除缓存
        inject: true,
        minify: {
          removeComments: false,
          removeAttributeQuotes: false,
          collapseWhitespace: true
          // more options: https://github.com/kangax/html-minifier#options-quick-reference
        }
      })
    ]
  }

  if (__ftp) {
    config = merge(config, {
      plugins: [new WebpackFtpUpload(__ftp)]
    })
  }

  if (isProduction) {
    config = merge(config, {
      plugins: [
        new FileManagerPlugin({
          onEnd: [
            {
              copy: [
                {
                  source: __cacheDir,
                  destination: __destination
                }
              ]
            }
          ]
        })
      ]
    })
  }
  return config
}

function setConfig (config) {
  const DEFAULT = {
    entry: './js/index.js',
    template: './index.html',
    hashDigestLength: 6,
    publicPath: '/',
    __cacheDir: './__thunder/',
    __destination: './assets/'
  }
  config = Object.assign({}, DEFAULT, config)
  if (config.__ftp) {
    Object.assign(config.__ftp, {
      local: path.join(process.cwd(), config.__cacheDir)
    })
  }
  return config
}

let thunderConfig = getThunderConfig()

module.exports = initWebpackConfig(setConfig(thunderConfig), isProduction)
