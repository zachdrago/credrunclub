// ADD MILES LIGHTBOX
function addMiles() {
    $('#lightbox').lightbox_me({
        appearEffect: 'fadeIn',
        centered: false,
        showOverly: true,
        overlayCSS: {background: '#2e3641', opacity: 0.9},
        closeClick: true,
        lightboxSpeed: 'fast',
        modalCSS: {top: '15%'},
        closeSelector: ".close",
    });
}



/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn') && !event.target.matches('#searchInput')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}


// function formName(id) {
//     $('.dropbtn').val(id);
//     // alert(id);
// }


function formName(id) {
    $('.dropbtn').val(id);
    $('.milesInput').attr('name', id);
    // alert(id);
}


// INSTAFEED ======================================|
var userFeed = new Instafeed({
  get: 'user',
  userId: '4011766578',
  clientId: '0b08ac92d16b4248b68c90805daa37d6',
  accessToken: '4011766578.1677ed0.a5b70da1e603486490c8bdbb2ca6e875',
  resolution: 'standard_resolution',
  template: '<div id="{{image}}" class="insta_pic" onclick="instaPop(this.id, this.link)" style="background: url({{image}}) center center;"></div>'
});
userFeed.run(); 


function instaPop(id, link) {

    var insta_large = $('.insta_large');
    insta_large.attr('src', id);

    var insta_link = $('.insta_link');
    insta_link.attr('href', link);
    

    $('#instaPop').lightbox_me({
        appearEffect: 'fadeIn',
        centered: true,
        showOverly: true,
        overlayCSS: {background: '#2e3641', opacity: 0.9},
        closeClick: true,
        lightboxSpeed: 'fast',
    });
    //e.preventDefault();
    //e.stopPropagation();
}



// COVER VIDEO ======================================|
$( document ).ready(function() {

    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });

});

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}






