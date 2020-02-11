"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const configFunction = (prod = false) => {
    const plugins = [];
    prod &&
        plugins.push(new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }));
    const config = {
        mode: prod ? 'production' : 'development',
        devtool: prod ? undefined : '#eval-source-map',
        entry: { app: prod ? './src/client/client.ts' : ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server', './src/client/client.ts'] },
        output: {
            path: path_1.resolve(__dirname, 'public', 'dist'),
            filename: '[name].js',
            publicPath: prod ? '/dist/' : 'http://localhost:8080/public/dist/',
        },
        plugins,
        module: {
            rules: [
                { test: /\.tsx?$/, use: ['ts-loader'] },
                {
                    test: /\.scss$/,
                    use: prod
                        ? [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                        : ['style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader',
                },
                {
                    test: /\.css$/,
                    use: prod
                        ? [MiniCssExtractPlugin.loader, 'css-loader']
                        : ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)/,
                    loader: {
                        loader: 'url-loader',
                        options: {
                            limit: 5000,
                        },
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        optimization: {},
    };
    return {
        ...config, devServer: {
            // publicPath: '/public/dist',
            contentBase: '/',
            hot: true,
            // host: 'localhost',
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
            },
            port: 8080,
        }
    };
};
exports.default = configFunction;
