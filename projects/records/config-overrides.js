const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');


module.exports = function override(config, env) {
    if (!config.plugins) {
        config.plugins = [];
    }

    config.plugins.push(
        new webpack.LoaderOptionsPlugin({
        	test: /\.json$/,
        	options: {loaders:'json-loader'}
        })
    );


    // config.output.publicPath = ''
    // delete config.output.publicPath;
    config.output.publicPath='/projects/records/';

    // config.plugins.push(
    // 	new CopyPlugin({
    //   patterns: [
    //     { from: 'files', to: 'files' },
    //   ],
    // }))

    console.log(config);
    return config;
}