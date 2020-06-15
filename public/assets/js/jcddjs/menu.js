function group(array, subGroupLength) {
    let index = 0;
    let newArray = [];
    while (index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength));
    }
    return newArray;
}

$(function () {
    /**
     * 加载一级菜单
     */
    $.get(SITE_URL.jcddjs.get_main_menu, function (res) {
        if (res && res.resultData.data) {
            var tpl = $('#main-menu-tpl').html();
            var $menu = $('#main-menu');
            // var data = group(res.resultData.data, 8);
            var data =  res.resultData.data;
            layui.laytpl(tpl).render({data: data}, function (html) {
                $menu.html(html);
            });
// fixme 菜单响应式解决后，注释掉下面4行
//             var $menu2 = $('#main-menu2');
//             layui.laytpl(tpl).render({data: data[1]}, function (html) {
//                 $menu2.html(html);
//             });
        }
    });

});

/**
 * 点击一级菜单加载二级菜单
 */
function mainMenuClick(name) {
    $.get([SITE_URL.jcddjs.get_sub_menu, '_', name, '.json'].join(''), function (res) {
        var tpl = $('#sub-menu-tpl').html();
        var $menu = $('#nav');
        if (res && res.resultData) {
            if (res.resultData.data && res.resultData.data.length <= 0) {
                //  没有二级菜单的直接隐藏
                // $('#left-side').hide();
                // $('#right-body').css('left', '0px')
            } else {
                // $('#left-side').show();
                // $('#right-body').css('left', '200px')
                var data = res.resultData.data;
                // var power = JSON.parse(localStorage.getItem('power'));
                // var data2 = [];
                // for (d in data) {
                //     var dd = data[d];
                //     for (p in power) {
                //         var pp = power[p];
                //         console.log(pp.name, dd.name)
                //         if (pp.name === dd.name) {
                //             var url = dd.url + '?permissionId=' + pp.permissionId;
                //             data[d].url = url
                //             data2.push(data[d]);
                //         }
                //     }
                // }
                layui.laytpl(tpl).render({data: data}, function (html) {
                    $menu.html(html);
                });
                // $menu.children().click(function () {
                //     var href = $(this).attr('href');
                //     // console.log(href);
                //     $('#main_frame').attr('src', href);
                // });
            }
        }
    });
    $('.zhdj_menu').animate({
        width:'200px'
    },500);
    $('.zhdj_content').animate({
        left:'200px'
    },500,function(){
        $('.zhdj_menu ul li cite').css('display','inline');
    });
    $('.left_icon').show()
    $('.right_icon').hide()
}

//  默认隐藏侧边栏现实 数据中心列表
// $('#left-side').hide();
// $('#right-body').css('left', '0px')