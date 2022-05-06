import * as azdev from "azure-devops-node-api"
import 'dotenv/config' // This line can be removed if run with: node -r dotenv/config server.js

const token = process.env.AZURE_PERSONAL_ACCESS_TOKEN
const orgUrl = process.env.API_URL

if (!token || !orgUrl) {
    console.log(`Required environment variables not set`)
    process.exit(1)
}

const authHandler = azdev.getPersonalAccessTokenHandler(token)
const connection = new azdev.WebApi(orgUrl, authHandler)    

const connData = await connection.connect()
console.log(`Hello ${connData.authenticatedUser.providerDisplayName}`)
const witApi = await connection.getWorkItemTrackingApi()
const coreApiObject = await connection.getCoreApi()
const project = await coreApiObject.getProject(process.env.API_PROJECT)

console.log(`team ${project.defaultTeam.name}`)

const query = await witApi.getQuery(project.id, "Shared Queries/Team/EB/PI EB User Stories")
const items = await witApi.queryById(query.id)

const columNames = items.columns.map(_ => _.name)
const fields = items.columns.map(_ => _.referenceName)
const allIds = items.workItems.map(_ => _.id)

let allWorkItems = []
let idsRemaining = allIds
const chunk = 200
while (idsRemaining.length > 0) {
    const ids = idsRemaining.filter((_, i) => i < chunk)
    allWorkItems = allWorkItems.concat(await witApi.getWorkItemsBatch({fields, ids}))
    idsRemaining = idsRemaining.filter((_, i) => i >= chunk)
}

console.log("done")