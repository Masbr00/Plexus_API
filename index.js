const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db_plexus',
    password: '1234',
    port: 5432,
})

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.use((req,res) => {
    res.status(404).json({
        success: false,
        message: "Url Not Found",
        data: []
    })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})