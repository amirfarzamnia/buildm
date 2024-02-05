/**
 * The `buildm` package empowers you to generate build files for your project.
 * This package facilitates the minification of JavaScript, HTML, and CSS files.
 * To get started, import the necessary modules:
 *
 * ```js
 * const { buildFolderAndFiles } = require('buildm');
 * ```
 *
 * For a detailed understanding of its functionality, refer to the package's GitHub page:
 *
 * @see [GitHub](https://github.com/amirfarzamnia/buildm)
 */

declare module 'buildm' {
    /** Options for building files. */
    interface BuildOptions {
        /** Should log the process of building files. */
        log?: boolean;
    }

    /** Configuration for building files. */
    interface BuildFileConfig {
        /** JavaScript configuration of the minified file based on uglifyjs package. */
        js?: object;
        /** CSS configuration of the minified file based on cleanCSS package. */
        css?: object;
        /** HTML configuration of the minified file based on html-minify package. */
        html?: object;
    }

    /** Configuration for building folders and files. */
    interface BuildConfig {
        /** Options of building files. */
        options?: BuildOptions;
        /** Configuration of build files. */
        files?: BuildFileConfig;
    }

    /**
     * This function is used to create build files from provided files.
     *
     * @param dir - The directory path.
     * @param config - Configuration for building folders and files.
     *
     * @example buildFolderAndFiles('public/index.html', { options: { log: false } });
     */

    export function buildFolderAndFiles(dir: string, config?: BuildConfig): void;
}