var expect = require('chai').expect;
var timetable = require('../lib/timetable');

describe('TimeTable', function(){
	describe('getTimeTable', function(){
		it('should have a getTimeTable method', function(){
			expect(timetable).to.be.a('object');
			expect(timetable.getTimeTable).to.be.a('function');
		});
		//need to write a test for parameter validation??
		/*
		it('should have a non-null string url parameter', function(){
			expect(timetable.getTimeTable())
		});
		*/
		it('should take url as a string', function(){
			

		});

	});
});