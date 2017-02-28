const webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    papvConfiguration = require('./papv-configuration'),
    papv = require('./postcss-alter-property-value');

module.exports = (env = {}) => {

    const isProd = env.production === true;
    const nodeEnv = isProd
        ? 'production'
        : 'development';

    console.log(`------------ ${nodeEnv} ------------`);

    const plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(nodeEnv)
            }
        }),
        new HtmlWebpackPlugin({filename: 'index.html', template: 'demo/index.html'})
    ];

    return {
        context: path.resolve('./'),
        entry: {
            demo: ['./demo/index']
        },
        devServer: {
            open: true, // auto open browser?
            contentBase: './',
            noInfo: true,
            port: 3456,
            inline: true
        },
        plugins: plugins,
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader?importLoaders=1', {
                            loader: 'postcss-loader',
                            // options: {
                            //     /* 
                            //     use postcss.config.js 
                            //     if you want hot reload changes
                            //      */
                            //     plugins:  (ctx) => {
                            //         return [papv(papvConfiguration)];
                            //     }
                            // }
                        }
                    ],
                    exclude: [/node_modules/]
                }
            ]
        },
        resolve: {
            extensions: ['.js']
        },
        externals: {}
    }
};