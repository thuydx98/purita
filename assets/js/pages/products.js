var sliders = {
  1: { slider: "#slider1_product" },
  2: { slider: "#slider2_product" },
  3: { slider: "#slider3_product" },
  4: { slider: "#slider4_product" },
};

$.each(sliders, function () {
  $(this.slider).slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    cssEase: "linear",
    swipe: false,
    // centerMode: true,
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
});

$(".gallery-mobile").slick({
  dots: true,
  infinite: true,
  speed: 400,
  slidesToShow: 1,
  cssEase: "linear",
  swipe: false,
});
jQuery("a[rel*=leanModal]").leanModal({
  top: 120,
  overlay: 0.8,
  closeButton: ".modal_close",
});

$(".btn-callwater").click(function () {
  $(".call-right").trigger("click");
});
