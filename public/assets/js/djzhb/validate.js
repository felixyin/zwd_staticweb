/**
 * 一个简单地字符验证工具 作者：ZQC
 */
var validate = {
	// 验证文件类型
	filetype : function(value1, value2) {
		if(value2==3){//图片
            var typeimage = ["PNG","BMP","JPG","JPEG","GIF"],
                extStart = value1.lastIndexOf('.'),
                ext = value1.substring(extStart+1, value1.length).toUpperCase();
            
            if ($.inArray(ext,typeimage)<0) {
          	    //layer.msg("请传入正确的文件格式，图片限于：\"BMP\",\"png\",\"gif\",\"jpeg\",\"jpg\"格式",{time:4000,closeBtn: 1}) 
	                 return false;
             }
            return true;
          }
	  	if(value2==2){//文档
	  		var typeAllow = ["PDF","DOC","DOCX","XLS","XLSX"],
	              fileStart = value1.lastIndexOf('.'),
	              fileType = value1.substring(fileStart+1, value1.length).toUpperCase();
	  		//判断是否存在于配置数组 
	  		if($.inArray(fileType,typeAllow)<0){ 
	  			 //layer.msg("请传入正确的文档格式，文档限于：\"doc\",\"docx\",\"xls\",\"xlsx\",\"pdf\" ",{time:4000,closeBtn: 1}) 
	  			 return false; 
	  		}
	  		 return true;
	      }
	},
	//验证文件后缀是否相同
	Equalfile : function(value1, value2) {
		var NameFile = value1.lastIndexOf('.'),
            ext = value1.substring(NameFile+1, value1.length).toUpperCase();
		    UpNameFile = value2.lastIndexOf('.'),
            Upext = value2.substring(UpNameFile+1, value2.length).toUpperCase();
		return ext === Upext;
	},
	// 验证两个字符是否相等
	equals : function(value1, value2) {
		return value1 === value2;
	},
	// 验证是否为空，会忽略空格
	isBlank : function(value) {
		if (this.isEmpty(value)) {
			return true;
		}
		// 去空格后验证
		return value.replace(/^\s\s*/, '').replace(/\s\s*$/, '') == '';
	},
	intLimit8 : function(value){
		var pattern = /^\d{0,8}$/;
		return pattern.test(value);
	},
	// 验证是否为空，不会忽略空格
	isEmpty : function(value) {
		return (value == undefined || value == null || value == '');
	},
	// 验证url
	isURL : function(value) {
		var pattern = /[a-zA-z]+:\/\/[^\s]/;
		return pattern.test(value);
	},
	// 验证邮箱
	isEmail : function(value) {
		var pattern = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
		return pattern.test(value);
	},
	// 验证IP地址，ipv4 ipv6均支持
	isIp : function(value) {
		var pattern = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])((\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}|(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){5})$/;
		return pattern.test(value);
	},
	// 验证电话，座机号码
	isTel : function(value) {
		var pattern = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
		return pattern.test(value);
	},
	// 验证手机号
	isPhone : function(value) {
		var pattern = /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[5679]|15[012356789]|(16[56])|17[0135678]|18[0-9]|19[89])\d{8}$/;
		//var pattern = /^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\\d{8}$/;
		return pattern.test(value);
	},
	// 验证金额
	isMoney : function(value) {
		var pattern = /^(0|[1-9]\d*)(\.\d+)?$/
		return pattern.test(value);
	},
	// 验证英文字符
	isEnglish : function(value) {
		var pattern = /^[A-Za-z]+$/;
		return pattern.test(value);
	},
	// 验证中文字符
	isChinese : function(value) {
		var pattern = /^[\u0391-\uFFE5]+$/;
		return pattern.test(value);
	},
	// 验证百分数
	isPercent : function(value) {
		var pattern = /^(?:[1-9][0-9]?|100)(?:\.[0-9]{1,2})?$/;
		return pattern.test(value);
	},
	// 验证字符串的长度是否在指定范围内
	isLength : function(value, min, max) {
		var len = value.length;
		return len >= min && (typeof max === 'undefined' || len <= max);
	},
	// 验证字符最大长度
	maxLength : function(value, len) {
		return value.length <= len;
	},
	// 验证字符最小长度
	minLength : function(value, len) {
		return value.length >= len;
	},
	//验证是否是整数
	isInteger : function(value) {
		var pattern = /^-?\d+$/;
		return pattern.test(value);	
	},
	ispassword : function(value) {//密码必须包含大小写字母、数字、特殊符号、密码长度8-16位
		var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[1-9])(?=.*[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]).{8,16}$");
		return pattern.test(value);	
	}
}