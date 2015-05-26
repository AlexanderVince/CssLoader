module.exports = function(grunt) {

	'use strict';

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		jshint : {
			options : {
				jshintrc : '.jshintrc'
			},
			all : ['src/**/*.js', 'Gruntfile.js']
		},

		connect : {
			server : {
				options : {
					hostname : '*',
					port : 3000,
					keepalive : true
				}
			}
		},

		uglify : {
			all : {
				options : {
					banner : '<%= pkg.banner %>'
				},
				files : {
					'build/cssloader-min.js' : ['src/cssloader.js']
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('dev', ['jshint', 'connect']);
	grunt.registerTask('build', ['jshint', 'uglify']);

};