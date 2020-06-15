# 昭乌达智慧党建信息平台

快速原型工具，方便在客户现场制作快速制作界面原型，且可运行。

## 目录介绍

仔细读完下面目录：

.
├── README.md
├── app.js
├── bin     # express 入口
│   └── www
├── db.js   # mongodb链接工具类 
├── node_modules    # 模块
│   └── xxxx_lib
│       ├── LICENSE
│       ├── README.md
│       ├── index.js
│       └── package.json
├── package.json    # node配置
├── public      # 所有静态文件页面存放位置
│   ├── README.md   
│   ├── assets      
│   │   ├── css
│   │   │   ├── common
│   │   │   │   ├── index.css
│   │   │   │   └── theme
│   │   │   │       ├── blue.css
│   │   │   │       └── red.css
│   │   │   ├── djzhb # 项目1名称
│   │   │   │   ├── bgyf  # 一级菜单名称
│   │   │   │       └── bgyf  # 二级菜单
│   │   │   │           └── list.css
│   │   │   ├── main.css
│   │   │   └── reset.css
│   │   ├── img     # 图片目录参照上面css结构
│   │   │   ├── common
│   │   │   │   └── callback.png
│   │   │   ├── djzhb
│   │   │   │   ├── bottom.png
│   │   │   │   ├── index
│   │   │   │   │   └── zdgl.png
│   │   │   │   └── menu
│   │   │   │       ├── demo.css
│   │   │   │       └── iconfont.woff2
│   │   │   └── main
│   │   │       └── tb11.png
│   │   ├── js
│   │   │   ├── api     # 切换后台后此目录无用
│   │   │   │   ├── api.js
│   │   │   │   ├── data  # 可选择将数据存入本地json文件或者服务器mongodb
│   │   │   │   │   └── jcddjs
│   │   │   │   │       ├── djdsj
│   │   │   │   │       │   ├── dsj
│   │   │   │   │       │   └── zdjz
│   │   │   │   │       │       └── list.json
│   │   │   │   │       ├── main_menu.json
│   │   │   │   │       ├── sub_menu_人大.json
│   │   │   │   │       ├── sub_menu_工?\232?\205?工?\224.json
│   │   │   │   └── struct      # 关键目录，用于生成本地json文件，减少手写测试数据的工作量
│   │   │   │       └── jcddjs
│   │   │   │           ├── djdsj
│   │   │   │               │   
│   │   │   │               └── zjzzgl
│   │   │   │                   └── list.json
│   │   │   ├── app.js
│   │   │   ├── common
│   │   │   │   ├── range.js
│   │   │   │   └── validate.js
│   │   │   └── jcddjs
│   │   │       ├── dflz
│   │   │       │   └── dflz
│   │   │       │       └── list.js
│   │   │       ├── djdsj
│   │   │           └── dsj
│   │   │               └── list.js
│   │   └── lib     # 此目录用于存放前端类库
│   │       ├── jquery
│   │       │   ├── jquery-3.2.1.min.js
│   │       │   └── jquery.cookie.js
│   │       ├── layui
│   │       │   ├── css
│   │       │   │   ├── layui.css
│   │       │   │   └── iconfont.woff
│   │       │   ├── images
│   │       │   │   └── face
│   │       │   │       └── util.js
│   │       │   ├── layui.all.js
│   │       │   └── module
│   │       │       └── treetable-lay
│   │       │           └── treetable.js
│   │       └── viewer
│   │           ├── viewer.min.css
│   │           └── viewer.min.js
│   ├── gen-front.js    # 分析struct生成css、js、html、img目录，请在本地执行
│   ├── gen-struct.js   # 分析struct生成data json，请在本地执行
│   ├── index.html      # 主页
│   ├── init-db.js  # 将json文件导入mongodb，请在服务器执行
│   ├── page 
│   │   ├── csgl
│   │   │   ├── home.html
│   │   │   └── index.html
│   │   ├── djzhb   # 项目名称
│   │   │   ├── bgyf    # 一级菜单名称
│   │   │   │   └── bgyf.html   # 二级菜单名称.html
│   │   │   └── zzjg
│   │   │       └── wggl.html
│   │   ├── jzld
│   │       ├── home.html
│   │       └── index.html
│   ├── template_list.html.ejs     # html模版（ejs）
│   ├── template_list.js.ejs    # js模板（ejs）
│   └── template_list.json.ejs   # list.json 测试数据模板（ejs）
├── routes  # 通用后台路由
│   ├── add.js  # c 增加
│   ├── edit.js # u 更新
│   ├── list.js # r 读取列表
│   └── remove.js # d 删除
└── util.js


## package.json配置项说明

{
  "name": "staticweb", /*项目英文名称*/
  "version": "1.0.0",
  "description": "昭乌达智慧党建信息平台", 
  "private": true,
  "scripts": {
    "start": "node ./bin/www", /*启动项目*/
    "gen-code": "node ./public/gen-front.js", /*生成页面*/
    "import-json-to-mongo": "cd public;node init-db.js;cd .." /*导入list.json到mongodb*/
  },
  "dependencies": { /*依赖库*/
    "cookie-parser": "~1.4.4",
    "cors": "^2.8.5",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "mongodb": "^3.5.8",
    "morgan": "~1.9.1"
  },
  "devDependencies": { /*开发依赖库，生产环境不需要*/
    "ejs": "^3.1.3",
    "fs-extra": "^9.0.0"
  },
  "mongoUrl": "mongodb://localhost:27017/", /*mongodb 链接*/
  "dataPath": "assets/js/api/data/", /*数据存放目录*/
  "gen": {
    "genDataCount": 100, /*生成测试数据数量*/
    "httpRoot": "http://127.0.0.1:8000", /*本地开发时运行地址，发布服务器后会自动替换掉*/
    "isGenData": false, /*是否生成数据，慎用，可能会覆盖好不容易改好的数据*/
    "isGenMenu": false, /*是否生成菜单数据，慎用，可能会覆盖好不容易改好的数据*/
    "subProjectName": "djzhb" /*生成哪个子项目*/
  }
}

## struct 说明

{
  "menu": {
    "menu": "办公用房", /*一级菜单*/
    "menu2": "办公用房" /*二级菜单*/
  },
  "schema": {
    "id": 1, /* key：列名，value：显示lable*/
    "no": "序号", /*后期可扩展为jsobj，如：{colName:"no",colLabel:"序号",type:"string",nullAbl:true,maxLen:10,minLen:2 等等}*/
    "dwmc": "单位名称",
    "fjh": "房间号",
    "pm": "平米",
    "xm": "姓名",
    "zw": "职务",
    "bz": "备注",
    "dwf": "单位负责人",
    "jjf": "纪检负责人",
    "lxdh": "联系电话"
    /*如有更多字段可以往后添加*/
  }
}

## 运行

1. 安装nodejs、mongodb
2. 打开cmd，到项目目录下运行：`npm i`
3. 启动：`npm run start`

> 建议开发工具：webstorm

## 从struct生成页面

可生成页面到对应文件夹，在package.json配置好gen{}后，执行下面命令：
`npm run gen-code`

## 原录入的json导入mongodb

`npm run import-json-to-mongo`

## 部署服务器

1. windows10 安装windows terminal 和ubuntu（win商店搜索）
2. 修改脚本，运行
3. 手动部署过程，见脚本

## 二次开发
1. 修改gen-front和对应struct可支持不同类型字段的生成,甚至关联表页面和代码以及链接等
2. 可修改*.ejs模板调成页面
3. 可在routes下增加其他方法，入导入导出、上传下载图片、文件等