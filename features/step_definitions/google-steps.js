'use strict';

var expect = require('chai').expect;

module.exports = function() {
	this.World = require('../support/world.js').World;

	this.When(/^PC1 I search Google for "([^"]*)"$/, function(searchQuery, next) {

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

	this.Then(/^PC1 I should see some results$/, function(next) {
		this.waitFor('div.g');
		this.driver.findElements({
			css : 'div.g'
		}).then(function(elements) {
			expect(elements.length).to.equal(11);
			next();
		});
	});
	
	this.When(/^M1 I search Google for "([^"]*)"$/, function(searchQuery, next) {

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

	this.Then(/^M1 I should see some results$/, function(next) {
		this.waitFor('div.g');
		this.driver.findElements({
			css : 'div.g'
		}).then(function(elements) {
			expect(elements.length).to.equal(10);
			next();
		});
	});

};