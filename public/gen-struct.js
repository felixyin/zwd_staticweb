const path = require('path');
const fse = require('fs-extra');
const pjson = require('../package.json');

let projectName = pjson.gen.subProjectName;
// TODO 此data为极度懒人准备，可以从excel复制相应列（列先排序：一级菜单中文名、一级英文名、二级菜单中文名、二级英文名）后，在sublime中，快速替换空格为逗号得出
// 如果只是新增一个模块，也可以直接复制struct/xxx，在副本基础上修改后，运行npm run gen-code,打开要放的sub_menu_xxx.json增加菜单即可
let data = '党建大数据,djdsj,大数据,dsj,智慧党建,zhdj,党组织机构,dzzjg,智慧党建,zhdj,党员管理,dygl,智慧党建,zhdj,发展党员,fzdy,智慧党建,zhdj,党费,df,智慧党建,zhdj,区域化党建,qyhdj,智慧党建,zhdj,组织生活,zzsh,智慧党建,zhdj,民主评议党员,mzpydy,智慧党建,zhdj,三会一课,shyk,智慧党建,zhdj,主题党日活动,ztdrhd,智慧党建,zhdj,四议两公开,sylgk,智慧党建,zhdj,换届选举,hjxj,智慧党建,zhdj,学习教育,xxjy,智慧党建,zhdj,督导考评,ddkp,智慧党建,zhdj,三项制度,sxzd,智慧党建,zhdj,在职党员进社区,zzdyjsq,党建网格,djwg,网格数据,wgsj,党建网格,djwg,网格规划,wggh,团委,tw,团委管理,twgl,团委,tw,会议管理,hygl,团委,tw,组织建设,zzjs,团委,tw,其他,qt,工会关工委,ghggw,工会,gh,工会关工委,ghggw,关工委,ggw,红十字会,hszh,救助活动,jzhd,红十字会,hszh,宣传活动,xchd,红十字会,hszh,重大救助,zdjz,红十字会,hszh,学习培训,xxpx,红十字会,hszh,其他,qt,三务公开,swgk,党务公开,dwgk,三务公开,swgk,村务公开,cwgk,三务公开,swgk,财务公开,czgk,信息发布,xxfb,政务新媒体,zwxmt,信息发布,xxfb,工作动态,gzdt,信息发布,xxfb,网评工作,wpgz,信息发布,xxfb,转发网宣,zfwx,舆情,yq,辟谣,py,舆情,yq,回复,hf,宗教,zj,宗教组织管理,zjzzgl,宗教,zj,宗教活动管理,zjhdgl,思政文体,szwt,新时代文明实践,xsdwmsj,思政文体,szwt,文体中心,wtzx,党风廉政,dflz,党风廉政,dflz';

let strings = data.split(',');
let filePath = path.resolve('public/assets/js/api/struct/' + projectName);


function chunkArrayInGroups(arr, size) {
    // Break it up.
    var length = arr.length;
    var newArr = [];
    var i = Math.ceil(length / size * 1.0);
    var j = 0;
    while (j < i) {
        var spare = length - j * size >= size ? size : length - j * size;
        var temp = arr.slice(j * size, j * size + spare);
        newArr.push(temp);
        j++;
    }
    return newArr;
}

function unique(arr) {
    var hash = [];
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                ++i;
            }
        }
        hash.push(arr[i]);
    }
    return hash;
}


let pages = chunkArrayInGroups(strings, 4);

// console.log(filePath)
// console.log(pages);

let uArray = [];
for (let i = 0; i < pages.length; i++) {
    let page = pages[i];
    uArray.push(page[0]);
}
let menuList = unique(uArray);
// console.log(menuList);
let menuArray = [];
for (let i = 0; i < menuList.length; i++) {
    let menu = menuList[i];
    menuArray.push({
        id: 1,
        url: "javascript:;",
        name: menu,
        target: "main_frame",
        icon: "/assets/img/party_government/jdgl.png"
    });
}
var menuTpl = {
    isAlert: false,
    resultData: {
        total: 42360,
        data: menuArray
    }
};

let menuJsonStr = JSON.stringify(menuTpl);
let menuPath = filePath.replace('struct', 'data') + '/main_menu.json';
fse.outputFile(menuPath, menuJsonStr)

for (let i = 0; i < pages.length; i++) {
    let page = pages[i];
    // 生成结构模版写入
    let menu2Tpl = {
        menu: {
            menu: page[0],
            menu2: page[2]
        },
        clospan: ["c1", "c2"],
        schema: {
            id: 1,
            "c1": "文本",
            "c2": "文本",
            "c3": "文本",
            "c4": "文本",
            "c5": "文本",
            "c6": "文本",
            "c7": "文本",
            "c8": "文本",
            "c9": "文本",
            "c10": "文本",
            "c11": "文本",
            "c12": "文本",
            "c13": "文本",
            "c14": "文本",
            "c15": "文本",
        }
    };

    let menu2Path = filePath + '/' + page[1] + '/' + page[3] + '/list.json';
    // console.log(menu2Path);
    fse.outputFile(menu2Path, JSON.stringify(menu2Tpl));
}