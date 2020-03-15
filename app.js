var express = require('express');
var app = express();
var url = require('url');
app.get('/', function (req, res) {
   
    var sql = require("mssql");
   res.header("Access-Control-Allow-Origin", "*");
    // config for your database

var q = url.parse(req.url, true).query;
var sdate=q.sdate;
var edate=q.edate;
console.log(sdate) ;
    var config = {
        user: 'sysadm',
        password: 'Europe7',
        server: 'aa-ap529', 
        database: 'ET7Test' 
    };
//var sqlquery="select Case_no,case_no_int, creation,claim,creator,note_count,updated,updater from dbo.[CASE] where CONVERT(date, CREATION) ='" + sdate+"'" 
//var sqlquery="select Case_no,case_no_int, creation,claim,creator,note_count,updated,updater from dbo.[CASE] where CONVERT(date, CREATION) between'" + sdate+"' and '" //+ edate +"'"  

var sqlquery ="select creation , Case_no ,PROBLEM_TYPE , DEPT , CREATOR , CAR_REG ,POLICY_ID , DEPARTMENT from dbo.[CASE] where CONVERT(date, CREATION) between'" + sdate+"' and '" + edate +"'"

console.log( sqlquery ) ;
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query("select creation , Case_no ,PROBLEM_TYPE , DEPT , CREATOR , CAR_REG ,POLICY_ID , DEPARTMENT from dbo.[CASE] where CONVERT(date, CREATION) between'" + sdate+"' and '" + edate +"'" , function (err, recordset) {
            
            if (err) console.log(err)
console.log(recordset);
            // send records as a response
            res.send(recordset);
            sql.close()
        });
    });
});

var server = app.listen(4300, function () {
    console.log('Server is running..');
});