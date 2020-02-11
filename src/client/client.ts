import './client.scss';
import * as React from 'react';
import ReactDOM from 'react-dom'
import _ from 'lodash'
import AppContainer from './components/AppContainer';
console.table( _.entries( [`blah`] ) );
console.table( ['who'] );
ReactDOM.render( React.createElement( AppContainer ), document.getElementById( 'mount' ) )