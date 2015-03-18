$(function(){
	var $menu, $menuVisible, $nav, animateMenu, $quotes, $signupForm, $careerForm;

    $slider = $(".slider");
    $menu = $(".menu");
    $menuVisible = false;
    $nav = $(".nav");
    $quotes = $(".quote-blocks");
    $signupForm = $(".signup-form");
    $careerForm = $(".career-form");

    $menu.on('click', function(){
    	if ($menuVisible === false) {
    		$(this).addClass('active');
    		animateMenu.play();
    	} else {
    		$(this).removeClass('active');
    		animateMenu.reverse();
    	}

    	$menuVisible = !$menuVisible;
    });

    var animateM = function(){
    	if ( $nav.css('display') == 'none') {
    		var  animateMenu = new TimelineMax({paused: true});
		    animateMenu.set($nav, {className: "+=nav-active"});
		    animateMenu.fromTo($nav, 1, {y: "-200%", force3D: true}, {y: "0%", ease: Power4.easeOut});

		    return animateMenu;
    	} else {
    		return "";
    	}
    };

     /** 
    * Make menu animatable on tablet and mobile screen
    * Display value from CSS styling
    **/

   animateMenu = animateM();

   $(window).on('resize', function(){
   		animateMenu = animateM();
   });
  
  if ($quotes.length > 0) {
    $quotes.packery({
        itemSelector: '.item',
        gutter: 0
      });
  }

  if ($(".gallery").length > 0) {
    $(".gallery").royalSlider({
        fullscreen: {
              enabled: true,
              nativeFS: true
            },
        keyboardNavEnabled: true,
        autoScaleSlider: true, 
        autoScaleSliderWidth: 1200,     
        autoScaleSliderHeight: 600,
        imageScaleMode: 'fit-if-smaller',
        numImagesToPreload:6,
        imageAlignCenter: true,
        imageScalePadding: 0,
        controlNavigation: 'thumbnails',
        fadeinLoadedSlide: true,
        autoHeight: false,
        globalCaption: true,

        thumbs: {
            spacing: 5,
            //arrowsAutoHide: true
            fitInViewport: false,
            paddingBottom: 4,
            appendSpan: true,
            firstMargin: true,
        }
    });
  }

  if ($signupForm.length > 0) {
    $signupForm.validate({
        errorElement: 'p',
        messages: {
            'fields[email]': {
                required: 'Please enter a valid email address'
            },
            'fields[firstName]': {
                required: 'Please enter your first name',
                minlength: 'Please enter a valid first name'
            },
            'fields[lastName]': {
                required: 'Please enter your last name',
                 minlength: 'Please enter a valid last name'
            }
        }
      });
  }
  if ($careerForm.length > 0) {
    $careerForm.validate({
        errorElement: 'p',
        messages: {
            'fields[email]': {
                required: 'Please enter a valid email address'
            },
            'fields[firstName]': {
                required: 'Please enter your first name',
                minlength: 'Please enter a valid first name'
            },
            'fields[lastName]': {
                required: 'Please enter your last name',
                 minlength: 'Please enter a valid last name'
            }
        }
      });
  }
});

$(window).load(function(){
    var slider;

    $slider = $('.slider');

    try {
        $slider.cycle({
            speed: 600,
            manualSpeed: 300,
            delay: 5,
            fx: 'fade',
            swipe: true,
            pager: '.slider-pager',
            autoHeight: "calc",
            pauseOnHover: true
        });
    } catch (e) {
        console.log(e);
    }

   if ($slider.length > 0)  $slider.animate({height: $slider.get(0).scrollHeight}, 1000);
});