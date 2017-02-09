module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-screeps');

  grunt.initConfig({
    secrets: grunt.file.readJSON('secrets.json'),
    screeps: {
      options: {
        email: '<%= secrets.screeps.email %>',
        password: '<%= secrets.screeps.password %>',
        branch: 'default',
        ptr: false
      },
      dist: {
        src: ['src/*.js']
      }
    }
  });
}
