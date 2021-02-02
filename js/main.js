$(document).ready(function () {
    //scrolling
    jQuery(window).on('scroll', function () {
        var top = jQuery(document).scrollTop();
        var header = jQuery('header');
        var windowW = $(window).width();
        if (top > 0) {
            $('.if-s').addClass('sticky');
        } else {
            $('.if-s').removeClass('sticky');
        }
    });

    window.addEventListener('scroll', function (e) {
        const
            oldScroll = this.oldScroll || 0,
            newScroll = this.scrollY,
            //isScrollDown = newScroll > oldScroll;
            isScrollDown = newScroll > oldScroll && newScroll > 50;

        document.querySelector('header').classList.toggle('scroll-down', isScrollDown);
        this.oldScroll = newScroll;
    });

    // Header Search Toggle
    var $searchWrapper = $('.header-search-wrapper'),
    	$body = $('body'),
        $searchToggle = $('.search-toggle');

	$searchToggle.on('click', function (e) {
		$searchWrapper.toggleClass('show');
		$(this).toggleClass('active');
		$searchWrapper.find('input').focus();
		e.preventDefault();
	});

	$body.on('click', function (e) {
		if ( $searchWrapper.hasClass('show') ) {
			$searchWrapper.removeClass('show');
			$searchToggle.removeClass('active');
			$body.removeClass('is-search-active');
		}
	});

	$('.header-search').on('click', function (e) {
		e.stopPropagation();
    });
    
    //Filter Toggle
    var $filterWrap = $('.widget .collapse');
    /*
    $(window).resize(function(){
        var windowWidth = $('body').innerWidth();
        if ( windowWidth < 992 ) {
            $filterWrap.removeClass('show');
        } 
    });
     
    function checkWidth() {
        var windowWidth = $('body').innerWidth();
        if ( windowWidth < 992 ) {
            $filterWrap.removeClass('show');
        } 
    }
    checkWidth()
    */


    //hover card assortment
    $(function () {
        $('.product-wrap').hover(onIn, onOut);
    });

    function onIn() {
        $(this).find('h3').addClass('hide');
        $(this).find('.like-wrap').removeClass('hide');
        $(this).find('.img-wrap').removeClass('hide');
        $(this).find('.rating-wrap').removeClass('hide');
        $(this).find('.product-nav').removeClass('hide');
        $(this).find('.size-wrap').removeClass('hide');
        $(this).find('.buttons-wrap').removeClass('hide');
    };
    function onOut() {
        $(this).find('h3').removeClass('hide');
        $(this).find('.like-wrap').addClass('hide');
        $(this).find('.img-wrap').addClass('hide');
        $(this).find('.rating-wrap').addClass('hide');
        $(this).find('.product-nav').addClass('hide');
        $(this).find('.size-wrap').addClass('hide');
        $(this).find('.buttons-wrap').addClass('hide');
    };
    
    //card assortment new scropt
    let imgNavList = document.querySelectorAll(".image-photo-slider-nav > div > img");
    for (let i = 0; i < imgNavList.length; i++) {
        imgNavList[i].addEventListener("mouseover", function() {
            var atr = this.getAttribute("data-src");
            this.parentNode.parentNode.parentNode.querySelector("figure .img-photo-slider div img").src = atr;
        });
    }

    //buttons product-nav-dots
    let colorButtonsList = document.querySelectorAll(".product-nav-dots > a");
    let sizeButtonsList = document.querySelectorAll(".size-wrap > a");

    function showListImg(list) {
        for (let i = 0; i < list.length; i++) {
            list[i].addEventListener("click", function() {
                let buttonList = this.parentNode.querySelectorAll("a");
                for (let j = 0; j < buttonList.length; j++) {
                    buttonList[j].classList.remove("active");
                };
                this.classList.add("active");

                let dataColorA = this.getAttribute("data-color");

                let listParentImgNav = this.parentNode.parentNode.parentNode.querySelectorAll(".image-photo-slider-nav");
                
                for (let k = 0; k < listParentImgNav.length; k++) {
                    let dataColorImgWrapNav = listParentImgNav[k].getAttribute("data-color");
                    if (dataColorImgWrapNav == dataColorA) {
                        listParentImgNav[k].classList.add("active");
                        let atrFirstImg = listParentImgNav[k].querySelector("div > img").getAttribute("data-src");
                        let imagesTitleList = listParentImgNav[k].parentNode.querySelector(".img-photo-slider > div > img");
                        imagesTitleList.src =  atrFirstImg;
                    } else listParentImgNav[k].classList.remove("active");

                }
            });
        };
    };

    showListImg(colorButtonsList);
    showListImg(sizeButtonsList);

    
    

    //sliders
    //top index-page
    $('.slider-wrapper').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        arrows: true
    });

    
    var swiper = new Swiper('.new-items-slider', {
        spaceBetween: 15,
        slidesPerView: 1,
        breakpoints: {
            1201: {
                slidesPerView: 4,
                spaceBetween: 15,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: true,
        },
    });


    /*superfish menu active*/
    // initialise plugin
    var menu = $('.menu').superfish({
        //add options here if required
    });

    // Mobile Menu Toggle - Show & Hide
    $('.mobile-menu-toggler').on('click', function (e) {
		$body.toggleClass('mmenu-active');
		$(this).toggleClass('active');
		e.preventDefault();
    });

    $('.mobile-menu-overlay, .mobile-menu-close').on('click', function (e) {
		$body.removeClass('mmenu-active');
		$('.menu-toggler').removeClass('active');
		e.preventDefault();
    });

	// Add Mobile menu icon arrows to items with children
    $('.mobile-menu').find('li').each(function () {
        var $this = $(this);

        /*if ( $this.find('ul').length ) {
            $('<span/>', {
                'class': 'mmenu-btn'
            }).appendTo($this.children('a'));
        }*/

        if ( $this.find('ul').length ) {
            $('<i/>', {
                'class': 'mmenu-btn fa fa-angle-down'
            }).appendTo($this.children('a'));
        }
    });

    // Mobile Menu toggle children menu
    $('.mmenu-btn').on('click', function (e) {
        var $parent = $(this).closest('li'),
            $targetUl = $parent.find('ul').eq(0);

            if ( !$parent.hasClass('open') ) {
                $targetUl.slideDown(300, function () {
                    $parent.addClass('open');
                });
            } else {
                $targetUl.slideUp(300, function () {
                    $parent.removeClass('open');
                });
            }

        e.stopPropagation();
        e.preventDefault();
    });

    // Clear All checkbox/remove filters in sidebar filter
    $('.sidebar-filter-clear').on('click', function (e) {
    	$('.sidebar-shop').find('input').prop('checked', false);

    	e.preventDefault();
    });

    //fancybox
    $("a.product-gallery-item").fancybox({
        'titlePosition'		: 'outside',
        'overlayColor'		: '#000',
        'overlayOpacity'	: 0.5,
        'loop'              : true
    });

    

    //scroll reviews
    let buttonRating = document.querySelector(".scrollMore");
    let navLinksList = document.querySelectorAll(".nav-link");
    let tabsList = document.querySelectorAll(".tab-content .tab-pane");
    
    buttonRating.addEventListener("click", function() {
        if ( buttonRating.classList.contains("active") ) {
            return false;
        } else {
            for(let i = 0; i < navLinksList.length; i++) {
                if( navLinksList[i].classList.contains("active") ) {
                    navLinksList[i].classList.remove("active");
                } else {
                    navLinksList[i].classList.add("active");
                }
            }
            for(let j = 0; j < tabsList.length; j++) {
                if ( tabsList[j].classList.contains("active") ) {
                    tabsList[j].classList.remove("active");
                    tabsList[j].classList.remove("show")
                } else {
                    tabsList[j].classList.add("active");
                    tabsList[j].classList.add("show");
                    scrollToElement();
                }
            }
        };
        this.classList.add("active");
        
    })

    function scrollToElement() {
        element = document.getElementById("characteristics")
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    for (let i = 0; i < navLinksList.length; i++) {
        navLinksList[i].addEventListener("click", function() {
            buttonRating.classList.remove("active");
        })
    }
});

//show mobile menu and filter
$(document).ready(function() {
    $('.menu-catalog').click( function(event){
        event.preventDefault();
        $('.home-page-menu-wrap').addClass('mobile_show');
    } )

    $('[data-target="hidden-filters"]').click( function(event){
        event.preventDefault();
        $('.home-page-menu-wrap').removeClass('mobile_show');
    } )

    $('.js-show-filter-mobile').click( function(event){
        event.preventDefault();
        $('.filter-wrap').addClass('mobile_show');
    } )

    $('[data-target="hidden-filters"]').click( function(event){
        event.preventDefault();
        $('.filter-wrap').removeClass('mobile_show');
    } )
});

//scroll
// $(document).ready(function(){
//     var $page = $('html, body');
//     $('a[href*="#"]').click(function() {
//         $page.animate({
//             scrollTop: $($.attr(this, 'href')).offset().top
//         }, 1800);
//         return false;
//     });
// });

