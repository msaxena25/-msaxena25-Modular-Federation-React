const ModuleFederationPlugin =  require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const deps = require('./package.json').dependencies;
const path = require('path');

//  object { exposes?, filename?, library?, name?, remoteType?, remotes?, runtime?, shareScope?, shared? }
module.exports = {
    mode: 'development',
    devServer: {
        port: 3000, // App-one is running on port 3000
        hot: false,
        liveReload: true, // enable live reload
        open: true,
        headers: {
          "Access-Control-Allow-Origin": "*", // for CORS
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
            name: 'applicationone', // HOST app name
            filename: 'remoteEntry.js', // remote file name
            remotes: {

            },
            exposes: {
                './Login' : './src/components/Login.js',
                './bootstrapCss': 'bootstrap/dist/css/bootstrap.min.css'
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