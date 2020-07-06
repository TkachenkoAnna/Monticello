let map;

$(document).ready(function(){

  let $hamburger = $(".hamburger");
    $hamburger.on("click", function(e) {
      $(".hamburger, #mobile_menu").toggleClass("is-active");
    });

  let lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  });

  let $menu = $("#sticky_menu");
    $(window).scroll(function(){
      if ( $(this).scrollTop() > 100 && $menu.hasClass("default") ){
      $menu.removeClass("default").addClass("fixed");
    } else if($(this).scrollTop() <= 100 && $menu.hasClass("fixed")) {
      $menu.removeClass("fixed").addClass("default");
    }
  });

  let $page = $('html, body');
  $('a[href*="#"]').click(function() { 
    $page.animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
    $(".hamburger, #mobile_menu").removeClass("is-active");
    return false;
  });

  $('#menu ul li a').click(function(){
    if($(this).parent().hasClass('active')){
        return false;
    }
    $('#menu ul li').removeClass('active');
    $(this).parent().addClass('active');
  });

  $('.top_slider').slick({
    dots: true,
    vertical: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    verticalSwiping: true,
    infinite:true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 300
  });

  $('.news_slider').slick({
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true, 
    prevArrow: '<button type="button" class="news_btn prev_btn"></button>',
    nextArrow: '<button type="button" class="news_btn next_btn"></button>',
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 300,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 1120,
          settings: {
            centerMode: true,
            slidesToShow: 3,
            centerPadding: '30px'
          }
      },
      {
        breakpoint: 1000,
          settings: {
            slidesToShow: 2,
            centerPadding: '20px'

          }
      },
      {
        breakpoint: 640,
          settings: {
            arrows: false,
          }
      },
      {
        breakpoint: 400,
          settings: {
            slidesToShow: 1,
          }
      }
    ]
  });

map = L.map('map').setView([40.656620, -73.903810], 13);

L.tileLayer.grayscale('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let newIcon = new L.Icon ({
  iconUrl: 'assets/plugins/leaflet_map/images/marker-icon3.png',
  iconSize: [106, 106]
});

L.marker([40.672114, -73.920072], {icon: newIcon}).addTo(map);

map.scrollWheelZoom.disable();

$("#map").bind('mousewheel DOMMouseScroll', function (event) {
  event.stopPropagation();
    if (event.ctrlKey == true) {
        event.preventDefault();
        map.scrollWheelZoom.enable();
        setTimeout(function(){
            map.scrollWheelZoom.disable();
        }, 1000);
    } else {
        map.scrollWheelZoom.disable();
    }
});


$(window).bind('mousewheel DOMMouseScroll', function (event) {
      $('#map').removeClass('map-scroll');
  })
  
});

window.onscroll = function() {
  myFunction()
};

let menu = document.getElementById("sticky_menu");
let sticky = menu.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    menu.classList.add("sticky");
  } else {
    menu.classList.remove("sticky");
  }
}

document.addEventListener("DOMContentLoaded", function() {
  let lazyloadImages;    

  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    let imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let image = entry.target;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {  
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");
    
    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    

      lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
})

function getMobile() {
  var menu = document.getElementById("mobile_links");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}