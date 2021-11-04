require('esbuild')
  .build({
    entryPoints: ['server/src/index.ts'],
    outfile: 'server/www/index.js',
    bundle: true,
    // format: 'cjs',
    platform: 'node',
    external: [
      'internal-ip',
      'mongodb-client-encryption',
      'http',
      'hiredis',
      'fsevents',
    ],
    watch: {
      onRebuild(error, result) {
        if (error) console.log('watch build failed:', error)
        else console.log('watch build succeeded:', result)
      },
    },
  })
  .then(({ errors, warnings, stop }) => {
    // Call "stop" on the result when you're done
    // console.log('result...', errors)
    // stop()
  })
