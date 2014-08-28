
var cheerio = require('cheerio');
var request = require('request');
var scrape = require('../lib/scrape');


exports.getDailyClassSchedule =  function (daySchedule, callback) {
	
	var scheduleDay = daySchedule.day;
	var numberOfClassessOntheDay = parseInt(daySchedule.numberOfClasses);
	var dayClassesURL = daySchedule.classesUrl;
	var gymClasses = [];
	var dailyTimetable = {};
	dailyTimetable.day = scheduleDay
	dailyTimetable.classes = [];

	if ( numberOfClassessOntheDay > 0 ) {

		scrape.getHtml( dayClassesURL, function ( error, html ) {
					
			var $ = '';
			if( !error ) {
				$ = cheerio.load(html);
			}
			$('table.table-hover').find('tbody').children('tr').each ( function getGymClasses () {
				var json = getGymClassesJson ( $(this) );
				gymClasses.push(json);
			});
			dailyTimetable.classes = gymClasses;
							
			return callback(error, dailyTimetable);
		});
	} else {
		callback(null, dailyTimetable);
	}
}

function getGymClassesJson(gymClassDetails) {

	var jsonObject = {
		className : "",
		day : "",
		startTime : "",
		duration : "",
		instructor: "",
		location : "",
		studio : ""
	};

	if(typeof gymClassDetails !== 'undefined' && gymClassDetails !== 'null') {

		$tds = gymClassDetails.find('td');
		jsonObject.className = $tds.eq(0).text();
		jsonObject.day = $tds.eq(1).text();
		jsonObject.startTime = $tds.eq(2).text();
		jsonObject.duration = $tds.eq(3).text();
		jsonObject.instructor = $tds.eq(4).text();
		jsonObject.location = $tds.eq(5).text();
		jsonObject.studio = $tds.eq(6).text();

	}
	return jsonObject;
}
