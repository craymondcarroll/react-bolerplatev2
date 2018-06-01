console.log(__dirname);

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = (env) => {

    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {

        entry: ['babel-polyfill','./src/app.js'],

        output: {
            path: path.join(__dirname, "public", 'dist'),
            filename: 'bundle.js'
        },

        module: {

            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
                {
                    test: /\.s?css$/,
                    use: CSSExtract.extract({
                        use: [
                            {
                                loader:'css-loader',
                                options: {sourcemap:true}
                            },
                            {
                                loader:'sass-loader',
                                options: {sourcemap:true}
                            }
                        ]
                    })
                }]

        },
        plugins: [
          CSSExtract
        ],

        devtool: isProduction ? "source-map" : "cheap-module-eval-source-map",

        devServer: {
            contentBase: path.join(__dirname, "public"),
            historyApiFallback: true, // this is needed to handel client side routing
            publicPath: '/dist/'

        }

    };
};