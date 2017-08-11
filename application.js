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
            console.log(caption_lowercase)
            val.team_url = caption_lowercase.replace(/\s+/g, '');
            console.log(val.team_url)
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    
    $(container).show();
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