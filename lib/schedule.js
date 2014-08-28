var cheerio = require('cheerio');
var request = require('request');
var async = require('async');

var weeklySchedule = ( function (){
	
	var gymSchedule = [];
	return {
		getWeeklySchedule: function() {
			return gymSchedule;
		},
		addToWeeklySchedule: function(dayScheduleJson){
			gymSchedule.push(dayScheduleJson);
		}
	};
})();

exports.getSchedule = function(html) {
	var $ = html
	var jsonObject = {
		day : '',
		numberOfClasses : '',
		classesUrl : ''
	};
	$('table.table-hover').find('tbody').children('tr').each( function getTds() {
		var newJSONObject = {};
		var $tds = $(this).find('td');
		newJSONObject.day = $tds.eq(0).text();
		newJSONObject.numberOfClasses = ($tds.eq(1).text()).replace(/\D+/g, '');
		newJSONObject.classesUrl = $tds.eq(2).find('a').attr('href');
		weeklySchedule.addToWeeklySchedule(newJSONObject);
		newJSONObject
	} );
	
	return weeklySchedule.getWeeklySchedule();
}

