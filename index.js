$(window).on("load", function(){
    $('.cd-panel').removeClass('is-visible');
    $('.cd-panel').addClass('is-visible');

});
/*
$(window).bind('beforeunload', function(){
    $('.cd-panel').removeClass('is-visible');
});
*/


var vid = document.getElementById("bgvid"),
pauseButton = document.getElementById("vidpause");
if (window.matchMedia('(prefers-reduced-motion)').matches) {
    vid.removeAttribute("autoplay");
    vid.pause();
    pauseButton.innerHTML = "Paused";
}
