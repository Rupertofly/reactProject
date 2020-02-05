"use strict";
exports.__esModule = true;
var path = require("path");
var _ = require("lodash");
var webpack = require("webpack");
var vendor = ['lodash'];
function createConfig(isDebug) {
    var devTool = isDebug ? 'cheap-module-source-map' : null;
    var plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: "\"" + (process.env.NODE_ENV || 'development') + "\""
            },
            IS_PRODUCTION: !isDebug,
            IS_DEVELOPMENT: isDebug
        }),
    ];
    var loaders = {
        ts: {
            test: /\.tsx?/,
            loader: 'ts-loader',
            exclude: /node_modules/
        },
        eslint: {
            test: /\.tsx?/,
            loader: 'eslint-loader',
            exclude: /node_modules/
        },
        json: {
            test: /\.json$/,
            loader: 'json-loader'
        },
        css: { test: /\.css$/, loader: 'style-loader!css-loader?sourceMap' },
        sass: {
            test: /.scss$/,
            loader: 'style-loader!css-loader?sourceMap!sass-loader?sourceMap'
        },
        files: {
            test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)/,
            loader: 'url-loader?limit=5000'
        }
    };
    var clientEntry = ['./src/client/client.ts'];
    var publicPath = '/dist/';
    if (isDebug) {
    }
    else {
    }
    return {
        mode: isDebug ? 'development' : 'production',
        name: 'client',
        devtool: devTool || undefined,
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                        enforce: true
                    }
                }
            }
        },
        entry: {
            app: clientEntry,
            vendor: vendor
        },
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: '[name].js',
            publicPath: publicPath
        },
        resolve: {
            extensions: ['.ts', '.tsx'],
            alias: { shared: path.join(__dirname, 'src', 'server', 'shared') }
        },
        module: {
            rules: _.values(loaders)
        },
        plugins: plugins
    };
}
exports.createConfig = createConfig;
exports["default"] = createConfig(process.env.NODE_ENV !== 'production');
