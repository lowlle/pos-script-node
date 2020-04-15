/**
 * This module exports the a class name Request which uses the Axios Library
 * 
 * Please do not add any other function outside the purpose of the class 
 * unless required by the methods which can not be handled by constructor injection
 * 
 * Following are the feature of the class:
 *  - Set the base URL of each request upon initialisation
 *  - Send HTTP Request for GET, POST, PUT, DELETE methods
 * 
 * Requirements:
 *  - axios module `npm install axios`
 *  - node env module `npm install dotenv`
 * 
 * @version 1.0.0
 */


const axios = require('axios')
const dotenv = require('dotenv');

const defaultHeaders = {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
    "Content-Type": "application/json"
}

dotenv.config();


class Request {

    constructor(baseURL = `http://localhost:${process.port || 3333}/`, headers = defaultHeaders, httpModule = axios) {
        this.httpService = httpModule.create({
            baseURL,
            headers
        })
    }

    async processResults(method, request) {
        return request
            .then(({ data }) => ({ state: true, results: data }))
            .catch(error => ({ state: false, results: error }))
    }

    async get(url, params) {
        console.log(url, params)
        return await this.processResults('GET', this.httpService.get(url, {
            params
        }))
    }

    async post(url, data) {
        console.log(url, data)
        return await this.processResults('POST', this.httpService.post(url, data))
    }

    async put(url, data) {
        console.log(url, data)
        return await this.processResults('PUT', this.httpService.put(url, data))
    }

    async delete(url, params) {
        console.log(url, params)
        return await this.processResults('DELETE', this.httpService.delete(url, {
            params
        }))
    }
}


module.exports = Request