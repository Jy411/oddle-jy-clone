# Oddle Front-end Challenge 💻

This project was created using create-react-app.

# [Deployed GitHub Pages Site](https://jy411.github.io/oddle-jinyung/#/)

***
## Local Development Setup

Perform the following steps to get started:
1. Run `npm install` or `yarn install` to install dependencies.
2. Run `npm start` or `yarn start` to start the development server.

### Project Folder Strucutre

    - src
        - api
        - components
            - elements
            - layout
        - images
        - pages
        - redux
        - App.js
        - index.js
    - .eslintrc
    - .prettierrc
    - jsconfig.json
    - package.json
    - README.md


`Pages`: Contains all the pages of the application.

`Components`: Contains all the components of the application.

`Images`: Contains all the static images of the application.

The rest are self explanatory.
***

## Libraries Used

Some of the libraries used in this project are listed below:

* [react-redux](https://github.com/reduxjs/react-redux)
* [redux-persist](https://github.com/rt2zz/redux-persist) 
* [MUI](https://mui.com/)
* [@octokit](https://github.com/octokit/octokit.js)
* [ESLint](https://github.com/eslint/eslint)
* [Prettier](https://github.com/prettier/prettier)

The other packages can be found in the `package.json` file.

To find more information about the libraries used, please visit their respective GitHub repositories. 

***

## Code Style Configuration

### ESLint configuration

ESLint config can be found in the `.eslintrc` file

#### Few of the ESLint Plugins Used:

> * eslint-plugin-prettier: To disable conflicts with Prettier
> * eslint-plugin-sort-destructure-keys: To sort the keys of destructured objects
> * eslint-plugin-import: Custom sorting of import statements

### Prettier configuration

Prettier config can be found in the `.prettierrc` file

```json5
{
    "tabWidth": 2,
    "useTabs": true,
    "trailingComma": "all",
    "arrowParens": "always",
    "bracketSpacing": true,
    "singleQuote": true,
    "jsxSingleQuote": true,
    "endOfLine": "lf",
    "printWidth": 80
}
```

### jsconfig

A jsconfig.json file is created to set the base url for the imports.

```json5
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "baseUrl": "src"
  }
}
```

# Deployment
***

Any pushed made to the `master` branch will be deployed to the `gh-pages` branch through GitHub Actions Flow. The configuration can be found in the `.github/workflows/main.yml` file.
