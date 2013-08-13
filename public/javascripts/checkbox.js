$("tr").hover(function() {
	$(this).toggleClass("success");
})

$("tr").click(function() {
	$("tr").removeClass();
	$(this).toggleClass("error");
	var id = $(this).find("#rowId").text();
	$('.idInput').attr('value', id);
	$('#deleteButton').attr('disabled', false);
})



// $('.hours').click(function() {
// 	var hours = this.value;
// 	$('.inputHours').attr('value', hours);
// 	//alert(this.value);
// })


// $('#claimButton').attr('disabled', true)
// if (req.bug.bountyStatus === 'IN PROGRESS') alert('asdsa')