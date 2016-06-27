$(document).ready(function(){

  //scroll
  $("#button-contact").on("click",function(event){
    event.preventDefault();
    var id = $(this).attr("href"),
      top = $(id).offset().top;
    $("body,html").animate({scrollTop: top},1000);
    return false;
  });
  $(window).scroll(function(){
    if($(this).scrollTop() > 200){
      $("#up").fadeIn();
    }else $("#up").fadeOut();
  });
  $("#up").click(function(){
    $("html,body").animate({ scrollTop: 0}, 1000);
    return false;
  });

  //slider
  $(function () {
	var elWrap = $('#slider'),
		el =  elWrap.find('img'),
		indexImg = 1,
		indexMax = el.length;

	function change () {
		el.fadeOut(500);
		el.filter(':nth-child('+indexImg+')').fadeIn(500);
	}

	function autoCange () {
		indexImg++;
		if(indexImg > indexMax) {
			indexImg = 1;
		}
		change ();
	}
	var interval = setInterval(autoCange, 5000);

	elWrap.mouseover(function() {
		clearInterval(interval);
	});
	elWrap.mouseout(function() {
		interval = setInterval(autoCange, 5000);
	});

	elWrap.append('<span class="next"></span><span class="prev"></span>');

	$('span.next').click(function() {
		indexImg++;
		if(indexImg > indexMax) {
			indexImg = 1;
		}
		change ();
	});
	$('span.prev').click(function() {
		indexImg--;
		if(indexImg < 1) {
			indexImg = indexMax;
		}
		change ();
  	});
  });

  //form
  $('.contacts-form').on('submit', function (e) {
    e.preventDefault();
    var name = e.target.elements.name.value;
    var number = e.target.elements.number.value;
    $.ajax({
        url: 'https://formspree.io/zabor-stroi1@yandex.ru',
        method: 'POST',
        data: {name:name,
              number: number},
        dataType: 'json',
        complete: function(){
          $('.form-thank').css('display','block');
          $('.form-background').css('display','block');
          setTimeout(function(){
            $('.form-thank').css('display','none');
            $('.form-background').css('display','none');
          },4000)
        }
    });

    e.target.elements.name.value = '';
    e.target.elements.number.value = '';
  });

})
