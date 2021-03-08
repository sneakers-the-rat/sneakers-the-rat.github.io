let toc_is_big = null;

if ($('.post-toc').length > 0) {
    var last_toc_highlight = 0;
    $(function() {
        $(window).scroll(function() {
            console.log($(".toc-container").css('width'));
            if ($(".toc-container").css('width') < $(window).width()/2) {
                if (toc_is_big === true){
                    $('.toc-h1').children('ul').removeClass('toc-visible');
                    toc_is_big = false;            
                }
                $("#markdown :header:not(.no_toc)").each(function() {
                    // console.log($(this).offset().top);

                    if ($(window).scrollTop() >= $(this).offset().top - ($(window).height() / 3)) {

                        var id = $(this).attr('id');
                        var toc_link = $('.toc-entry a[href="#' + id + '"]');
                        var toc_entry = $(toc_link).parent()
                        if ($(toc_entry).hasClass('toc-h1')) {

                            if (!$(toc_entry).children('ul').hasClass('toc-visible')) {
                                $('.toc-h1').children('ul').not($(toc_entry).children('ul')).removeClass('toc-visible');
                                $(toc_entry).children('ul').addClass('toc-visible');


                            } else {
                                $('.toc-h1').children('ul').not($(toc_entry).children('ul')).removeClass('toc-visible');
                                
                            }



                        }


                        $('.toc-entry a').not($(toc_link)).removeClass('toc-active');
                        $(toc_link).addClass('toc-active');
                    }
                });
            } else {
                if (!(toc_is_big === true)){
                $('.toc-h1').children('ul').addClass('toc-visible');
                toc_is_big = true
            }

            };
        });
    });
};