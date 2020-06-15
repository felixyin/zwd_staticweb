//# sourceURL=login.js
$(function(){
	var userlocalhost;
    layui.use(['layer','element','form'], function(){
        var layer =layui.layer, element = layui.element, form=layui.form;
      //获取系统信息
        $.ajax({
	           url: "/sys/getSys.do",     //请求地址
	           type: "POST",              //请求类型
	          // data:formatParam(requestData),              //请求数据
	           timeout: 200000,                //请求超时时间(毫秒)
	           headers: setHeader(),
	           success:function(res){         //请求成功
	        	   $(".sys_name ,title").html(res.resultData.sys.sysName);
          }
       })
       $("#userName").val(window.localStorage.getItem('userName'));
	   $("#pwd").val(window.localStorage.getItem('pwd'));
	   
	   try
	   {
		   $.ajax({
			   type: "GET",
			   url: "https://ip.help.bj.cn/",
			   dataType: "json",
			   success: function(data){
				        userlocalhost=data.data[0]["ip"]+","+data.data[0]["nation"]+data.data[0]["province"]+data.data[0]["city"]+data.data[0]["district"]+'(后台)'  
                
			   }
		   })
	   }
	   catch(err)
	     {
	    
	     }
	  
        //表单验证
        form.verify({ 
        	userName: [
   			  	/[\S]+/
   			    ,'<div style="color:#000">请输入用户名</div>'
   			  ]
   		   ,userPassword: [
   			  	/[\S]+/
   			    ,'<div style="color:#000">请输入登录密码</div>'
   			  ] 
        });
        //登录事件
        form.on('submit', function(data){
  		    this.blur();//防止点回车，按钮重复点击
  		    var loadIndex2 = layer.load(1);//显示加载层
  		    data.field.ip=userlocalhost
  		    data.field.source='web'
            $.post("http://39.104.21.7:20312/login.do", data.field, function(data){
            	layer.close(loadIndex2);//关闭加载层
            	if(data.status){
                    if(data.status == 200)
                    {
                    	 $(".resultmsg").hide();
                    	 if(! window.localStorage){
                    	        layer.msg("浏览器不支持localstorage", {icon: 5});
    		        		    return false;
    		        	  }else{
    		        		  var pwdcheck=$('input[name="RememberPwd"]').is(':checked');//判断是否选中记住密码
    		        		  if(pwdcheck){//记住用户密码
    		        			//存储用户信息

    			        		  window.localStorage.setItem('userName',$("#userName").val());
    							  window.localStorage.setItem('pwd',$("#pwd").val());
    							  window.localStorage.setItem('userId',data.user.id);
    		        		  }
    		        		  window.localStorage.setItem("tCookie",data.tCookie)
							 window.localStorage.setItem("sessionid",data.sessionid)
						 }

                         window.location="/page/index.html";
                    }else{
                    	$(".resultmsg").show();
                    	$(".msg").html(data.resultMsg);
                    }
            	}else{//登录三次
                	$(".resultmsg").show();
                	$(".msg").html(data.resultMsg);
            		$(".msgtime").show();
            		$(".login_btn").text("(60s)重新尝试登录");
            		$(".login_btn").attr("disabled",true);
            		var time=60;
                    setTime=setInterval(function(){
                        if(time<=0){
                            clearInterval(setTime);
                            $(".resultmsg").hide();
                            $(".msg").html("");
                            $(".login_btn").attr("disabled",false);
                            $(".login_btn").html("登&nbsp;&nbsp;录");
                            return;
                        }
                        time--;
                        $(".login_btn").text("("+time+"s)重新尝试登录");
                    },1000);
            	}
            });
            return false;
        });
    });
    var username =  $("#userName").val();
    // 用户名或者密码聚焦
    if(username != "")
    {
        $("#userName").val(username);
        $("#pwd").focus();
    }
    else
    {
        $("#userName").focus();
    }
})

$(function () {
// $('#hide_frame').
	var username = $('#userName').val();
	var password = $('#pwd').val();

});

