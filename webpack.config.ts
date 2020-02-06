import * as webpack from 'webpack';
import { resolve } from 'path';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

interface Env {
  production?: true;
}
const configFunction = ( prod = false ) => {
  const plugins: webpack.Plugin[] = [];
  prod &&
    plugins.push(
      ( new MiniCssExtractPlugin( {
        filename: '[name].css',
        chunkFilename: '[id].css',
      } ) as unknown ) as webpack.Plugin
    );
  const config: webpack.Configuration = {
    mode: prod ? 'production' : 'development',
    devtool: prod ? undefined : 'eval-source-map',
    entry: { app: prod ? './src/client/client.ts' : ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server', './src/client/client.ts'] },
    output: {
      path: resolve( __dirname, 'public', 'dist' ),
      filename: '[name].js',
      publicPath: prod ? '/dist/' : 'http://localhost:8080/dist/',
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
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  };
  return {
    ...config, devServer: {
      publicPath: '/dist/',
      hot: true,
      // host: 'localhost',
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000"
      },
      port: 8080,
      stats: 'minimal'
    }
  };
};
export default configFunction;
