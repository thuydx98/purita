$(".slider1-ab1").slick({
  dots: false,
  infinite: true,
  speed: 400,
  slidesToShow: 1,
  cssEase: "linear",
  swipe: false,
});

$(".slider1-ab1").on("afterChange", function (event, slick, currentSlide) {
  $(".caption-w .caption").removeClass("active");
  $(".caption-w .cap-" + (currentSlide + 1)).addClass("active");
});
