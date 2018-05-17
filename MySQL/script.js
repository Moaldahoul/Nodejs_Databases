const fs = require('fs');
const express = require('express');
const mysql = require('mysql');
const app = express();

const config = JSON.parse(fs.readFileSync("config-secret.json"))


const connection = mysql.createPool({
    connectionLimit: config.connectionLimit,
    host    : config.host,
    user    : config.user,
    password: config.password,
    port    : config.port,
    database: config.database
});

app.get('/', function(req, res){
            connection.getConnection(function(err, tempCont){
                if(err){
                    tempCont.release();
                    console.log(err);    
                }else{
                    console.log('Connected');  
        
            tempCont.query("SELECT * FROM mySampleTable", function(err, rows, fields){
                tempCont.release();
                if(err) {
                console.log("Query Error");  
                }else{  
                res.send(rows);  
                }
            });
        }
    });
})

app.listen(3000);