const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createConnection({
    host: '',
    database: '',
    user: '',
    password: ''
})

const app = express();


app.use(cors());

app.get('/', (re, res) => {
    let sql = "SELECT * FROM POOL_DATA"
    db.query(sql, function(err,results){
        if (err) throw err;
        console.log(results[0]);
    })
    // https://www.youtube.com/watch?v=tIV90xQ0k6A
})
app.listen(8081,()=>{
  console.log('hello');
  db.connect(function(err){
    if (err) throw err;
    console.log('Database connected!');
  })
})

