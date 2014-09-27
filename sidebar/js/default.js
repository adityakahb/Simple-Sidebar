var $sections = $('section');

function addDynamicBackgrounds(){
    
    $sections.each(function(index,value){
    
        $(this).css('background-color','#'+$(this).data('bgcolor')).css('color','#'+$(this).data('textcolor'));
        
    });
    
}

function addSidebarFn(){
    
    var isSideNavClicked = false;
    
    $('body').append('<div class="sidebar-wrapper"><div class="sidebar-container"></div></div>');
    
    $sections.each(function(index,value){
    
        $('.sidebar-container').append('<div class="sidebar-bullet"><a href="#"><span class="icon-circle-stroke"><span class="icon-circle-fill"></span></span></a><div class="section-bullet-title"><div class="title-content">'+$(this).data('title')+'</div></div></div>');
        
    });
    
    $('.sidebar-container').find('a').each( function(index,value){
        
        $(this).mouseenter( function(){
        
            $(this).parents('.sidebar-bullet').find('.section-bullet-title').addClass('active');
        } ).mouseleave( function(){
        
            $(this).parents('.sidebar-bullet').find('.section-bullet-title').removeClass('active');
            
        });
        
        $(this).click(function(e){
            e.preventDefault();
            isSideNavClicked = true;
            $('.sidebar-container').find('.sidebar-bullet').removeClass('active').eq(index).addClass( 'active' );
            $('html, body').animate(
                {scrollTop:$sections.eq(index).offset().top},
                1500,'easeInOutQuint',
                function(){ setTimeout(function(){isSideNavClicked = false;},20); }
            );
        });
    });
    
    $('.sidebar-container').find('a').eq(0).trigger('click');
    
    $(window).scroll( function(){
        if( !isSideNavClicked ){
            $sections.each( function(index,value){
                if( $(this).offset().top - $(window).scrollTop() <= 200 ){

                    $('.sidebar-container').find('.sidebar-bullet').removeClass('active').eq(index).addClass( 'active' );

                }

            });
        }
        
    });
}

$(document).ready(function(e){

    addDynamicBackgrounds();
    
    addSidebarFn();
    
});