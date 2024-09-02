const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createConnection({
  host: 'localhost',
  database: 'pools',
  user: 'root',
  password: ''
})

const app = express();
// API --> uses OR select statements to select all relevant rows
// iterate through each selected row to find rows that have the most relevant information
// then sort these rows by price 
// also include reviews (stars)

// here are the results we have, ordered by price and reviews
// purple shiny outline around best ones
// there are no results that match your pool exactly, but this is the closest we have (8 selections in common...)

// add a price range
// pool_size=${data['size']}  --> adjust size to be inches
app.use(cors());
app.use(express.json());

app.post('/form',(req,res) =>{
  const data = req.body;
  let sql = `SELECT * FROM POOL_DATA WHERE pool_type="${data['shape']}" OR sanitation_system="${data['sanitation_system']}" OR fountains=${data['features']['fountains']} OR bubbles=${data['features']['bubbles']} OR lights=${data['features']['lights']} OR smart=${data['features']['is_smart']} OR heater=${data['features']['heater']} OR plants=${data['landscaping']['plants']} OR grill=${data['landscaping']['grill']}`;
 
  // huge array of results
  // need to order by relevance
  // iterate through each result, and count how many match the original request
  // the result will then be added to a dictionary of lists
  // then at the end, we will return the top 20 results, and delete the rest to conserve memory & delete sql

  db.query(sql, function(err,results){
    if (err) throw err;
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

