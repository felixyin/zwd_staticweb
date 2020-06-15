$(function () {
    // 左侧菜单切换
    $('.zhdj_open_close').click(function () {
        $(this).find('.left_icon').toggle(0, function () {
            if ($(this).css('display') == 'none') {
                $('.zhdj_menu').animate({
                    width: '80px'
                }, 500);
                $('.zhdj_menu ul li cite').css('display', 'none');
                $('.zhdj_content').animate({
                    left: '80px'
                }, 500);
            }
        });
        $(this).find('.right_icon').toggle(0, function () {
            if ($(this).css('display') == 'none') {
                $('.zhdj_menu').animate({
                    width: '200px'
                }, 500);
                $('.zhdj_content').animate({
                    left: '200px'
                }, 500, function () {
                    $('.zhdj_menu ul li cite').css('display', 'inline');
                });
            }
        });
    });
    // 为header菜单添加点击事件
    $('.zhdj_second_menu ul li').click(function () {
        $(this).addClass('current').siblings().removeClass('current');
        $(this).parent('ul').siblings().find('li').removeClass('current');
    })
    // header菜单的展开和收缩
    $('.zhdi_drop_icon').click(function () {
        $(this).find('.top_btn').toggle();
        $(this).find('.bottom_btn').toggle();
        $('.zhdj_dropdown').slideToggle();
    });
    layui.use(['element', 'form', 'layer'], function () {
        var $ = layui.jquery, element = layui.element, form = layui.form, layer = layui.layer;
        $(".layui-nav-tree li").click(function (event) {
            var url = $(this).children('a').attr('_href');
            var title = $(this).find('cite').html();
            var index = $('.layui-nav-tree li').index($(this));
            //遍历打开的窗口，如果当前点击的选项已经打开，则跳转到对应窗口去，不再执行for外面的两条语句，创建新窗口
            for (var i = 0; i < $('.x-iframe').length; i++) {
                if ($('.x-iframe').eq(i).attr('tab-id') == index + 1) {
                    tab.tabChange(index + 1);
                    event.stopPropagation();
                    return;
                }
            }
            ;
            tab.tabAdd(title, url, index + 1);
            tab.tabChange(index + 1);
        });


        //点击新增子页面
        var tab = {
            tabAdd: function (title, url, id) {
                element.tabAdd('mainTab', {
                    title: title,//用于演示
                    content: '<iframe tab-id="' + id + '" frameborder="0" src="' + url + '" scrolling="no" class="x-iframe"></iframe>',
                    id: id //实际使用一般是规定好的id，这里以时间戳模拟下
                })
            },
            tabDelete: function (othis) {
                element.tabDelete('mainTab', id);
                othis.addClass('layui-btn-disabled');
            },
            tabChange: function (id) {
                //切换到指定Tab项
                element.tabChange('mainTab', id); //切换到：用户管理
            }
        };

    });

    var data = { //数据
        "title": "Layui常用模块"
        , "list": [{"modname": "弹层", "alias": "layer", "site": "layer.layui.com"}, {"modname": "表单", "alias": "form"}]
    }
    $.get(SITE_URL.jcddjs.home, function (res) {
        if (res.resultData && res.resultData.data) {
            var getTpl = $('#home-item-tpl')
                , view = $('#home-item-container');
            layui.laytpl(getTpl).render(res.resultData.data, function (html) {
                view.innerHTML = html;
            });
        }
    });


});
