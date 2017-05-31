module.exports = function(grunt){

    'use strict';

    require('load-grunt-tasks')(grunt); 

    grunt.initConfig({

            pkg: grunt.file.readJSON('package.json'),
            jshint:{
                options:{
                    jshintrc:'.jshintrc',
                    reporter:require('jshint-stylish')
                },
                all:{
                    src:['Gruntfile.js','js/{,*/}*.js']
                }
            },
            sass: {
                dist: {
                    files: [{
                        //'assets/css/test.css' : 'scss/partials/test.scss'
                        expand: true,
                        cwd : 'app/assets/scss',
                        src : '**/*.scss',
                        dest : 'app/assets/css/',
                        ext : '.component.css',
                        extDot : 'first'
                    }]
                }
            }
    });
    
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass']);

};