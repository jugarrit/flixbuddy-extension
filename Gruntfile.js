// Generated on 2015-10-01 using generator-chrome-extension 0.4.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

// Time how long tasks take. Can help when optimizing build times
require('time-grunt')(grunt);

// Automatically load required Grunt tasks
require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
});

// Configurable paths
var config = {
    app: 'app',
    src: 'src',
    dist: 'dist',
    srcScripts: '<%= config.src %>/js'
};

grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
        dev: {
            files: ['src/js/{,*/}*.js', 'src/stylesheets/{,*/}*.less', 'src/templates/*.tpl', 'Gruntfile.js'],
            tasks: ['browserify', 'less']
        }
    },

    // Empties folders to start fresh
    clean: {
        chrome: {
        },
        dist: {
            files: [{
                dot: true,
                src: [
                    '<%= config.dist %>/*',
                    '!<%= config.dist %>/.git*'
                ]
            }]
        }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
        options: {
            dest: '<%= config.dist %>'
        },
        html: [
            '<%= config.app %>/popup.html',
            '<%= config.app %>/options.html'
        ]
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
        options: {
            assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
        },
        html: ['<%= config.dist %>/{,*/}*.html'],
        css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minifies files in the dist folder
    imagemin: {
        dist: {
            files: [{
                expand: true,
                cwd: '<%= config.app %>/images',
                src: '{,*/}*.{gif,jpeg,jpg,png}',
                dest: '<%= config.dist %>/images'
            }]
        }
    },

    svgmin: {
        dist: {
            files: [{
                expand: true,
                cwd: '<%= config.app %>/images',
                src: '{,*/}*.svg',
                dest: '<%= config.dist %>/images'
            }]
        }
    },

    htmlmin: {
        dist: {
            files: [{
                expand: true,
                cwd: '<%= config.app %>',
                src: '*.html',
                dest: '<%= config.dist %>'
            }]
        }
    },

    // Copies remaining files to places other tasks can use
    copy: {
        dist: {
            files: [{
                expand: true,
                dot: true,
                cwd: '<%= config.app %>',
                dest: '<%= config.dist %>',
                src: [
                    '*.{ico,png,txt}',
                    'images/{,*/}*.{webp,gif}',
                    '{,*/}*.html',
                    'styles/{,*/}*.css',
                    'styles/fonts/{,*/}*.*',
                    '_locales/{,*/}*.json',
                    'scripts/{,*/}*.js',
                    'manifest.json'
                ]
            }]
        }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
        chrome: [],
        dist: [
            'imagemin',
            'svgmin'
        ],
        test: []
    },

    // Compress dist files to package
    compress: {
        dist: {
            options: {
                archive: function() {
                    var manifest = grunt.file.readJSON('app/manifest.json');
                    return 'package/flixbuddy-' + manifest.version + '.zip';
                }
            },
            files: [{
                expand: true,
                cwd: 'dist/',
                src: ['**/*'],
                dest: ''
            }]
        }
    },

    browserify: {
        popup: {
            files: {
                '<%= config.app %>/scripts/popup.js': ['src/js/popup.js']
            }
        },
        contentscript: {
            files: {
                '<%= config.app %>/scripts/contentscript.js': ['src/js/contentscript.js'],
            }
        },
        'sk-loader': {
            files: {
                '<%= config.app %>/scripts/sk-loader.js': ['src/js/sk-loader.js'],
            }
        },
        background: {
            files: {
                '<%= config.app %>/scripts/background.js': ['src/js/background.js']
            }
        },
        options: {
            external: 'libs/supportkit-js/dist/supportkit.min.js'
        }
    },

    less: {
        styles: {
            files: {
                'app/styles/main.css': 'src/stylesheets/main.less'
            }
        }
    }
});

grunt.registerTask('dev', function() {
    grunt.task.run([
        'browserify',
        'less',
        'watch'
    ]);
});

grunt.registerTask('build', [
    'clean:dist',
    'browserify',
    'less',
    'useminPrepare',
    'concurrent:dist',
    'copy',
    'usemin',
    'compress'
]);

grunt.registerTask('default', [
    'dev'
]);
};
