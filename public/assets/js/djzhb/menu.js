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
    $.get(SITE_URL.djzhb.get_main_menu, function (res) {
        if (res && res.resultData.data) {
            var tpl = $('#main-menu-tpl').html();
            var $menu = $('#main-menu');
            layui.laytpl(tpl).render({data: res.resultData.data}, function (html) {
                $menu.html(html);
            });
            $menu.children('li').first().find('a').click();
        }
    });

});

/**
 * 点击一级菜单加载二级菜单
 */
function mainMenuClick(name) {
    $.get([SITE_URL.djzhb.get_sub_menu, '_', name, '.json'].join(''), function (res) {
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
                var power = JSON.parse(localStorage.getItem('power'));
                // console.log(power)
                var data2 = [];
                for (d in data) {
                    var dd = data[d];
                    for (p in power) {
                        var pp = power[p];
                        // console.log(pp.name, dd.name)
                        if (pp.name === dd.name) {
                            var url = dd.url + '?permissionId=' + pp.permissionId;
                            data[d].url = url
                            data2.push(data[d]);
                        }
                    }
                }
                layui.laytpl(tpl).render({data: data2}, function (html) {
                    $menu.html(html);
                });
                // $menu.children().click(function () {
                //     var href = $(this).attr('href');
                //     // console.log(href);
                //     $('#main_frame').attr('src', href);
                // });
            }
            $menu.children('li').first().find('a').click();
        }
    });
}

//  默认隐藏侧边栏现实 数据中心列表
// $('#left-side').hide();
// $('#right-body').css('left', '0px')