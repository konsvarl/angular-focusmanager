module.exports = function (grunt) {

    var tasks = [
        'jshint',
        'ngAnnotate',
        'replace',
        'uglify',
        'copy'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*\n' +
            '* <%= pkg.name %> <%= pkg.version %>\n' +
            '* Obogo (c) ' + new Date().getFullYear() + '\n' +
            '* https://github.com/obogo/<%= pkg.filename %>\n' +
            '* License: MIT.\n' +
            '*/\n',
        jshint: {
            // define the files to lint
            files: ['src/**/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    loopfunc: false
                }
            }
        },
        copy: {
            build: {
                files: [
                    { expand: true, cwd: 'src/styles', src: ['*.css'], dest: 'build/css' }
                ]
            }
        },
        ngAnnotate: {
            build: {
                files: {
                    './build/<%= pkg.filename %>.js': [
                        'src/consts.js',
                        'src/**/*.js'
                    ]
                }
            }
        },
        replace: {
            "build": {
                options: {
                    patterns: [
                        {
                            match: 'moduleName',
                            replacement: '<%= pkg.packageName %>'
                        }
                    ]
                },
                files: [
                    {
                        src: ['./build/<%= pkg.filename %>.js'],
                        dest: './build/<%= pkg.filename %>.js'
                    },
                    {
                        src: ['./build/<%= pkg.filename %>.min.js'],
                        dest: './build/<%= pkg.filename %>.min.js'
                    }
                ]
            }
        },
        uglify: {
            build: {
                options: {
                    mangle: false,
                    compress: false,
                    preserveComments: 'some',
                    beautify: true,
                    exportAll: true,
                    banner: '<%= banner %>',
                    wrap: '<%= pkg.packageName %>'
                },
                files: {
                    './build/<%= pkg.filename %>.js': ['./build/<%= pkg.filename %>.js']
                }
            },
            build_min: {
                options: {
                    report: 'gzip',
                    wrap: '<%= pkg.packageName %>',
                    banner: '<%= banner %>'
                },
                files: {
                    './build/<%= pkg.filename %>.min.js': ['./build/<%= pkg.filename %>.js']
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-replace');

    grunt.registerTask('default', tasks);

};