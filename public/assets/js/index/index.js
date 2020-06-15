$(function(){

    var showlist = $("<ul id='org' style='display:none'></ul>");
    showall(Data.data, showlist,true);

    $("#jOrgChart").append(showlist);
    $("#org").jOrgChart( {
        chartElement : '#jOrgChart',//指定在某个dom生成jorgchart
        dragAndDrop : false //设置是否可拖动
    });
    $(".parentli").eq(1).parent(".node").attr("style",
        "width: 500px;height: 40px;line-height: 40px;background: #F63333;border-radius: 5px;" //树状图第一个栏的样式
    )
    $(".jOrgChart .node-container").eq(0).find(".node").addClass("nodeactive")//默认给第一个添加选中样式
    detailedpeople(detailedDATA2)
    //点击模块函数
    $(".getOrgId").click(function(){
        $(".node-container").find(".node").removeClass("nodeactive")
        $(this).parent(".node").addClass("nodeactive");
        detailedpeople(detailedDATA)
    })
    //领导班子
    var showlistimg = $("<ul id='orgimg' style='display:none'></ul>");
    showallimg(Dataimg.data, showlistimg, true);
    console.log(showlistimg)
    $("#jOrgpeople").append(showlistimg);
    $("#orgimg").jOrgChart( {
        chartElement : '#jOrgpeople',//指定在某个dom生成jorgchart
        dragAndDrop : false //设置是否可拖动
    });
    //点击进入系统
    $(".gotobutton").click(function(){
//    	 window.location="/res/page/partyGovernment/res/page/index.html";
        window.location="/page/main.html";
    })
})

