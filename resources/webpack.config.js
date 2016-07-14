const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const PlonePlugin = require('plonetheme-webpack-plugin');

const SITENAME = process.env.SITENAME || 'Plone';
const THEMENAME = process.env.THEMENAME || 'webpackexample';

const PATHS = {
  src: path.join(__dirname, 'src', THEMENAME),
  build: path.join(__dirname, 'theme', THEMENAME)
};

const PLONE = new PlonePlugin({
  portalUrl: 'http://localhost:8080/' + SITENAME,
  publicPath: '/' + SITENAME + '/++theme++' + THEMENAME + '/',
  sourcePath: PATHS.src
});

const common = {
  entry: {
   'anonymous': path.join(PATHS.src, 'anonymous'),
   'authenticated': path.join(PATHS.src, 'authenticated')
  },
  output: {
    path: PATHS.build
  },
  devServer: {
    outputPath: PATHS.build
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'react': 'react'  // override react shipped in Plone
    }
  },
  module: {
    loaders: [
      { test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.src }
    ]
  }
};

switch(path.basename(process.argv[1])) {
  case 'webpack':
    module.exports = merge(PLONE.production, common, {
      resolve: {
        alias: {
          'react': 'react-lite',
          'react-dom': 'react-lite'
        }
      }
    });
    break;

  case 'webpack-dev-server':
    module.exports = merge(PLONE.development, common, {
      entry: path.join(PATHS.src, 'authenticated')
    });
    break;
}
