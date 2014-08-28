var cheerio = require('cheerio');
var request = require('request');

exports.getHtml = function( url, callback ) {

	request( url, function ( error, response, html ) {
		if(error){
			return callback(error);
		} else {
			return callback(null, html);	
		}
		
	});

}