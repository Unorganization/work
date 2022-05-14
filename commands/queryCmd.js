const { getConnection, getProject } = require("../lib/ado.js")
const { getAllWorkItemsForIds } = require('../lib/getAllWorkItems.js')
const { stringify } = require('csv-stringify/sync')
const fs = require('fs')
const path = require('path')

const isObject = obj => !!obj && obj.constructor.name === "Object"
const fix = obj => isObject(obj) && obj.displayName || obj

async function queryCmd(args) {
    if (args._.length < 2) {
        console.log("Query not specified")
        return 1
    }
    const queryName = args._[1]

    const connection = await getConnection()
    const records = await GetCsvRecordsForQuery(connection, queryName)

    const dir = './out';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    fs.writeFileSync(path.join(dir, 'outquery_result.csv'), stringify(records, { header: true }))
    console.log("query done")
    
    return 0
}
async function GetCsvRecordsForQuery(connection, queryName) {
    let [witApi, project] = await Promise.all([
        connection.getWorkItemTrackingApi(),
        getProject(connection)
    ])

    const query = await witApi.getQuery(project.id, queryName)
    const items = await witApi.queryById(query.id)

    const fields = items.columns.map(_ => _.referenceName)
    const columnNames = items.columns.reduce((obj, _) => ({ ...obj, [_.referenceName]: _.name }), {})
    const records = (await getAllWorkItemsForIds(witApi, fields, items.workItems.map(_ => _.id).slice(0)))
        .map(workItem => Object.keys(workItem.fields).
            reduce((obj, _) => ({ ...obj, [columnNames[_]]: fix(workItem.fields[_]) }), {}))
    return records
}

exports.queryCmd = queryCmd;
exports.GetCsvRecordsForQuery = GetCsvRecordsForQuery;