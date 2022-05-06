import * as azdev from "azure-devops-node-api"
import 'dotenv/config' // This line can be removed if run with: node -r dotenv/config server.js
// import * as WorkItemTrackingInterfaces from 'azure-devops-node-api/interfaces/WorkItemTrackingInterfaces.js'
// import * as wit from 'azure-devops-node-api/interfaces/WorkItemTracking.js'

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
const teamContext = {project: project.name,
    projectId: project.id,
    team: project.defaultTeam.name,
    teamId: project.defaultTeam.id}

// console.log('Overview of recent activity');
// console.log('Work data in progress', await witApi.getAccountMyWorkData(WorkItemTrackingInterfaces.QueryOption.Doing))
// console.log('Recent Activity:', await witApi.getRecentActivityData())
// console.log('Recent Mentions:', await witApi.getRecentMentions())

console.log('Get work item info');
const queries = await witApi.getQueries(project.id)
console.log('There are', queries.length, 'queries')
if (queries.length > 0) {
    console.log('Sample query:', queries[0])
}

console.log('Get work item info');
const workItemTypes = await witApi.getWorkItemTypes(project.id);
console.log('Work item types:', workItemTypes.map((item) => item.name));
if (workItemTypes.length > 0) {
    const type = workItemTypes[0];
    console.log('Info for type' + type.name);
    console.log(type.name, 'has', (await witApi.getWorkItemTypeColors([project.name])).length, 'colors');
}

console.log("done")