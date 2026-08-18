(function ($, Drupal) {
  'use strict';

  // 1. Nos Partenaires (Qeducato 1:1 Brand Slider)
  Drupal.behaviors.esetecBrandSlider = {
    attach: function (context, settings) {
      var $block = $('#block-esetec-nospartenaires', context);
      if (!$block.length) return;

      var $container = $block.find('.field--name-field-contenu-du-bloc .field-item, .field-item').first();
      if (!$container.length || $container.hasClass('brand-slider-initialized')) return;

      var $images = $container.find('img');
      if ($images.length) {
        var $sliderTrack = $('<div class="brand-active"></div>');

        $images.each(function () {
          var $img = $(this).clone();
          $img.removeAttr('width height class style');
          var $slide = $('<div class="single-brand"></div>').append($img);
          $sliderTrack.append($slide);
        });

        $container.empty().append($sliderTrack).addClass('brand-slider-initialized');

        var initSlick = function () {
          if ($.fn && $.fn.slick && !$sliderTrack.hasClass('slick-initialized')) {
            $sliderTrack.slick({
              dots: false,
              infinite: true,
              autoplay: true,
              autoplaySpeed: 2000,
              arrows: false,
              speed: 1000,
              slidesToShow: 5,
              slidesToScroll: 1,
              responsive: [
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                  }
                },
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                  }
                }
              ]
            });
          }
        };

        initSlick();
        setTimeout(initSlick, 200);
        setTimeout(initSlick, 500);
      }
    }
  };

  // 2. FAQ Accordion Enhancer (Qeducato 1:1 Dynamic FAQ - Preserves 100% of DB Data)
  Drupal.behaviors.esetecFaqAccordion = {
    attach: function (context, settings) {
      var $faqBlock = $('#block-esetec-voustrouverezicitouteslesreponses', context);
      if (!$faqBlock.length) return;

      var $container = $faqBlock.find('.field--name-field-information-de-reponses-qu, .block-content').first();
      if (!$container.length || $container.hasClass('faq-accordion-initialized')) return;

      // 1. Format main section title & intro description
      var $mainH3 = $container.find('h3, h2').first();
      if ($mainH3.length && !$mainH3.parent().hasClass('section-title')) {
        var $mainP = $mainH3.next('p');
        var $titleBox = $('<div class="section-title mb-35"></div>');
        $titleBox.append($('<h2></h2>').html($mainH3.html()));
        if ($mainP.length) {
          $titleBox.append($('<p></p>').html($mainP.html()));
          $mainP.remove();
        }
        $mainH3.replaceWith($titleBox);
      }

      // 2. Collect all question headings (h5/h4)
      var $questionHeadings = $container.find('h5, h4');
      if ($questionHeadings.length) {
        var $accordionContainer = $('<div class="accordion" id="accordionEsetecFaq"></div>');

        $questionHeadings.each(function (idx) {
          var $h = $(this);
          var questionText = $h.text().trim();
          if (!questionText) return;

          // Find answer paragraph
          var $p = $h.next('p');
          if (!$p.length) {
            $p = $h.siblings('p').first();
          }

          var itemId = 'faq-item-' + (idx + 1);
          var isFirst = (idx === 0);

          var numPrefix = (idx + 1 < 10 ? '0' + (idx + 1) : (idx + 1)) + ' ';
          if (!questionText.match(/^\d{2}\s/)) {
            questionText = numPrefix + questionText;
          }

          var $card = $('<div class="card"></div>');
          var $cardHeader = $('<div class="card-header"><h2 class="mb-0"></h2></div>');

          var $btn = $('<button class="faq-btn" type="button"></button>')
            .text(questionText)
            .attr('data-target', '#' + itemId)
            .attr('aria-expanded', isFirst ? 'true' : 'false');

          if (!isFirst) {
            $btn.addClass('collapsed');
          }

          $cardHeader.find('h2').append($btn);

          var $collapse = $('<div id="' + itemId + '" class="collapse"></div>');
          if (isFirst) {
            $collapse.addClass('show').css('display', 'block');
          } else {
            $collapse.css('display', 'none');
          }

          var $cardBody = $('<div class="card-body"></div>');
          if ($p.length) {
            $cardBody.append($p.clone());
          }
          $collapse.append($cardBody);

          $card.append($cardHeader).append($collapse);
          $accordionContainer.append($card);
        });

        // Safely replace question elements without wiping non-question nodes
        var $firstQCol = $container.find('.ckeditor-col-container:has(h5, h4)').first();
        if ($firstQCol.length) {
          $firstQCol.nextAll('.ckeditor-col-container:has(h5, h4)').remove();
          $firstQCol.replaceWith($accordionContainer);
        } else {
          $container.append($accordionContainer);
        }
      }

      $container.addClass('faq-accordion-initialized');

      // Click handler for FAQ toggles
      $faqBlock.off('click.esetecFaq', '.faq-btn').on('click.esetecFaq', '.faq-btn', function (e) {
        e.preventDefault();
        var $btn = $(this);
        var targetId = $btn.attr('data-target') || $btn.attr('data-bs-target');
        var $target = $(targetId);
        var isCollapsed = $btn.hasClass('collapsed');

        var $allBtns = $faqBlock.find('.faq-btn');
        var $allCollapses = $faqBlock.find('.collapse');

        $allBtns.addClass('collapsed').attr('aria-expanded', 'false');
        $allCollapses.removeClass('show').slideUp(250);

        if (isCollapsed && $target.length) {
          $btn.removeClass('collapsed').attr('aria-expanded', 'true');
          $target.addClass('show').slideDown(250);
        }
      });
    }
  };

  // 3. Language Selector Dropdown Toggle
  Drupal.behaviors.esetecLanguageDropdown = {
    attach: function (context, settings) {
      $(context).find('.lang-box').each(function () {
        var $box = $(this);
        var $toggle = $box.find('.dropdown-toggle');
        var $menu = $box.find('.dropdown-menu');

        $toggle.off('click.esetecLang').on('click.esetecLang', function (e) {
          e.preventDefault();
          e.stopPropagation();
          $menu.toggleClass('show');
        });

        $(document).off('click.esetecLangOutside').on('click.esetecLangOutside', function (e) {
          if (!$box.is(e.target) && $box.has(e.target).length === 0) {
            $menu.removeClass('show');
          }
        });
      });
    }
  };

})(jQuery, Drupal);