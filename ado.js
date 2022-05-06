import 'dotenv/config' // This line can be removed if run with: node -r dotenv/config server.js
import * as azdev from "azure-devops-node-api";

const token = process.env.AZURE_PERSONAL_ACCESS_TOKEN;
const orgUrl = process.env.API_URL;
if (!token || !orgUrl) {
    console.log(`Required environment variables not set`);
    process.exit(1);
}
const authHandler = azdev.getPersonalAccessTokenHandler(token);
const connection = new azdev.WebApi(orgUrl, authHandler);
const connData = await connection.connect();
console.log(`Hello ${connData.authenticatedUser.providerDisplayName}`);
export const witApi = await connection.getWorkItemTrackingApi();
const coreApiObject = await connection.getCoreApi();
export const project = await coreApiObject.getProject(process.env.API_PROJECT);
console.log(`team ${project.defaultTeam.name}`);
