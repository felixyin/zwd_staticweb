var basePath = "http://39.104.21.7:20312";
//# sourceURL=app.js
$(function(){
    // cookie组件引入
//  $("body").append("<script src='/res/js/common/jquery.cookie.js'></script>");   
    //所有页面的刷新按钮
    $("#Reload").click(function(){
    	window.location.reload()//刷新当前页面
    })
    /*
    IE9placeholder支持
    */
   if(!placeholderSupport()){   // 判断浏览器是否支持 placeholder
       $('[placeholder]').focus(function() {
           var input = $(this);
           if (input.val() == input.attr('placeholder')) {
               input.val('');
               input.removeClass('placeholder');
           }
       }).blur(function() {
           var input = $(this);
           if (input.val() == '' || input.val() == input.attr('placeholder')) {
               input.addClass('placeholder');
               input.val(input.attr('placeholder'));
           }
       }).blur();
   };
})
 function placeholderSupport() {
        return 'placeholder' in document.createElement('input');
 }
/***************************************** Element begin******************************************/
/**
 * 加载页面下拉框
 * @param array [{method:"", id:""},...]
 * @returns
 */
function initDictItem(array){
    if(array.length <= 0)
    {
        return;
    }
    
    $.each(array, function(i,json){
        var _method = json.method;
        var id = json.id;
        var isFirstSel = null == json.isFirstSel ? false : true;
        initDictItemById(_method, id, isFirstSel);
    });
}

/**
 *通过ID加载下拉框
 * Demo: <select id="test_one" groupId="one" defaultSelected="姓名"  defaultMsg="请选择"  ></select>
 * groupId 字典组id
 * defaultSelected 回填项
 * defaultMsg 下拉框首选项
 */
function initDictItemById(method, id, isFirstSel){
    
	$("#" + id).unbind("loadDictItem");//解决多次调用重复绑定事件问题
    // 组件绑定事件
    $("#" + id).on(
        "loadDictItem",
        function(event, positionId, groupId, selectedId, defaultMsg, method)
        {
            // 判断需要加载的组件ID
            if(!positionId || "" == positionId)
            {
                return;
            }
            
            var $select = $("#" + positionId);
            if(!$select)
            {
                return;
            }
            
            // 先清组件空再添加内容
            $select.empty();

            
            // 添加默认选项
            if(defaultMsg && isFirstSel != true)
            {
                $select.append($("<option value=''>" + defaultMsg + "</option>"));
            }
            
            var data = {};
            
            if(groupId)
            {
                data.groupId = groupId;
            }
            
            $._Ajax.jPost(method, data, function(res){
                //遍历代码
                $.each(res, function(i,json)
                {
                    //每次遍历创建一个option对象   并添加到select对象（判断一下是否需要回显）
                    var $option = $("<option value='" + json["dictId"] + "'>" + json["dictName"] + "</option>");
                    /* 判断是否需要回显 */
                    if(selectedId && json['dictId'] == selectedId)
                    {
                        $option.attr("selected", "selected");
                    }
                    /* 添加option对象 */
                    $select.append($option);
                });
            }, function(){}, false);
        }
    );
    
    // 组件事件触发
    $("#" + id).each(function (i){
        // 获取组件ID
        var positionId = this.getAttribute("id");
        // 获取字典组groupId
        var groupId = this.getAttribute("groupId");
        // 回显ID
        var selected = this.getAttribute("defaultSelected") || "";
        // 首项
        var defaultMsg = this.getAttribute("defaultMsg") || "请选择";

        // 触发事件
        $(this).trigger("loadDictItem",[positionId, groupId, selected, defaultMsg, method]);
    });
}

/**
 *省份下拉
 */
function initProvinceById(method, id, isFirstSel){
    
	$("#" + id).unbind("loadDictItem");//解决多次调用重复绑定事件问题
    // 组件绑定事件
    $("#" + id).on(
        "loadDictItem",
        function(event, positionId, groupId, selectedId, defaultMsg, method)
        {
            // 判断需要加载的组件ID
            if(!positionId || "" == positionId)
            {
                return;
            }
            
            var $select = $("#" + positionId);
            if(!$select)
            {
                return;
            }
            
            // 先清组件空再添加内容
            $select.empty();

            
            // 添加默认选项
            if(defaultMsg && isFirstSel != true)
            {
                $select.append($("<option value=''>" + defaultMsg + "</option>"));
            }
            
            var data = {};
            
            if(groupId)
            {
                data.groupId = groupId;
            }
            
            $._Ajax.jPost(method, data, function(res){
                //遍历代码
                $.each(res, function(i,json)
                {
                    //每次遍历创建一个option对象   并添加到select对象（判断一下是否需要回显）
                    var $option = $("<option value='" + json["provinceCode"] + "'>" + json["provinceName"] + "</option>");
                    /* 判断是否需要回显 */
                    if(selectedId && json['provinceCode'] == selectedId)
                    {
                        $option.attr("selected", "selected");
                    }
                    /* 添加option对象 */
                    $select.append($option);
                });
            }, function(){}, false);
        }
    ); 
    // 组件事件触发
    $("#" + id).each(function (i){
        // 获取组件ID
        var positionId = this.getAttribute("id");
        // 获取字典组groupId
        var groupId = this.getAttribute("groupId");
        // 回显ID
        var selected = this.getAttribute("defaultSelected") || "";
        // 首项
        var defaultMsg = this.getAttribute("defaultMsg") || "请选择省份";
        // 触发事件
        $(this).trigger("loadDictItem",[positionId, groupId, selected, defaultMsg, method]);
    });
}


