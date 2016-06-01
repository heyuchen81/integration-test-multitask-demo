'use strict';

var fs = require('fs');
var webdriver = require('selenium-webdriver');

var platform = process.env.PLATFORM || "CHROME";

var buildChromeDriver = function() {
	return new webdriver.Builder().withCapabilities(
			webdriver.Capabilities.chrome()).build();
};

var buildFirefoxDriver = function() {
	return new webdriver.Builder().withCapabilities(
			webdriver.Capabilities.firefox()).build();
};

var buildBsDriver_PC1 = function() {
	var capabilities = {
		'browserName' : 'IE',
		'browser_version' : '11.0',
		'os' : 'Windows',
		'os_version' : '10',
		'resolution' : '1920x1200',
		'browserstack.user' : process.env.USERNAME,
		'browserstack.key' : process.env.AUTOMATE_KEY,
		'browserstack.debug' : 'true'
	};
	return new webdriver.Builder().usingServer(
			'http://hub.browserstack.com/wd/hub')
			.withCapabilities(capabilities).build();
};

var buildBsDriver_M1 = function() {
	var capabilities = {
		'browserName' : 'iPhone',
		'platform' : 'MAC',
		'device' : 'iPhone 6S Plus',
		'browserstack.user' : process.env.USERNAME,
		'browserstack.key' : process.env.AUTOMATE_KEY,
		'browserstack.debug' : 'true'
	};
	return new webdriver.Builder().usingServer(
			'http://hub.browserstack.com/wd/hub')
			.withCapabilities(capabilities).build();
};

switch (platform) {
case 'FIREFOX':
	var driver = buildFirefoxDriver();
	break;
case 'CHROME':
	var driver = buildChromeDriver();
	break;
case 'BROWSERSTACK_PC1':
	var driver = buildBsDriver_PC1();
	break;
case 'BROWSERSTACK_M1':
	var driver = buildBsDriver_M1();
	break;
default:
	var driver = buildChromeDriver();
}

var getDriver = function() {
	return driver;
};

var World = function World() {

	var defaultTimeout = 20000;
	var screenshotPath = "screenshots";

	this.webdriver = webdriver;
	this.driver = driver;

	if (!fs.existsSync(screenshotPath)) {
		fs.mkdirSync(screenshotPath);
	}

	this.waitFor = function(cssLocator, timeout) {
		var waitTimeout = timeout || defaultTimeout;
		return driver.wait(function() {
			return driver.isElementPresent({
				css : cssLocator
			});
		}, waitTimeout);
	};
};

module.exports.World = World;
module.exports.getDriver = getDriver;
