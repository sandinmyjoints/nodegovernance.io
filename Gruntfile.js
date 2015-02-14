module.exports = function(grunt) {

  grunt.initConfig({
    aws: grunt.file.readJSON('local/aws.json'), // Read the file

    aws_s3: {
      options: {
        accessKeyId: '<%= aws.AWSAccessKeyId %>', // Use the variables
        secretAccessKey: '<%= aws.AWSSecretKey %>', // You can also use env variables
        uploadConcurrency: 5, // 5 simultaneous uploads
        downloadConcurrency: 5 // 5 simultaneous downloads
      },
      production: {
        options: {
          bucket: 'nodegovernance.io',
          params: {
            // ContentEncoding: 'gzip' // applies to all the files!
          }
        },
        files: [
          {
            expand: true,
            cwd: 'public/',
            src: ['*.html'],
            dest: '/',
            params: {CacheControl: '0'}
          },
          {
            expand: true,
            cwd: 'public/',
            src: ['**/*.js', '**/*.css'],
            dest: '/',
            params: {CacheControl: '60'}
          },
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-aws-s3');

};
