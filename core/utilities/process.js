/**
 * This module exports the a class name ProcessUtils with the primary purpose of
 * connecting to PlatformOS GraphyQL server
 * 
 * Please do not add any other function outside the purpose of the class 
 * unless required by the methods which can not be handled by constructor injection
 * 
 * Following are the feature of the class:
 *  - Serve PlatformOS GraphyQL
 *  - Send HTTP Request for GET, POST, PUT, DELETE methods
 * 
 * Requirements:
 *  - axios module `npm install axios`
 *  - node env module `npm install dotenv`
 * 
 * @version 1.0.0
 */


const { exec } = require('child_process');
const tcpPortUsed = require('tcp-port-used');
const kill = require('kill-port')

function configuration (config = {}){
    this.port = config.port || 3333
    this.environment = config.environment || "staging"
    this.posDirectory = config.posDirectory || "./"
}


class ProcessUtils {
    
    constructor(config = new configuration()){
        this.config = new configuration(config)
    }

    async checkPortStatus(){
        return await tcpPortUsed.check(this.config.port)
            .then(function (portStatus) {
                return portStatus
            }, function (err) {
                console.error('Error on check:', err.message);
            });
    }

    async killProcessOnPort(){
        if (this.config.port) {
            kill(this.config.port, 'tcp')
                .then(console.log)
                .catch(console.log)
        }
    }

    async runGraphyQL(){
        await this.checkPortStatus()
            ? await this.killProcessOnPort()
            : null

        const command = `cd ${this.config.posDirectory} && pos-cli gui serve ${this.config.environment} -p ${this.config.port}`
        exec(command, (err, stdout, stderr) => {
            if (err) {
                console.error(err)
            } else {
                console.log({ stdout, stderr })
            }
        });
    }
}

module.exports = ProcessUtils