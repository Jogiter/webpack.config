const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackFtpUpload = require('webpack-ftp-upload-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

function initWebpackConfig(option, isProduction) {
    let hashDigestLength = option.hashDigestLength;
    let entry = option.entry;
    let template = option.template;
    let publicPath = option.publicPath;
    let __cacheDir = option.__cacheDir;
    let __destination = option.__destination;
    let __ftp = option.__ftp;

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
        optimization: {
            minimize: isProduction
        },
        // 从输出的 bundle 中排除依赖
        externals: {
            jquery: 'jQuery',
            zepto: 'Zepto'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    enforce: 'pre',
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'eslint-loader',
                            options: {
                                fix: true
                            }
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                                plugins: ['@babel/plugin-transform-runtime']
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: `[path][name].[ext]?v=[hash:${hashDigestLength}]`
                            }
                        },
                        'extract-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.(png|jp(e)?g|gif|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: `[path][name].[ext]?v=[hash:${hashDigestLength}]`
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: `[path][name].[ext]?v=[hash:${hashDigestLength}]`
                            }
                        }
                    ]
                },
                {
                    test: /\.tpl/,
                    loader: 'raw-loader'
                },
                {
                    test: /\.html/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                minimize: true,
                                removeComments: false, // 保留 ssi
                                removeAttributeQuotes: false, // 保留引号
                                collapseWhitespace: true,
                                // more options:
                                // https://github.com/kangax/html-minifier#options-quick-reference
                                attrs: ['img:src', 'link:href']
                            }
                        }
                        // {
                        //   loader: 'ssi-loader',
                        //   options: {
                        //     locations: {
                        //       include: 'http://jinrong.xunlei.com'
                        //     }
                        //   }
                        // }
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.vue']
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
    };

    if (__ftp) {
        config = merge(config, {
            plugins: [new WebpackFtpUpload(__ftp)]
        });
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
        });
    }
    return config;
}

function setConfig(config) {
    const DEFAULT = {
        entry: './js/index.js',
        template: './index.html',
        hashDigestLength: 6,
        publicPath: '/',
        __cacheDir: './__thunder/',
        __destination: './assets/'
    };
    config = Object.assign({}, DEFAULT, config);
    if (config.__ftp) {
        Object.assign(config.__ftp, {
            local: path.join(process.cwd(), config.__cacheDir)
        });
    }
    return config;
}

module.exports = function bundle(config, isProduction) {
    config = setConfig(config);
    let webpackConfig = initWebpackConfig(config, isProduction);

    function handler(err, stats) {
        if (err) {
            console.log(err);
            process.exit();
        }
        if (!stats.hasErrors() && !stats.hasWarnings()) {
            console.log(
                stats.toString({
                    colors: true,
                    modules: false,
                    children: false,
                    chunks: false,
                    chunkModules: false
                })
            );
        }
    }

    if (isProduction) {
        webpack(webpackConfig).run(handler);
    } else {
        webpack(webpackConfig).watch(
            {
                aggregateTimeout: 300,
                poll: 1000
            },
            handler
        );
    }
};
