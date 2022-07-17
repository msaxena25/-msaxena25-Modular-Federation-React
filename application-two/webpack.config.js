const ModuleFederationPlugin =  require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const deps = require('./package.json').dependencies;
const path = require('path');



//  object { exposes?, filename?, library?, name?, remoteType?, remotes?, runtime?, shareScope?, shared? }
module.exports = {
    mode: 'development',
    devServer: {
        port: 3001,
        hot: false,
        liveReload: true,
        open: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
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
            filename: 'remoteEntrynew.js',
            remotes: {
                applicationone: 'applicationone@http://localhost:3000/remoteEntry.js',
            },
            exposes: {
                './ComponentB': './src/components/ComponentB.js'
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
                },
                'bootstrap' : {
                    singleton: true,
                    requiredVersion: deps['react-dom']
                },
                'react-bootstrap' : {
                    singleton: true,
                    requiredVersion: deps['react-dom']
                }
            }
        }),
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, "public", "index.html"),
        favicon: "./public/favicon.ico",
        filename: "index.html",
        manifest: "./public/manifest.json",
      })
    ]
}