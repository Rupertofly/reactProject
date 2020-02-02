const { FuseBox, WebIndexPlugin } = require('fuse-box');
const fuse = FuseBox.init({
  homeDir: 'src',
  target: 'browser',
  output: './dist/$name.js',
  sourceMaps: true,
  plugins: [
    WebIndexPlugin({ template: './src/index.html' }),
  ],
});
fuse.dev({ port: 8080 });
fuse
  .bundle('app')
  .instructions('> index.ts')
  .watch();
fuse.run();
