(function($) {

  $(document).ready(function(){

    //Skill
    jQuery('.skillbar').each(function() {
        jQuery(this).find('.count-bar').animate({
          width:jQuery(this).attr('data-percent')
        },3000);
        var percent = jQuery(this).attr('data-percent');
        jQuery(this).find('.count').html('<span>' + percent + '</span>');
    });


  });



})(jQuery);
