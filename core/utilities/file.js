/**
 * This module exports a class with name FileUtils with the primary purpose of
 * file reading features. Since node built-in libraries always only supports using
 * callback for asynchronous methods, this module utilizes the promisify module 
 * for the the built-in methods to be used as promise which could prevent a lot 
 * of work-arounds and variable binding problems.
 * 
 * Note that writing capabilities are not yet added to this module since there is
 * still no use case for this as of the moment but is planning to in the future.
 * 
 * Please do not add any other function outside the purpose of the class 
 * unless required by the methods which can not be handled by constructor injection
 * 
 * Following are the feature of the class:
 *  - Read File
 *  - Check if file exists
 *  - Create Directory Tree
 * 
 * Requirements:
 *  - node built-in fs module
 *  - node built-in util module
 *  - node built-in path module
 * 
 * @version 1.0.0
 */

const fs = require('fs');
const util = require('util')
const path = require('path');

function FileUtils() {
    
    const readDirectory = util.promisify(fs.readdir)
    const readFile = util.promisify(fs.readFile)
    const checkIfExist = util.promisify(fs.stat)

    
    async function convertDirectoryToTree(directory, includeFileExt=false) {
        const files = await readDirectory(directory)
        const directoryTreeObject = {}
        
        let pending = files.length + 1
        let current = -1
        
        while(--pending) {
            let curr = files[++current]
            const file = path.resolve(directory, curr);
            const status = await checkIfExist(file)
            
            if (status && status.isDirectory()) {
                directoryTreeObject[path.basename(file)] = {
                    ...(await convertDirectoryToTree(file, includeFileExt))
                }
            } else {
                let name = path.basename(file)
                if (!includeFileExt) name = name.split(".")[0];
                directoryTreeObject[name] = fs.readFileSync(file, 'utf8')
            }
        }
        
        return directoryTreeObject
    }
    return {
        readDirectory,
        readFile,
        convertDirectoryToTree
    }
}

module.exports = FileUtils