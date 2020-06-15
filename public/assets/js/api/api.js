// TODO 后台接口地址
var baseUrl = 'http://127.0.0.1:8000/assets/js/api/data/';

var SITE_URL = {
    djzhb: { // 项目名
        get_main_menu: baseUrl + 'djzhb/main_menu.json', // 获取一级菜单
        get_sub_menu: baseUrl + 'djzhb/sub_menu', // 根据一级菜单获取所有二级菜单
        zzjg: {
            wggl_list: baseUrl + 'djzhb/网格管理.json',
        }
    },
    jcddjs: {
        get_main_menu: baseUrl + 'jcddjs/main_menu.json',
        get_sub_menu: baseUrl + 'jcddjs/sub_menu',
        home: baseUrl + 'jcddjs/home.json'
    }
}

