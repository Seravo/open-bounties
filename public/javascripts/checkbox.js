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