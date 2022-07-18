const ModuleFederationPlugin =  require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const deps = require('./package.json').dependencies;
const path = require('path');

//  object { exposes?, filename?, library?, name?, remoteType?, remotes?, runtime?, shareScope?, shared? }
module.exports = {
    mode: 'development',
    devServer: {
        port: 3001, // here post is 3001
        hot: false,
        liveReload: true
      },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins:[
        new ModuleFederationPlugin({
            name: 'applicationtwo',
            filename: 'remoteEntryapplicationtwo.js',
            remotes: {
                applicationone: 'applicationone@http://localhost:3000/remoteEntry.js', // HOST FILE path
            },
            exposes: {
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: deps['react-dom']
                }
            }
        }),
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, "public", "index.html")})
    ]
}