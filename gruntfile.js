/*
npm install --save-dev grunt grunt-postcss cssnano pixrem autoprefixer css-mqpacker grunt-contrib-sass grunt-contrib-uglify grunt-contrib-watch grunt-notify
*/
module.exports = function(grunt) {
    grunt.initConfig({

        // Sass
        sass: {
            dev:{
                options: {
                    style: 'expanded',
                    lineNumbers: true,
                    trace: true
                },
                files: [{
                    expand: true,
                    cwd: 'src/scss',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.min.css'
                }]
            }
        },

        // Post CSS
        postcss: {
            dev: {
                options: {
                    map:true,
                    processors: [
                        require('autoprefixer')({
                            browsers: ['last 4 versions', '> 1% in US']
                        }),
                        require('pixrem')({
                            rootValue: '16px'
                        }),
                        require('css-mqpacker')({
                            expand: true,
                            cwd: 'src/css/',
                            src: '*.css',
                            dest: 'dest/css/'
                        }),
                        require('cssnano')({
                            calc: false,
                            colorMin: false,
                            convertValues: false,
                            discardUnused: false,
                            zindex: false,
                            reduceIdents: false,
                            mergeIdents: false,
                            minifySelectors: false,
                            minifyFontValues: false,
                            normalizeUrl: false,
                            safe: true
                        })
                    ]
                },

                src: 'css/*.css'
            }
        },

        // Uglify
        uglify: {
            dev: {
                options: {
                    mangle: false,
                    compress: false,
                    preserveComments: 'all'
                },
                src: 'src/js/*.js',
                dest: 'js/main.js'
            },
            build: {
                src: 'src/js/*.js',
                dest: 'js/main.min.js',
                sourceMap: true,
                sourceMapIncludeSources: true
            }
        },

        // Notify
        notify: {
            styles: {
                options: {
                    message: 'CSS finished',
                }
            },
            scripts: {
                options: {
                    message: 'JS finished',
                }
            }
        },

        // Watch
        watch: {
            styles: {
                files: 'src/scss/**/*.scss',
                tasks: ['sass:dev', 'postcss:dev', 'notify:styles'],
                options: {
                    livereload: true
                }
            },
            scripts: {
                files: 'src/js/**/*.js',
                tasks: ['jshint', 'uglify:dev', 'notify:scripts'],
                options: {
                    livereload: true
                }
            },
            livereload: {
                files: [
                    'css/*.css',
                    'js/*.js',
                    '**/*.html'
                ],
                options: {
                    livereload: true
                }
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');

    // Register tasks
    grunt.registerTask('default', [
        'sass',
        'postcss',
        'uglify:dev'
    ]);

    grunt.registerTask('build', [
        'sass',
        'postcss',
        'uglify:build'
    ]);
};
