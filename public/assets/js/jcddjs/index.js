var tab;
$(function () {
    // 左侧菜单切换
    $('.zhdj_open_close').click(function(){
        $(this).find('.left_icon').toggle(0,function(){
            if($(this).css('display') == 'none'){
                $('.zhdj_menu').animate({
                    width:'90px'
                },500);
                $('.zhdj_menu ul li cite').css('display','none');
                $('.zhdj_content').animate({
                    left:'90px'
                },500);
            }
        });
        $(this).find('.right_icon').toggle(0,function(){
            if($(this).css('display') == 'none'){
                $('.zhdj_menu').animate({
                    width:'200px'
                },500);
                $('.zhdj_content').animate({
                    left:'200px'
                },500,function(){
                    $('.zhdj_menu ul li cite').css('display','inline');
                });
            }
        });
    });

    // header菜单的展开和收缩

    function dropdown(boxHeight){
        if($('.zhdi_drop_icon').find('.top_btn').css('display') == 'none'){
            $('.zhdj_second_menu').animate({
                height: '90px'
            })
        }else{
            $('.zhdj_second_menu').animate({
                height: boxHeight + 'px'
            })
        }
    }
    var boxHeight;
    $(window).resize(function(){
        boxHeight = $('.zhdj_second_menu ul').height();
        if(boxHeight > 90){
            dropdown(boxHeight);
        }
    });
    $('.zhdi_drop_icon').click(function(){
        boxHeight = $('.zhdj_second_menu ul').height();
        $(this).find('.top_btn').toggle();
        $(this).find('.bottom_btn').toggle();
        if(boxHeight > 90){
            dropdown(boxHeight);
        }
    });
    $(document.body).on('click', '.layui-col-md1:not(:first)', function () {
        $('.zhdi_drop_icon').find('.top_btn').hide();
        $('.zhdi_drop_icon').find('.bottom_btn').show();
        $('.zhdj_second_menu').animate({
            height: '90px'
        });
    });
    layui.use(['element', 'form', 'layer', 'laytpl'], function () {
        var $ = layui.jquery, element = layui.element, form = layui.form, layer = layui.layer, laytpl = layui.laytpl;
        var index = 0;
        $(document.body).on('click', ".layui-nav-tree li", function (event) {
            var url = $(this).children('a').attr('_href');
            var title = $(this).find('cite').html();
            // var list = $('.x-iframe').get();
            // var index = list.length;
            // for (var i = 0; i < list.length; i++) {
            //     var n = list[i];
            //     let _title = $(n).attr('_title');
            //     if (_title === title) {
            //         index = i;
            //     }
            // }
            //遍历打开的窗口，如果当前点击的选项已经打开，则跳转到对应窗口去，不再执行for外面的两条语句，创建新窗口
            for (var i = 0; i < $('.x-iframe').length; i++) {
                console.log($('.x-iframe').eq(i).attr('tab-id'),title);
                if ($('.x-iframe').eq(i).attr('tab-id') == title) {
                    // debugger
                    tab.tabChange(title);
                    event.stopPropagation();
                    return;
                }
            }
            tab.tabAdd(title, url, title);
            tab.tabChange(title);
        });

        //点击新增子页面
        tab = {
            tabAdd: function (title, url, id) {
                element.tabAdd('mainTab', {
                    title: title,//用于演示
                    content: '<iframe tab-id="' + id + '" frameborder="0" _title="' + title + '" src="' + url + '" scrolling="no" class="x-iframe"></iframe>',
                    id: id //实际使用一般是规定好的id，这里以时间戳模拟下
                })
            },
            tabDelete: function (id) {
                element.tabDelete('mainTab', id);
                othis.addClass('layui-btn-disabled');
            },
            tabChange: function (id) {
                //切换到指定Tab项
                element.tabChange('mainTab', id); //切换到：用户管理
                var tab = $('.layui-tab-title').children().filter(function () {
                    return $(this).attr('lay-id') == id
                }).get(0)
                tab.parentElement.scrollLeft = tab.offsetLeft - (window.document.body.clientWidth /2)
            }
        };


    });
    $(document.body).on('click', '.zhdj_second_menu ul li', function () {
        $(this).addClass('current').siblings().removeClass('current');
        $(this).parent('ul').siblings().find('li').removeClass('current');
    });
    $(document.body).on('click', '.zhdj_menu ul li', function () {
        $(this).addClass('layui-this').siblings().removeClass('layui-this');
        $(this).parent('ul').siblings().find('li').removeClass('layui-this');
    });

    // 默认隐藏左侧菜单
    $('.left_icon').hide()
    $('.right_icon').show()
    $('.zhdj_menu').animate({
        width:'90px'
    },500);
    $('.zhdj_menu ul li cite').css('display','none');
    $('.zhdj_content').animate({
        left:'90px'
    },500);

});

$(function () {

    $('#left_button').click(function () {
        var tabp = $('.layui-tab-title').get(0);
        var left = tabp.scrollLeft -  (window.document.body.clientWidth / 3);
        if(left<0) left = 0;
        tabp.scrollLeft = left;
    });

    $('#right_button').click(function () {
        var tabp = $('.layui-tab-title').get(0);
        var left = tabp.scrollLeft +  (window.document.body.clientWidth / 3);
        // if(left>window.document.body.clientWidth) left = window.document.body.clientWidth;
        tabp.scrollLeft = left;
    });
});