/**
 * 通过字典配置加载页面查询条件组件
 * @returns
 */
function initCondition(){
    $("div[condition]").each(function (i){   	
        // 获取组件ID
        var id = this.getAttribute("id");
        initConditionById(id);
    });
} 

/**
 * 通过ID加载查询条件组件
 * @param id
 * @returns
 */
function initConditionById(id){
    $("#" + id).on(
        "loadCondition",
        function(event, positionId, groupId){
            // 判断需要加载的组件ID
            if(!positionId || "" == positionId)
            {
                return;
            }
            
            // 先清组件空再添加内容
            $("#" + positionId).empty();
            
            var data = null;
            if(groupId)
            {
                data = {"groupId": groupId};
            }
            var $element = $("#" + positionId);

            $._Ajax.jPost("/main/common/getDictItemNew.json", data, function(res){
                //遍历代码
                $.each(res, function(i,json)
                {
                    var dictId = json["dictid"];
                    var dateElementReg = /^.*?_elDate$/;
                    var selectElementReg = /^.*?_elSelect$/;
                    // 添加label
                    var $label = $("<label class='layui-form-label mr_8'>" + json["dictname"] + "</label>");
                    if(dateElementReg.test(dictId))
                    {
                        // 开始时间
                        var $startEl = $("<div class='layui-input-inline'></div>");
                        
                        $startEl.append($("<input type='text' id='startTime'  name='startTime' placeholder='' autocomplete='off' class='layui-input' condition />"));
                        $startEl.append($("<i class='layui-icon layui-date' >&#xe637;</i>"));

                        // 连接符号
                        var $linkEl = $("<div class='span-inline'></div>");
                        $linkEl.append($("<span>_</span>"));
                        // 结束时间
                        var $endEl = $("<div class='layui-input-inline'></div>");
                        $endEl.append($("<input type='text' id='endTime'  name='endTime' placeholder='' autocomplete='off' class='layui-input' condition />"));
                        $endEl.append($("<i class='layui-icon layui-date' >&#xe637;</i>"));

                        $element.append($label);
                        $element.append($startEl);
                        $element.append($linkEl);
                        $element.append($endEl);
                    }
                    else if(selectElementReg.test(dictId))
                    {
                        var $div = $("<div class='layui-input-inline'></div>");
                        var name = dictId.split("_el");
                        var $select = $("<select name='" + name[0] + "' id='" + dictId + "' defaultMsg='全部'  condition></select>");

                        $div.append($select);
                        $element.append($label);
                        $element.append($div);
                    }
                    else
                    {
                        var $div = $("<div class='layui-input-inline'></div>");
                        $div.append($("<input id='" + dictId + "' class='layui-input' type='text' placeholder='请输入关键词' autocomplete='off' condition/>"));

                        $element.append($label);
                        $element.append($div);

                    }
                });
            }, function(res){}, false);
        }
    );
    
    $("#" + id).each(function (i){
        // 获取组件ID
        var positionId = this.getAttribute("id");
        // 获取字典组groupId
        var groupId = this.getAttribute("condition");
        // 触发事件
        $(this).trigger("loadCondition",[positionId, groupId]);
    });
}

/**
 * 获取所有查询条件
 * @returns {"condition":[{"field":"field", "keyword": "keyword"}, ......], ......}
 */
function getConditionValue(){
    var result = {"condition":[]};
    // input取值
    $("input[condition]").each(function (i){
       // 获取字段
       var field = this.getAttribute("name");
       // 获取查询条件
       var keyword = $(this).val();
       if(null != keyword && "" != keyword.trim())
       {
    	   result.condition.push({"field": field, "keyword": keyword});
       }
    });
    
    // 下拉框取值
    $("select[condition]").each(function (i){
       // 获取字段
       var field = this.getAttribute("id");
       // 获取查询条件
       var keyword = $(this).val();
       result.condition.push({"field": field, "keyword": keyword});
    });
    
    return result;
}

