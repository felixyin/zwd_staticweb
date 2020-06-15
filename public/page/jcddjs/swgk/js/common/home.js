
$(function(){
	//地图
	jsMap.config("#container", {
        name: "neimenggu",
        width: 1100,
        height: 500,
          fill:{
                basicColor: "#1958b2",//描边颜色
                hoverColor: "#1958b2",//鼠标悬浮时的填充颜色
                basicColor:"#fff"   ////填充颜色
            },
        areaName: {
                show: true,
                size: 12,
                basicColor: "#000",
                clickColor: "#000"
            }       
    });
//	按项目归属地查询  列表显影

  $("#projectlist").find(".deleCtclass").hover(function(){
  	   $(this).addClass("font_style2")
  	   $(this).siblings(".deleCtclass").removeClass("font_style2")
  	   
  })
   $("#projectlist li").click(function(){
  	   $(this).addClass("font_style2")
  	   $(this).siblings().removeClass("font_style2")
  	   $("#projectlist li:lt(5)").show();//钱五个显示 	  	   
  })
  //项目列表排序
  $(".project_main li").each(function(index,element){
  	   var n=0;
  	   var m=2;
  	   if(index==0||index==n+3){
  	   	   $(this).addClass("submain_left")
  	   }else if(index==2||index==m+3){
  	   	   $(this).addClass("submain_right")
  	   }
  })
   $(".IUserNo li").hover(function(){
   	  // var imgsrc=$(this).find("i").css("background");
   	   var index=$(this).attr("indexnum")
   	   $(this).find("img").attr('src','img/icon/IUser'+index+'_hover.png');
   	   //alert('url(../img/icon/IUser'+index+'_hover.png)) no-repeat')
   },function(){
   	   var index=$(this).attr("indexnum")
   	   $(this).find("img").attr('src','img/icon/IUser'+index+'.png');
   })
});