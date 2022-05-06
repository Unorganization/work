import * as azdev from "azure-devops-node-api";
import 'dotenv/config' // This line can be removed if run with: node -r dotenv/config server.js

let orgUrl = "https://dev.azure.com/AVEVA-VSTS/";

let token = process.env.AZURE_PERSONAL_ACCESS_TOKEN;
if (!token) {
    console.log(`Missing envvar: AZURE_PERSONAL_ACCESS_TOKEN`)
    process.exit(1)
}

let authHandler = azdev.getPersonalAccessTokenHandler(token); 
let connection = new azdev.WebApi(orgUrl, authHandler);    

console.log("done")