//单击行勾选checkbox事件(多选)
function checkfun(){        
    $(document).on("click",".layui-table-body table.layui-table tbody tr", function () {
         var index = $(this).attr('data-index');
         var tableBox = $(this).parents('.layui-table-box');
         //存在固定列
         if (tableBox.find(".layui-table-fixed.layui-table-fixed-l").length>0) {
          tableDiv = tableBox.find(".layui-table-fixed.layui-table-fixed-l");
         } else {
          tableDiv = tableBox.find(".layui-table-body.layui-table-main");
         }
         var checkCell = tableDiv.find("tr[data-index=" + index + "]").find("td div.laytable-cell-checkbox div.layui-form-checkbox I");
         if (checkCell.length>0) {
          checkCell.click();
         }
    });
     
    $(document).on("click", "td div.laytable-cell-checkbox div.layui-form-checkbox", function (e) {
        e.stopPropagation();
    });
}
  
function checkonlyfunc(){
    $(document).on("click",".layui-table-body table.layui-table tbody tr", function () {
        var index = $(this).attr('data-index');
        var tableBox = $(this).parents('.layui-table-box');
        //存在固定列
        if (tableBox.find(".layui-table-fixed.layui-table-fixed-l").length>0) {
            tableDiv = tableBox.find(".layui-table-fixed.layui-table-fixed-l");
        } else {
            tableDiv = tableBox.find(".layui-table-body.layui-table-main");
        }
        //获取已选中列并取消选中
        var trs = tableDiv.find(".layui-unselect.layui-form-checkbox.layui-form-checked").parent().parent().parent();
        for(var i = 0;i<trs.length;i++){
            var ind = $(trs[i]).attr("data-index");
            if(ind!=index){
                var checkCell = tableDiv.find("tr[data-index=" + ind + "]").find("td div.laytable-cell-checkbox div.layui-form-checkbox I");
                if (checkCell.length>0) {
                      checkCell.click();
                }
            }
        }
        //选中单击行
        var checkCell = tableDiv.find("tr[data-index=" + index + "]").find("td div.laytable-cell-checkbox div.layui-form-checkbox I");
        if (checkCell.length > 0) {
            checkCell.click();
        }
    });
    $(document).on("click", "td div.laytable-cell-checkbox div.layui-form-checkbox", function (e) {
        e.stopPropagation();
    });
}
/***************************************** Element end******************************************/

/***************************************** Form begin******************************************/
/**
 * 表单序列化jsonString
 * @param formId 表单ID
 * @param checkBoxArray 表单中包含的复选框 name属性数组 [复选框1, 复选框2]
 * @Example
 * <form id="myForm" action="" method="">
 *     <input type="checkBox" name="groupid" id="groupid_01" value="lq"/>&nbsp;&nbsp;
 *     <input type="checkBox" name="groupid" id="groupid_02" value="zq"/>&nbsp;&nbsp;
 *     <br />
 *     <input type="checkBox" name="companyid" id="companyid_01" value="qq"/>&nbsp;&nbsp;
 *     <input type="checkBox" name="companyid" id="companyid_02" value="zz"/>&nbsp;&nbsp;
 * </form>
 * 
 * 方法调用   fromToJsonString("myForm", ["groupid", "companyid"]);
 * @returns  "{"groupid":["zq","zq"], "companyid":["qq", "zz"]}"
 */
function fromToJsonString(formId, checkBoxArray){
    // json对象再转换成json字符串
    return JSON.stringify(formToJsonObj(formId, checkBoxArray));
}


/**
 * 表单序列化jsonString
 * @param formId 表单ID
 * @param checkBoxArray 表单中包含的复选框 name属性数组 [复选框1, 复选框2]
 * @Example
 * <form id="myForm" action="" method="">
 *     <input type="checkBox" name="groupid" id="groupid_01" value="lq"/>&nbsp;&nbsp;
 *     <input type="checkBox" name="groupid" id="groupid_02" value="zq"/>&nbsp;&nbsp;
 *     <br />
 *     <input type="checkBox" name="companyid" id="companyid_01" value="qq"/>&nbsp;&nbsp;
 *     <input type="checkBox" name="companyid" id="companyid_02" value="zz"/>&nbsp;&nbsp;
 * </form>
 * 
 * 方法调用   formToJsonObj("myForm", ["groupid", "companyid"]);
 * @returns  {groupid:["zq","zq"], companyid:["qq", "zz"]}
 */
