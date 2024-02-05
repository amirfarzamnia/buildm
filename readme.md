# Build Manager

**Effortlessly create build files for your application**

[![npm version](https://badge.fury.io/js/buildm.svg)](https://www.npmjs.com/package/buildm)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/amirfarzamnia/buildm.svg)](https://github.com/amirfarzamnia/buildm/issues)
[![GitHub stars](https://img.shields.io/github/stars/amirfarzamnia/buildm.svg)](https://github.com/amirfarzamnia/buildm/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/amirfarzamnia/buildm.svg)](https://github.com/amirfarzamnia/buildm/forks)

Build Manager is a robust tool that simplifies the creation of build files for your application. It allows you to minify your JavaScript, CSS, and HTML files with ease, optimizing the process for improved performance and security.

## Features

- **Open Source**: As an open-source tool, Build Manager allows you to modify it to suit your needs.
- **User-Friendly**: With its intuitive API, managing data with Build Manager is a breeze.
- **Customizable**: Configure build settings effortlessly to meet your specific requirements.
- **Secure**: Build Manager prioritizes data security, ensuring your information is protected during access and storage.

## Supported Files

<div align="left">
  <img height="50" width="50" loading="lazy" src="https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/1ac69ce5fbc389725f16f989fa53c62d6e1b4883/social%20icons/html5.svg" title="HTML" alt="HTML">
  <img height="50" width="50" loading="lazy" src="https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/1ac69ce5fbc389725f16f989fa53c62d6e1b4883/social%20icons/css3.svg" title="CSS" alt="CSS">
  <img height="50" width="50" loading="lazy" src="https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/1ac69ce5fbc389725f16f989fa53c62d6e1b4883/social%20icons/javascript.svg" title="JavaScript" alt="JavaScript">
</div>

## Installation

Install Build Manager using NPM:

```bash
npm install -g buildm
```

## Usage

### CLI

Build specified files:

```bash
buildm --build src/index.html src/assets/main.css src/assets/main.js
```

Build all files within a folder:

```bash
buildm --b public
```

Relocate the target folder or files to a different path and build them:

```bash
cp public build -r && buildm --b build
```

### Module

Create custom configurations for files using modules:

```javascript
// Import the 'buildFolderAndFiles' function from the 'buildm' module
const { buildFolderAndFiles } = require('buildm');

// Configuration object specifying build options
const buildConfig = {
  options: {
    log: true
  },
  files: {
    js: {
      expression: false
    },
    css: {
      colors: {
        opacity: true
      }
    },
    html: {
      collapseWhitespace: true,
      removeComments: true
    }
  }
};

// Build specific files with the provided configuration
buildFolderAndFiles('public/index.html', buildConfig);
buildFolderAndFiles('public/styles/style.css', buildConfig);
buildFolderAndFiles('public/scripts/script.js', buildConfig);

// Build all files within the 'public' folder using the same configuration
buildFolderAndFiles('public', buildConfig);
```

## Configuration

Access a comprehensive list of configurations for minifying through the following links:

- JS: Build Manager uses the [UglifyJS 3](https://github.com/mishoo/UglifyJS?tab=readme-ov-file#minify-options) configuration to minify JS files.
- CSS: Build Manager uses the [Clean CSS](https://github.com/clean-css/clean-css?tab=readme-ov-file#constructor-options) configuration to minify CSS files.
- HTML: Build Manager uses the [HTML Minifier](https://github.com/kangax/html-minifier?tab=readme-ov-file#options-quick-ref) configuration to minify HTML files.

### Default Configuration

Here is the default configuration for Build Manager:

https://github.com/amirfarzamnia/buildm/blob/main/config.json