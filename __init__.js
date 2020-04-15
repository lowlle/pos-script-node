const GraphQL = require("./core/graphQL")
const ProcessUtils = require("./core/utilities/process")
const server = require("./core/server")

const dotenv = require('dotenv');
dotenv.config();

const config = {
    port: Number(process.env.PORT) || 3333,
    environment: process.env.ENVIRONMENT || 'staging',
    posDirectory: process.env.POS_DIRECTORY || './'
}

module.exports = (async function init() {
    // const processUtils = new ProcessUtils(config)
    // await processUtils.killProcessOnPort()
    // await processUtils.runGraphyQL()

    const graphQL = new GraphQL()
    await graphQL.loadQueries()

    server.start()

    return {
        graphQL
    }
})()