function formToJsonObj(formId, checkBoxArray) {
    var paramArray = $('#' + formId).serializeArray();  
    /*请求参数转json对象*/  
    var jsonObj={};
    
    // 给复选框对象赋值空数组
    if(checkBoxArray.length > 0){
        for(var i = checkBoxArray.length - 1; i >= 0 ; i--){
            jsonObj[checkBoxArray[i]] = [];
        }
    }
    
    // 循环处理form表单项
    $(paramArray).each(function(){  
        // 判断是否是复选框
        if(checkBoxArray.indexOf(this.name) >= 0){
            jsonObj[this.name].push(this.value);
        }
        else
        {
            jsonObj[this.name]=this.value; 
        }
        
    });  
    return jsonObj;
}

/**
 * 获取页面所有radio的值
 * @returns [['name', 'val'],...]
 */
function getAllRadio(){
    var resultArray = [];
    $("input[type='radio']").each(function (i){
        var array = [];
        var name = this.getAttribute("name");
        var value = getRadioVal(name);
        array.push(name);
        array.push(value);
        resultArray.push(array);
    })
    return resultArray;
}

/**
 * radio取值
 * @param name radio name值
 * @returns 没有选中项返回null
 */
function getRadioVal(name){
    
    var radioVal = null;
    
    $("input[name='" + name +"']").each(function (i){
        var chk = this.getAttribute("checked");
        if(chk){
            var id = this.getAttribute("id");
            radioVal = $("#" + id).val();
        }
    });
    
    return radioVal;
}
/***************************************** Form end******************************************/

/***************************************** CIP begin******************************************/
/**
 * 获取本机ip
 * getUserIP(function(ip){
 *    alert("Got IP! :" + ip);
 * });
 * @param onNewIP
 * @returns
 */
function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
       iceServers: []
   }),
   noop = function() {},
   localIPs = {},
   ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
   key;

   function iterateIP(ip) {
       if (!localIPs[ip]) onNewIP(ip);
       localIPs[ip] = true;
  }

    //create a bogus data channel
   pc.createDataChannel("");

   // create offer and set local description
   pc.createOffer().then(function(sdp) {
       sdp.sdp.split('\n').forEach(function(line) {
           if (line.indexOf('candidate') < 0) return;
           line.match(ipRegex).forEach(iterateIP);
       });
       
       pc.setLocalDescription(sdp, noop, noop);
   }).catch(function(reason) {
       // An error occurred, so handle the failure to connect
   });

   //sten for candidate events
   pc.onicecandidate = function(ice) {
       if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
       ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
   };
}
/***************************************** CIP end******************************************/

/***************************************** Ajax begin******************************************/

