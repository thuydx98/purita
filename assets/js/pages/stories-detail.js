$("#onepage").fullpage({
  menu: "#menu-paging-onepage",
  normalScrollElements: ".ct-box",
  onLeave: function (index, nextIndex, direction) {
    var step = $(".paging-onepage .li");
    var width = $(window).width();
    if (width >= 768) {
      if (nextIndex <= 1) {
        $("#page-wrapper").removeClass("page-scroll");
      } else {
        $("#page-wrapper").addClass("page-scroll");
      }
    } else {
      if (nextIndex <= 1) {
        $("#page-wrapper").removeClass("page-scroll-mobile");
      } else {
        $("#page-wrapper").addClass("page-scroll-mobile");
      }
    }
    if (nextIndex <= 5) {
      $(".paging-onepage").removeClass("blue");
      step.removeClass("active");
      setTimeout(function () {
        step.eq(nextIndex - 1).addClass("active");
      }, 100);
    } else {
      $(".paging-onepage").addClass("blue");
      setTimeout(function () {
        step.eq(5).addClass("active");
      }, 100);
    }
  },
});
$("#slider1_product").slick({
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  cssEase: "linear",
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

$(".backtotop").click(function (e) {
  $.fn.fullpage.moveTo(1);
});
