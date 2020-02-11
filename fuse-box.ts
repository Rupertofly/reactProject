import { FuseBox, CSSPlugin, SassPlugin } from 'fuse-box';

const fuse = FuseBox.init( {
  homeDir: 'src/client',
  output: 'dist/$name.js',
  target: 'browser', plugins: [[SassPlugin( { importer: true } ), CSSPlugin( { group: 'dist/client.css', outFile: 'dist/client.css' } )]]
}
)
fuse.dev()
fuse.bundle( 'client' ).watch().hmr().instructions( '> client.ts' );
fuse.run();