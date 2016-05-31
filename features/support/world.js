'use strict';

var fs = require('fs');
var webdriver = require('selenium-webdriver');


var platform = process.env.PLATFORM || "CHROME";

var buildAndroidDriver = function() {
	return new webdriver.Builder() //.usingServer('http://localhost:4723/wd/hub')
			.withCapabilities({
				platformName : 'Android',
				platformVersion : '4.4',
				deviceName : 'Android Emulator',
				browserName : 'Chrome'
			}).build();
};

var buildChromeDriver = function() {
	return new webdriver.Builder().withCapabilities(
			webdriver.Capabilities.chrome()).build();
};

var buildFirefoxDriver = function() {
	return new webdriver.Builder().withCapabilities(
			webdriver.Capabilities.firefox()).build();
};

var buildBrowserStackDriver = function() {

	var capabilities = {
//		'browserName' : 'IE',
//		'browser_version' : '8.0',
//		'os' : 'Windows',
//		'os_version' : '7',
//		'resolution' : '1024x768',
			
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
case 'ANDROID':
	var driver = buildAndroidDriver();
	break;
case 'FIREFOX':
	var driver = buildFirefoxDriver();
	break;
case 'CHROME':
	var driver = buildChromeDriver();
	break;
default:
	var driver = buildBrowserStackDriver();
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
