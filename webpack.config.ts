/* eslint-disable  */
import { Configuration as Options } from 'webpack';
import * as path from 'path';
import * as _ from 'lodash';
import * as webpack from 'webpack';
import * as ExtractText from 'mini-css-extract-plugin';

const vendor = ['lodash'];
export function createConfig( isDebug: boolean ): Options {
  const devTool = isDebug ? 'cheap-module-source-map' : null;
  const plugins = [
    new webpack.DefinePlugin( {
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV || 'development'}"`,
      } as any,
      IS_PRODUCTION: !isDebug,
      IS_DEVELOPMENT: isDebug,
    } ),
  ];
  const loaders = {
    ts: {
      test: /\.tsx?/,
      loader: 'ts-loader',
      exclude: /node_modules/,
    },
    eslint: {
      test: /\.tsx?/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
    },
    json: {
      test: /\.json$/,
      loader: 'json-loader',
    },
    css: { test: /\.css$/, loader: 'style-loader!css-loader?sourceMap' },
    sass: {
      test: /.scss$/,
      loader: 'style-loader!css-loader?sourceMap!sass-loader?sourceMap',
    },
    files: {
      test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)/,
      loader: 'url-loader?limit=5000',
    },
  };
  const clientEntry = ['./src/client/client.ts'];
  let publicPath = '/dist/';
  if ( isDebug ) {
  } else {

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
            enforce: true,
          },
        },
      },
    },
    entry: {
      app: clientEntry,
      vendor,
    },
    output: {
      path: path.join( __dirname, 'public', 'dist' ),
      filename: '[name].js',
      publicPath,
    },
    resolve: {
      extensions: ['.ts', '.tsx'],
      alias: { shared: path.join( __dirname, 'src', 'server', 'shared' ) },
    },
    module: {
      rules: _.values( loaders ),
    },
    plugins,
  };
}
export default createConfig( process.env.NODE_ENV !== 'production' );
