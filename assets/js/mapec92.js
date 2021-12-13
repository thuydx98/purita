var apiData = {};
// var config={domain:"https://api.cafedenam.com/OneF/BrandAwareness/public-api/",SecretKey:["77beaa7294514482b44762105c563e3d","l6H4DM4tWUCusr+p0hJf1vB1iR+TCMamwaQ8nYYQg3Y="],CompanyCode:"MSC",BrandCodes:"cafedenam",};
var config = {
    domain: "https://api.cafedenam.com/OneF/BrandAwareness/public-api/",
    SecretKey: ["4d2adc2749dd4da7a79514e41ce5c481","lZvLSWcQ7WYkn0Ny//3S3dDh23Wly9+CyhLJbO2ioQg="],
    // domain: "http://m-optimize-public.apps.cloudhub.com.vn/OneF/BrandAwareness/public-api/",
    // SecretKey: ["df88e545535b4d4dab9ebb83c958a55e", "rOLk/LbEBGOo4PUGEjQhCWvxg38JWrb0clFXGx/DAu8="],
    CompanyCode: "MSC",
    BrandCodes: "vinhhao",
};
function API(d) {
    this.config = d;
    var c = new HMACClient(this.config.SecretKey[0], this.config.SecretKey[1]);
    this.Send = function(h, b, g, a) {
        c.Send(this.config.domain + h, b, g, a)
    }
}
var api = new API(config);

function MapClass(options){
    var self = this;
    var map;
    var firstLoadMap = true;
    var userLocation = null;
    var infowindow;

    var self = this;
    self.location = {longitude: 10.773145500000002, latitude:106.6939227};

    function loadMap(e, d, f) {
        if (firstLoadMap) {
            initialize(f);
            firstLoadMap = false;
            if (typeof d == "function") {
                d(e)
            }
        }
    }

    loadMap();


    this.setCenter = function(location){
        map.setCenter(location);
    }
    this.toggleBounce = function(marker) {
        if (typeof(myVariable) != "undefined" && marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            if (map.getZoom() < 14) map.setZoom(14);
            map.panTo(marker.getPosition());
            setTimeout(function() {  marker.setAnimation(null);}, 3000);
        }
    }
    this.addMarker = function(options, callback) {
        if (firstLoadMap) {
            return
        }
        var f = new google.maps.Marker({
            position: options.location,
            icon: options.icon,
            map: map,
            OutletCode: options.OutletCode
        });
        google.maps.event.addListener(f, 'click', function(){
            self.toggleBounce(this);
            $(".ct-box .item.active").removeClass('active');
            $(".outlet-all .item#outlet_list_" + options.OutletCode).addClass('active');
            console.log(options.OutletCode);
            if(callback) callback();
        });


        markers.push(f);

        return f;
    }

    function initialize(g) {
        var h = new google.maps.StyledMapType([{}, {}], {
            name: "US Road Atlas"
        });
        var f = "custom_style";
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 16,
            center: new google.maps.LatLng(10.773145500000002, 106.6939227),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, f]
            }
        });
        map.mapTypes.set(f, h);
        map.setMapTypeId(f);
        var e = null;
        if (g && g.zoom) {
            map.setOptions({
                zoomControl: true,
                zoomControlOptions: {
                    position: (g.zoom.position || google.maps.ControlPosition.RIGHT_BOTTOM)
                }
            })
        }
        if (!g || g.geolocation != false) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(b) {
                    var a = {
                        lat: b.coords.latitude,
                        lng: b.coords.longitude
                    };
                    self.location = a;
                    map.setCenter(a);
                    e = new google.maps.Marker({
                        map: map,
                        animation: google.maps.Animation.DROP,
                        position: new google.maps.LatLng(b.coords.latitude, b.coords.longitude),
                        icon: './icons/your-location.png'
                    })
                    userLocation = e;
                }, function() {})
            } else {}
        }
        addButtonMap(map, false, g);
    }
    function styleButton(button){
        button.style.backgroundColor = "#fff";
        button.style.border = "none";
        button.style.outline = "none";
        button.style.width = "28px";
        button.style.height = "28px";
        button.style.borderRadius = "2px";
        button.style.boxShadow = "0 1px 4px rgba(0,0,0,0.3)";
        button.style.cursor = "pointer";
        button.style.marginRight = "10px";
        button.style.padding = "0";
        return button;
    }
    function addButtonMap(g, k, i) {
        // Set CSS for the control wrapper
        var l = document.createElement("div");
        l.style.cursor = 'pointer';
        l.style.textAlign = 'center';
        l.style.width = '32px'; 
        l.style.height = '96px';
        //location button
        var j = document.createElement("div");
        j.style.margin = "5px";
        j.style.width = "18px";
        j.style.height = "18px";
        j.style.backgroundImage = "url(./icons/mylocation-sprite-2x.png)";
        j.style.backgroundSize = "180px 18px";
        j.style.backgroundPosition = "0 0";
        j.style.backgroundRepeat = "no-repeat";
        var h = document.createElement("button");
        h = styleButton(h);
        h.title = "Vị trí của bạn";
        l.appendChild(h);
        h.appendChild(j);

        google.maps.event.addListener(g, "center_changed", function() {
            j.style["background-position"] = "0 0"
        });
        h.addEventListener("click", function() {
            var a = "0",
                b = setInterval(function() {
                    a = a === "-18" ? "0" : "-18";
                    j.style["background-position"] = a + "px 0"
                }, 500);
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(d) {
                    if(userLocation != null){
                        userLocation.setMap(null);
                        userLocation = null;
                    }
                    var c = new google.maps.LatLng(d.coords.latitude, d.coords.longitude);
                    g.setCenter(c);
                    clearInterval(b);
                    j.style["background-position"] = "-144px 0";
                    k = new google.maps.Marker({
                        map: g,
                        animation: google.maps.Animation.DROP,
                        position: c,
                        icon: './icons/your-location.png'
                    });
                    userLocation = k;
                    k.setPosition(c);
                })
            } else {
                clearInterval(b);
                j.style["background-position"] = "0 0";
            };
        });
        var h2 = document.createElement("button");
        h2 = styleButton(h2);
        h2.title = "Phóng to";
        l.appendChild(h2);
        var jI = document.createElement("div");
        jI.style.margin = "5px";
        jI.style.width = "18px";
        jI.style.height = "18px";
        jI.style.backgroundImage = "url(./icons/zoom-in-out-button.png)";
        jI.style.backgroundSize = "240px 108px";
        jI.style.backgroundPosition = "-3px -63px";
        jI.style.backgroundRepeat = "no-repeat";
        h2.appendChild(jI);
        var h3 = document.createElement("button");
        h3 = styleButton(h3);
        h3.title = "Thu nhỏ";
        l.appendChild(h3);
        var jII = document.createElement("div");
        jII.style.margin = "5px";
        jII.style.width = "18px";
        jII.style.height = "18px";
        jII.style.backgroundImage = "url(./icons/zoom-in-out-button.png)";
        jII.style.backgroundSize = "240px 108px";
        jII.style.backgroundPosition = "-3px -87px";
        jII.style.backgroundRepeat = "no-repeat";
        h3.appendChild(jII);
        google.maps.event.addDomListener(jI, 'click', function() {
            g.setZoom(map.getZoom() + 1);
        });
        google.maps.event.addDomListener(jII, 'click', function() {
            g.setZoom(map.getZoom() - 1);
        }); 

        l.index = 1;
        if (i && i.geolocation) {
            g.controls[(i.geolocation.position || google.maps.ControlPosition.RIGHT_BOTTOM)].push(l)
        } else {
            g.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(l)
            
        }
    }
    
    this.getMap = function() {
        return map;
    }
}

