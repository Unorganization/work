import express from 'express'
import { getConnection, getProject } from "../lib/ado.js"
import { GetCsvRecordsForQuery } from "./queryCmd.js"
import { stringify } from 'csv-stringify/sync'

export async function serveCmd(args) {
    console.log("serve")    
    const app = express()

    const connection = await getConnection()

    app.get('/', function (req, res) {
      res.send('Hello World')
    })
    app.get('/queryworkitems', async function (req, res) {
        res.header("Content-Type", "text/csv");
        if (queryName) {
            const records = await GetCsvRecordsForQuery(connection, queryName)
            const data = stringify(records, { header: true })
            res.send(data);
        } else {
            res.send(`Missing "witquerybyname" query tag`)
        }
      })
    app.get("/samplejson", (req, res, next) => {
    res.json( [ {
        "ID": 1,
        "Title": "first",
        "AssignedTo": "bob"
    }, {
        "ID": 2,
        "Title": "second",
        "AssignedTo": "alice"
    } ] )})
       
    app.listen(3000)
    return 0
}
