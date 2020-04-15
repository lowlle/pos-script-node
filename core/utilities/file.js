const fs = require('fs');
const util = require('util')
const path = require('path');

function FileUtils() {
    
    const readDirectory = util.promisify(fs.readdir)
    const readFile = util.promisify(fs.readFile)
    const checkIfExist = util.promisify(fs.stat)

    
    async function convertDirectoryToTree(directory) {
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
                    ...(await convertDirectoryToTree(file))
                }
            } else {
                let name = path.basename(file).split(".")[0]
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