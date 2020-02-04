import * as express from 'express';
import * as http from 'http';
import { isDevelopment } from './settings';

/* ---------------------------------- */
/* SETUP                              */
/* ---------------------------------- */

const app = express();
const server = new http.Server( app );

/* config --------------------------- */

app.set( 'view engine', 'pug' )
app.use( express.static( "public" ) );
const useExternalStyles = !isDevelopment;
const scriptRoot = isDevelopment ? 'http://localhost:8080' : '/build'
app.get( '*', ( req, res ) => {

  res.render( 'index', {
    useExternalStyles, scriptRoot
  } )

} )

/* ---------------------------------- */
/* STARTUP                            */
/* ---------------------------------- */

const port = process.env.PORT ?? 3000;
server.listen( port, () => {

  console.log( `started http server on ${port}` );

} )