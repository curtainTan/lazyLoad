const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
    entry: {
        main: [ '@babel/polyfill', path.resolve(__dirname, "../src/main.ts") ],
        style: path.resolve(__dirname, "../src/style/style.scss")
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        },
                    },
                    "ts-loader"
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ],
                include: [
                    path.join( __dirname, "../src" )
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            // 将日志写入控制台
            verbose: true
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../index.html")
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].[hash].css"
        })
    ],
    resolve: {
        extensions: [ ".ts", ".js" ]
    }
}


