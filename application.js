/*Created 2017-08-09 by Caitlin */

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