const Request = require("./request")
const FileUtils = require("./utilities/file")

const path = require("path")
const dataType = require("./utilities/datatype")

function definePropertyFormat(name, value) {
    const type = dataType.checkDataType(value)
    const property = {
        name
    }

    if (type == "String") property["value"] = value
    if (type == "Boolean") property["value_boolean"] = value
    if (type == "Integer") property["value_int"] = value
    if (type == "Float") property["value_float"] = value
    if (type == "Array") property["value_array"] = value
    if (type == "Object") property["value_json"] = value

    return property
}

function createPropertiesPayload(properties) {
    return Object.keys(properties).reduce(
        (prev, curr) => [
            definePropertyFormat(curr, properties[curr]),
            ...prev
        ], [])
}

function GraphQL(requests = new Request(), files = new FileUtils()) {

    query = {}
    

    this.loadQueries = async function () {
        const query_path = path.join(__dirname, '..', 'app', 'graphql')
        this.query = await files.convertDirectoryToTree(query_path)
    }

    async function execute (variables, graphQLStatement) {
        const body = {
            query: graphQLStatement,
            variables
        }

        const payload = JSON.stringify(body)

        return await requests.post("graphql/", payload)
    }

    this.execute = execute

    async function create_model(model_schema_name, properties, response) {
        const query = `mutation {
                model_create(
                    model: {
                        model_schema_name: "${model_schema_name}",
                        properties: ${createPropertiesPayload(properties)}
                    }
                ){${response}}}`
        return await execute({}, query)
    }

    async function get_models(filter = null, response = " total_entries ", per_page = Number(process.env.PER_PAGE) || 20 , page = 1, sort = null) {
        const query = `{
                models(
                    per_page: ${per_page},
                    page: ${page},
                    filter: ${filter},
                    sort: ${sort}
                ){${response}}}`
        console.log(JSON.stringify(query, null, 2))
        return await execute({}, query)
    }

    async function update_model(model_schema_name, id, properties, response) {
        const query = `mutation {
                model_update(
                    id: "${id}"
                    model: {
                        model_schema_name: "${model_schema_name}",
                        properties: ${createPropertiesPayload(properties)}
                    }
                ){${response}}}`
        return await execute({}, query)
    }

    async function delete_model(id, response) {
        const query = `{ models(id: "${id}"{)${response}} }`
        return await execute({}, query)
    }

    this.models = {
        create: create_model,
        get: get_models,
        update: update_model,
        delete: delete_model
    }
}

module.exports = GraphQL