$(function(){
    //Scroll to section
    $(".headerScrollButton").click(function() {
        $("body,html").animate(
            {
            scrollTop: $("section").offset().top
            },
            800 //speed
        );
    });
})