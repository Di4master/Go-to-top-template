// navMobile

let navMobile = $('.nav-mobile');

$('.menu-button').click(function(){
    if ( !navMobile.hasClass('nav-mobile--active') ) {
        navMobile.scrollTop(0);
    }
    $(this).toggleClass('menu-button--active');
    navMobile.toggleClass('nav-mobile--active');
});

// slider

let slideContainer = $('.slider__container');
let interval = 5000;
let slides = $('.slider__item');
let slideNext = $('.slider__next-item');
let slidePrev = $('.slider__prev-item');
let slideNav = $('.slider__nav');
let total = slides.length;
let slideDot;
initSlider();

let timerId = setInterval(nextSlide, interval);
let counter = 0;

slideNext.click(function() {
  clearInterval(timerId);
  nextSlide();
  timerId = setInterval(nextSlide, interval);
});

slidePrev.click(function() {
  clearInterval(timerId);
  prevSlide()
  timerId = setInterval(nextSlide, interval);
});

function initSlider() {
  slideContainer.append( slides.eq(0).clone() );
  for (let i = 0; i < total; i++) {
    slideNav.append('<div class="slide-dot"></div>');
  }
  slideDot = $('.slide-dot');
  slideDotSelect(0);
}

function resetSlide(counter) {
  slideContainer.css({left: counter * -100 + '%'});
}

function nextSlide() {
  if (counter == total) {
    counter = 0;
    resetSlide(counter);
  }
  counter++;
  slideAnimation();
}

function prevSlide() {
  if (counter == 0) {
    counter = total;
    resetSlide(counter);
  }
  counter--;
  slideAnimation();
}

function slideAnimation() {
  let offset = counter * -100 + '%';
  slideContainer.animate({left: offset}, 500, function() {
    slideDotSelect(counter);
  });
}

function slideDotSelect(number) {
  if (number == total) {
    number = 0;
  }
  slideDot.removeClass('slide-dot_active').eq(number).addClass('slide-dot_active');
}

// buttonScrollTop

let buttonScrollTop = $('.up-arrow');
buttonDisplayCheck();

$(window).on("scroll", function() {
  buttonDisplayCheck();
});

function buttonDisplayCheck() {
  if ($(window).scrollTop() > 1000) {
    buttonScrollTop.css('display', 'initial');
  } else {
    buttonScrollTop.css('display', 'none');
  }
}

// smooth scroll

$(function() {
  $("a[href^='#']").click( function() {
    let _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"}, 700);
    return false;
  });
});

// counter

function start_count() {
  $('.count').each(function() {
    
      $(this).prop('Counter',0).animate({
          Counter: $(this).text()
      }, {
          duration: 2000,
          easing: 'swing',
          step: function (now) {
              $(this).text(Math.ceil(now));
          }
      });
      $(this).removeAttr( "class" );
  });
}

$(function() {
  if ($('.count').length < 1) return;
  let oTop = $('.count').offset().top - window.innerHeight;
  $(window).scroll(function() {
      let pTop = $(window).scrollTop();
      if ( pTop > oTop ) {
          start_count();
      }
  });
});