function getAllOutet(options,callback){
    var dis = 10;
    if (options.zoomlevel){
        var level = [];
        level['20'] = 3500;
        level['19'] = 3500;
        level['18'] = 3500;
        level['17'] = 5000;
        level['16'] = 6000;
        level['15'] = 10000;
        level['14'] = 14000;
        level['13'] = 20000;
        level['12'] = 60000;
        level['11'] = 100000;
        level['10'] = 150000;
        level['9'] = 260000;
        level['8'] = 400000;
        level['7'] = 800000;
        level['6'] = 1800000;
        level['5'] = 4000000;
        level['4'] = 8000000;
        level['3'] = 13000000;
        level['2'] = 70000000;
        level['1'] = 90000000;
        // dis = 591657550.500000 / 2^(options.bounds-1);
        dis = level[options.zoomlevel]/1000;
    }
    api.Send("Outlet/GetAll", {
        CompanyCode: config.CompanyCode,
        BrandCodes: [config.BrandCodes],
        PageSize: 1000,
        query: options.query,
        Filters: '',
        Longitude: options.lat,
        Latitude: options.lng,
        Distance: dis + 'km'

    }, function(a) {
       callback(a);
    }, function(e, f, a) {
        console.log(e, f, a)
    });
}

function getOutlet(code,callback){
    api.Send("Outlet/GetOutlet", {
        CompanyCode: config.CompanyCode,
        BrandCodes: [config.BrandCodes],
        Code:code,
        "FullSize":"",
        "ThumbSize":"270"
        
    }, function(a) {
        
       // callback(a);
    }, function(e, f, a) {
        console.log(e, f, a)
    })
}
function MapCluster(map, markers){
    var options = {
        imagePath: '/img/pin-group1',
        gridSize: 50,
        averageCenter:true,
        styles: [{
            url: './icons/pin-group1.png',
            height: 50,
            width: 74,
            textColor: '#fff',
            textSize: 14
        }]
    };
    return new MarkerClusterer(map, markers, options);
}


function Contact(data,callback){
    api.Send("RequestForm/Insert", {
        CompanyCode: config.CompanyCode,
        RequestForm: {
            BrandCode: config.BrandCodes,
            FormType: "contactus",
            Attributes: data
        }
        
    }, function(a) {
        callback(a);
       // callback(a);
    }, function(e, f, a) {
        console.log(e, f, a)
    })
}
