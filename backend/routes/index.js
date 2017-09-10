var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config/config');
var connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/postBusinessData', function(req, res) {
    console.log(req.body);

    var businessName = req.body.name;
    var category = req.body.category;
    var website = req.body.website;
    var streetAddress = req.body.streetAddress;
    var city = req.body.city;
    var state = req.body.state;
    var zipCode = req.body.zipCode;
    var phone = req.body.phone;
    phone = phone.replace(' ', '-');
    phone = phone.replace(')', '');
    phone = phone.replace('(', '');


    var insertQuery = `INSERT INTO Data (businessName, category, website, streetAddress, city, state, zipCode, phone) VALUES (?,?,?,?,?,?,?,?)`;

    connection.query(insertQuery, [businessName, category, website, streetAddress, city, state, zipCode, phone],(error, response)=>{
        if(error) throw error;
        res.json({msg:'success'});
    });



});


module.exports = router;
