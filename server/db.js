const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createConnection({

})

const app = express();
// API --> uses OR select statements to select all relevant rows
// iterate through each selected row to find rows that have the most relevant information
// then sort these rows by price 
// also include reviews (stars)

app.use(cors());
app.use(express.json());

app.post('/form',(req,res) =>{
  const data = req.body;
  let sql = `SELECT * FROM POOL_DATA WHERE pool_size=${data['size']} OR sanitation_system=${data['sanitation_system']}`;

  db.query(sql, function(err,results){
    if (err) throw err;
    console.log(results[0]);
    return res.json(results);
  })
})
// company_id: 0,
//   pool_type: 'Circular',
//   pool_size: 25,
//   fountains: 1,
//   bubbles: 1,
//   lights: 0,
//   smart: 1,
//   heater: 0,
//   plants: 1,
//   grill: 0,
//   sanitation_system: 'Chlorine',
//   price: 4127.1,
//   issue_date: '31 August 2024'

app.get('/', (re, res) => {
    let sql = "SELECT * FROM POOL_DATA";
    db.query(sql, function(err,results){
        if (err) throw err;
        console.log(results[0]);
    })
    // https://www.youtube.com/watch?v=tIV90xQ0k6A
})
app.listen(8081,()=>{
  db.connect(function(err){
    if (err) throw err;
    console.log('Database connected!');
  })
})

