const webpack = require("webpack");
const path = require("path");
const config = {
    entry: ["./src/index.ts", "./src/styles/index.scss"],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(s*)css$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    {
                        options: {
                            name: "[name].css",
                        },
                    },
                    "sass-loader",
                ],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.resolve(__dirname, "dist").toString(),
        filename: "bundle.js",
    },
};
module.exports = config;
