# -msaxena25-Modular-Federation-React
Lets Understand Micro Front-End with Webpack 5 Modular Federation in a React application

### Read below links of Modular Federation

https://auth0.com/blog/micro-frontends-with-angular-module-federation-and-auth0/

https://levelup.gitconnected.com/micro-frontends-step-by-step-using-react-webpack-5-and-module-federation-e4b9d840ec71

https://medium.com/trendyol-tech/micro-frontend-architecture-with-webpack-module-federation-part-1-9827d436bd1e

### Required Packages to work on Modular Federation

1. > npm i webpack webpack-cli
2. > npm i html-webpack-plugin

"html-webpack-plugin": "^5.5.0",
"webpack": "^5.73.0", // Please make sure, Webpack 5 is required for MF.
"webpack-cli": "^4.10.0"

### Install Required Loaders

> npm install babel-loader css-loader style-loader

"babel-loader": "^8.2.5",
"css-loader": "^6.7.1",
"style-loader": "^3.3.1",

### In Package.json file of each project, replace script: start and build with below -

"start": "webpack serve --open",
"build": "webpack build",

## Understand Some Compile Errors which generally comes in MF application --

### 1. `Add @babel/preset-react (https://github.com/babel/babel/tree/main/packages/babel-preset-react) to the 'presets' section of your Babel config to enable transformation. If you want to leave it as-is, add @babel/plugin-syntax-jsx (https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-jsx) to the 'plugins' section to enable parsing.`

> SOLUTION -

> npm install @babel/core @babel/preset-env @babel/preset-react

"@babel/core": "^7.18.6",
"@babel/preset-env": "^7.18.6",
"@babel/preset-react": "^7.18.6",

Create file named > .babelrc and put below object inside that. Webpack will automatically read this file.

{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ]
}

### URIError: Failed to decode param '/%PUBLIC_URL%/manifest.json' & URIError: Failed to decode param '/%PUBLIC_URL%/favicon.ico'

> https://stackoverflow.com/questions/50824024/urierror-failed-to-decode-param-public-url-favicon-ico

SOLUTION -

remove %PUBLIC_URL% with the actual path. %PUBLIC_URL%/favicon.ico with favicon.ico.
Before <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
After <link rel="icon" href="favicon.ico" />

> add HtmlWebpackPlugin PLUGIN with below config in webpack.config.js file

plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname, "public", "index.html"),
    favicon: "./public/favicon.ico",
    filename: "index.html",
    manifest: "./public/manifest.json",
  })]

###  Uncaught Error: Shared module is not available for eager consumption: webpack/sharing/consume/default/react/react

SOLUTION -

> First Rename index.js file with name 'bootstrap.js' (you can take any name here.)
> Second again create index.js file and import bootstrap.js file here with below line in this file.

import('./bootstrap.js')

### webpack-dev-server hot reload not working

> Put below object inside module.exports

 devServer: {
        port: 3000,
        hot: false,
        liveReload: true,
      },

### ERROR in ./src/logo.svg 1:0 Module parse failed: Unexpected token (1:0) You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders

SOLUTION -

> npm install babel-loader css-loader style-loader