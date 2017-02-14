module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-screeps');
  grunt.loadNpmTasks('grunt-shell');

  grunt.initConfig({
    secrets: grunt.file.readJSON('secrets.json'),
    shell: {
      gitBranch: {
        command: 'git rev-parse --abbrev-ref HEAD',
        options: {
          callback: function(err, stdout, stderr, cb) {
            gitBranch = stdout.trim();

            if (gitBranch == 'master') {
              grunt.config.set('gitBranch', 'default');
            } else {
              grunt.config.set('gitBranch', gitBranch);
            }

            cb();
          },
          stdout: false
        }
      }
    },
    screeps: {
      options: {
        email: '<%= secrets.screeps.email %>',
        password: '<%= secrets.screeps.password %>',
        branch: '<%= gitBranch %>',
        ptr: false
      },
      dist: {
        src: ['src/*.js']
      }
    }
  });

  grunt.registerTask('default', ['shell', 'screeps']);
}
