'use strict';
if (!window.console) window.console = {};
if (!window.console.memory) window.console.memory = function() {};
if (!window.console.debug) window.console.debug = function() {};
if (!window.console.error) window.console.error = function() {};
if (!window.console.info) window.console.info = function() {};
if (!window.console.log) window.console.log = function() {};

// sticky footer
//-----------------------------------------------------------------------------
if (!Modernizr.flexbox) {
  (function() {
    var
      $pageWrapper = $('#page-wrapper'),
      $pageBody = $('#page-body'),
      noFlexboxStickyFooter = function() {
        $pageBody.height('auto');
        if ($pageBody.height() + $('#header').outerHeight() + $('#footer').outerHeight() < $(window).height()) {
          $pageBody.height($(window).height() - $('#header').outerHeight() - $('#footer').outerHeight());
        } else {
          $pageWrapper.height('auto');
        }
      };
    $(window).on('load resize', noFlexboxStickyFooter);
  })();
}
if (ieDetector.ieVersion == 10 || ieDetector.ieVersion == 11) {
  (function() {
    var
      $pageWrapper = $('#page-wrapper'),
      $pageBody = $('#page-body'),
      ieFlexboxFix = function() {
        if ($pageBody.addClass('flex-none').height() + $('#header').outerHeight() + $('#footer').outerHeight() < $(window).height()) {
          $pageWrapper.height($(window).height());
          $pageBody.removeClass('flex-none');
        } else {
          $pageWrapper.height('auto');
        }
      };
    ieFlexboxFix();
    $(window).on('load resize', ieFlexboxFix);
  })();
}

$(function() {

  // placeholder
  //-----------------------------------------------------------------------------
  $('input[placeholder], textarea[placeholder]').placeholder();

  $('.js-show-menu').on('click', function(e) {
    e.preventDefault();

    if ($(this).hasClass('active')) {
      closeMenu()
    } else {
      $('.overlay').removeClass('close').addClass('overlay-hugeinc open')
      $(this).addClass('active')
    }
  })

  function closeMenu() {
    $('.overlay').removeClass('open').addClass('close');
    $('.js-show-menu').removeClass('active')
  }

  $('.js-scroll').on('click', function(e) {
    e.preventDefault();
    closeMenu();
    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top - 50
    }, 1500);
  })


  // Validation http://jqueryvalidation.org/
  $('.contacts form').validate({
    rules: {
      name: {
        required: true
      },
      surname: {
        required: true
      },
      email: {
        required: true,
        email:true
      },
      message: {
        required: true
      },
    },
    messages: {
      name: {
        required: 'please enter your name'
      },
      surname: {
        required: 'please enter your surname'
      },
      email: {
        required: 'please enter your email',
        email: 'please enter valid email'
      },
      message: {
        required: 'please type your message'
      },
    },
    submitHandler: function() {
      $('.succes-pop-up').fadeIn(800).css({
        'top': $(document).scrollTop() + 300
      });
      setTimeout(function() {
        $('.succes-pop-up').fadeOut(800);
      }, 2500);
    }
  })
});

$(document).on('click', '.js-scroll-top', function(e) {
  e.preventDefault();
  $('html, body').animate({
    scrollTop: 0
  }, 1500);
});

$(window).on('load', function() {

  //slick slider http://kenwheeler.github.io/slick/
  $('.quotes-carousel').slick({
    infinite: true,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  });

  //massoniry gallery + filter http://isotope.metafizzy.co/
  var $grid = $('.grid').isotope({
    itemSelector: '.grid-item',
    layoutMode: 'packery',
    cellsByRow: {
    },
  })

  $('.head-filter .js-filter').on('click', function(e) {
    e.preventDefault();
    $('.js-filter').removeClass('active');
    $(this).addClass('active');
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({
      filter: filterValue
    });
  });
})
