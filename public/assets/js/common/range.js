 var table ,form ,laypage ,layer ,element ,laydate ,upload//时间组件
var User={};
$(function(){
 layui.use(['table','form','laypage','layer', 'element', 'laydate','upload'], function(){
     table = layui.table;
     form=layui.form;
     laypage = layui.laypage ;//分页
     layer = layui.layer ;//弹层
     element = layui.element; //元素操作
     laydate = layui.laydate; //时间组件 
     upload = layui.upload;
	
	//获取用户信息
    $.ajax({
           url: "/fpmsUser/getMyInfo.do",               //请求地址
           type: "POST",              //请求类型
          // data:formatParam(requestData),              //请求数据
           timeout: 200000,                //请求超时时间(毫秒)
           headers: setHeader(),
           success:function(res){         //请求成功
        	      $("#userName").append(res.resultData.userName);
           }
    })
    //监听省份选择，联动市
    form.on('select(Province)', function(num){
  	  var provinceCode=num.value; //得到被选中的值
  	  $("#cityCode option").not(":eq(0)").remove();//市清空
  	  $("#areaCode option").not(":eq(0)").remove();//区县清空
  	  $("#streetCode option").not(":eq(0)").remove();//街道清空
  	  $("#communityId option").not(":eq(0)").remove();//社区清空
  	  $("#frqId option").not(":eq(0)").remove();//小区清空
	  $("#floorId option").not(":eq(0)").remove();//楼栋清空
	  $("#unitId option").not(":eq(0)").remove();//单元清空
	  $("#roomId option").not(":eq(0)").remove();//房间清空
       form.render();
    	   var requestData = {"provinceCode": provinceCode};
           $._Ajax.jPost("/fpmsProvince/cityList.do", requestData, function(data){
        	   if(data.status == 200){
        		   if(data.length>0){
		           // $("#cityCode").append($("<option id='' value=''>请选择市</option>"));
		                $.each(data, function(i,json){
		                   $("#cityCode").append($("<option id='" + json["cityCode"] + "' value='" + json["cityCode"] + "'>" + json["cityName"] + "</option>"));
		                });
		                form.render();
        		   }
        	   }else{
        		   layer.msg("数据加载失败", {icon: 5});
        	   }       
           }, function(){}); 
                	             
    });
  //监听市选择，联动区县
    form.on('select(city)', function(num){
   	  var cityCode=num.value; //得到被选中的值
   	  $("#areaCode option").not(":eq(0)").remove();//区县清空
   	  $("#streetCode option").not(":eq(0)").remove();//街道清空
      $("#communityId option").not(":eq(0)").remove();//社区清空
      $("#frqId option").not(":eq(0)").remove();//小区清空
	  $("#floorId option").not(":eq(0)").remove();//楼栋清空
	  $("#unitId option").not(":eq(0)").remove();//单元清空
	  $("#roomId option").not(":eq(0)").remove();//房间清空
     form.render();
  	   var requestData = {"cityCode": cityCode};
           $._Ajax.jPost("/fpmsProvince/areaList.do", requestData, function(data){
        	   if(data.status == 200){
        		   if(data.length>0){
			           // $("#areaCode").append($("<option id='' value=''>请选择区县</option>"));
		                $.each(data, function(i,json){
		                   $("#areaCode").append($("<option id='" + json["areaCode"] + "' value='" + json["areaCode"] + "'>" + json["areaName"] + "</option>"));
		                });
		                form.render();
        		   }    
        	   }else{
        		   layer.msg("数据加载失败", {icon: 5});
        	   }  
           }, function(){});        	              
     });
  //监听区县选择。联动街道
    form.on('select(District)', function(num){
   	  var areaCode=num.value; //得到被选中的值
   	  $("#streetCode option").not(":eq(0)").remove();//街道清空
   	  $("#communityId option").not(":eq(0)").remove();//社区清空
   	  $("#frqId option").not(":eq(0)").remove();//小区清空
	  $("#floorId option").not(":eq(0)").remove();//楼栋清空
	  $("#unitId option").not(":eq(0)").remove();//单元清空
	  $("#roomId option").not(":eq(0)").remove();//房间清空
   	  
         form.render();
  	   var requestData = {"areaCode": areaCode};
         $._Ajax.jPost("/fpmsProvince/streetList.do", requestData, function(data){
        	 if(data.status == 200){
        		 if(data.length>0){
	          //$("#Choice_Street").append($("<option id='' value=''>请选择街道</option>"));
		              $.each(data, function(i,json){
		                 $("#streetCode").append($("<option id='" + json["streetCode"] + "' value='" + json["streetCode"] + "'>" + json["streetName"] + "</option>"));
		              });
		              form.render();
        		 }     
        	 }else{
      		   layer.msg("数据加载失败", {icon: 5});
      	     }      
         }, function(){});           	                 
     }); 
  //监听街道选择，联动社区
    form.on('select(Street)', function(num){
   	  var streetCode=num.value; //得到被选中的值
   	  $("#communityId option").not(":eq(0)").remove();//社区清空
   	  $("#frqId option").not(":eq(0)").remove();//小区清空
	  $("#floorId option").not(":eq(0)").remove();//楼栋清空
	  $("#unitId option").not(":eq(0)").remove();//单元清空
	  $("#roomId option").not(":eq(0)").remove();//房间清空
         form.render();
  	   var requestData = {"streetCode": streetCode};
         $._Ajax.jPost("/fpmsCommunity/communityList.do", requestData, function(data){
        	 if(data.status == 200){
        		 if(data.length>0){
			          //$("#Choice_Street").append($("<option id='' value=''>请选择街道</option>"));
		              $.each(data, function(i,json){
		                 $("#communityId").append($("<option id='" + json["id"] + "' value='" + json["id"] + "'>" + json["name"] + "</option>"));
		              });
		              form.render();
        		 }     
        	 }else{
    		     layer.msg("数据加载失败", {icon: 5});
    	     }       
         }, function(){});           	                 
     });
  //监听社区选择，联动小区
    form.on('select(community)', function(num){
 	  var communityId=num.value; //得到被选中的值
 	  $("#frqId option").not(":eq(0)").remove();//小区清空
 	  $("#gridId option").not(":eq(0)").remove();//网格清空
 	  $("#floorId option").not(":eq(0)").remove();//楼栋清空
 	  $("#unitId option").not(":eq(0)").remove();//单元清空
  	  $("#roomId option").not(":eq(0)").remove();//房间清空
       form.render();
	   var requestData = {"communityId": communityId};
       $._Ajax.jPost("/fpmsResidentialQuarters/frqList.do", requestData, function(data){
    	   if(data.status == 200){
    		   if(data.length>0){
		          //$("#Choice_Street").append($("<option id='' value=''>请选择街道</option>"));
		            $.each(data, function(i,json){
		               $("#frqId").append($("<option id='" + json["id"] + "' value='" + json["id"] + "'>" + json["name"] + "</option>"));
		            });
		            form.render();
    		   }  
    	   }else{
  		     layer.msg("数据加载失败", {icon: 5});
  	      }  
       }, function(){});
       //联动网格
       $._Ajax.jPost("/fpmsGrid/selectGridList.do", requestData, function(data){//获取网格
    	   if(data.status == 200){
    		   if(data.length>0){
		            $.each(data, function(i,json){
			               $("#gridId").append($("<option id='" + json["id"] + "' value='" + json["id"] + "'>" + json["name"] + "</option>"));
		            });
		            form.render();
    		   }    
    	   }else{
  		     layer.msg("数据加载失败", {icon: 5});
  	      }  
       }, function(){});
   });
   
    //监听网格，联动小区
    form.on('select(fGrid)', function(num){
   	  var gridId=num.value; //得到被选中的值
   	  $("#frqId option").not(":eq(0)").remove();//小区清空
      $("#floorId option").not(":eq(0)").remove();//楼栋清空
   	  $("#unitId option").not(":eq(0)").remove();//单元清空
 	  $("#roomId option").not(":eq(0)").remove();//房间清空
      form.render();
      if(gridId==""||gridId==null){
		  if(User.type==2||User.type==3){
			 
		  }else{//网格选择空时
			  var requestData = {"communityId": $("#communityId").val()};
		       $._Ajax.jPost("/fpmsResidentialQuarters/frqList.do", requestData, function(data){//所有小区
		    	   if(data.status == 200){
		    		   if(data.length>0){
				          //$("#Choice_Street").append($("<option id='' value=''>请选择街道</option>"));
				            $.each(data, function(i,json){
				               $("#frqId").append($("<option id='" + json["id"] + "' value='" + json["id"] + "'>" + json["name"] + "</option>"));
				            });
				            form.render();
		    		   }  
		    	   }else{
		  		     layer.msg("数据加载失败", {icon: 5});
		  	      }  
		       }, function(){}); 
		  }
	  }else{
		  	   var requestData = {"gridId": gridId};
		         $._Ajax.jPost("/fpmsUser/selectByGridId.do",requestData, function(data){//获取用户下小区
		        	 if(data.status == 200){
		        		 if(data.length>0){
					          //$("#Choice_Street").append($("<option id='' value=''>请选择街道</option>"));
				        	  $.each(data, function(i,json){
				                 $("#frqId").append($("<option id='" + json["residentialQuartersId"] + "' value='" + json["residentialQuartersId"] + "'>" + json["residentialQuartersName"] + "</option>"));
				              });
				              form.render();
		        		 }     
		        	 }else{
		      		     layer.msg("数据加载失败", {icon: 5});
		      	      }   
		         }, function(){}); 
		  }           	                 
     });
    //监听小区选择，联动楼栋
    form.on('select(frq)', function(num){
   	  var rqId=num.value; //得到被选中的值
      $("#floorId option").not(":eq(0)").remove();//楼栋清空
   	  $("#unitId option").not(":eq(0)").remove();//单元清空
 	  $("#roomId option").not(":eq(0)").remove();//房间清空
      form.render();
      if(User.type==2||User.type==3){//网格长 
    	  if(rqId==""||rqId==null){
    		  
    	  }else{
        	   var requestData = {"residentialQuartersId": rqId,"gridId":$("#gridId").val()};
               $._Ajax.jPost("/fpmsUser/selectByResidentialQuartersId.do",requestData, function(data){
              	 if(data.status == 200){
              		 if(data.length>0){
      			          //$("#Choice_Street").append($("<option id='' value=''>请选择街道</option>"));
      		        	  $.each(data, function(i,json){
      		                 $("#floorId").append($("<option id='" + json["floorId"] + "' value='" + json["floorId"] + "'>" + json["floorName"] + "</option>"));
      		              });
      		              form.render();
              		 }     
              	 }else{
            		     layer.msg("数据加载失败", {icon: 5});
            	      }   
               }, function(){}); 
    	  }
      }else{
  	     var requestData = {"rqId": rqId};
         $._Ajax.jPost("/fpmsFloor/floorList.do", requestData, function(data){
        	 if(data.status == 200){
        		 if(data.length>0){
			          //$("#Choice_Street").append($("<option id='' value=''>请选择街道</option>"));
		        	  $.each(data, function(i,json){
		                 $("#floorId").append($("<option id='" + json["id"] + "' value='" + json["id"] + "'>" + json["name"] + "</option>"));
		              });
		              form.render();
        		 }     
        	 }else{
      		     layer.msg("数据加载失败", {icon: 5});
      	      }   
          }, function(){}); 
        }
     }); 
  //监听楼栋选择，联动单元
    form.on('select(floor)', function(num){
   	  var floorId=num.value; //得到被选中的值
   	  $("#unitId option").not(":eq(0)").remove();//单元清空
   	  $("#roomId option").not(":eq(0)").remove();//房间清空
      form.render();
  	   var requestData = {"floorId": floorId};
         $._Ajax.jPost("/fpmsUnit/unitList.do", requestData, function(data){
        	 if(data.status == 200){
        		 if(data.length>0){
		          //$("#Choice_Street").append($("<option id='' value=''>请选择街道</option>"));
		        	  $.each(data, function(i,json){
		                 $("#unitId").append($("<option id='" + json["id"] + "' value='" + json["id"] + "'>" + json["name"] + "</option>"));
		              });
		              form.render();
        		 }    
	    	  }else{
	  		     layer.msg("数据加载失败", {icon: 5});
	  	      }    
         }, function(){}); 
         if($("#gridId2")){
             $.ajax({ //除网格员的其他用户
      			url:'/fpmsGrid/getGridByfloor.do',
      			type:'POST',
      			data:{"request" : JSON.stringify(requestData)},
      			timeout: 200000,
      			headers: setHeader(),
      			success:function(data){
      				//获得服务器响应
      				var res = data.resultData;	
      				if(data.status == 200) {
      	                
      						$("#gridId").val(res.gridId);
      					    $("#gridId2").val(res.gridName);
      						
      				}
      				//$("#provinceCode").val(areaCode);
      			}		
      	    })
         }

     });
  //监听单元选择，联动房间
    form.on('select(funitId)', function(num){
   	  var unitId=num.value; //得到被选中的值
   	  $("#roomId option").not(":eq(0)").remove();//房间清空
      form.render();
  	   var requestData = {"unitId": unitId};
         $._Ajax.jPost("/fpmsRoom/roomList.do", requestData, function(data){
        	 if(data.status == 200){
        		 if(data.length>0){
		          //$("#Choice_Street").append($("<option id='' value=''>请选择街道</option>"));
		        	  $.each(data, function(i,json){
		                 $("#roomId").append($("<option id='" + json["id"] + "' value='" + json["id"] + "'>" + json["name"] + "</option>"));
		              });
		              form.render();
        		 }    
        	 }else{
	  		     layer.msg("数据加载失败", {icon: 5});
	  	      }   
         }, function(){});           	                 
     });
 })

})
function intuser(){
		if(! window.localStorage){
		    $.alert(("浏览器不支持localstorage"));
		    return false;
		}else{
		    //存储用户信息
		    var userID=window.localStorage.getItem('userId');
		    var username=window.localStorage.getItem('userName');
		    if(username!=""){ //用户存在
			    var userData = {"id":userID};
          	  	$.ajax({
      	           url: "/fpmsUser/selectOne.do",               //请求地址
      	           type: "POST", 
      	           async:false,//请求类型
      	           data:{"request" : JSON.stringify(userData)},              //请求数据
      	           timeout: 200000,                //请求超时时间(毫秒)
      	           headers: setHeader(),
      	           success:function(res){         //请求成功      	        	      	        	         	        	   
      	        	   if(res.status == 200)
      	  				{   var num=res.resultData.fpmsUser
							var fpmsRange=res.resultData.fpmsRange;
      	  				    var gridfrqId=res.resultData.gridResidentialQuartersList;
      	  				    var gridFloor=res.resultData.gridFloorList;
							User.id=num.id;
							User.name=num.name;		
							User.type=num.type;
							User.userName=num.name;
							User.provinceCode=num.provinceCode;	
							User.cityCode=num.cityCode;
							User.areaCode=num.areaCode;
							User.streetCode=num.streetCode;
							User.communityId=num.communityId;		
							User.residentialQuartersId=num.residentialQuartersId;
							User.floorId=num.floorId;
							
							//权限判断
							if(User.type==-1){//管理员
								//$("#address").text("");
								
							}else if(User.type==0){//街道管理员
								 Regionallinkage()	//省份以下初始化加载
								 $("#provinceCode ,#cityCode ,#areaCode ,#streetCode").attr("disabled",true);
//								 $("#communityId option").not(":eq(0)").remove();//社区清空
								 $("#gridId").not(":eq(0)").remove();//网格清空
							  	 $("#frqId option").not(":eq(0)").remove();//小区清空
							  	 $("#floorId option").not(":eq(0)").remove();//楼栋清空
  	                             $("#unitId option").not(":eq(0)").remove();//单元清空
  	                             $("#roomId option").not(":eq(0)").remove();//房间清空
//						         $("#communityId").append($("<option id='" + res.user.communityId + "' value='" + res.user.communityId + "'>" + res.user.communityName + "</option>"));											
							}else if(User.type==1){//社区管理员
								 Regionallinkage()	//省份以下初始化加载
								 $("#provinceCode ,#cityCode ,#areaCode ,#streetCode").attr("disabled",true);
								 $("#communityId option").not(":eq(0)").remove();//社区清空
								 $("#gridId").not(":eq(0)").remove();//网格清空
								 $("#frqId option").not(":eq(0)").remove();//小区清空
							  	 $("#floorId option").not(":eq(0)").remove();//楼栋清空
  	                             $("#unitId option").not(":eq(0)").remove();//单元清空
  	                             $("#roomId option").not(":eq(0)").remove();//房间清空
				                 $.each(fpmsRange, function(i,json){
						            $("#communityId").append($("<option id='" + json["communityCode"] + "' value='" + json["communityCode"] + "'>" + json["fcName"] + "</option>"));
						         });											
							}else if(User.type==2||User.type==3){//网格长
								Regionallinkage()	//省份以下初始化加载
						        $("#provinceCode ,#cityCode ,#areaCode ,#streetCode ,#communityId").attr("disabled",true);
						        $("#frqId option").not(":eq(0)").remove();//网格清空
						        $("#gridId option").not(":eq(0)").remove();//小区清空
						        $("#floorId option").not(":eq(0)").remove();//楼栋清空
  	                            $("#unitId option").not(":eq(0)").remove();//单元清空
  	                            $("#roomId option").not(":eq(0)").remove();//房间清空
//  	                        $("#frqId ,#gridId").attr("lay-filter","");//去掉监听事件
  	                            if(fpmsRange.length>0){
  	                            	$.each(fpmsRange, function(i,json){
  						               $("#gridId").append($("<option id='" + json["gridId"] + "' value='" + json["gridId"] + "'>" + json["gridName"] + "</option>"));
  						            });
  	                            }
  	                           if(gridfrqId.length>0){
	                            	$.each(gridfrqId, function(i,json){
						               $("#frqId").append($("<option id='" + json["residentialQuartersId"] + "' value='" + json["residentialQuartersId"] + "'>" + json["residentialQuartersName"] + "</option>"));
						            });
	                            }
//  	                          if(gridFloor.length>0){
//	                            	$.each(gridFloor, function(i,json){
//						               $("#floorId").append($("<option id='" + json["floorId"] + "' value='" + json["floorId"] + "'>" + json["floorName"] + "</option>"));
//						            });
//	                            }
						        
							}else if(User.type==4){
							   Regionallinkage()	//省份以下初始化加载  
					           $("#provinceCode ,#cityCode ,#areaCode ,#streetCode ,#communityId ,#gridId ,#frqId").attr("disabled",true);	
					           $("#floorId option").not(":eq(0)").remove();//小区清空
					           $("#unitId option").not(":eq(0)").remove();//单元清空
                               $("#roomId option").not(":eq(0)").remove();//房间清空
						       $.each(fpmsRange, function(i,json){
					              $("#floorId").append($("<option id='" + json["floorCode"] + "' value='" + json["floorCode"] + "'>" + json["floorName"] + "</option>"));
					           });
							}else if(User.type==5){	
								Regionallinkage()	//省份以下初始化加载	
					           $("#provinceCode ,#cityCode ,#areaCode ,#streetCode ,#communityId ,,#gridId ,#frqId ,#floorId").attr("disabled",true);
					           $("#unitId option").not(":eq(0)").remove();//小区清空	
					           $("#roomId option").not(":eq(0)").remove();//房间清空
						       $.each(fpmsRange, function(i,json){
					              $("#unitId").append($("<option id='" + json["unitCode"] + "' value='" + json["unitCode"] + "'>" + json["unitName"] + "</option>"));
					           });
							}else{
								Regionallinkage()	//省份以下初始化加载	
								$("#provinceCode ,#cityCode ,#areaCode").attr("disabled",true);
							}
							 form.render();
						}else{
				  		     layer.msg("数据加载失败", {icon: 5});
				  	     }      
      	  			} 	   
                 })
			}
		} 
}
//初始化加载市区县街道社区小区
function initallcityById(provinceCode,cityCode,areaCode,streetCode,communityId,residentialQuartersId,floorId,unitId,roomId){
    $._Ajax.jPost("/fpmsProvince/cityList.do", {"provinceCode": provinceCode}, function(data){
         $.each(data, function(i,json){
            $("#cityCode").append($("<option id='" + json["cityCode"] + "' value='" + json["cityCode"] + "'>" + json["cityName"] + "</option>"));
         });
         $("#cityCode").val(cityCode);
         form.render();
    }, function(){}); 
                 	             

   //区县
      $._Ajax.jPost("/fpmsProvince/areaList.do",{"cityCode": cityCode}, function(data){
         $.each(data, function(i,json){
            $("#areaCode").append($("<option id='" + json["areaCode"] + "' value='" + json["areaCode"] + "'>" + json["areaName"] + "</option>"));
         });
         $("#areaCode").val(areaCode);
         form.render();
      }, function(){});        	              
   //街道
      $._Ajax.jPost("/fpmsProvince/streetList.do", {"areaCode": areaCode}, function(data){
           $.each(data, function(i,json){
              $("#streetCode").append($("<option id='" + json["streetCode"] + "' value='" + json["streetCode"] + "'>" + json["streetName"] + "</option>"));
           });
		    $("#streetCode").val(streetCode);
           form.render();
      }, function(){});           	                 
   //社区
      $._Ajax.jPost("/fpmsCommunity/communityList.do", {"streetCode": streetCode}, function(data){
           $.each(data, function(i,json){
              $("#communityId").append($("<option id='" + json["id"] + "' value='" + json["id"] + "'>" + json["name"] + "</option>"));
           });
		    $("#communityId").val(communityId);		    
           form.render();
      }, function(){});           	                 
   //小区
      $._Ajax.jPost("/fpmsResidentialQuarters/frqList.do", {"communityId": communityId}, function(data){
           $.each(data, function(i,json){
              $("#frqId").append($("<option id='" + json["id"] + "' value='" + json["id"] + "'>" + json["name"] + "</option>"));
           });
           $("#frqId").val(residentialQuartersId);
           form.render();
      }, function(){});
    //楼栋
      $._Ajax.jPost("/fpmsFloor/floorList.do", {"rqId": residentialQuartersId}, function(data){
           $.each(data, function(i,json){
              $("#floorId").append($("<option id='" + json["id"] + "' value='" + json["id"] + "'>" + json["name"] + "</option>"));
           });
           $("#floorId").val(floorId);
           form.render();
      }, function(){});  
    //单元
      $._Ajax.jPost("/fpmsUnit/unitList.do", {"floorId": floorId}, function(data){
           $.each(data, function(i,json){
              $("#unitId").append($("<option id='" + json["id"] + "' value='" + json["id"] + "'>" + json["name"] + "</option>"));
           });
           $("#unitId").val(unitId);
           form.render();
      }, function(){});
    //房间
      $._Ajax.jPost("/fpmsRoom/roomList.do", {"unitId": unitId}, function(data){
           $.each(data, function(i,json){
              $("#roomId").append($("<option id='" + json["id"] + "' value='" + json["id"] + "'>" + json["name"] + "</option>"));
           });
           $("#roomId").val(roomId);
           form.render();
      }, function(){}); 
}

