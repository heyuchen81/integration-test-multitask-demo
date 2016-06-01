'use strict';

var path = require('path');

module.exports = function(grunt) {

	grunt.initConfig({

		tag_chrome : '@C',
		tag_firefox : '@F',
		tag_android : '@F,@C',
		tag_bs_pc1 : '@F',
		tag_bs_m1 : '@F',
	
		env : {
			chrome : {
				PLATFORM : 'CHROME'
			},
			firefox : {
				PLATFORM : 'FIREFOX'
			},
			android : {
				PLATFORM : 'ANDROID'
			},
			bs_pc1 : {
				PLATFORM : 'BROWSERSTACK_PC1'
			},
			bs_m1 : {
				PLATFORM : 'BROWSERSTACK_M1'
			}
		},
	
		jshint : {
			all : [ 'Gruntfile.js', 'features/step_definitions/*.js', 'features/support/*.js' ],
			options : {
				node : true,
				strict : true,
				globalstrict : true
			}
		},
	
		exec : {
			run_chrome : {
				command : 'node ' + path.join('node_modules', 'cucumber', 'bin', 'cucumber.js -f pretty --tags <%= tag_chrome %>')
			},
			run_firefox : {
				command : 'node ' + path.join('node_modules', 'cucumber', 'bin', 'cucumber.js -f pretty --tags <%= tag_firefox %>')
			},
			run_android : {
				command : 'node ' + path.join('node_modules', 'cucumber', 'bin', 'cucumber.js -f pretty --tags <%= tag_android %>')
			},
			run_bs_pc1 : {
				command : 'node ' + path.join('node_modules', 'cucumber', 'bin', 'cucumber.js -f pretty --tags <%= tag_bs_pc1 %>')
			},
			run_bs_m1 : {
				command : 'node ' + path.join('node_modules', 'cucumber', 'bin', 'cucumber.js -f pretty --tags <%= tag_bs_m1 %>')
			},
			run_help : {
				command : 'node ' + path.join('node_modules', 'cucumber', 'bin', '--help')
			},
		}
	
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-env');

	grunt.registerTask('default', [ 'jshint', 'exec:run_help' ]);
	grunt.registerTask('chrome', [ 'env:chrome', 'jshint', 'exec:run_chrome' ]);
	grunt.registerTask('firefox', [ 'env:firefox', 'jshint', 'exec:run_firefox' ]);
	grunt.registerTask('android', [ 'env:android', 'jshint', 'exec:run_android' ]);
	grunt.registerTask('bs_pc1', [ 'env:bs_pc1', 'jshint', 'exec:run_bs_pc1' ]);
	grunt.registerTask('bs_m1', [ 'env:bs_m1', 'jshint', 'exec:run_bs_m1' ]);
	
};