(function (){
    /**
     * ajax请求封装
     */
    $._Ajax = {
        /**
         * post请求-有参数
         * @param path
         * @param data
         * @param succCallback
         * @param errorCallback
         * @returns
         */
        jPost : function(path, data, succCallback, errorCallback, isSyn){
            baseAjax(path, formatParam(data), 'POST', succCallback, errorCallback, isSyn);
        },
        /**
         * post请求-无参数
         * @param path
         * @param succCallback
         * @param errorCallback
         * @returns
         */
        noParameterJPost : function(path, succCallback, errorCallback, isSyn){
            baseAjax(path, {}, 'POST', succCallback, errorCallback, isSyn);
        },
        /**
         * Get请求-有参数
         * @param path
         * @param data
         * @param succCallback
         * @param errorCallback
         * @returns
         */
        jGet : function(path, data, succCallback, errorCallback){
            baseAjax(path, formatParam(data), 'GET', succCallback, errorCallback);
        },
        /**
         * Get请求-无参数
         * @param path
         * @param succCallback
         * @param errorCallback
         * @returns
         */
        noParameterJGet : function(path, succCallback, errorCallback){
             baseAjax(path, {}, 'GET', succCallback, errorCallback)
        },

        /**
         * 上传文件
         * @param path
         * @param requestData
         * @param succCallback
         * @param errorCallback
         */
        upload : function(path, requestData, succCallback, errorCallback){
            var header = setHeader();

            $.ajax({
                url: path,               //请求地址
                type: "POST",              //请求类型
                data: requestData,              //请求数据
                timeout: 200000,                //请求超时时间(毫秒)
                headers: header,
                contentType: false,
                processData: false,
                success:function(res){         //请求成功
                    if(res.resultData)
                    {
                        res.resultData.icon = res.icon;
                        res.resultData.resultMsg = res.resultMsg;
                        res.resultData.status = res.status;
                    }

                    if(res.isAlert)
                    {
                        if(res.status == 200)
                        {
                            succCallback(res.resultData);
                        }
                        alert(res.err_code + ": " + res.resultMsg);
                    }
//                    else
//                    {
//                        succCallback(res.resultData);
//                    }
                    else
                    {
                    	if(res.status == 200){
                            succCallback(res.resultData);
                        }else{
                    		 if(res.resultData){
                    			 succCallback(res.resultData);
                             }
                    		 else{
                    			 succCallback(res);
                    		 }                		
                    	}
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){
                    errorCallback(XMLHttpRequest, textStatus, errorThrown);
                }
            })
        }
    }
    
    /**
     * ajax请求
     * @param requestPath
     * @param requestData
     * @param requestType
     * @param succCallback
     * @param errorCallback
     * @param dataType
     * @returns
     */
    function baseAjax(requestPath, requestData,requestType,succCallback, errorCallback, isSyn){
        /*requestPath：请求路径
        requestData：请求参数，默认为空
        requestType：请求方式("POST" 或 "GET")， 默认为 "GET"
        succCallback：请求成功回调函数
        errorCallback：请求失败回调函数
        dataType：预期服务器返回的数据类型， 默认为 JSON */
       requestData = requestData || {};
       requestType = requestType || 'GET';
       var header = setHeader();
       var syn = null == isSyn ? true : isSyn;
       $.ajax({
           url: requestPath,               //请求地址
           type: requestType,              //请求类型
           data: requestData,              //请求数据
           timeout: 200000,                //请求超时时间(毫秒)
           headers: header,
           async : syn,
           success:function(res){         //请求成功
               if(res.resultData)
               {
                   res.resultData.icon = res.icon;
                   res.resultData.resultMsg = res.resultMsg;
                   res.resultData.status = res.status;
               }

               if(res.isAlert)
               {
                   if(res.status == 200)
                   {
                       succCallback(res.resultData);
                   }
                   alert(res.err_code + ": " + res.resultMsg);
               }
               else
               {
               	if(res.status == 200){
                       succCallback(res.resultData);
                   }else{
               		 if(res.resultData){
               			 succCallback(res.resultData);
                        }
               		 else{
               			 succCallback(res);
               		 }                		
               	}
               }
           },
           error:function(XMLHttpRequest, textStatus, errorThrown){
               errorCallback(XMLHttpRequest, textStatus, errorThrown);
           }
       })
   }
})();

/**
 * 错误页面跳转
 * @param data
 * @returns
 */
/*function errorFn(data){
    if(data.status == 401)
    {
        window.location = "/res/page/error/401.html";
    }
    else
    {
        window.location = "/res/page/error/500.html";
    }
}
*/
/**
 * 设置请求头
 * @returns
 */
function setHeader(){
//    $.cookie('the_cookie'); // 读取 cookie 
//    $.cookie('the_cookie', 'the_value'); // 存储 cookie 
//    $.cookie('the_cookie', 'the_value', { expires: 7 }); // 存储一个带7天期限的 cookie 
//    $.cookie('the_cookie', '', { expires: -1 }); // 删除 cookie
//  var token = $.cookie("4b3c17fc6d869272dec20686acce38f1");
//  return {"token" : token, "isClient":"web"};
}

/**
 * ajax 调服务前组装数据
 * @param num 请求数据源
 * @returns
 */
function formatParam(num){
    return {"request": JSON.stringify(num), "cip":"47.93.196.213", "cannel": "web", "nowTime" : new Date()};
};
/***************************************** Ajax end******************************************/

/***************************************** pageTools begin******************************************/
/**
 * 页面组件加载，通过页面初始化配置obj对象 反向加载渲染页面
 * 通用组件，特殊页面需要单独处理
 * @param obj 页面加载项配置对象 
 * @returns
 */
function ResPonse(){
	var ResPonseData={
             statusName: 'status', //规定数据状态的字段名称，默认：code
             statusCode: 200, //规定成功的状态码，默认：0
             msgName: 'hint', //规定状态信息的字段名称，默认：msg
             countName: 'total', //规定数据总数的字段名称，默认：count
             dataName: 'data' //规定数据列表的字段名称，默认：data
        };
	return ResPonseData
}
function TimeTools(){
    //渲染表格数据
    layui.use(['table','form','laypage','layer', 'element', 'laydate'], function(){
       var table = layui.table
          ,form=layui.form
          ,laypage = layui.laypage //分页
          ,layer = layui.layer //弹层
          ,element = layui.element //元素操作
          ,laydate = layui.laydate //时间组件
           
        laydate.render({       //时间控件调用
            elem: '#startTime',
            type: 'datetime',
            trigger: 'click'
        });
        
        laydate.render({       //时间控件调用
            elem: '#endTime',
            type: 'datetime',
            trigger: 'click'
        }); 
    });
    //重新渲染表单
    function renderForm(){
         layui.use(['table','form'], function(){
         var form = layui.form, table = layui.table;
         var reqData = getConditionValue();
         // 刷新表格数据
         table.reload({
             where: {"reqData" : JSON.stringify(reqData)}
         });
      });
    }

}
/***************************************** pageTools end******************************************/

/***************************************** treeUtils begin******************************************/
/**
 * 递归解析ztree数据 
 * @returns
 */
function analysisNodes(nodeList)
{   
    var resultList = [];
    for(var i = 0; i < nodeList.length; i++)
    {
        var children = nodeList[i].children;
        if(!children)
        {
            resultList.push(nodeList[i]);
        }
        else
        {
            resultList.push(nodeList[i]);
            var childList = analysisNodes(children);
            $.each(childList, function(i, e){
                resultList.push(e);
            });
        }
    }
    
    return resultList;
}

//默认加载选中节点
function onAsyncSuccess(){
       // 获取树对象
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    /** 获取所有树节点 */
    var nodes = treeObj.transformToArray(treeObj.getNodes());
        // 遍历树节点设置树节点为选中
        for (var k = 0, length_3 = nodes.length; k < nodes.length; k++) {
        	var flag=false;
        	if(nodes[k].children!='undefined'||nodes[k].children!='null'||nodes[k].children!=''){//存在子集 不能被选中；
        		flag=true;
        	}
//        	if(!nodes[k].hasOwnProperty("children")){
//        		flag=true;
//        	}
            if (nodes[k].hasPerm==true && flag) {
                nodes[k].checked = true;
                treeObj.updateNode(nodes[k],true);
            }else{
            	nodes[k].hasPerm==false;
            	nodes[k].checked = false;
                treeObj.updateNode(nodes[k],false);
            }
        }           
}

/***************************************** treeUtils end******************************************/

/*****************************************ChartUtil begin******************************************/
/**
 * 加载柱状图
 * @param methodName 加载方法名
 * @param data 入参数据
 * @param _myChart 柱状图对象
 * @returns
 */
function initChart( data, _myChart)
{
    var myChart = _myChart;
    $._Ajax.jPost("/Statistics/getChart.json", data, function(res){
        // 显示标题，图例和空的坐标轴
        myChart.setOption(res);
    }, function(){});
}
/*****************************************ChartUtil end******************************************/

/**
 * 下拉框回填方法
 * @param id 下拉框id
 * @param val 回填项 
 * @returns
 */
function selectDef(id, val)
{
    $("#" + id + " option").each(function(){
        $this = $(this).val();
        $(this).removeAttr('selected');
        if($this == val){
            $(this).attr('selected',true);
         }
    });
}

/**
 * 获取请求参数
 * @param name
 * @returns
 */
function getQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

/**
 * 时间转换
 * @param dateStr
 * @returns
 */
function dateFormatUtil(dateStr)
{
	var reg = /^[0-9]*$/;
    
    if(reg.test(dateStr)){
        var datetime = new Date();
        datetime.setTime(dateStr);
        var year = datetime.getFullYear();
        var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
        var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        var currTime = year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
        //var currTime = year + "/" + month + "/" + date;
        return currTime;
    }
}

/**
 * 格式化 new Date() 格式时间
 * @param time
 * @returns {string}
 */
function timeStamp2String(time){
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    return year + "-" + month + "-" + date;
}
function changeTime(data){
	var dataTime=data;
	if(dataTime){
		return dateFormatUtil(dataTime);
	}else{
		return ""
	}
}
/**
 * 格式化 new Date() 格式时间
 * @param time
 * @returns {string}
 */
function afterDate(time, after){
    if(!after){
        return time;
    }
    time = time.replace(/-/g,'');
    var date;

    var year = time.substring(0,4);
    var month = time.substring(4,6);
    var day = time.substring(6,8);
    date = new Date(year, month-1, day); // 月份是从0开始的

    date.setDate(date.getDate() + after);

    var yearStr = date.getFullYear();
    var monthStr = ("0"+(date.getMonth()+1)).slice(-2, 8); // 拼接2位数月份
    var dayStr = ("0"+date.getDate()).slice(-2, 8); // 拼接2位数日期

    return yearStr + "-" + monthStr + "-" + dayStr;
}

/**
 * 正则校验IP
 * @returns
 */
function ipfun(){
    var ipname=$("#hostip").val();
    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/; 
    if (!reg.test(ipname)) { 
       $("#hostip").focus(); 
       layer.msg('请输入正确的IP地址!', {icon: 5});
       return false; 
    } 
}

//判断是否在前面加0
function getNow(s) {
  return s < 10 ? '0' + s: s;
}
//获取当前时间
function nowdata(a){
	var myDate = new Date();             

	var year=myDate.getFullYear();        //获取当前年
	var month=myDate.getMonth()+1;   //获取当前月
	var date=myDate.getDate();            //获取当前日


	var h=myDate.getHours();              //获取当前小时数(0-23)
	var m=myDate.getMinutes();          //获取当前分钟数(0-59)
	var s=myDate.getSeconds();

	var nowstart=year+'-'+getNow(month)+"-"+getNow(date)+" 00:00:00";
	var nowend=year+'-'+getNow(month)+"-"+getNow(date)+" 23:59:59";
	if(a==1){
		return nowstart
	}else{
		return nowend
	}
	
}

/**
 * 空判断
 * @param str
 * @returns {boolean}
 */
function isNullStr(str)
{
    return !str || "" == str ? true : false;
}

/**
 * 非空判断
 * @returns {boolean}
 */
function isNotNullStr()
{
    return !isNullStr();
}

/**
 * name layui合并tbody中单元格的方法
 * @param tableId  表格的id属性
 * @param fieldName 要合并的列field值
 * @desc 此方式适用于没有列冻结的单元格合并
 */
function tableRowSpanNoFixedCol(tableId, fieldName) {
    if (!tableId && !fieldName) {
        console.log('tableId, fieldName为必填项');
        return false;
    }
    // 获取页面中全部的表格元素
    var allTableNode = document.getElementsByClassName("layui-table-view");

    // 获取lay-id属性为tableId的表格元素的
    var targetTableNode = null;
    if (allTableNode.length > 0) {
        for (var index = 0, length = allTableNode.length; index < length; index++) {
            // 通过lay-id属性过滤表格元素
            var tableLayId = allTableNode[index].getAttribute("lay-id");
            if (tableLayId === tableId) {
                targetTableNode = allTableNode[index];
                break;
            }
        }
    }
    if (!targetTableNode) {
        console.log('没有找到ID为：' + tableId + '的表格, 请升级您的layui版本');
        return false;
    }

    // 开始合并单元格操作
    var tBodyNode = targetTableNode.getElementsByClassName("layui-table-body")[0];

    var tdNodes = tBodyNode.getElementsByTagName("td");
    var childFilterArr = [];
    // 获取data-field属性为fieldName的td
    for (var i = 0; i < tdNodes.length; i++) {
        if (tdNodes[i].getAttribute("data-field") === fieldName) {
            childFilterArr.push(tdNodes[i]);
        }
    }

    // 获取td的个数和种类
    var childFilterTextObj = {};
    var childFilterArrLength = childFilterArr.length;
    for (var j = 0; j < childFilterArrLength; j++) {
        var childText = childFilterArr[j].textContent;
        if (childFilterTextObj[childText] === undefined) {
            childFilterTextObj[childText] = 1;
        } else {
            var num = childFilterTextObj[childText];
            childFilterTextObj[childText] = num * 1 + 1;
        }
    }
    // 给获取到的td设置合并单元格属性
    for (var key in childFilterTextObj) {
        var tdNum = childFilterTextObj[key];
        var canRowSpan = true;
        var needChangeBackGroundNodes = [];
        var addEventNode = null;
        for (var h = 0; h < childFilterArrLength; h++) {
            if (childFilterArr[h].textContent === key) {
                needChangeBackGroundNodes.push(childFilterArr[h]);
                if (canRowSpan) {
                    childFilterArr[h].setAttribute("rowspan", tdNum);
                    addEventNode = childFilterArr[h];
                    canRowSpan = false;
                } else {
                    childFilterArr[h].style.display = "none";
                }
            }
        }

        // 以下为单元格鼠标悬浮样式修改(使用闭包)
        (function (addEventNode, needChangeBackGroundNodes) {
            addEventNode.onmouseover = function () {
                for (var index = 0, length = needChangeBackGroundNodes.length; index < length; index++) {
                    needChangeBackGroundNodes[index].parentNode.style.background = "#f2f2f2"; // 我这里的单元格鼠标滑过背景色为layui默认，你可以更改为你想要的颜色。
                }
            };
            addEventNode.onmouseout = function () {
                for (var index = 0, length = needChangeBackGroundNodes.length; index < length; index++) {
                    needChangeBackGroundNodes[index].parentNode.style.background = "";
                }
            };
        })(addEventNode, needChangeBackGroundNodes);
    }
}

/**
 * name layui合并tbody中单元格的方法
 * @param tableId  表格的id属性
 * @param fieldName 要合并的列field值
 * @param leftOrRight 要合并的列fixed值,'left','right'
 * @desc 此方式适用于列冻结的单元格合并
 */
function tableRowSpanOfFixedCol(tableId, fieldName, leftOrRight) {
    if (!tableId && !fieldName) {
        console.log('tableId, fieldName为必填项');
        return false;
    }

    // 获取页面中全部的表格元素
    var allTableNode = document.getElementsByClassName("layui-table-view");

    // 获取lay-id属性为tableId的表格元素的
    var targetTableNode = null;
    if (allTableNode.length > 0) {
        for (var index = 0, length = allTableNode.length; index < length; index++) {
            // 通过lay-id属性过滤表格元素
            var tableLayId = allTableNode[index].getAttribute("lay-id");
            if (tableLayId === tableId) {
                targetTableNode = allTableNode[index];
            }
        }
    }
    if (!targetTableNode) {
        console.log('没有找到ID为：' + tableId + '的表格,请升级您的layui版本');
        return false;
    }
    // 左侧列为冻结的情况
    var tBodyNode = targetTableNode.getElementsByClassName("layui-table-body")[0];
    var tBodyNodeFixed = null;
    if (leftOrRight === 'right') {
        tBodyNodeFixed = targetTableNode.getElementsByClassName("layui-table-fixed-r")[0];
    } else {
        tBodyNodeFixed = targetTableNode.getElementsByClassName("layui-table-fixed-l")[0];
    }

    var tdNodesFixed = tBodyNodeFixed.getElementsByTagName("td");
    var tdNodes = tBodyNode.getElementsByTagName("td");
    var childFilterArrFixed = [];
    var childFilterArr = [];
    // 获取data-field属性为fieldName的td
    for (var i = 0; i < tdNodesFixed.length; i++) {
        if (tdNodesFixed[i].getAttribute("data-field") === fieldName) {
            childFilterArrFixed.push(tdNodesFixed[i]);
        }
    }
    for (var l = 0; l < tdNodes.length; l++) {
        if (tdNodes[l].getAttribute("data-field") === fieldName) {
            childFilterArr.push(tdNodes[l]);
        }
    }
    // 获取td的个数和种类
    var childFilterArrLength = childFilterArrFixed.length;
    var childFilterTextObj = {};
    for (var j = 0; j < childFilterArrLength; j++) {
        var childText = childFilterArrFixed[j].textContent;
        if (childFilterTextObj[childText] === undefined) {
            childFilterTextObj[childText] = 1;
        } else {
            var num = childFilterTextObj[childText];
            childFilterTextObj[childText] = num * 1 + 1;
        }
    }
    // 给获取到的td设置合并单元格属性
    for (var key in childFilterTextObj) {
        var tdNum = childFilterTextObj[key];
        var canRowSpan = true;
        var needChangeBackGroundNodesFixed = [];
        var needChangeBackGroundNodes = [];
        var addEventNode = null;
        for (var h = 0; h < childFilterArrLength; h++) {
            if (childFilterArrFixed[h].innerText === key) {
                needChangeBackGroundNodesFixed.push(childFilterArrFixed[h]);
                if (canRowSpan) {
                    childFilterArrFixed[h].setAttribute("rowspan", tdNum);
                    addEventNode = childFilterArrFixed[h];
                    canRowSpan = false;
                } else {
                    childFilterArrFixed[h].style.display = "none";
                }
            }
        }
        for (var m = 0; m < childFilterArrLength; m++) {
            if (childFilterArr[m].innerText === key) {
                needChangeBackGroundNodes.push(childFilterArr[m]);
            }
        }

        // 以下为单元格鼠标悬浮样式修改(使用闭包)
        (function (addEventNode, needChangeBackGroundNodes, needChangeBackGroundNodesFixed) {
            addEventNode.onmouseover = function () {
                for (var index = 0, length = needChangeBackGroundNodes.length; index < length; index++) {
                    needChangeBackGroundNodesFixed[index].parentNode.style.background = "#f2f2f2"; // 我这里的单元格鼠标滑过背景色为layui默认，你可以更改为你想要的颜色。
                    needChangeBackGroundNodes[index].parentNode.style.background = "#f2f2f2"; // 我这里的单元格鼠标滑过背景色为layui默认，你可以更改为你想要的颜色。
                }
            };
            addEventNode.onmouseout = function () {
                for (var index = 0, length = needChangeBackGroundNodes.length; index < length; index++) {
                    needChangeBackGroundNodesFixed[index].parentNode.style.background = "";
                    needChangeBackGroundNodes[index].parentNode.style.background = "";
                }
            };
        })(addEventNode, needChangeBackGroundNodes, needChangeBackGroundNodesFixed);
    }
}