module.exports = (grunt) ->
  
  "use strict"

  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    coffee:
      product:
        options:
          bare: true
        expand: true
        cwd: 'front_src/coffee'
        src: '*.coffee'
        dest: 'assets/js/'
        ext: '.js'

    sass:
      product:
        options:
          style: 'expanded'
        files:
          'assets/css/main.css':'front_src/sass/main.sass'

    watch:
      product:
        files: ["front_src/coffee/*.coffee", "front_src/sass/*.sass"]
        tasks: ["coffee:product", "sass:product"]

  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-sass"
  grunt.loadNpmTasks "grunt-contrib-watch"
  
  grunt.registerTask "default", ["coffee", "sass"]
