function getBrowserHeight() {
var intH = 0;
var intW = 0;
 
if(typeof window.innerWidth == 'number' ) {
intH = window.innerHeight;
intW = window.innerWidth;
}
else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
intH = document.documentElement.clientHeight;
intW = document.documentElement.clientWidth;
}
else if(document.body && (document.body.clientWidth || document.body.clientHeight)) {
intH = document.body.clientHeight;
intW = document.body.clientWidth;
}
return { width: parseInt(intW), height: parseInt(intH) };
}
 
function setLayerPosition() {
var shadow = document.getElementById('shadow');
var question = document.getElementById('question');
 
var bws = getBrowserHeight();
shadow.style.width = bws.width + 'px';
shadow.style.height = bws.height + 'px';
question.style.left = parseInt((bws.width - 350) / 2)+ 'px';
question.style.top = parseInt((bws.height - 200) / 2)+ 'px';
shadow = null;
question = null;
}
 
function showLayer() {
setLayerPosition();
 
var shadow = document.getElementById('shadow');
var question = document.getElementById('question');
 
shadow.style.display = 'block';
question.style.display = 'block';
 
shadow = null;
question = null;
}
 
function hideLayer() {
var shadow = document.getElementById('shadow');
var question = document.getElementById('question');
 
shadow.style.display = 'none';
question.style.display = 'none';
 
shadow = null;
question = null;
}
 
window.onresize = setLayerPosition;

$("#donateModal").on('show', function() {
  // Fix StripeButton sizing bug on Firefox and IE
  $(".stripe-button-inner, .stripe-button-inner iframe").width(132).height(36);
  // ensure button scrolls with the rest of the page
  $(".stripe-button-inner iframe").css('position', 'relative');
});

// Stripe Button Triggers formDomElement.submit().
// We intercept it and notify user we have received the token
var paymentForm = $('#payment-form')[0];
paymentForm.original_submit = paymentForm.submit;
paymentForm.submit = function() {
  $("#stripe-button-holder .stripe-button-inner").html('<span class="label label-success"><i class="icon-ok"></i> Card Added</span>');
  return false;
};

$('#payment-form').validate({
  rules: {
    'first-name': {
      minlength: 1,
      required: true
    },
    'last-name': {
      minlength: 1,
      required: true
    },
    email: {
      required: true,
      email: true
    },
    amount: {
      required: true,
      min: 5,
    },
    'tos-agreed': {
      required: true
    }
  },
  messages: {
    'tos-agreed': 'You need to agree to the Terms of Service',
    'first-name': 'Please give us your first name',
    'last-name' : 'Please give us your last name',
    'email'     : 'Please give us your email so that we can contact you',
    'amount'    : 'Please pledge at least $10.'
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
  submitHandler: function(form) {
    // ensure CC info has been entered
    if (! $('[name=stripeToken]').val()) {
      $("#stripe-button-holder").closest('.control-group').addClass('error');
      $("#stripe-button-holder").append('<label class="error">Please Add Payment Information</span>')
    } else {
      form.original_submit();
    }
  }
});
