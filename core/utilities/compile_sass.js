/**
 * This module exports functions with names renderSass, compileSass and
 * compileSassFiles with the primary purpose of compiling SASS files into CSS files.
 * 
 * Please do not add any other function outside the purpose of the class 
 * unless required by the methods which can not be handled by constructor injection
 * 
 * Following are the feature of the class:
 *  - Compile SASS file into CSS values
 *  - Create CSS file for a SASS file
 *  - Compile SASS files to a CSS files
 * 
 * Requirements:
 *  - node-sass module `npm install node-sass`
 *  - node built-in fs module
 *  - node built-in path module
 *  - mkdirp module `npm install mkdirp`
 * 
 * @version 1.0.0
 */

'use strict';
 
const path  = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const sass = require('node-sass');

const basePath = '../server/public/styles'
  
function renderSass(sassFile) {
  const sassOptions = {
    file: sassFile,
    outputStyle: 'compressed'
  };
 
  return new Promise((resolve, reject) => {
    sass.render(sassOptions, (error, result) => {
      if (error) {
        return reject(error);
      }
 
      resolve(result.css.toString());
    });
  }).catch(console.error);
}
 
function compileSass(sassFile) {
  const fullSassPath = path.join(__dirname, `${basePath}/sass/`, sassFile);
  const cssFile = sassFile.replace('.sass', '.css');
  const cssPath = path.join(__dirname, `${basePath}/css/`);
  const fullCssPath = path.join(cssPath, cssFile);
 
  return renderSass(fullSassPath).then(css => {
    return new Promise((resolve, reject) => {
      mkdirp(cssPath, error => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    }).then(() => {
      return new Promise((resolve, reject) => {
        fs.writeFile(fullCssPath, css, error => {
          if (error) {
            return reject(error);
          }
 
          resolve(cssFile);
        });
      });
    }).catch(console.error);
  });
}

function compileSassFiles(sassFiles) {
    sassFiles.forEach((sassFile) => {
      compileSass(sassFile)
        .then((cssFile) => {
          console.log(`Successfull exported ${cssFile}`);
        })
        .catch(console.error);
    });
}

module.exports = {
    renderSass,
    compileSass,
    compileSassFiles
};