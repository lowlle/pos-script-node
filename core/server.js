const express = require('express')
const showdown = require('showdown'), converter = new showdown.Converter()

const serveStatic = require('serve-static')

const fs = require('fs');
const path = require('path');


const FileUtils = require("./utilities/file")

const server = function (files = new FileUtils()) {
    const port = process.env.SERVER_PORT || 4700
    const app = express()

    app.use(serveStatic(path.join(__dirname, "./public/")))

    app.get('/readme.raw', (req, res) => {
        const readme = path.resolve(__dirname, "../README.md")
        const content = fs.readFileSync(readme, 'utf8')
        
        res.send(converter.makeHtml(content))
    })

    app.get('/graphql-tree', async (req, res) => {
        const query_path = path.join(__dirname, '..', 'app', 'graphql')
        const graphqlTree = await files.convertDirectoryToTree(query_path)

        res.send(graphqlTree)
    })

    function start(){
        app.listen(port, () => console.log(`app listening at http://localhost:${port}`))
    }

    return {
        start,
        app
    }
}


module.exports = server()