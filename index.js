#!/usr/bin/env node

const defaultConfig = require('./config.json');
const HTMLMinifier = require('html-minifier');
const CleanCSS = require('clean-css');
const UglifyJS = require('uglify-js');
const yargs = require('yargs');
const path = require('path');
const fs = require('fs');

// Parse command line arguments using yargs
const { build } = yargs.example('$0 --build public src/index.js', 'Build files in the specified directories').usage('Usage: $0 [options]').option('build', {
    alias: 'b',
    describe: 'Directories to build',
    type: 'array'
}).argv;

// If the 'build' option is provided, initiate the build process
if (build) {
    console.time('Process Duration');

    // Print file and folder counts
    console.log();
    console.log('>---------------------------<');
    console.log('> Total Files:', build.filter((item) => item.endsWith('.')).length);
    console.log('> Total Folders:', build.filter((item) => !item.endsWith('.')).length);
    console.log('>---------------------------<');
    console.log();

    // Iterate through each directory provided in the 'build' option and initiate the build
    build.forEach(buildFolderAndFiles);

    console.log()

    console.timeEnd('Process Duration');
}

// Function to build files in a given directory
function buildFolderAndFiles(dir, config = {}) {
    // Check if the file/folder exists
    if (!fs.existsSync(dir)) {
        return console.log('\n\x1b[1m\x1b[33mFile/Folder doesn\'t exist:\x1b[0m', dir);
    }

    // If it's a directory, recursively build its contents
    if (fs.statSync(dir).isDirectory()) {
        return fs.readdirSync(dir).forEach((file) => buildFolderAndFiles(path.join(dir, file), config));
    }

    // Read file content, determine file format, and get configuration
    const content = fs.readFileSync(dir, 'utf8');
    const format = path.extname(dir).split('.')[1];
    const conf = config.files?.[format] ?? defaultConfig.build.files[format];

    // Define handlers for different file formats
    const handler = {
        js: () => {
            const { code, error } = UglifyJS.minify(content, conf);

            if (error) {
                fileError(error);
            } else {
                return code;
            }
        },
        css: () => {
            const { styles, errors } = new CleanCSS(conf).minify(content);

            if (errors.length > 0) {
                errors.forEach(fileError);
            } else {
                return styles;
            }
        },
        html: () => {
            try {
                return HTMLMinifier.minify(content, conf);
            } catch (error) {
                fileError(error);
            }
        }
    }[format];

    // If a handler is available for the format, process the file
    if (handler) {
        fs.writeFileSync(dir, handler() || content, 'utf8');

        // Log information about the file processing if specified in the configuration
        if (config.options?.log ?? defaultConfig.build.options.log) {
            console.log('\x1b[' + {
                js: '33',
                css: '36',
                html: '35'
            }[format] + 'm>\x1b[0m', path.basename(dir) + '\x1b[0m');
        }
    }

    // Function to handle errors during file processing
    function fileError(error) {
        console.log('Error in processing', dir + ':', error);
    }
}

// Export the buildFolderAndFiles function for external use
module.exports = {
    buildFolderAndFiles
};