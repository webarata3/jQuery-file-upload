module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    dirs:
      root: 'src/main'
      webapp: '<%= dirs.root %>/webapp'
      src: '<%= dirs.webapp %>/src'
      js: '<%= dirs.webapp %>/js'

    connect:
      server:
        options:
          port: 8000
          hostname: '*'
    browserify:
      sample1:
        files:
          '<%= dirs.js %>/jquery.file-upload.sample1.js': [
            '<%= dirs.src %>/jquery.file-upload.js'
            '<%= dirs.src %>/sample1.js'
          ]
      sample2:
        files:
          '<%= dirs.js %>/jquery.file-upload.sample2.js': [
            '<%= dirs.src %>/jquery.file-upload.js'
            '<%= dirs.src %>/sample2.js'
          ]
    uglify:
      product:
        files:
          '<%= dirs.js %>/jquery.file-upload.min.js': '<%= dirs.src %>/jquery.file-upload.js'
        options:
          preserveComments: 'some'
          sourceMap: true
          sourceMapName: '<%= dirs.js %>/jquery.file-upload.min.js.map'
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
      sample1:
        files:
          '<%= dirs.js %>/jquery.file-upload.sample1.min.js': '<%= dirs.js %>/jquery.file-upload.sample1.js'
        options:
          preserveComments: 'some'
          sourceMap: true
          sourceMapName: '<%= dirs.js %>/jquery.file-upload.sample1.min.js.map'
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
      sample2:
        files:
          '<%= dirs.js %>/jquery.file-upload.sample2.min.js': '<%= dirs.js %>/jquery.file-upload.sample2.js'
        options:
          preserveComments: 'some'
          sourceMap: true
          sourceMapName: '<%= dirs.js %>/jquery.file-upload.sample2.min.js.map'
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
    watch:
      scripts:
        files: ['<%= dirs.src %>/*.js']
        tasks: ['dev']
        options:
          interrupt: true
    clean:
      all: [
        'node_modules'
        '<%= dirs.js %>'
      ]
      dev: [
        '<%= dirs.js %>'
      ]

  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('default', ['uglify:product'])
  grunt.registerTask('sample1', ['browserify:sample1', 'uglify:sample1'])
  grunt.registerTask('sample2', ['browserify:sample2', 'uglify:sample2'])
