// https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp
/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  let header = document.getElementsByClassName("header")[0]
  if (prevScrollpos > currentScrollPos) {
    header.style.top = "0";
  } else {
  	console.log( header.offsetHeight * -1);
    header.style.top = header.offsetHeight * -1 + "px";
  }
  prevScrollpos = currentScrollPos;
} 