var scene = $("#scene").get(0);
var parallax = new Parallax(scene);

$(".slider-home").slick({
  dots: true,
  infinite: true,
  speed: 700,
  fade: true,
  vertical: false,
  autoplay: true,
  autoplaySpeed: 7000,
});
$(".slider-home").on("afterChange", function (event, slick, currentSlide) {
  if ($(".slider-home .slick-active .slide-caption").hasClass("color_menu")) {
    $(".header-main").addClass("white");
  } else {
    $(".header-main").removeClass("white");
  }
});

if ($(window).width() >= 768) {
  $(".slider-step").slick({
    dots: true,
    arrows: true,
    infinite: true,
    speed: 550,
    vertical: true,
    draggable: false,
    swipe: false,
  });
} else {
  $(".slider-step").slick({
    dots: true,
    arrows: true,
    infinite: true,
    speed: 300,
    vertical: false,
    draggable: false,
    swipe: false,
    fade: true,
  });
}

$(".gallery-mobile").slick({
  dots: true,
  infinite: true,
  speed: 400,
  slidesToShow: 1,
  cssEase: "linear",
  draggable: false,
  swipe: false,
});

$("#slider1_product").slick({
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  cssEase: "linear",
  draggable: false,
  swipe: false,
  responsive: [
    {
      breakpoint: 1030,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: "40px",
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 998,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: "40px",
        slidesToShow: 2,
      },
    },

    {
      breakpoint: 580,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: "40px",
        slidesToShow: 1,
      },
    },
  ],
});
jQuery("a[rel*=leanModal]").leanModal({
  top: 120,
  overlay: 0.8,
  closeButton: ".modal_close",
});
