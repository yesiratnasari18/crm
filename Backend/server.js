const express = require('express');
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password : '',
    database: 'crm'
})

app.get('/', (re, res)=> {
    return res.json("from BAckend Side");
})

app.get('/contact', (req, re)=> {
    const sql = "SELECT * FROM kontak";
    db.query(sql, (err, data)=> {
        if(err) return res.json(err);
        return re.json(data);

    })
})

app.listen(8081, ()=> {
    console.log("listening");
})