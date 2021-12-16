var arCoor = [{ LAT: "10.9701064", LNG: "106.6703104" }];
var makerlh = [];
var maplh;
$(document).ready(function () {
  maplh = new google.maps.Map(document.getElementById("maplh"), {
    zoom: 11,
    center: new google.maps.LatLng(10.9701064, 106.6703104),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
  });
  $.each(arCoor, function (key, item) {
    makerlh.push(
      new google.maps.Marker({
        position: { lat: parseFloat(item.LAT), lng: parseFloat(item.LNG) },
        map: maplh,
      })
    );
  });
  $(".info-w.row .row").click(function () {
    if (makerlh[$(this).attr("data-id")]) {
      maplh.panTo(makerlh[$(this).attr("data-id")].getPosition());
      $("html, body").animate(
        {
          scrollTop: $(".top-map").offset().top,
        },
        300
      );
    }
  });
});
