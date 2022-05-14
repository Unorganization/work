#!/usr/bin/env node
const minimist = require('minimist')
import { queryCmd } from "./commands/queryCmd.js"
import { serveCmd } from "./commands/serveCmd.js"

const args = minimist(process.argv.slice(2), { // https://devhints.io/minimist
    boolean: ['csv'],
    default: { csv: true },
})

if (args._.length == 0) {
    console.log("Commands:")
    console.log('  query "Name of query" [--csv]         --csv is default')
    console.log('  serve')
    console.log("Examples:")
    console.log('  query "Shared Queries/Team/EB/PI EB User Stories" --csv')
    console.log('  serve')
    process.exit(0)
}

let exitCode = 0
switch (args._[0]) {
    case "query":
        exitCode = await queryCmd(args)
        break
    case "serve":
        exitCode = await serveCmd(args)
        break
    
    default:
        console.log(`Unknown command: ${args._[0]}`)
        break
}
