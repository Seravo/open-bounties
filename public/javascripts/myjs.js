
$(document).ready(function(){
   $("#myTable").tablesorter(); 
  $('#payment-form').validate({
  rules: {
      sum: {
      required: true,
      min: 5,
    },
    'tos-agreed': {
      required: true
    }
  },
  messages: {
    'tos-agreed': 'You need to agree to the Terms of Service',
     'sum' : 'Please donate at least €5.'
  },
  errorPlacement: function (error, input) {
    $(input).closest('.controls').append(error);
  },
  highlight: function(el) {
    $(el).closest('.control-group').addClass('error');
  },
  unhighlight: function(el) {
    $(el).closest('.control-group').removeClass('error');
  },

 });
  $('.close').click(function() {

   $('.alert').hide();

});
})