function showall(menu_list, parent, flg) {
    $.each(menu_list, function(index, val) {
        if(val.childrens.length > 0){

            var li = $("<li></li>");
            if(flg){ //一级目录
                li.append("<a href='javascript:void(0)' style='font-size:18px;color:#fff' class='parentli'>"+val.name+"</a>").append("<ul></ul>").appendTo(parent);
            }else{
                var html="<a href='javascript:void(0)' >"+val.name+"</a>"
                li.append(html).append("<ul></ul>").appendTo(parent);
            }
            //li.append("<a href='javascript:void(0)' onclick=getOrgId("+val.id+");>"+val.name+"</a>").append("<ul></ul>").appendTo(parent);
            //递归显示
            showall(val.childrens, $(li).children().eq(1),false);
        }else{
            $("<li></li>").append("<a href='javascript:void(0)' id="+val.id+" class='getOrgId'>"+
                "<p class='name'>"+val.name+"</p>"+
                "<p class='people' >负责人："+val.people+"</p>"+
                "</a>").appendTo(parent);
        }
    });
}
//l领导班子
function showallimg(menu_list, parent, flg) {
    $.each(menu_list, function(index, val) {
        if(val.childrens.length > 0){
            var li = $("<li></li>");
            if(flg){ //一级目录
                var htmlfrist='<div>'+
                    ' <img src="'+val.url+'" style="width:80px" tltle='+val.job+'/>'+
                    '<div class="peopleconter" style="width:80px">'+
                    '<p class="ojbname" style="width:80px" title='+val.job+'>'+val.job+'</p>'+
                    '<p class="nameclass" style="width:80px" title='+val.name+'>'+val.name+'</p>'+
                    '</div>'+
                    '</div>'
                li.append(htmlfrist).append("<ul></ul>").appendTo(parent);
            }else{
                var htmlcommon='<div>'+
                    ' <img src="'+val.url+'"  tltle='+val.job+'/>'+
                    '<div class="peopleconter">'+
                    '<p class="ojbname" title='+val.job+'>'+val.job+'</p>'+
                    '<p class="nameclass" title='+val.name+'>'+val.name+'</p>'+
                    '</div>'+
                    '</div>'
                li.append(htmlcommon).append("<ul></ul>").appendTo(parent);
            }
            //li.append("<a href='javascript:void(0)' onclick=getOrgId("+val.id+");>"+val.name+"</a>").append("<ul></ul>").appendTo(parent);
            //递归显示
            showallimg(val.childrens, $(li).children().eq(1),false);
        }else{
            var htmllast='<div>'+
                ' <img src="'+val.url+'"  tltle='+val.job+'/>'+
                '<div class="peopleconter">'+
                '<p class="ojbname" title='+val.job+'>'+val.job+'</p>'+
                '<p class="nameclass" title='+val.name+'>'+val.name+'</p>'+
                '</div>'+
                '</div>'
            $("<li></li>").append(htmllast).appendTo(parent);
        }
    });
}
function detailedpeople(Data2){
    $(".detailedpeople").empty();
    var HTML='';
    if(Data2){
        var len=Data2.children.length;
        if(len==1){
            var childrenlen=Data2.children[0].children;
            var  childrenhtml='';
            if(childrenlen.length>0){
                for(var j=0;j<childrenlen.length;j++){
                    childrenhtml+='<span>'+childrenlen[j].name+';&nbsp;&nbsp;&nbsp;&nbsp;</span>';
                }
            }else{
                childrenhtml+='<span class="delectspan"></span>'
            }

            HTML+='<table class="orgchart">'+
                '<tr>'+
                '<td class="left pr">'+
                '<div class="conterli"></div>'+
                '</td>'+
                '<td class="">'+
                '<div  class="node">'+
                '<div class="title">'+Data2.children[0].name+'</div>'+
                '</div>'+
                '</td>'+
                '<td class="righttop">&nbsp;</td>'+
                '<td class="">'+
                '<div  class="node">'+
                '<div class="title">'+childrenhtml+'</div>'+
                '</div>'+
                '</td>'+
                '</tr>'	+
                '</table>'
        }else if(len>1){
            var childrenlen1=Data2.children[0].children;
            var  childrenhtml1='';
            if(childrenlen1.length>0){
                for(var j=0;j<childrenlen1.length;j++){
                    childrenhtml1+='<span>'+childrenlen1[j].name+';&nbsp;&nbsp;&nbsp;&nbsp;</span>'
                }
            }else{
                childrenhtml1+='<span class="delectspan"></span>'
            }

            HTML+='<table class="orgchart">'+
                '<tr>'+
                '<td class="fristleft"></td>'+
                '<td class="">'+
                '<div  class="node">'+
                '<div class="title">'+Data2.children[0].name+'</div>'+
                '</div>'+
                '</td>'+
                '<td class="righttop">&nbsp;</td>'+
                '<td class="">'+
                '<div  class="node">'+
                '<div class="title">'+childrenhtml1+'</div>'+
                '</div>'+
                '</td>'+
                '</tr>'	+
                '</table>'
            for(var i=1;i<len;i++){
                if(i<len-1){
                    var childrenlen2=Data2.children[i].children;
                    var  childrenhtml2='';
                    if(childrenlen2.length>0){
                        for(var a=0;a<childrenlen2.length;a++){
                            childrenhtml2+='<span>'+childrenlen2[a].name+';&nbsp;&nbsp;&nbsp;&nbsp;</span>'
                        }
                    }else{
                        childrenhtml2+='<span class="delectspan"></span>'
                    }

                    HTML+='<table class="orgchart">'+
                        '<tr>'+
                        '<td class="left pr"><div class="conterli"></div></td>'+
                        '<td class="">'+
                        '<div  class="node">'+
                        '<div class="title">'+Data2.children[i].name+'</div>'+
                        '</div>'+
                        '</td>'+
                        '<td class="righttop">&nbsp;</td>'+
                        '<td class="">'+
                        '<div  class="node">'+
                        '<div class="title">'+childrenhtml2+'</div>'+
                        '</div>'+
                        '</td>'+
                        '</tr>'	+
                        '</table>'

                }else if(i==len-1){//最后一个
                    var childrenlen3=Data2.children[i].children;
                    var  childrenhtml3='';
                    if(childrenlen3.length>0){
                        for(var b=0;b<childrenlen3.length;b++){
                            childrenhtml3+='<span>'+childrenlen3[b].name+';&nbsp;&nbsp;&nbsp;&nbsp;</span>'
                        }
                    }else{
                        childrenhtml3+='<span class="delectspan"></span>'
                    }

                    HTML+='<table class="orgchart">'+
                        '<tr>'+
                        '<td class="lastleft"></td>'+
                        '<td class="">'+
                        '<div  class="node">'+
                        '<div class="title">'+Data2.children[i].name+'</div>'+
                        '</div>'+
                        '</td>'+
                        '<td class="righttop">&nbsp;</td>'+
                        '<td class="">'+
                        '<div  class="node">'+
                        '<div class="title">'+childrenhtml3+'</div>'+
                        '</div>'+
                        '</td>'+
                        '</tr>'	+
                        '</table>'
                }
            }

        }
    }
    $(".detailedpeople").append(HTML);
    $(".delectspan").parents("td").prev(".righttop").remove();
    $(".delectspan").parents("td").remove();
}
