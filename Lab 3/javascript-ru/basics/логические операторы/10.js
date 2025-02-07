let userName = prompt("Who is there?", '');

if (userName === 'Admin') {

  let pass = prompt('Password?', '');

  if (pass === 'Head') {
    alert( 'Greetings!' );
  } else if (pass === '' || pass === null) {
    alert( 'Canceled' );
  } else {
    alert( 'Incorrect password' );
  }

} else if (userName === '' || userName === null) {
  alert( 'Canceled' );
} else {
  alert( "I dunno know u" );
}