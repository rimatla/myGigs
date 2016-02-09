/**
 * Created by acoelho on 2/2/16.
 */
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'client/client.js',
                dest: 'server/public/assets/scripts/client.min.js'
            }
        },
        sass: {
            dist: {
                files: {
                    'server/public/assets/styles/stylesheet.css':'server/public/assets/styles/main.scss'
                }
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "angular/angular.min.js",
                    "angular/angular.min.js.map",
                    "angular-route/angular-route.min.js",
                    "angular-route/angular-route.min.js.map",
                    "angular-cookies/angular-cookies.min.js",
                    "angular-cookies/angular-cookies.min.js.map",
                    "angular/angular-csp.css",
                    "bootstrap/dist/css/bootstrap.min.css",
                    "bootstrap/dist/css/bootstrap.min.css.map",
                    "bootstrap/*.*",
                    "bootstrap/**/*.*"
                ],

                "dest": "server/public/vendor/"
            }
        },
        watch: {
            css: {
                files: 'server/public/assets/styles/main.scss',
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            },
            scripts: {
                files: ['client/client.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'uglify', 'sass']);

};
