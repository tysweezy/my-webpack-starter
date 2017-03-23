var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
var glob = require("glob");
var PurifyCSSPlugin = require('purifycss-webpack');

module.exports = {
    entry: {
        main: [
            './src/main.js',
            './src/main.scss'
        ]
    },
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: '[name].js'
    },

    module: {
        rules: [ 
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },

            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },

    plugins: [
        new ExtractTextPlugin('[name].css'),

        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

        new PurifyCSSPlugin({
          // Give paths to parse for rules. These should be absolute!
          paths: glob.sync(path.join(__dirname, 'index.html')),
          minimize: true
        })

    ]
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    )
}