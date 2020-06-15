
var OnSMessage = function (e) {
    if(e.data.indexOf('tag')<0&&e.data.indexOf('fwmh/trust')<0&&e.data.indexOf('fwmh/login')<0){
        var data = eval("(" + e.data + ")");
        if (data.type === 'isw') {
            alertBox(data);
        } else {
           showItemDailogSxalert(data.data);
        } 
    }
};

if (typeof window.addEventListener != 'undefined') {
    //for ie9+
    window.addEventListener('message', OnSMessage, false);
} else if (typeof window.attachEvent != 'undefined') {
    //for ie8-
    window.attachEvent('onmessage', OnSMessage);
}

function alertBox(datax) {
    if (datax.type == 'isw') {
        $('.ckpj_layer').show();
        $('.scs').html(datax.data);
    }
}
var TimTxt = $("#tab_1").find("tr").eq(7).find("td").eq(1).text();
var TimTx = $("#tab_2").find("tr").eq(5).find("td").eq(1).text();
if (TimTxt == "null") {
    $("#tab_1").find("tr").eq(7).find("td").eq(1).text("");
}
if (TimTx == "null") {
    $("#tab_2").find("tr").eq(5).find("td").eq(1).text("");
}

$(function(){
$(".ckpj_layer_close_s_sx_sxalert").click(function () {$(".ckpj_layer_s_sx_sxalert").hide();}); //弹出框×被点击
$(".qued_s_sx_sxalert").click(function () {$(".ckpj_layer_s_sx_sxalert").hide();}); //确定被点击
})
function showItemDailogSxalert(text) {$(".ckpj_layer_s_sx_sxalert .title_sq_s_sx_sxalert").text(text);$(".ckpj_layer_s_sx_sxalert").show();}//展示弹出框
$(function(){
    $(".hoverBt p").on("mouseenter",function () {
        $(this).css("border-top","15px solid #2a344e");
        $(this).next(".hidBox").fadeIn(200);
        $(this).addClass("bacP")
    });
    $(".hoverBt").on("mouseleave",function () {
        $(this).find(".hidBox").fadeOut(200)
        $(this).find("p").css("border-top","1px solid #313a54");
        $(this).children("p").removeClass("bacP");
    })
 function screenWidth(){
    var userAgentInfo = navigator.userAgent;
    if (userAgentInfo.indexOf('iPhone')>0 || userAgentInfo.indexOf('iPad')>0) {
        var creatMeta = document.createElement('meta');
            creatMeta.name = 'viewport';
            creatMeta.id   = 'viewport';
        var screenWidth = parseInt(window.screen.width);
        if (window.orientation == '-90' || window.orientation == '90') {
            var scale = window.screen.height / 1200;
            creatMeta.content = 'width=1200 ' + ', initial-scale = ' + scale;
        } else {
            var scale = screenWidth / 1200;
            creatMeta.content = 'width=1200'  + ', initial-scale = ' + scale;
        }
        document.head.append(creatMeta);
    }
 }screenWidth();
})

