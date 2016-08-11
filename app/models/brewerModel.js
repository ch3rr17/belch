//Pulls Mongoose dependency for creating schemas
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

//Creates a beer schema
var BrewerSchema = new Schema({
	breweryname: {
		type: String,
		required: true
	},
	breweryaddress: {
		type: String,
		required: true
	},
	brewerywebsite: {
		type: String,
		required: true,
	},
	brewerylocation:{
		type: [Number], 
		required:true 
	},
	htmlverified: {
		type: String
	}
});

BrewerSchema.plugin(mongoosePaginate);

//Exports BeerList Schema
module.exports = mongoose.model('brewer-list', BrewerSchema);