function init() {
    
    $('.slick-slider').slick({
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000  
    });
  
    // Pausing the slick slider on mouseover
    $.fn.slickPause = function() {
        var _ = this;
        return _.each(function(index, element) {
            //start hack
            var st = element.slick.$slideTrack.get(0);
            element.slick.$slideTrack.css({
                transition: '',
                webkitTransform: window.getComputedStyle(st).webkitTransform,
                transform: window.getComputedStyle(st).transform
            });
            element.slick.animating = false;
        	//end hack
        
            element.slick.autoPlayClear();
            element.slick.paused = true;
        });
    };


    $( ".slick-slider" ).mouseover(function() {
        $( ".paused" ).show();
    });
    
    $( ".slick-slider" ).mouseout(function() {
        $( ".paused" ).hide();
    });
}