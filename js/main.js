AOS.init({
    duration: 800,
    easing: "slide",
});

(function($) {
    "use strict";

    $(window).stellar({
        responsive: true,
        parallaxBackgrounds: true,
        parallaxElements: true,
        horizontalScrolling: false,
        hideDistantElements: false,
        scrollProperty: "scroll",
    });

    /*---------------------------------------------------- */
    /* Preloader
          ------------------------------------------------------ */
    $(window).load(function() {
        // will first fade out the loading animation
        $("#loader").fadeOut("slow", function() {
            // will fade out the whole DIV that covers the website.
            $("#preloader").delay(300).fadeOut("slow");
        });
    });

    var fullHeight = function() {
        $(".js-fullheight").css("height", $(window).height());
        $(window).resize(function() {
            $(".js-fullheight").css("height", $(window).height());
        });
    };
    fullHeight();

    // Scrollax
    $.Scrollax();

    // Burger Menu
    var burgerMenu = function() {
        $("body").on("click", ".js-fh5co-nav-toggle", function(event) {
            event.preventDefault();

            if ($("#ftco-nav").is(":visible")) {
                $(this).removeClass("active");
            } else {
                $(this).addClass("active");
            }
        });
    };
    burgerMenu();

    var onePageClick = function() {
        $(document).on("click", '#ftco-nav a[href^="#"]', function(event) {
            event.preventDefault();

            var href = $.attr(this, "href");

            $("html, body").animate({
                    scrollTop: $($.attr(this, "href")).offset().top - 70,
                },
                500,
                function() {
                    // window.location.hash = href;
                }
            );
        });
    };
    onePageClick();

    $("nav .dropdown").hover(
        function() {
            var $this = $(this);
            // 	 timer;
            // clearTimeout(timer);
            $this.addClass("show");
            $this.find("> a").attr("aria-expanded", true);
            // $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
            $this.find(".dropdown-menu").addClass("show");
        },
        function() {
            var $this = $(this);
            // timer;
            // timer = setTimeout(function(){
            $this.removeClass("show");
            $this.find("> a").attr("aria-expanded", false);
            // $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
            $this.find(".dropdown-menu").removeClass("show");
            // }, 100);
        }
    );

    $("#dropdown04").on("show.bs.dropdown", function() {
        console.log("show");
    });

    // scroll
    var scrollWindow = function() {
        $(window).scroll(function() {
            var $w = $(this),
                st = $w.scrollTop(),
                navbar = $(".ftco_navbar"),
                sd = $(".js-scroll-wrap");

            if (st > 150) {
                if (!navbar.hasClass("scrolled")) {
                    navbar.addClass("scrolled");
                }
            }
            if (st < 150) {
                if (navbar.hasClass("scrolled")) {
                    navbar.removeClass("scrolled sleep");
                }
            }
            if (st > 350) {
                if (!navbar.hasClass("awake")) {
                    navbar.addClass("awake");
                }

                if (sd.length > 0) {
                    sd.addClass("sleep");
                }
            }
            if (st < 350) {
                if (navbar.hasClass("awake")) {
                    navbar.removeClass("awake");
                    navbar.addClass("sleep");
                }
                if (sd.length > 0) {
                    sd.removeClass("sleep");
                }
            }
        });
    };
    scrollWindow();

    var counter = function() {
        $("#section-counter, .hero-wrap, .ftco-counter, .ftco-about").waypoint(
            function(direction) {
                if (
                    direction === "down" &&
                    !$(this.element).hasClass("ftco-animated")
                ) {
                    var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(
                        ","
                    );
                    $(".number").each(function() {
                        var $this = $(this),
                            num = $this.data("number");
                        $this.animateNumber({
                                number: num,
                                numberStep: comma_separator_number_step,
                            },
                            1400
                        );
                    });
                }
            }, { offset: "95%" }
        );
    };
    counter();

    var contentWayPoint = function() {
        var i = 0;
        $(".ftco-animate").waypoint(
            function(direction) {
                if (
                    direction === "down" &&
                    !$(this.element).hasClass("ftco-animated")
                ) {
                    i++;

                    $(this.element).addClass("item-animate");
                    setTimeout(function() {
                        $("body .ftco-animate.item-animate").each(function(k) {
                            var el = $(this);
                            setTimeout(
                                function() {
                                    var effect = el.data("animate-effect");
                                    if (effect === "fadeIn") {
                                        el.addClass("fadeIn ftco-animated");
                                    } else if (effect === "fadeInLeft") {
                                        el.addClass("fadeInLeft ftco-animated");
                                    } else if (effect === "fadeInRight") {
                                        el.addClass("fadeInRight ftco-animated");
                                    } else {
                                        el.addClass("fadeInUp ftco-animated");
                                    }
                                    el.removeClass("item-animate");
                                },
                                k * 50,
                                "easeInOutExpo"
                            );
                        });
                    }, 100);
                }
            }, { offset: "95%" }
        );
    };
    contentWayPoint();

    // magnific popup
    $(".image-popup").magnificPopup({
        type: "image",
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: "mfp-no-margins mfp-with-zoom", // class to remove default margin from left and right side
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            verticalFit: true,
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
        },
    });

    $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false,
    });



    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim();
        if (all) {
            return [...document.querySelectorAll(el)];
        } else {
            return document.querySelector(el);
        }
    };

    let skilsContent = select(".skills-content");
    if (skilsContent) {
        new Waypoint({
            element: skilsContent,
            offset: "80%",
            handler: function(direction) {
                let progress = select(".progress .progress-bar", true);
                progress.forEach((el) => {
                    el.style.width = el.getAttribute("aria-valuenow") + "%";
                });
            },
        });
    }


})(jQuery);


