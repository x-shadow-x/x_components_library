'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

function wrap (render) {
  return function() {
    return render.apply(this, arguments)
      .replace('<code v-pre class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">')
  }
}

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
})

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        'vendor': ['vue', 'vue-router'],
        'vui': './examples/src/index.js',  // PC端入口js
        'vui_mobile': './examples/src/mobile.js'  // 移动端入口js
    },
    output: {
        path: path.join(__dirname, '../examples/dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue': 'vue/dist/vue.js',
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'), // 上面自己定义的拼接路径的函数
            'src': resolve('src'),
            'packages': resolve('packages'),
            'lib': resolve('lib'),
            'components': resolve('examples/src/components')
        }
    },
    module: {
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.md$/,
                loader: 'vue-markdown-loader',
                options: {
                    // 阻止提取脚本和样式标签
                    preventExtract: true,
                    preprocess: function(MarkdownIt, source) {
                      // 为table标签加上名为'table'的class
                      MarkdownIt.renderer.rules.table_open = function() {
                        return '<table class="table">'
                      };
                      MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence);
                      return source;
                    }
                }
            },
            ...utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },

    devtool: config.dev.devtool,
    // 整合webpack.dev.conf.js中的devServer选项
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
            ],
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay
            ? { warnings: false, errors: true }
            : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll,
        }
    },
    // 整合webpack.dev.conf.js中的plugins选项
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),

        // PC端页面入口
        new HtmlWebpackPlugin({
            chunks: ['manifest', 'vendor', 'vui'],
            template: 'examples/src/index.tpl',
            filename: 'index.html',
            inject: true
        }),

        // 移动端页面入口
        new HtmlWebpackPlugin({
            chunks: ['manifest', 'vendor', 'vui_mobile'],
            template: 'examples/src/index.tpl',
            filename: 'mobile.html',
            inject: true
        })
    ]
}
