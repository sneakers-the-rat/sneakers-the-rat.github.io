import $ from 'jquery';

function highlight_container(parent){
	$(parent).addClass('highlight-small');

	let button = $('<button class="highlight-button">Expand/Collapse Code</button>');
	$(button).on("click", function(){
		let fig = $(this).next('figure');
		$(fig).toggleClass('highlight-small')
	})

	$(parent).before(button);




}




module.exports = {
	highlight_container
}