const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const ejs = require("ejs");
const pjson = require('../package.json');

/**
 * @author 尹彬
 * @type {string}
 * @description yinbin@qdqtrj.com
 *  projectName 必须修改
 *  如果已经增加了或修改了生成的json测试数据，则，isGenData 改为 false，
 *  改为true，要慎重，慎重。
 */
// 党政子系统
// let projectName = 'djzhb';
// 党建子系统
let projectName = pjson.gen.subProjectName; // public/assets/js/api/struct/ 下的项目名称，文件夹表示菜单，list.json为生成器提供基本的数据；
// 另外stuct下的数据如果懒得写，可以复制excel中的菜单名称和英文名称后简单加工，通过gen-struct生成大部分重复代码
let isGenData = pjson.gen.isGenData; // 是否生成模拟数据，和count搭配使用
let isGenMenu = pjson.gen.isGenMenu; // 是否生成菜单，生成后直接在框架上可以看到，但是自定义图标等数据会被覆盖

let genDataCount = pjson.gen.genDataCount; // 生成模拟数据的数量
let httpRoot = pjson.gen.httpRoot; // 8080 为在public目录下启动live-server后显示的端口


// 下面代码，尽量不要改动

let filePath = path.resolve('public/assets/js/api/struct/' + projectName);

let root_path = __dirname;
let json_list = [];
//调用文件遍历方法
fileDisplay(filePath);

// console.log(root_path)
// 菜单关联对象
let menuObj = {};

json_list.forEach(function (filep) {
    let jsonObj = fse.readJsonSync(filep)
    let data = jsonObj.schema;
    // console.log('\n\n' + filePath + '-------->:')
    // console.log(data);

    // 预处理schema数据
    let schema = [];
    for (let key in data) {
        schema.push({key: key, value: data[key]})
    }
    // console.log(schema);
    schema.shift();

    // 预处理菜单数据
    let htmlPath = filep.replace('assets/js/api/struct', 'page').replace('/list.json', '.html')
    let httpPath = htmlPath.replace(root_path, httpRoot).replace('/public', '');
    console.warn('生成页面：' + httpPath);

    let m = jsonObj.menu;
    if (menuObj[m.menu]) {
        menuObj[m.menu].push({httpPath: httpPath, htmlPath: htmlPath, menu2: m.menu2});
    } else {
        menuObj[m.menu] = [{httpPath: httpPath, htmlPath: htmlPath, menu2: m.menu2}];
    }
    // 1. 将data convert array
    gen_list_html_file(schema, filep, menuObj);
    gen_list_js_file(schema, filep, jsonObj.clospan);
    if (isGenData) {
        gen_list_data_file(schema, filep);
    }

});
// console.log(menuObj);
if (isGenMenu) {
    gen_menu_json_file(menuObj);
}

/**
 * 生成list html
 */
function gen_list_html_file(schema, filePath, menuObj) {
    // 创建空css文件
    let cssPath = filePath.replace('js/api/struct', 'css').replace('.json', '.css')
    if (!fs.existsSync(cssPath)) fse.ensureFileSync(cssPath);

    let jsPath = filePath.replace('js/api/struct', 'js').replace('.json', '.js')
    if (!fs.existsSync(jsPath)) fse.ensureFileSync(jsPath);

    //  修改模版匹配 路径，迭代数组
    let template_list_html = fs.readFileSync(root_path + "/template_list.html.ejs", "utf8")  //先读文件
    // console.log(schema)

    // 写入html文件
    let htmlPath = filePath.replace('assets/js/api/struct', 'page').replace('/list.json', '.html')
    let menu2 = '';
    for (let menu in menuObj) {
        let menu2List = menuObj[menu];
        // console.log(menu2List);
        for (let i = 0; i < menu2List.length; i++) {
            let m2 = menu2List[i];
            if (m2.htmlPath === htmlPath) {
                // console.log(m2.htmlPath,htmlPath)
                menu2 = m2.menu2;
                break;
            }
        }
    }

    let htmlStr = ejs.render(template_list_html, {
        data: {
            menu2: menu2,
            schema: schema,
            projectName:projectName,
            cssPath: cssPath.replace(root_path, ''),
            jsPath: jsPath.replace(root_path, ''),
        },   //第一个参数是给ejs渲染的内容
        filename: root_path       //第二个参数是设置include路径的 不写就找不到 报错
    })                           //渲染html
    // console.log(html)


    if (!fs.existsSync(htmlPath)) fse.ensureFileSync(htmlPath);
    fse.outputFile(htmlPath, htmlStr)
}


