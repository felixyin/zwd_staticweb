
$(function(){
	layui.use(['laypage', 'layer'], function(){
	  var laypage = layui.laypage
	     ,layer = layui.layer;
	  //	按项目归属地查询  列表显影
	  $("#projectlist li").hover(function(){
	  	   $(this).addClass("redstyle")
	  	   $(this).siblings().removeClass("redstyle");
	  	   var index=$(this).attr("index");
	  	   $(".index_"+index).siblings(".tableshu").hide()
	  	   $(".index_"+index).show()
	  	   
	  })
	  $("#projectlist li").click(function(){
	  	   $(this).addClass("redstyle")
	  	   $(this).siblings().removeClass("redstyle")
	  	   var index=$(this).attr("index");
	  	   $(".index_"+index).siblings(".tableshu").hide()
	  	   $(".index_"+index).show()
	  	 
	  	   
	  })
	  //完整功能
	  laypage.render({
	    elem: 'layPagetext'
	    ,count: 100
	    ,layout: [ 'prev', 'page', 'next', 'limit', 'refresh', 'skip','count']
	    ,jump: function(obj){
	     
	    }
	  })
  })
});