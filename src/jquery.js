$(document).ready(function(){
    $('.sidebar-btn').click(function(){
        $('.sidebar-pages').toggleClass('active');
        $('.sidebar-btn').toggleClass('active');
    
    
    var arrow = $(this).find('.material-symbols-outlined');
    if (arrow.text() == "arrow_circle_up"){
        arrow.text('arrow_circle_down')
    }
    else{
        arrow.text('arrow_circle_up')
    }
    
    });

});
