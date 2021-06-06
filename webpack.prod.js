const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: './public/index.html'
});

module.exports = {
    mode: 'production',
    entry: './src/index.tsx',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,

                type: 'asset/resource'
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            https: require.resolve('https-browserify'),
            http: require.resolve('stream-http')
        }
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    plugins: [
        htmlPlugin,
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ]
};
