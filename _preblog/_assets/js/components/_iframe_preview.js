function iframePreview(href, parent){    
    
    // var id_img = "#iframe-preview-" + id;


    let iframe_preview = $('<iframe class="iframe-preview-child"></img>');
    $(iframe_preview).attr('src', href);
    // $(vimeo_thumb).attr('src', img_src);
    debugger;
    
    $(parent).append($(iframe_preview));
    $(parent).append("<div class='fullscreen-overlay'></div>");
    // $(id_img).before(script);
}

// function showThumb(data){
// 	console.log(data);
//     var id_img = "#vimeo-thumb-" + data[0].id;
//     $(id_img).attr('src',data[0].thumbnail_medium);
// }

// window.showThumb = showThumb;

// $(function() {
// 	debugger;
	$('.iframe-preview').each(function(){
		// console.log($(this));
		let vidid = $(this).attr('href');
		// $(this).attr('id', "vimeo-" + vidid); 
		// let vimeo_thumb = $('this').append('<img />');
		// $(vimeo_thumb).attr('id', "#vimeo-" + vidid); 
		
		iframePreview(vidid, this);

	})