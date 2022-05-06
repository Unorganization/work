import * as azdev from "azure-devops-node-api"
import 'dotenv/config' // This line can be removed if run with: node -r dotenv/config server.js
import * as ba from "azure-devops-node-api/BuildApi"
import * as bi from "azure-devops-node-api/interfaces/BuildInterfaces"

let token = process.env.AZURE_PERSONAL_ACCESS_TOKEN
let orgUrl = process.env.API_URL

if (!token || !orgUrl) {
    console.log(`Required environment variables not set`)
    process.exit(1)
}

let authHandler = azdev.getPersonalAccessTokenHandler(token) 
let connection = new azdev.WebApi(orgUrl, authHandler)    

let build = await connection.getBuildApi()

console.log("done")