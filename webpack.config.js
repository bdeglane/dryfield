var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        //vendor: ['jquery','bootstrap'],
        app: path.resolve(__dirname, './app/main.js')
    },
    output: {
        path: path.join(__dirname, 'public/js'),
        filename: 'main.js',
        publicPath: path.join(__dirname, 'public')
    },
    resolve: {
        extensions: [
            '',
            '.js',
            '.json',
            '.css'
        ]
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: path.join(__dirname, 'app'),
                query: {
                    presets: 'es2015'
                }
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
        ]
    },
    plugins: [
        // Avoid publishing files when compilation fails
        //new webpack.NoErrorsPlugin(),
        //new webpack.optimize.UglifyJsPlugin({
        //    compress: {
        //        warnings: false
        //    }
        //}),
        //new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map'
};