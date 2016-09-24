module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'css/materialize.css' : 'sass/materialize.scss',
					'css/core.css' : 'sass/core.scss',
					'css/lato_fonts.css' : 'sass/lato_fonts.scss',
					'css/passion_one_fonts.css' : 'sass/passion_one_fonts.scss',
					'css/material_icon_fonts.css' : 'sass/material_icon_fonts.scss'
				}
			}
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default',['watch']);
}
