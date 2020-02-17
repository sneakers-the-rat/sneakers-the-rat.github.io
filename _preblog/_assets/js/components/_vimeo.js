function vimeoLoadingThumb(id) {
    var url = "http://vimeo.com/api/v2/video/" + id + ".json";

    // var img_src; 
    $.getJSON(url, function(data) {
        let img_src = data[0].thumbnail_large;
        $(vimeo_thumb).attr('src', img_src);
    })

    var id_img = "#vimeo-" + id;
    // var script = document.createElement( 'script' );
    // script.type = 'text/javascript';
    // script.src = url;

    let vimeo_thumb = $('<img class="video-thumb-img"></img>');
    let thumb_id = 'vimeo-thumb-' + id
    $(vimeo_thumb).attr('id', thumb_id);
    // $(vimeo_thumb).attr('src', img_src);
    debugger;

    $(id_img).append($(vimeo_thumb));
    $(id_img).append("<div class='play-overlay'></div>");
    // $(id_img).before(script);
}

// function showThumb(data){
//  console.log(data);
//     var id_img = "#vimeo-thumb-" + data[0].id;
//     $(id_img).attr('src',data[0].thumbnail_medium);
// }

// window.showThumb = showThumb;

// $(function() {
//  debugger;
$('.vimeo-vid').each(function() {
    // console.log($(this));
    let vidid = $(this).attr('vidid');
    $(this).attr('id', "vimeo-" + vidid);
    // let vimeo_thumb = $('this').append('<img />');
    // $(vimeo_thumb).attr('id', "#vimeo-" + vidid); 

    vimeoLoadingThumb(vidid);

})

$(function() {


    var time = 15;
    var scale = 1;

    var video_obj = null;

    // $('video').on('loadedmetadata', function() {
    //     this.currentTime = time;
    //     video_obj = this;

    // }, false);

    $('video').each(function() {

    
            var canvas = $("<canvas></canvas>");
            $(canvas).width($(this).videoWidth * scale);
            $(canvas).height($(this).videoHeight * scale);
            debugger;
            console.log($(this)[0]);
            $(canvas)[0].getContext('2d').drawImage($(this), 0, 0, canvas.width, canvas.height);

            var img = $("<img></img>");
            img.attr('src', $(canvas)[0].toDataURL());
            console.log($(canvas)[0].toDataURL())
            $('a[href="#' + $(this).attr('id') + '"]').append(img);
    });



    // video_obj.currentTime = 0;


});
// vimeoLoadingThumb(6271487);
// });

// export {showThumb};