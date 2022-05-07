import express from 'express'
import { getConnection, getProject } from "../lib/ado.js"
import { GetCsvRecordsForQuery } from "./queryCmd.js"

export async function serveCmd(args) {
    console.log("serve")    
    const app = express()

    const connection = await getConnection()

    app.get('/', function (req, res) {
      res.send('Hello World')
    })
    app.get('/queryworkitems', async function (req, res) {
        const queryName = req.query['witquerybyname']
        if (queryName) {
            const records = await GetCsvRecordsForQuery(connection, queryName)
            res.send(records);
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
