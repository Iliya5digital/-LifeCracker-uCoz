
$(document).ready(function(){
	
	/* ====================== BUILDING ====================== */
	
	$('body').append('<div class="overlay"></div><div class="mobile-menu" id="mobile-menu"></div><div class="mobile-menu-close"><span class="fal fa-times"></span></div><div id="scrolltop"><span class="fal fa-long-arrow-up"></span></div>');
	$('.js-this-in-mobile-menu').each(function() {
		$(this).clone().prependTo('#mobile-menu');
	});	
	
	/* ====================== EVENTS ====================== */

	$(document).on('click','.js-show-search',function(){
		$('.header__search').slideToggle(200);
		$(this).find('.fal').toggleClass('fa-search fa-times');
	})
	.on('click','.js-show-login',function(){
		$('.overlay, .login').fadeIn(200);
		$('body').addClass('modal-is-opened');
		return false;
	})
	.on('click','.mobile-menu .submenu > a',function(){
		$(this).parent().find('.nav__list-hidden').slideToggle(200);
		$(this).parent().siblings().find('.nav__list-hidden').slideUp(200);
		$(this).closest('.nav__list').siblings().find('.nav__list-hidden').slideUp(200);
		return false;
	});	
	
	$(document).on('click','.pagination__btn-loader a',function(){
		var urlNext = $(this).attr('href'), scrollNext = $(this).offset().top;
        if (urlNext !== undefined) {
			$.ajax({
				url: urlNext,
				beforeSend: function() { ShowLoading('<p class="bolder">Загрузка.</p> Пожалуйста, подождите.'); },			 
                success: function(data) {
                    $('#pagination').remove(); $('#dle-content').append($('#dle-content', data).html());
                    window.history.pushState("", "", urlNext);
					$('html, body').animate({scrollTop:scrollNext}, 800);	
					$('.pagination__btn-loader span').text('Больше нет новостей');
					HideLoading(''); setTimeout(function() { $(window).lazyLoadXT(); }, 300);
                },
				  error: function() { HideLoading(''); alert('что-то пошло не так'); }
			});
		};
		return false;
	});

	
	$(".js-show-comments").click(function(){
		$('html, body').animate({scrollTop:$('.page__comments').offset().top -20}, 800);
	});

	$(".js-show-mobile-menu").click(function(){
		$('.overlay').fadeIn(200);
		$('#mobile-menu, .mobile-menu-close').addClass('is-active');
		$('body').addClass('mobile-menu-is-opened');
	});
	$(document).on('click','.overlay, .login__close, .mobile-menu-close',function(){
		$('.overlay, .login').fadeOut(200);
		$('#mobile-menu, .mobile-menu-close').removeClass('is-active');
		$('body').removeClass('modal-is-opened mobile-menu-is-opened');
	});
	
	/* ====================== DLE SCRIPTS ====================== */

	$(document).on('click','.ac-form__editor textarea, .fr-wrapper, .ac-form',function(){
		$('.ac-form').addClass('is-active');
	});
    $('#dle-content > #dle-ajax-comments').appendTo($('#page__comments-list')); 
	$('.login__social-btns a').on('click',function(){
	   	var href = $(this).attr('href'), width  = 820, height = 420, 
	   		left   = (screen.width  - width)/2, top   = (screen.height - height)/2-100;   
		auth_window = window.open(href, 'auth_window', "width="+width+",height="+height+",top="+top+",left="+left+"menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no");
       	return false;
	}); 
	$('.js-comm-author').each(function(){
        var a = $(this), b = a.closest('.js-comm'), c = a.text().substr(0,1), 
            f = b.find('.js-comm-avatar'), e = f.children('img').attr('src'),
			d = ["#c57c3b","#753bc5","#79c53b","#eb3b5a","#45aaf2","#2bcbba","#778ca3"], rand = Math.floor(Math.random() * d.length);
		if (e == '/templates/'+dle_skin+'/dleimages/noavatar.png') {
            f.html('<div class="comment-item__letter d-flex jc-center ai-center" style="background-color:'+d[rand]+'">'+c+'</div>');
		};
    });	
	var gotop = $('#scrolltop'); 
	$(window).scroll (function () {
		if ( $(this).scrollTop () > 300 ) { gotop.fadeIn(200); } 
		else { gotop.fadeOut(200); }
	});	
	gotop.click(function(){
		$('html, body').animate({ scrollTop : 0 }, 'slow');
	});
});

/* END */