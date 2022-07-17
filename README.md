# -msaxena25-Modular-Federation-React
Lets Understand Micro Front-End with Webpack 5 Modular Federation in a React application


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


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

### Understand Some Compile Errors which generally comes in MF application --

# 1. `Add @babel/preset-react (https://github.com/babel/babel/tree/main/packages/babel-preset-react) to the 'presets' section of your Babel config to enable transformation. If you want to leave it as-is, add @babel/plugin-syntax-jsx (https://github.com/babel/babel/tree/main/packages/babel-plugin-syntax-jsx) to the 'plugins' section to enable parsing.`

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

# URIError: Failed to decode param '/%PUBLIC_URL%/manifest.json' & URIError: Failed to decode param '/%PUBLIC_URL%/favicon.ico'

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