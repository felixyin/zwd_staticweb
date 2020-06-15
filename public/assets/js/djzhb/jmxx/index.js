$(function () {
    var element = document.querySelector('.zhdj_jmxx')
    var myOptiscrollInstance = new Optiscroll(element);
    layui.use(['form', 'layer'], function () {
        var form = layui.form, layer = layui.layer;
        // 搜索更多的弹出
        $('.zhdj_search_btn').on('click', function () {
            parent.layer.open({
                type: 1,
                btn: ['关闭'],
                area: ['600px', '360px'],
                shadeClose: true, //点击遮罩关闭
                content: '\<\div style="padding:20px;">自定义内容\<\/div>'
            });
        });
    })
})