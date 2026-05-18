/* -----------------------------------------------------------------------------



File:           JS Core
Version:        1.0
Last change:    00/00/00 
-------------------------------------------------------------------------------- */
;(function($) {

	"use strict";
	gsap.config({
		nullTargetWarn: false,
	});

// lenis-smooth-scroll
	const lenis = new Lenis({
		duration: .8, 
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
		direction: 'vertical', 
		smooth: true, 
		smoothTouch: false, 
	});

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);


	function TXTheaderSticky() {
		var $window = $(window);
		var lastScrollTop = 0;
		var $header = $('.txa_sticky_header');
		var headerHeight = $header.outerHeight() + 30;

		$window.scroll(function () {
			var windowTop = $window.scrollTop();

			if (windowTop >= headerHeight) {
				$header.addClass('txa_sticky');
			} else {
				$header.removeClass('txa_sticky');
				$header.removeClass('txa_sticky_show');
			}

			if ($header.hasClass('txa_sticky')) {
				if (windowTop < lastScrollTop) {
					$header.addClass('txa_sticky_show');
				} else {
					$header.removeClass('txa_sticky_show');
				}
			}

			lastScrollTop = windowTop;
		});
	}
	TXTheaderSticky();


	if($('.bd-split-1').length) {
		var txtSplit = $('.bd-split-1');
		if(txtSplit.length == 0) return; gsap.registerPlugin(SplitText); txtSplit.each(function(index, el) {
			el.split = new SplitText(el, { 
				type: "words",
				wordsClass: "split-word"
			});
		});
	}


	jQuery(window).on('scroll', function() {
		if (jQuery(window).scrollTop() > 250) {
			jQuery('.ag-header-section.header_style_three, .ag-header-section.header_style_four').addClass('sticky-on')
		} else {
			jQuery('.ag-header-section.header_style_three, .ag-header-section.header_style_four').removeClass('sticky-on')
		}
	});
	$('.open_mobile_menu').on("click", function() {
		$('.mobile_menu_wrap').toggleClass("mobile_menu_on");
	});
	$('.open_mobile_menu').on('click', function () {
		$('body').toggleClass('mobile_menu_overlay_on');
	});
	jQuery(".mobile-main-navigation li.dropdown").append('<span class="dropdown-btn"><i class="fas fa-angle-down"></i></span>'),
	jQuery(".mobile-main-navigation li .dropdown-btn").on("click", function () {
		jQuery(this).hasClass("active")
		? (jQuery(this).closest("ul").find(".dropdown-btn.active").toggleClass("active"), jQuery(this).closest("ul").find(".dropdown-menu.active").toggleClass("active").slideToggle())
		: (jQuery(this).closest("ul").find(".dropdown-btn.active").toggleClass("active"),
			jQuery(this).closest("ul").find(".dropdown-menu.active").toggleClass("active").slideToggle(),
			jQuery(this).toggleClass("active"),
			jQuery(this).parent().find("> .dropdown-menu").toggleClass("active"),
			jQuery(this).parent().find("> .dropdown-menu").slideToggle());
	});

	$('.marquee-right').marquee({
		gap: 0,
		speed: 30,
		delayBeforeStart: 0,
		direction: 'left',
		duplicated: true,
		pauseOnHover: false,
		startVisible:true,
	});

	$('.marquee-left').marquee({
		gap: 0,
		speed: 50,
		delayBeforeStart: 0,
		direction: 'right',
		duplicated: true,
		pauseOnHover: false,
		startVisible:true,
	});

	// Background Image
	$('[data-background]').each(function() {
		$(this).css('background-image', 'url('+ $(this).attr('data-background') + ')');
	});
	gsap.registerPlugin(ScrollTrigger);
	
	// Animation
	if($('.wow').length){
		var wow = new WOW(
		{
			boxClass:     'wow',
			animateClass: 'animated',
			offset:       0,
			mobile:       true,
			live:         true
		}
		);
		wow.init();
	};
	jQuery('.video_box').magnificPopup({
		disableOn: 200,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
	});

	// windows-loaded-before-functions
	document.addEventListener("DOMContentLoaded", function () {
		window.addEventListener('load', function(){

			CustomEase.create("ease1", ".645,.045,.355,1");

			let preloader = document.querySelector("#preloader");
			if (preloader) {
				preloader.classList.add("preloaded");
				setTimeout(function () {
					preloader.remove();
				}, 1000 ) ;

			}
			setTimeout(function() {

				gsap.utils.toArray(".bd-text p").forEach(paragraph => {
					let timeline = gsap.timeline({
						scrollTrigger: {
							trigger: paragraph,
							start: "top 90%",
							end: "bottom 60%",
							toggleActions: "play none none none"
						}
					});
					let splitText = new SplitText(paragraph, { type: "lines" });
					gsap.set(paragraph, { perspective: 400 });
					timeline.from(splitText.lines, {
						opacity: 0,
						rotationX: -80,
						transformOrigin: "top center -50",
						force3D: true,
						duration: 1,
						delay: 0.5,
						stagger: 0.1
					});
				});

				if($(".bd_hero_title").length) {
					var AGTTitleAni = $(".bd_hero_title");
					if(AGTTitleAni.length == 0) return; gsap.registerPlugin(SplitText); AGTTitleAni.each(function(index, el) {

						el.split = new SplitText(el, { 
							type: "lines,words,chars",
							linesClass: "split-line"
						});

						gsap.set(el, { perspective: 400 });

						if( $(el).hasClass('hero_title_1') ){
							gsap.set(el.split.chars, {
								x: 100,
								scaleX: 0,
								opacity: 0,
							});
						}
						el.anim = gsap.to(el.split.chars, {
							scrollTrigger: {
								trigger: el,
								start: "top 90%",
								toggleActions: "play reverse play reverse",
								markers: false,
							},
							x: 0,
							y: 0,
							scaleX: 1,
							scaleY: 1,
							opacity: 1,
							duration: 1,
							stagger: .03,
							rotationX: 15,
							delay: .1,
							ease: "power3.inOut",
						});
					});
				}
				if ($('.bd-hr1-img-slide').length > 0 ) {
					var slider = new Swiper('.bd-hr1-img-slide', {
						spaceBetween: 0,
						slidesPerView: 1,
						loop: true,
						effect: "fade",

						autoplay: {
							delay: 4000,
							disableOnInteraction: false,
						},
						speed: 1000,
						navigation: {
							nextEl: ".bd-hr1-next",
							prevEl: ".bd-hr1-prev",
						},
					});
				}; 

				if ($('.bd-hero2-slider').length > 0 ) {
					var slider = new Swiper('.bd-hero2-slider', {
						spaceBetween: 0,
						slidesPerView: 1,
						loop: true,
						effect: "fade",
						// autoplay: {
						// 	delay: 4000,
						// 	disableOnInteraction: false,
						// },
						pagination: {
							el: ".bd-hr2-pagi",
							clickable: true,
						},
						speed: 1000,
						navigation: {
							nextEl: ".bd-hr2-next",
							prevEl: ".bd-hr2-prev",
						},
					});
				}; 


				const MXHero = gsap.timeline();
				MXHero
				.from(".bd-hero1-sec .bd-hero-bg img", { scale: 1.5,  x: -100, duration: 2, transformOrigin: "left",  ease: "power1.out" })
				.from(".bd-hero1-text .hero-btn-grp", {  opacity: 0, x: 100, duration: 1, transformOrigin: "left",  ease: "power1.out" },"< = .2")
				.from(".bd-hero1-sec .bd-hero-shape1", {  opacity: 0, y: -200, duration: 2, transformOrigin: "left",  ease: "power1.out" },"< = .2")
				.from(".bd-hero1-text .hero-title:before", {  opacity: 0, y: -200, duration: 2, transformOrigin: "left",  ease: "power1.out" },"< = .2")
				

			}, 700);
		})		
	});

	if ($('.bd-pro-slider').length > 0 ) {
		var slider = new Swiper('.bd-pro-slider', {
			spaceBetween: 0,
			slidesPerView: 1,
			loop: true,
			effect: "fade",
			speed: 1000,
			navigation: {
				nextEl: ".bd-pr-next",
				prevEl: ".bd-pr-prev",
			},
		});
	}; 


	if ($('.bd-why-c-slider').length > 0 ) {
		var slider = new Swiper('.bd-why-c-slider', {
			spaceBetween: 0,
			slidesPerView: 3,
			loop: true,
			speed: 1000,
			navigation: {
				nextEl: ".bd-wc-right",
				prevEl: ".bd-wc-left",
			},
			breakpoints: {
				'1400': {
					slidesPerView: 3,
				},
				'1200': {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				'576': {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				'480': {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				'0': {
					slidesPerView: 1,
					spaceBetween: 20,
				},
			},
		});
	};
	
	if ($('.bd-testi1-slide').length > 0 ) {
		var slider = new Swiper('.bd-testi1-slide', {
			spaceBetween: 0,
			slidesPerView: 1,
			effect: "fade",
			loop: true,
			speed: 1000,
			pagination: {
				el: ".bd-testi1-pagi",
				clickable: true,
			},
		});
	}; 

	if (window.matchMedia("(min-width: 1200px)").matches) {
		var collab = gsap.timeline({
			scrollTrigger: {
				trigger: ".bd-ser1-content",
				start: "top 95%",
				toggleActions: "play reverse play reverse",
				markers: false,
			},
		})
		collab
		.from(".bd-ser1-item-wrap", {
			yPercent: 200,
			ease: "Power2.out",
			duration: 1,
			stagger: .2,
		})
	}

	if (window.matchMedia("(min-width: 1200px)").matches) {
		var collab3 = gsap.timeline({
			scrollTrigger: {
				trigger: ".bd-indust-content",
				start: "top 95%",
				toggleActions: "play reverse play reverse",
				markers: false,
			},
		})
		collab3
		.from(".bd-indust-content li", {
			opacity: 0,
			yPercent: 100,
			ease: "elastic.out(1,0.5)",
			duration: 2,
			stagger: .2,
		})
	}


	var AXC = gsap.timeline({
		scrollTrigger: {
			trigger: ".bd-ab1-top1",
			start: "top 90%",
			toggleActions: "play reverse play reverse",
			markers: false,
		},
	})
	AXC
	.from(".bd-ab1-top1 li", {
		xPercent: 100,
		opacity: 0,
		ease: "back.out(1.5)",
		duration: 1, 
		stagger: -.2,
	})



	if($('.bd-sec-tt-anim').length) {
		var edtitle = $(".bd-sec-tt-anim");

		if(edtitle.length == 0) return; gsap.registerPlugin(SplitText); edtitle.each(function(index, el) {

			el.split = new SplitText(el, { 
				type: "lines,words,chars",
				linesClass: "split-line"
			});

			if( $(el).hasClass('ed-has-anim') ){
				gsap.set(el.split.words, {
					opacity: .3,
					y: "100",
				});
			};
			if( $(el).hasClass('ed-has-anim-char') ){
				gsap.set(el.split.chars, {
					opacity: .3,
					x: "20",
				});
			};
			el.anim = gsap.to(el.split.words, {
				scrollTrigger: {
					trigger: el,
					start: "top 90%",
					markers: false
				},

				x: "0",
				y: "0",
				opacity: 1,
				duration: .4,
				stagger: 0.15,
			});
			el.anim = gsap.to(el.split.chars, {
				scrollTrigger: {
					trigger: el,
					start: "top 90%",
					markers: false
				},

				x: "0",
				y: "0",
				opacity: 1,
				duration: .4,
				stagger: 0.05,
			});

		});
	} 

	gsap.utils.toArray(' .top_view').forEach((el, index) => { 
		let tlcta = gsap.timeline({
			scrollTrigger: {
				trigger: el,
				scrub: 2,
				start: "top 80%",
				end: "top 40%",
				toggleActions: "play none none reverse",
				markers: false
			}
		})

		tlcta
		.set(el, {transformOrigin: 'center center'})
		.from(el, { opacity: 0,  y: "-=150"}, {opacity: 1, x: 0, duration: 1, immediateRender: false})
	});
	gsap.utils.toArray(' .bottom_view').forEach((el, index) => { 
		let tlcta = gsap.timeline({
			scrollTrigger: {
				trigger: el,
				scrub: 2,
				start: "top 90%",
				end: "top 70%",
				toggleActions: "play none none reverse",
				markers: false
			}
		})

		tlcta
		.set(el, {transformOrigin: 'center center'})
		.from(el, { opacity: 0,  y: "+=150"}, {opacity: 1, x: 0, duration: 1, immediateRender: false})
	});


	gsap.utils.toArray(' .bottom_view2').forEach((el, index) => { 
		let tlcta = gsap.timeline({
			scrollTrigger: {
				trigger: el,
				scrub: 2,
				start: "top 100%",
				end: "top 95%",
				toggleActions: "play none none reverse",
				markers: false
			}
		})

		tlcta
		.set(el, {transformOrigin: 'center center'})
		.from(el, { opacity: 0,  y: "+=150"}, {opacity: 1, x: 0, duration: 1, immediateRender: false})
	});


	$('.ax_item_active').on('mouseover', function () {
		var $group = $(this).closest('[data-nx-group]');
		$group.find('.ax_item_active').removeClass('active');
		$(this).addClass('active');
	});



	document.addEventListener("DOMContentLoaded", () => {
		const counters = document.querySelectorAll('.counter1');
		counters.forEach(counter => {
			const target = +counter.getAttribute('data-target');
			const offset = 350;

			const observer = new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						window.addEventListener("scroll", onScroll);
					} else {
						window.removeEventListener("scroll", onScroll);
					}
				});
			}, { threshold: 0 });
			observer.observe(counter);
			function onScroll() {
				const rect = counter.getBoundingClientRect();
				const windowHeight = window.innerHeight;
				const visible = Math.min(
					Math.max((windowHeight - rect.top + offset) / (windowHeight + rect.height), 0),
					1
					);
				const value = Math.floor(visible * target);
				counter.innerText = value;
			}
		});
	});

	gsap.utils.toArray(".img-parallax").forEach(function(container) {
		let image = container.querySelector("img");

		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: container,
				scrub: true,
				pin: false,
			},
		}); 
		tl.from(image, {
			yPercent: -30,
			ease: "none",
		}).to(image, {
			yPercent: 30,
			ease: "none",
		}); 
	});


	if (window.matchMedia("(min-width: 1200px)").matches) { 
		var Testi_pin = document.querySelectorAll(".bd-team1-stick-item")
		Testi_pin.forEach((item) => {
			gsap.to(item, {
				scrollTrigger: {
					trigger: item,
					markers: false,
					pin: true,
					pinSpacing: false,
					start: "top 10%",
					end: "bottom 55%",
				},
			});
		});
	}





	document.addEventListener('DOMContentLoaded', () => {

		const scrollBtn = document.getElementById('scrollBtn');

		if (scrollBtn) {

			scrollBtn.addEventListener('click', function () {

				const section =
				this.closest('section') ||
				this.closest('[class*="section"]') ||
				this.parentElement;

				const sectionBottom =
				section.offsetTop + section.offsetHeight - 600;

				smoothScrollTo(sectionBottom, 2000);

			});

		}

		function smoothScrollTo(targetY, duration) {

			const startY = window.scrollY;
			const distance = targetY - startY;
			let startTime = null;

			function easeInOut(t) {
				return t < 0.5
				? 2 * t * t
				: -1 + (4 - 2 * t) * t;
			}

			function step(currentTime) {

				if (!startTime) startTime = currentTime;

				const elapsed = currentTime - startTime;
				const progress = Math.min(elapsed / duration, 1);

				window.scrollTo(
					0,
					startY + distance * easeInOut(progress)
					);

				if (elapsed < duration) {
					requestAnimationFrame(step);
				}

			}

			requestAnimationFrame(step);

		}

	});


	$('.counter').counterUp({
		delay: 10,
		time: 5000
	});


	if ($('.bd-pro2-slider').length > 0 ) {
		var slider = new Swiper('.bd-pro2-slider', {
			spaceBetween: 24,
			slidesPerView: 3,
			loop: true,
			speed: 1000,
			centeredSlides: true,
			navigation: {
				nextEl: ".bd-pro2-right",
				prevEl: ".bd-pro2-left",
			},
			breakpoints: {
				'1400': {
					slidesPerView: 3,
				},
				'1200': {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				'576': {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				'480': {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				'0': {
					slidesPerView: 1,
					spaceBetween: 20,
				},
			},
		});
	};


	const buttons = document.querySelectorAll(".bd-ftr2-social li a ");
	buttons.forEach(btn => {
		const split = new SplitText(btn, { type: "chars" });
		gsap.set(split.chars, { y: 0, opacity: 1 });
		btn.addEventListener("mouseenter", () => {
			gsap.fromTo(
				split.chars,
				{ x: 20, rotate: 180, opacity: 0 },
				{
					x: 0,
					opacity: 1,
					duration: 0.4,
					rotate: 0,
					stagger: 0.1,
					ease: "power3.out"
				}
				);
		});
	});

	$('.bd-ftr2-newslatter .item-text a').on("click", function()  {
		$("html, body").animate({
			scrollTop: 0
		}, 800);
		return false;
	}); 


	if($(".ftr_bottom-text").length) {
		var aniTitle1 = $(".ftr_bottom-text");
		if(aniTitle1.length == 0) return; gsap.registerPlugin(SplitText); aniTitle1.each(function(index, el) {

			el.split = new SplitText(el, { 
				type: "lines,words,chars",
				linesClass: "split-line"
			});

			gsap.set(el, { perspective: 400 });


			if( $(el).hasClass('ftr_bottom-text_2') ){
				gsap.set(el.split.chars, {
					yPercent: 100,
					opacity: 0,

				});
			}

			el.anim = gsap.to(el.split.chars, {
				scrollTrigger: {
					trigger: el,
					start: "top 90%",
					toggleActions: "play reverse play reverse",
					markers: false,

				},

				yPercent: 0,
				xPercent: 0,
				opacity: 1,
				duration: 2,
				stagger: .1,
				ease: "bounce.out",
			});

		});
	}


	if ($('.bd-ab3-slider').length > 0 ) {
		var slider = new Swiper('.bd-ab3-slider', {
			spaceBetween: 0,
			slidesPerView: 1,
			loop: true,
			effect: "fade",
			speed: 1000,
			pagination: {
				el: ".bd-ab3-pagi",
				clickable: true,
			}, 
		});
	};


	document.querySelectorAll('.bd-step3-item').forEach((item, index) => {
		item.addEventListener('mouseenter', () => {
			document.querySelectorAll('.bd-step3-img').forEach(img => img.classList.remove('active'));
			const imgs = document.querySelectorAll('.bd-step3-img');
			if (imgs[index]) imgs[index].classList.add('active');
		});
	});


	$(document).ready(function () {
		var swiperInstances = {};
		var swiperConfig = {
			spaceBetween: 24,
			slidesPerView: 3,
			loop: true,
			speed: 1000,
			centeredSlides: true,
			pagination: {
				el: ".bd-work3-pagi",
				clickable: true,
			},
			navigation: {
				nextEl: ".bd-wrk-next",
				prevEl: ".bd-wrk-prev",
			},
			breakpoints: {
				1400: { slidesPerView: 3 },
				1200: { slidesPerView: 3, spaceBetween: 20 },
				576:  { slidesPerView: 2, spaceBetween: 20 },
				480:  { slidesPerView: 1, spaceBetween: 20 },
				0:    { slidesPerView: 1, spaceBetween: 20 },
			},
		};
		var activePane = $('.tab-pane.active');
		var activeSliderId = activePane.attr('id');
		var activeSlider = activePane.find('.bd-work3-slider');
		if (activeSlider.length) {
			swiperInstances[activeSliderId] = new Swiper(activeSlider[0], swiperConfig);
		}
		$('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
			var targetId = $(e.target).data('bs-target').replace('#', '');
			var pane = $('#' + targetId);
			var sliderEl = pane.find('.bd-work3-slider');

			if (!sliderEl.length) return;
			if (swiperInstances[targetId]) {
				swiperInstances[targetId].destroy(true, true);
			}
			swiperInstances[targetId] = new Swiper(sliderEl[0], swiperConfig);
		});
	});


	if ($(".progress-bar").length) {
		var $progress_bar = $('.progress-bar');
		$progress_bar.appear();
		$(document.body).on('appear', '.progress-bar', function() {
			var current_item = $(this);
			if (!current_item.hasClass('appeared')) {
				var percent = current_item.data('percent');
				var animationDuration = 2500; 
				current_item.css({
					'transition': 'width ' + animationDuration + 'ms ease-in-out',
					'width': '0%'
				});
				setTimeout(function() {
					current_item.css('width', percent + '%').addClass('appeared');
				}, 100);

				setTimeout(function() {
					current_item.parent().append('<span>' + percent + '%' + '</span>');
				}, 100 + (animationDuration * 0.5));
			}
		});
	}

	const texts = document.querySelectorAll('.bd-awd3-text');
	const imgs  = document.querySelectorAll('.bd-awd3-img');
	imgs[0].classList.add('active');
	texts[0].classList.add('active');
	texts.forEach((text, index) => {
		text.addEventListener('mouseenter', () => {
			imgs.forEach(img => img.classList.remove('active'));
			texts.forEach(t => t.classList.remove('active'));

			imgs[index].classList.add('active');
			text.classList.add('active');
		});
	});


	if ($('.bd-testi3-slider').length > 0 ) {
		var slider = new Swiper('.bd-testi3-slider', {
			spaceBetween: 24,
			slidesPerView: 5,
			loop: true,
			speed: 1000,
			centeredSlides: true,
			navigation: {
				nextEl: ".bd-tst3-next",
				prevEl: ".bd-tst3-prev",
			},
			breakpoints: {
				'1400': {
					slidesPerView: 5,
				},
				'1200': {
					slidesPerView: 4,
					spaceBetween: 20,
				},
				'576': {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				'480': {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				'0': {
					slidesPerView: 1,
					spaceBetween: 20,
				},
			},
		});
	};


})(jQuery);