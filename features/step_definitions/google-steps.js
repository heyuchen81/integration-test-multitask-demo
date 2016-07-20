'use strict';

var expect = require('chai').expect;

module.exports = function() {
	this.World = require('../support/world.js').World;

	this.When(/^I search Google for "([^"]*)"$/, function(searchQuery, next) {

		this.driver.get('http://www.google.co.uk/webhp?complete=0');
		this.driver.findElement({
			name : 'q'
		}).sendKeys(searchQuery);
		this.driver.findElement({
			name : 'q'
		}).sendKeys(this.webdriver.Key.ENTER).then(function() {
			next();
		});
	});

	this.Then(/^I should see some results for "([^"]*)"$/, function(gruntruntask, next) {
		var srquan = -1000;
		switch(gruntruntask) {
	    case 'chrome':
	    case 'firefox':
	    	srquan = 13;
	        break;
	    case 'bs_pc1':
	    	srquan = 11;
	    	break;
	    case 'bs_m1':
	    	srquan = 15;
	        break;
	    default:
	    	srquan = 0;
		}
		
		this.waitFor('div.g');
		this.driver.findElements({
			css : 'div.g'
		}).then(function(elements) {
			expect(elements.length).to.equal(srquan);
			next();
		});
	});
	
	this.Then(/^I should see some results$/, function(next) {
		this.waitFor('div.g');
		this.driver.findElements({
			css : 'div.g'
		}).then(function(elements) {
			expect(elements.length).to.not.equal(0);
			next();
		});
	});
	
//	this.When(/^M1 I search Google for "([^"]*)"$/, function(searchQuery, next) {
//
//		this.driver.get('http://www.google.co.uk/webhp?complete=0');
//		this.driver.findElement({
//			name : 'q'
//		}).sendKeys(searchQuery);
//		this.driver.findElement({
//			name : 'q'
//		}).sendKeys(this.webdriver.Key.ENTER).then(function() {
//			next();
//		});
//	});

//	this.Then(/^M1 I should see some results$/, function(next) {
//		this.waitFor('div.g');
//		this.driver.findElements({
//			css : 'div.g'
//		}).then(function(elements) {
//			expect(elements.length).to.equal(10);
//			next();
//		});
//	});

};