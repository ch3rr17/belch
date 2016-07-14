//Dependecies
var express = require('express');
var Brewer = require('../models/brewerModel.js');
var mongoosePaginate = require('mongoose-paginate');

//Opens App Routes
module.exports = function(app) {

    //GET Routes
    //Grabs all breweries from the table
    app.get('/brewers', function(req, res) {

        //Uses Mongoose schema to run search
        var query = Brewer.find({});
        query.exec(function(err, brewers) {
            if (err) {
                res.send(err);
            }

            //If no errors are found, it responds with a JSON of all breweries
            else {
                res.json(brewers);
            }
        });
    });

    //Gets a list of breweries with a limit of x amount breweries per page (limit is set in the front end app)
    app.get('/brewers/:pageSize/:pageIndex/:term?', function(req, res) {

        var query = {};

        if (req.params.term) {
            query = { $text: { $search: req.params.term } };
        }

        Brewer.paginate(query, { page: parseInt(req.params.pageIndex), limit: parseInt(req.params.pageSize) }, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    });

    //POST Routes
    //Adds a new brewery to the list
    app.post('/brewers', function(req, res) {

        //Creates new brewery
        
        /*var newbrewer = new Brewer(req.body);*/

        /*var newbrewer = new Brewer({
            breweryname: '',
            breweryaddress: '',
            brewerywebsite: '',
            brewerylocation: [Number]
        }, {
            _id: false
        });*/

        var newbrewer = new Brewer({
            breweryname: req.body.breweryname,
            breweryaddress: req.body.breweryaddress,
            brewerywebsite: req.body.brewerywebsite,
            brewerylocation: req.body.brewerylocation

        });        

        
        //New Brewery is saved in the DB
        newbrewer.save(function(err) {
            if (err) {
                res.send(err);
                console.log('route', err);
            }

            //If no errors found, it responds with a JSON of the new brewery
            else {
                res.json(req.body);
                 console.log('saved!', newbrewer);

            }
        });
    });

    /*app.post('/brewers/:pageSize/:pageIndex', function(req,res){
        var pageSize = 5;
        var pageIndex = 1;
        var query = Brewer.find().skip(pageSize * pageIndex).limit(pageSize);
        query.exec(function(err,data){
            if(err)
                res.send(err);

            res.json(data);
        });
    });*/


};
