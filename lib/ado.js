const azdev = require("azure-devops-node-api")
require('dotenv').config() // This line can be removed if run with: node -r dotenv/config server.js

async function getConnection(token, orgUrl) {
    token = token || process.env.AZURE_PERSONAL_ACCESS_TOKEN
    orgUrl = orgUrl || process.env.API_URL
    if (!token || !orgUrl) {
        console.log(`Required environment variables not set`)
        process.exit(1)
    }
    
    const authHandler = azdev.getPersonalAccessTokenHandler(token)
    const connection = new azdev.WebApi(orgUrl, authHandler)
    const connData = await connection.connect()
    console.log(`Hello ${connData.authenticatedUser.providerDisplayName}`)
    return connection
}

async function getProject(connection) {
    const coreApiObject = await connection.getCoreApi()
    const project = await coreApiObject.getProject(process.env.API_PROJECT)
    console.log(`team ${project.defaultTeam.name}`)
    return project
}

exports.getConnection = getConnection;
exports.getProject = getProject;
