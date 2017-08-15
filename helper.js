function init() {
    //Using i18n for localization, for more info please visit http://i18next.com/
    i18n.init({preload: [getStorage().primary_locale,getStorage().secondary_locale],resGetPath: '../__lng__.json',fallbackLng: false }, function(t) {
        var current_locale = "";
        if(typeof(Cookies.get('current_locale')) != 'undefined' ){
            current_locale = Cookies.get('current_locale')
        }
        if(current_locale == Cookies.get('primary_locale')){
            setPrimaryLanguage();
        }else{
            setSecondaryLanguage();
        }
    });
    
    // If there is no language set it to the primary locale.
    if (!Cookies.get('current_locale')) {
        setPrimaryLanguage();
    }
    
    if(Cookies.get('current_locale') == "en-CA"){
        $("#set_lang_fr").css({fontWeight: "normal"});
        $("#set_lang_en").css({fontWeight: "bold"});               
    }
    if(Cookies.get('current_locale') == "fr-CA"){
        $("#set_lang_en").css({fontWeight: "normal"});
        $("#set_lang_fr").css({fontWeight: "bold"}); 
    }
    
    // Center pop-up window horizontally and vertically based on window sized.
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var boxHeight = $('.modal-dialog').height();
    var boxWidth = $('.modal-dialog').width();
    $('#myModal').css({'left' : ((windowWidth - boxWidth)/2), 'top' : ((windowHeight - boxHeight)/2)});
    
    // $(".navbar-toggle").click(function() {
    //     $(".mobile-navbar-collapse").slideToggle();
    //     $(".mobile-navbar-collapse").toggleClass("collapse");
    // })
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

function setCurrentLocale(locale){
    Cookies.set('current_locale', locale);
}

function setPrimaryLanguage(){
    i18n.setLng(Cookies.get('primary_locale'), function(t) {
        $(document).i18n();
    });
    Cookies.set('current_locale', Cookies.get('primary_locale'))
    $('.primary-locale').show(); // Shows
    $('.secondary-locale').hide();
    $("#search_input").attr("placeholder", "Search Site");
    $("#search_input_mobile").attr("placeholder", "Search Site");
    // window.dispatchEvent(new Event('resize'));
}

function setSecondaryLanguage(){
    i18n.setLng(Cookies.get('secondary_locale'), function(t) {
        $(document).i18n();
    });
    Cookies.set('current_locale', Cookies.get('secondary_locale'))
    $('.secondary-locale').show();
    $('.primary-locale').hide();
    $("#search_input").attr("placeholder", "Rechercher dans le site");
    $("#search_input_mobile").attr("placeholder", "Rechercher dans le site");
    // window.dispatchEvent(new Event('resize'));
}

function getUrlParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('#');
    for (var i = 0; i < sURLVariables.length; i++){
        if (sURLVariables[0] == sParam){
            return true;
        }
    }
    return false;
} 

function show_content() {
    
}