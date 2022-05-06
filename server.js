import { witApi, project } from "./ado.js"
import { getAllWorkItemsForIds } from './getAllWorkItems.js'
import { stringify } from 'csv-stringify/sync'
import * as fs from 'fs'

const queryName = "Shared Queries/Team/EB/PI EB User Stories"

const query = await witApi.getQuery(project.id, queryName)
const items = await witApi.queryById(query.id)

const fields = items.columns.map(_ => _.referenceName)
const columnNames = items.columns.reduce((p, c) => ({ ...p, [c.referenceName]: c.name }), {})
var records = (await getAllWorkItemsForIds(witApi, fields, items.workItems.map(_ => _.id).slice(0)))
    .map(workItem => Object.keys(workItem.fields).
        reduce((p, c) => ({ ...p, [columnNames[c]]: workItem.fields[c] }), {}));
fs.writeFileSync("query_result.csv", stringify(records, { header: true }))
console.log("done")