(function() {
    /*---------------------------------------------------- */
    /* Smooth Scrolling
          ------------------------------------------------------ */
    $(".smoothscroll").on("click", function(e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $("html, body")
            .stop()
            .animate({
                    scrollTop: $target.offset().top,
                },
                700,
                "swing",
                function() {
                    window.location.hash = target;
                }
            );
    });

    /*----------------------------------------------------- */
    /* Back to top
         ------------------------------------------------------- */
    var pxShow = 300; // height on which the button will show
    var fadeInTime = 400; // how slow/fast you want the button to show
    var fadeOutTime = 400; // how slow/fast you want the button to hide
    var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

    // Show or hide the sticky footer button
    jQuery(window).scroll(function() {
        if (!$("#header-search").hasClass("is-visible")) {
            if (jQuery(window).scrollTop() >= pxShow) {
                jQuery("#go-top").fadeIn(fadeInTime);
            } else {
                jQuery("#go-top").fadeOut(fadeOutTime);
            }
        }
    });



    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)

        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    const select = (el, all = false) => {
        el = el.trim();
        if (all) {
            return [...document.querySelectorAll(el)];
        } else {
            return document.querySelector(el);
        }
    };

    /**
     * Porfolio isotope and filter
     */
    window.addEventListener('load', () => {
        let portfolioContainer = select('.portfolio-container');
        if (portfolioContainer) {
            let portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: '.portfolio-item',
                layoutMode: 'fitRows'
            });

            let portfolioFilters = select('#portfolio-flters li', true);

            on('click', '#portfolio-flters li', function(e) {
                e.preventDefault();
                portfolioFilters.forEach(function(el) {
                    el.classList.remove('filter-active');
                });
                this.classList.add('filter-active');

                portfolioIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
            }, true);
        }

    });

    /**
     * Initiate portfolio lightbox 
     */
    const portfolioLightbox = GLightbox({
        selector: '.portfolio-lightbox'
    });

    /**
     * Initiate portfolio details lightbox 
     */
    const portfolioDetailsLightbox = GLightbox({
        selector: '.portfolio-details-lightbox',
        width: '90%',
        height: '90vh'
    });

    /**
     * Portfolio details slider
     */
    new Swiper('.portfolio-details-slider', {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });

})()