/**
 * 省市区县，街道小区联动函数
 * @returns
 */
function Regionallinkage(){	
	$("#provinceCode").val(User.provinceCode);
	var provinceCode = {"provinceCode": User.provinceCode};
	$.ajax({
		url:'/fpmsProvince/cityList.do',
		type:'POST',
		async:false,
		data:{"request" : JSON.stringify(provinceCode)},
		timeout: 200000,
		headers: setHeader(),
		success:function(data){
			var res = data.resultData;	
			if(data.status == 200) {
				if(res.length>0){
	                 $.each(res, function(i,json){
	 		            $("#cityCode").append($("<option id='" + json["cityCode"] + "' value='" + json["cityCode"] + "'>" + json["cityName"] + "</option>"));
	 		         });
				}
			}else{
	    	     layer.msg("数据加载失败", {icon: 5});
	    	}	
		}		
	})
	form.render();
	$("#cityCode").val(User.cityCode);
	var cityCode = {"cityCode": User.cityCode};
	$.ajax({
		url:'/fpmsProvince/areaList.do',
		type:'POST',
		async:false,
		data:{"request" : JSON.stringify(cityCode)},
		timeout: 200000,
		headers: setHeader(),
		success:function(data){
			var res = data.resultData;	
			if(data.status == 200) {
				if(res.length>0){
	                 $.each(res, function(i,json){
			            $("#areaCode").append($("<option id='" + json["areaCode"] + "' value='" + json["areaCode"] + "'>" + json["areaName"] + "</option>"));
			         });
				}
			}else{
	    	     layer.msg("数据加载失败", {icon: 5});
	    	}	
		}		
	})	
	form.render();
	$("#areaCode").val(User.areaCode);
	var areaCode = {"areaCode":User.areaCode};
	$.ajax({
		url:'/fpmsProvince/streetList.do',
		type:'POST',
		async:false,
		data:{"request" : JSON.stringify(areaCode)},
		timeout: 200000,
		headers: setHeader(),
		success:function(data){
			var res = data.resultData;	
			if(data.status == 200) {
				if(res.length>0){
	                 $.each(res, function(i,json){
			            $("#streetCode").append($("<option id='" + json["streetCode"] + "' value='" + json["streetCode"] + "'>" + json["streetName"] + "</option>"));
			         });
				}    
			}else{
	    	     layer.msg("数据加载失败", {icon: 5});
	    	}
		 }		
	})
	form.render();
	$("#streetCode").val(User.streetCode);
	var streetCode = {"streetCode":User.streetCode};		
	$.ajax({
		url:'/fpmsCommunity/communityList.do',
		type:'POST',
		async:false,
		data:{"request" : JSON.stringify(streetCode)},
		timeout: 200000,
		headers: setHeader(),
		success:function(data){
			var res = data.resultData;	
			if(data.status == 200) {
				if(res.length>0){
	                 $.each(res, function(i,json){
			            $("#communityId").append($("<option id='" + json["id"] + "' value='" + json["id"] + "'>" + json["name"] + "</option>"));
			         });
				}    
			}else{
	    	     layer.msg("数据加载失败", {icon: 5});
	    	}
		 }		
	})
	form.render();
	$("#communityId").val(User.communityId);
	var communityId = {"communityId":User.communityId};
	$.ajax({
		url:'/fpmsResidentialQuarters/frqList.do',
		type:'POST',
		async:false,
		data:{"request" : JSON.stringify(communityId)},
		timeout: 200000,
		headers: setHeader(),
		success:function(data){
			var res = data.resultData;	
			if(data.status == 200) {
				if(res.length>0){
	                 $.each(res, function(i,json){
			            $("#frqId").append($("<option id='" + json["id"] + "' value='" + json["id"] + "'>" + json["name"] + "</option>"));
			         });
				}    
			}else{
	    	     layer.msg("数据加载失败", {icon: 5});
	    	}
		 }		
	})
	form.render();
	$("#frqId").val(User.residentialQuartersId);

	var frqId = {"rqId": User.floorId};
	$.ajax({
		url:'/fpmsFloor/floorList.do',
		type:'POST',
		async:false,
		data:{"request" : JSON.stringify(frqId)},
		timeout: 200000,
		headers: setHeader(),
		success:function(data){
			var res = data.resultData;	
			if(data.status == 200) {
				if(res.length>0){
	                 $.each(res, function(i,json){
			            $("#floorId").append($("<option id='" + json["id"] + "' value='" + json["id"] + "'>" + json["name"] + "</option>"));
			         });
				}    
			}else{
	    	     layer.msg("数据加载失败", {icon: 5});
	    	}
			//$("#provinceCode").val(areaCode);
		}		
	  })
	  $("#floorId").val(User.floorId);
	form.render();

}
 