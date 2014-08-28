var gymclasses = require('../lib/classes');
var schedule = require('../lib/schedule');
var scrape = require('../lib/scrape');
var cheerio = require('cheerio');
var async = require('async');

var url = 'http://www.clublime.com.au/?ClubLime=ClubsAndClasses';

exports.getTimetable = function ( request, response ) {
	
	//get weekly schedule information
	scrape.getHtml( url, function ( error, html ) {

		var weeklySchedule = schedule.getSchedule(cheerio.load(html));

		//get daily schedule

		async.map(weeklySchedule, gymclasses.getDailyClassSchedule, function( error, weeklyTimeTable ) {
			if(!error) {
				response.json(weeklyTimeTable);
			}else {
				response.send("Could not get time table. Error occurred");
			}
		});
	});
}
