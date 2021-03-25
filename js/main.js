jQuery(document).ready(function ($) {




  // Header fixed and Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 20) {
      $('.back-to-top').fadeIn('slow');
      //$('#header').addClass('header-fixed');
    } else {
      $('.back-to-top').fadeOut('slow');
      //$('#header').removeClass('header-fixed');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the wowjs
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smoth scroll on page hash links
  $('a[href*="#"]:not([href="#"])').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (!$('#header').hasClass('header-fixed')) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Porfolio filter
  $("#portfolio-flters li").click(function () {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    var selectedFilter = $(this).data("filter");
    $("#portfolio-wrapper").fadeTo(100, 0);

    $(".portfolio-item").fadeOut().css('transform', 'scale(0)');

    setTimeout(function () {
      $(selectedFilter).fadeIn(100).css('transform', 'scale(1)');
      $("#portfolio-wrapper").fadeTo(300, 1);
    }, 300);
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // custom code




  let modalId = $('#image-gallery');

  $(document)
    .ready(function () {

      loadGallery(true, 'a.thumbnail');

      //This function disables buttons when needed
      function disableButtons(counter_max, counter_current) {
        $('#show-previous-image, #show-next-image')
          .show();
        if (counter_max === counter_current) {
          $('#show-next-image')
            .hide();
        } else if (counter_current === 1) {
          $('#show-previous-image')
            .hide();
        }
      }

      /**
       *
       * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
       * @param setClickAttr  Sets the attribute for the click handler.
       */

      function loadGallery(setIDs, setClickAttr) {
        let current_image,
          selector,
          counter = 0;

        $('#show-next-image, #show-previous-image')
          .click(function () {
            if ($(this)
              .attr('id') === 'show-previous-image') {
              current_image--;
            } else {
              current_image++;
            }

            selector = $('[data-image-id="' + current_image + '"]');
            updateGallery(selector);
          });

        function updateGallery(selector) {
          let $sel = selector;
          current_image = $sel.data('image-id');
          $('#image-gallery-title')
            .text($sel.data('title'));
          $('#image-gallery-image')
            .attr('src', $sel.data('image'));
          disableButtons(counter, $sel.data('image-id'));
        }

        if (setIDs == true) {
          $('[data-image-id]')
            .each(function () {
              counter++;
              $(this)
                .attr('data-image-id', counter);
            });
        }
        $(setClickAttr)
          .on('click', function () {
            updateGallery($(this));
          });
      }
    });

  // build key actions
  $(document)
    .keydown(function (e) {
      switch (e.which) {
        case 37: // left
          if ((modalId.data('bs.modal') || {})._isShown && $('#show-previous-image').is(":visible")) {
            $('#show-previous-image')
              .click();
          }
          break;

        case 39: // right
          if ((modalId.data('bs.modal') || {})._isShown && $('#show-next-image').is(":visible")) {
            $('#show-next-image')
              .click();
          }
          break;

        default:
          return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
    });

});

function copyToClipboard(text) {
  var dummy = document.createElement("input");
  document.body.appendChild(dummy);
  dummy.setAttribute('value', text);
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}


$(document).ready(function () {
  $('.customer-logos').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
    dots: false,
    speed: 1800,
    variableWidth: true,
    pauseOnHover: true,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 520,
      settings: {
        slidesToShow: 2
      }
    }]
  });
});


$(document).on('click', 'a[href^="#call"]', function (event) {
  event.preventDefault();

  var top_space = 0;
  if ($('#header').length) {
    top_space = $('#header').outerHeight();

    if (!$('#header').hasClass('header-fixed')) {
      top_space = top_space - 20;
    }
  }

  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top - top_space
  }, 500);
});


function setLand(val) {
  let myElements = document.querySelectorAll(".dicrecor-div");

  for (let i = 0; i < myElements.length; i++) {
    myElements[i].style.display = "none";
  }
  document.getElementById(val).style.display = "block";
}


function runLandSet() {
  var a = document.getElementById("alphasvg");

  // It's important to add an load event listener to the object,
  // as it will load the svg doc asynchronously
  a.addEventListener("load", function () {

    // get the inner DOM of alpha.svg
    var svgDoc = a.contentDocument;
    // get the inner element by id
    var delta = svgDoc.getElementById("kuj-pom");
    // add behaviour
    delta.addEventListener("mousedown", function () {
      setLand("kuj-pom");
    }, false);
    var delta = svgDoc.getElementById("lodzkie");
    // add behaviour
    delta.addEventListener("mousedown", function () {
      setLand("lodzkie");
    }, false);
    var delta = svgDoc.getElementById("wielkopol");
    // add behaviour
    delta.addEventListener("mousedown", function () {
      setLand("wielkopol");
    }, false);

    var delta = svgDoc.getElementById("mazow");
    // add behaviour
    delta.addEventListener("mousedown", function () {
      setLand("mazow");
    }, false);
    var delta = svgDoc.getElementById("zach-pom");
    // add behaviour
    delta.addEventListener("mousedown", function () {
      setLand("zach-pom");
    }, false);
    var delta = svgDoc.getElementById("war-maz");
    // add behaviour
    delta.addEventListener("mousedown", function () {
      setLand("war-maz");
    }, false);
    var delta = svgDoc.getElementById("pom");
    // add behaviour
    delta.addEventListener("mousedown", function () {
      setLand("pom");
    }, false);

    var delta = svgDoc.getElementById("podkarpackie");
    // add behaviour
    delta.addEventListener("mousedown", function () {
      setLand("podkarpackie");
    }, false);
    var delta = svgDoc.getElementById("malopolskie");
    // add behaviour
    delta.addEventListener("mousedown", function () {
      setLand("malopolskie");
    }, false);
    var delta = svgDoc.getElementById("slaskie");
    // add behaviour
    delta.addEventListener("mousedown", function () {
      setLand("slaskie");
    }, false);
    var delta = svgDoc.getElementById("opolskie");
    // add behaviour
    delta.addEventListener("mousedown", function () {
      setLand("opolskie");
    }, false);
    var delta = svgDoc.getElementById("dolnoslonskie");
    // add behaviour
    delta.addEventListener("mousedown", function () {
      setLand("dolnoslonskie");
    }, false);
    var delta = svgDoc.getElementById("swietokrzyskie");
    // add behaviour
    delta.addEventListener("mousedown", function () {
      setLand("swietokrzyskie");
    }, false);

    var delta = svgDoc.getElementById("lubuskie");
    // add behaviour
    delta.addEventListener("mousedown", function () {
      setLand("lubuskie");
    }, false);
    var delta = svgDoc.getElementById("podl");
    // add behaviour
    delta.addEventListener("mousedown", function () {
      setLand("podl");
    }, false);
    var delta = svgDoc.getElementById("lubelskie");
    // add behaviour
    delta.addEventListener("mousedown", function () {
      setLand("lubelskie");
    }, false);
  }, false);
}