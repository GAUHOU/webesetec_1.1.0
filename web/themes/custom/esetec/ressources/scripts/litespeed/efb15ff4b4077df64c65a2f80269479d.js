(function($) {
    "use strict";
    $(".skill-per").each(function() {
        var $this = $(this);
        var id = $this.attr("id");
        $this.css("width", id + "%");
        $({
            animatedValue: 0
        }).animate({
            animatedValue: id
        }, {
            duration: 1000,
            step: function() {
                $this.attr("id", Math.floor(this.animatedValue) + "%")
            },
            complete: function() {
                $this.attr("id", Math.floor(this.animatedValue) + "%")
            }
        })
    });
    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();
        if (scroll < 200) {
            $("#header-sticky").removeClass("sticky-menu")
        } else {
            $("#header-sticky").addClass("sticky-menu")
        }
    });
    $('.responsive').on('click', function(e) {
        $('#mobile-menu').slideToggle()
    });
    $('#mobile-menu').meanmenu({
        meanMenuContainer: '.mobile-menu',
        meanScreenWidth: "992"
    });
    $('.info-bar').on('click', function() {
        $('.extra-info').addClass('info-open')
    })
    $('.close-icon').on('click', function() {
        $('.extra-info').removeClass('info-open')
    })
    $(".menu-tigger").on("click", function() {
        $(".offcanvas-menu,.offcanvas-overly").addClass("active");
        return !1
    });
    $(".menu-close,.offcanvas-overly").on("click", function() {
        $(".offcanvas-menu,.offcanvas-overly").removeClass("active")
    });
    $(".main-menu li a").on('click', function() {
        if ($(window).width() < 700) {
            $("#mobile-menu").slideUp()
        }
    });
    $(function() {
        $('a.smoth-scroll').on('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 100
            }, 1000);
            event.preventDefault()
        })
    });

    function mainSlider() {
        var BasicSlider = $('.slider-active');
        BasicSlider.on('init', function(e, slick) {
            var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements)
        });
        BasicSlider.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
            var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
            doAnimations($animatingElements)
        });
        BasicSlider.slick({
            autoplay: !0,
            autoplaySpeed: 10000,
            dots: !1,
            fade: !0,
            arrows: !0,
            prevArrow: '<button type="button" class="slick-prev"><i class="far fa-angle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="far fa-angle-right"></i></button>',
            responsive: [{
                breakpoint: 1200,
                settings: {
                    dots: !1,
                    arrows: !1
                }
            }]
        });

        function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function() {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay
                });
                $this.addClass($animationType).one(animationEndEvents, function() {
                    $this.removeClass($animationType)
                })
            })
        }
    }
    mainSlider();
    $('.services-active').slick({
        dots: !0,
        infinite: !0,
        arrows: !1,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: !0,
                dots: !0
            }
        }, {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    $('.team-active').slick({
        dots: !1,
        infinite: !0,
        arrows: !0,
        prevArrow: '<button type="button" class="slick-prev"><i class="far fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="far fa-chevron-right"></i></button>',
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: !0,
                dots: !0
            }
        }, {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    $('.class-active').slick({
        dots: !1,
        infinite: !0,
        arrows: !0,
        prevArrow: '<button type="button" class="slick-prev"><i class="fal fa-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fal fa-angle-right"></i></button>',
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: !0,
                dots: !0
            }
        }, {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    $('.portfolio-active').slick({
        dots: !1,
        infinite: !0,
        arrows: !0,
        prevArrow: '<button type="button" class="slick-prev"><i class="fal fa-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fal fa-angle-right"></i></button>',
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
                infinite: !0,
                dots: !0
            }
        }, {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    $('.brand-active').slick({
        dots: !1,
        infinite: !0,
        autoplay: !0,
        autoplaySpeed: 1500,
        arrows: !1,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [{
            breakpoint: 1500,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 3,
                infinite: !0,
            }
        }, {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: !0,
            }
        }, {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    $('.testimonial-active').slick({
        dots: !0,
        infinite: !0,
        arrows: !1,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 2,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                infinite: !0,
                dots: !0
            }
        }, {
            breakpoint: 992,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    $('.testimonial-active2').slick({
        dots: !0,
        arrows: !1,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: !0,
                dots: !0
            }
        }, {
            breakpoint: 992,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: !1,
        fade: !0,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: !1,
        arrows: !0,
        centerMode: !0,
        focusOnSelect: !0,
        variableWidth: !0,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
    });
    $('.home-blog-active').slick({
        dots: !1,
        infinite: !0,
        arrows: !0,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><i class="far fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="far fa-chevron-right"></i></button>',
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: !0,
                dots: !0
            }
        }, {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    $('.home-blog-active2').slick({
        dots: !1,
        infinite: !0,
        arrows: !0,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><i class="far fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="far fa-chevron-right"></i></button>',
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: !0,
                dots: !0
            }
        }, {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    $('.blog-active').slick({
        dots: !1,
        infinite: !0,
        arrows: !0,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: !0,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
    });
    $('.count').counterUp({
        delay: 100,
        time: 1000
    });
    $('.popup-image').magnificPopup({
        type: 'image',
        gallery: {
            enabled: !0
        }
    });
    $('.popup-video').magnificPopup({
        type: 'iframe'
    });
    if ($('.paroller').length) {
        $('.paroller').paroller()
    }

    function parallaxMouse() {
        if ($('#parallax').length) {
            var scene = document.getElementById('parallax');
            var parallax = new Parallax(scene)
        }
    };
    parallaxMouse();
    $('.s-single-services').on('mouseenter', function() {
        $(this).addClass('active').parent().siblings().find('.s-single-services').removeClass('active')
    })
    $.scrollUp({
        scrollName: 'scrollUp',
        topDistance: '300',
        topSpeed: 300,
        animation: 'fade',
        animationInSpeed: 200,
        animationOutSpeed: 200,
        scrollText: '<i class="fas fa-level-up-alt"></i>',
        activeOverlay: !1,
    });
    $('.grid').imagesLoaded(function() {
        var $grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: !0,
            masonry: {
                columnWidth: 1
            }
        });
        $('.button-group').on('click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({
                filter: filterValue
            })
        })
    });
    $(".element").each(function() {
        var a = $(this);
        a.typed({
            strings: a.attr("data-elements").split(","),
            typeSpeed: 100,
            backDelay: 3e3
        })
    }), $('.button-group > button').on('click', function(event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault()
    });
    new WOW().init();
    if ($('.tabs-box').length) {
        $('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
            e.preventDefault();
            var target = $($(this).attr('data-tab'));
            if ($(target).is(':visible')) {
                return !1
            } else {
                target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
                $(this).addClass('active-btn');
                target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
                target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab animated fadeIn');
                $(target).fadeIn(300);
                $(target).addClass('active-tab animated fadeIn')
            }
        })
    }
})(jQuery);