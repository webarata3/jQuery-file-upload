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
      dev:
        files:
          '<%= dirs.js %>/jquery.file-upload.dev.js': [
            '<%= dirs.src %>/jquery.file-upload.js'
            '<%= dirs.src %>/dev.js'
          ]
    uglify:
      product:
        files:
          '<%= dirs.js %>/jquery.file-upload.min.js': '<%= dirs.src %>/jquery.file-upload.js'
        options:
          preserveComments: 'some'
          sourceMap: true
          sourceMapName: '<%= dirs.js %>/jquery.file-upload.min.js.map'
#          sourceMapIncludeSources: true
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
      dev:
        files:
          '<%= dirs.js %>/jquery.file-upload.dev.min.js': '<%= dirs.js %>/jquery.file-upload.dev.js'
        options:
          preserveComments: 'some'
          sourceMap: true
          sourceMapName: '<%= dirs.js %>/jquery.file-upload.dev.min.js.map'
#          sourceMapIncludeSources: true
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
  grunt.registerTask('dev', ['browserify:dev', 'uglify:dev'])
