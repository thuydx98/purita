$(".article-relate").slick({
  dots: false,
  infinite: true,
  centerMode: true,
  speed: 400,
  slidesToShow: 3,
  cssEase: "linear",
  swipe: false,
  responsive: [
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
      breakpoint: 768,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: "40px",
        slidesToShow: 1,
      },
    },
  ],
});