/**
 * 生成list js
 */
function gen_list_js_file(schema, filePath, clospan) {
    let template_list_js = fs.readFileSync(root_path + "/template_list.js.ejs", "utf8")  //先读文件
    let jsonPath = filePath.replace(root_path, httpRoot).replace('js/api/struct', 'js/api/data').replace('/list.json','')
    let jsStr = ejs.render(template_list_js, {
        data: {
            schema: schema,
            clospan: clospan,
            jsonPath: jsonPath
        },       //第一个参数是给ejs渲染的内容
        filename: root_path       //第二个参数是设置include路径的 不写就找不到 报错
    })                           //渲染html
    // console.log(jsStr)
    // 写入js文件
    let jsPath = filePath.replace('js/api/struct', 'js').replace('.json', '.js')
    if (!fs.existsSync(jsPath)) fse.ensureFileSync(jsPath);
    fse.outputFile(jsPath, jsStr)
}

/**
 * 生成测试数据
 */
function gen_list_data_file(schema, filePath) {
    let template_list_json = fs.readFileSync(root_path + "/template_list.json.ejs", "utf8")  //先读文件

    let jsonStr = ejs.render(template_list_json, {
        data: {
            schema: schema,
            count: genDataCount,
        },       //第一个参数是给ejs渲染的内容
        filename: root_path       //第二个参数是设置include路径的 不写就找不到 报错
    })                           //渲染html
    // console.log(jsonStr)
    // 写入js文件
    let jsonPath = filePath.replace('js/api/struct', 'js/api/data')
    if (!fs.existsSync(jsonPath)) fse.ensureFileSync(jsonPath);
    fse.outputFile(jsonPath, jsonStr)
}


/**
 * 生成菜单
 */
function gen_menu_json_file(menuObj, filePath) {
    for (let menu in menuObj) {
        let subMenuList = menuObj[menu];
        let data = [];
        for (let i = 0; i < subMenuList.length; i++) {
            let subMenu = subMenuList[i];
            data.push({
                url: subMenu.httpPath,
                name: subMenu.menu2,
                icon: "/assets/img/party_government/xxgl_icon.png",
                target: "main_frame"
            })
        }

        let menuJson = {
            isAlert: false,
            resultData: {
                total: subMenuList.length,
                data: data
            }
        };
        let jsonStr = JSON.stringify(menuJson);
        // 写入js文件
        let jsonPath = root_path + '/assets/js/api/data/' + projectName + '/sub_menu_' + menu + '.json'
        // console.error(jsonPath)
        if (!fs.existsSync(jsonPath)) fse.ensureFileSync(jsonPath);
        fse.outputFile(jsonPath, jsonStr)
    }
}


/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath) {
    //根据文件路径读取文件，返回文件列表
    let files = fs.readdirSync(filePath);
    // console.log(files)

    //遍历读取到的文件列表
    files.forEach(function (filename) {
        if (filename === '.DS_Store' || filename.indexOf('home.') !== -1 || filename.indexOf('_menu') !== -1 || filename.indexOf('.del') !== -1) return;
        //获取当前文件的绝对路径
        let filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        let stats = fs.statSync(filedir);
        let isFile = stats.isFile();//是文件
        let isDir = stats.isDirectory();//是文件夹
        if (isFile) {
            json_list.push(filedir);
            // console.log(filedir);
        }
        if (isDir) {
            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
        }
    });

}