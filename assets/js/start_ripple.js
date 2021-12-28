// $(document).ready(function() {
// 	$('#stripes').ripples({
// 			dropRadius: 30, 
// 			perturbance: 1
// 		});
// 	$('#stripes').ripples('pause');
// });

function toggleRipple(){
	let checkBox = document.getElementById("rippleswitch");

	if (checkBox.checked == true){
	  // $('#stripes').ripples('play');
	  $('#stripes').ripples({
			dropRadius: 30, 
			perturbance: 1
		});
	} else {
	  // $('#stripes').ripples('pause');
	  $('#stripes').ripples('destroy');
	}
}