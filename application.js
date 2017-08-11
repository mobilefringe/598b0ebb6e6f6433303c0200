/*Created 2017-08-09 by Caitlin */

function renderBanner(banner_template,home_banner,banners){
    var item_list = [];
    var item_rendered = [];
    var banner_template_html = $(banner_template).html();
    Mustache.parse(banner_template_html);   // optional, speeds up future uses
    $.each( banners , function( key, val ) {
    //     today = new Date();
    //     start = new Date (val.start_date);
       
    //     start.setDate(start.getDate());
    //   if(val.url == "" || val.url === null){
    //       val.css = "style=cursor:default;";
    //       val.noLink = "return false";
    //   }
    //   if (start <= today){
    //      if (val.end_date){
    //          end = new Date (val.end_date);
    //          end.setDate(end.getDate() + 1);
    //          if (end >= today){
    //           item_list.push(val);  
    //          }
             
    //      } else {
    //          item_list.push(val);
    
            // }
        // }
        var banner_img_url = getImageURL(val.photo_url);
        val.banner_image = "background-image: url(" + banner_img_url + ");";
    });

    $.each( item_list , function( key, val ) {
        var repo_rendered = Mustache.render(banner_template_html,val);
        item_rendered.push(repo_rendered);
    });
    $(home_banner).html(item_rendered.join(''));
}

function renderFeatureItems(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if(val.url == "" || val.url === null){
           val.css = "style=cursor:default;";
           val.noLink = "return false";
        }
        var repo_rendered = Mustache.render(template_html,val);
        item_rendered.push(repo_rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderGallery(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    $.each( collection , function( key, val ) {
        if (val.photo_url.indexOf('missing.png') > -1) {
            val.gallery_image = "";
        } else {
            val.gallery_image = getImageURL(val.photo_url);
        }
        
        if(val.caption != undefined){
            var caption_lowercase = val.caption.toLowerCase();
            val.url = caption_lowercase.replace(/\s+/g, '-');
        }
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderJobs(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        // if(val.jobable_type == "Store"){
        //     val.store_name = getStoreDetailsByID(val.jobable_id).name;
        //     val.store_slug = getStoreDetailsByID(val.jobable_id).slug;
        //     val.image_url = getStoreDetailsByID(val.jobable_id).store_front_url_abs;
        // }
        // else{
        //     val.store_name = mall_name;
        //     val.image_url = default_image.image_url;
        // }
        
        var show_date = moment(val.show_on_web_date);
        var start = moment(val.start_date).tz(getPropertyTimeZone());
        var end = moment(val.end_date).tz(getPropertyTimeZone());
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM D")
        }
        else{
            val.dates = start.format("MMM D") + " - " + end.format("MMM D");
            val.end_date = end.format("MMM D");
        }
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderPosts(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    var counter = 1;
    Mustache.parse(template_html);   // optional, speeds up future uses
    $.each( collection , function( key, val ) {
        if (val.image_url.indexOf('missing.png') > -1) {
            val.post_image = "//codecloud.cdn.speedyrails.net/sites/59282acb6e6f647d8d520100/image/jpeg/1502470554000/EventsPlaceholder@2x.jpg";
        } else {
            val.post_image = val.image_url;
        }
        
        if(val.title.length > 45){
            val.title_short = val.title.substring(0, 44) + "...";
        } else {
            val.title_short = val.title;
        }
        
        if(val.body.length > 155){
            val.description_short = val.body.substring(0, 154) + "...";
        } else {
            val.description_short = val.body;
        }
        val.description_short = val.description_short.replace("&amp;", "&");
        
        val.slug = "posts/" + val.slug;
        
        val.twitter_title = val.title + " via @ShopTheGateway";

        val.counter = counter;
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
        counter = counter + 1;
    });

    $(container).html(item_rendered.join(''));
}