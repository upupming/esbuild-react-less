/* eslint-disable no-console */
const fse = require('fs-extra')
const args = require('minimist')(process.argv.slice(2))
const { lessLoader } = require('esbuild-plugin-less')

const isWatch = args.watch || args.w

// Following the log format of https://github.com/connor4312/esbuild-problem-matchers
const status = (msg) => console.log(`${isWatch ? '[watch] ' : ''}${msg}`)

let buildStartTime
/** @type {import('esbuild').Plugin} */
const watchPlugin = {
    name: 'watcher',
    setup(build) {
        build.onStart(() => {
            buildStartTime = Date.now()
            status('build started.')
        })
        build.onEnd((result) => {
            result.errors.forEach((error) =>
                console.error(
                    `> ${error.location.file}:${error.location.line}:${error.location.column}: error: ${error.text}`
                )
            )
            status(`build finished in ${Date.now() - buildStartTime} ms.`)
        })
    }
}

const outdir = './dist'
// clean old built files
fse.rmdirSync(outdir, { recursive: true })

require('esbuild').build({
    entryPoints: ['src/index.tsx'],
    outdir,
    bundle: true,
    // minify: true,
    sourcemap: true,
    target: ['chrome58'],
    plugins: [lessLoader(), watchPlugin],
    watch: isWatch,
    // publicPath: 'https://www.example.com/v1',
    loader: {
        '.js': 'jsx',
        '.png': 'file',
        '.jpg': 'file',
        '.svg': 'file'
    },
}).catch(() => {
    process.exit(1)
})


// copy files in the public folder
fse.copySync(
    'public',
    outdir,
    {
        overwrite: true
    }
)
