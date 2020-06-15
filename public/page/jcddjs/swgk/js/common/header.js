

(function() {
    var link = document.createElement('link');
    var meta = document.createElement('meta');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'http://www.gjzwfw.gov.cn/images/366/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);
    meta.name = 'catalog';
    meta.content = 'gjzwfwpt';
    document.getElementsByTagName('head')[0].appendChild(meta);
}());
$(function(){
    $(".InFixUl_wm").hover(function(){
        $(this).find("div").show();
    },function(){
        $(this).find("div").hide();
    });
    $(".InFixUlMax_wm").hover(function(){
        $(this).find("div").show();
    },function(){
        $(this).find("div").hide();
    });

    $(".InFixUlMax_mor").click(function(){
        $(this).parents(".InFixUlMax").hide().siblings(".InFixUl").show();
        $.cookie('InFixS','hide',{
            expires:1,
            path:'/',
            domain:'gjzwfw.gov.cn'
        });
    });
    $(".InFixUl_mor").click(function(){
        $(this).parents(".InFixUl").hide().siblings(".InFixUlMax").show();
        $.cookie('InFixS','show',{
            expires:1,
            path:'/',
            domain:'gjzwfw.gov.cn'
        });
    });
//  if($.cookie('InFixS')==undefined || $.cookie('InFixS')=='show'){
//      $(".InFixUlMax").show();
//      $(".InFixUl").hide();
//  }else{
//      $(".InFixUlMax").hide();
//      $(".InFixUl").show();
//  }
})