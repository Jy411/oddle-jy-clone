# Oddle Front-end Challenge

This project was created using create-react-app.

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
    - public
    - .eslintignore
    - .eslintrc
    - .gitignore
    - .prettierignore
    - .prettierrc
    - jsconfig.json
    - package.json
    - README.md
    - yarn.lock

`Pages`: Contains all the pages of the application.

`Components`: Contains all the components of the application.

`Images`: Contains all the static images of the application.

The rest are self explanatory.

### Libraries Used

Some of the libraries used in this project are listed below:

* redux
* redux-persist (https://github.com/rt2zz/redux-persist)
* @mui component library (https://mui.com/)
* @octokit (https://github.com/octokit/octokit.js)
* eslint
* prettier

The other packages can be found in the `package.json` file.

To find more information about the libraries used, please visit their respective GitHub repositories. 

### ESLint configuration

ESLint config can be found in the `.eslintrc` file

I used ESLint to maintain a consistent style across my codebase. Particularly with the importing section.

### Prettier configuration

Prettier config can be found in the `.prettierrc` file

### jsconfig

A jsconfig.json file is created to set the base url for the imports.
