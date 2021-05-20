const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
  res.redirect('/10')
});

app.get('/:rows', (req, res)=>{
  rows = req.params.rows
  let req_data = ''
  https.get('https://api.wazirx.com/api/v2/tickers', response=>{
    let data=''
    response.on('data', chunk=>{
      data += chunk
    })
    response.on('end', ()=>{
      req_data = JSON.parse(data)
      res.render('index', {data: req_data, rows: rows})
    })
  })
});

app.post('/changerows', (req, res)=>{
  rows = req.body.numrows
  res.redirect('/'+rows)
})
app.listen(5555, ()=>{
  console.log('server started on port 5555, please open http://localhost:5555')
});
