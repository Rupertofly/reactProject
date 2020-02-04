const abs = { a: 'server' };
const cc = { ...abs, kyle: 'james' }
console.table( [`This is a Table`, `it is on my ${cc.a}`] );
throw new Error( 'wil it work' );
