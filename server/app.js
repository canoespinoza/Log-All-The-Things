const express = require('express');
const fs = require('fs');
const csv = require('csvtojson/v2');
const app = express();

//const csvArray = [];    

app.use((req, res, next) => {
    // write your logging code here

    let userAgent = req.headers['user-agent'].replace(',',''); 
        //console.log(userAgent)
    
    let time = new Date();
    let userTime = time.toISOString();
        //console.log(userTime)
    
    let userMethod = req.method;
        //console.log(userMethod)
    
    let userURL = req.url;
        //console.log(userURL)
    
    let version = 'HTTP/' + req.httpVersion;
        //console.log(version)
    
    let status = res.statusCode;
        //console.log(status)

    let logger = userAgent + ',' + userTime + ',' + userMethod + ',' + userURL + ',' + version + ',' + status + '\n'; 

    console.log(logger);

    fs.appendFile('log.csv', logger, (error) => {
        if (error) throw error; 
    })

    next();

});

app.get('/', (req, res,) => {
// write your code to respond "ok" here
    res.send('OK').status(200)
    //console.log('node-superagent')
});

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here
    csv()
    .fromFile('./log.csv') 
    .then((obj) =>{
        //console.log(obj)
        res.json(obj)
    })

});

module.exports = app;
