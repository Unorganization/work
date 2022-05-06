import { getConnection, getProject } from "../lib/ado.js"
import { getAllWorkItemsForIds } from '../lib/getAllWorkItems.js'
import { stringify } from 'csv-stringify/sync'
import fs from 'fs'
import path from 'path'

const isObject = (obj) => !!obj && obj.constructor.name === "Object"
const fix = (obj) => isObject(obj) && obj.hasOwnProperty('displayName') ? obj.displayName : obj

export async function queryCmd(args) {
    if (args._.length < 2) {
        console.log("Query not specified");
        return 1
    }
    const queryName = args._[1];
    const connection = await getConnection()
    let [witApi, project] = await Promise.all([
        connection.getWorkItemTrackingApi(),
        getProject(connection)]);
    
    const query = await witApi.getQuery(project.id, queryName)
    const items = await witApi.queryById(query.id)
    
    const fields = items.columns.map(_ => _.referenceName)
    const columnNames = items.columns.reduce((obj, _) => ({ ...obj, [_.referenceName]: _.name }), {})
    const records = (await getAllWorkItemsForIds(witApi, fields, items.workItems.map(_ => _.id).slice(0)))
        .map(workItem => Object.keys(workItem.fields).
            reduce((obj, _) => ({ ...obj, [columnNames[_]]: fix(workItem.fields[_]) }), {}))
    
    fs.writeFileSync(path.join('out', 'outquery_result.csv'), stringify(records, { header: true }))

    console.log("done")
    
    return 0
}
