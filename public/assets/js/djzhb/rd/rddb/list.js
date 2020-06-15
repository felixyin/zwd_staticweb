var table, form, laypage, layer, element, laydate, upload;//时间组件


$(function () {
    initProvinceById("/fpmsProvince/provinceList.do", "provinceCode", false);//加载省份
    layui.use(['table', 'form', 'laypage', 'layer', 'element', 'laydate', 'upload'], function () {
        table = layui.table;
        form = layui.form;
        laypage = layui.laypage;//分页
        layer = layui.layer;//弹层
        element = layui.element; //元素操作
        laydate = layui.laydate; //时间组件
        upload = layui.upload;
        // intuser()//初始化用户信息
        //监听表格数据
        table.render({
            elem: '#tabledata',
            height: $(window).height() - $('#query_condition').height() - 83,
            text: {
                none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
            },
            method: 'get',
            loading: true,
            url: 'http://127.0.0.1:8000/assets/js/api/data/djzhb/rd/rddb/list.json'+'?t='+(new Date().getTime()),//数据接口
            headers: setHeader(),
            parseData: function (res) {
                var data = res.resultData.data.slice(0,10);
                res.resultData.data = data;
                return res.resultData;
            },
            response: {
                statusName: 'status', //规定数据状态的字段名称，默认：code
                statusCode: 200, //规定成功的状态码，默认：0
                msgName: 'hint', //规定状态信息的字段名称，默认：msg
                countName: 'total', //规定数据总数的字段名称，默认：count
                dataName: 'data' //规定数据列表的字段名称，默认：data
            },
            page: true, //开启分页
            cols: [[    //表头
                {field: 'id', title: 'ID', align: 'center', hide: true, width: 5},

                {field: 'name', title: '姓名', align: 'left', width: 150},

                {field: 'lxfs', title: '联系方式', align: 'left', width: 150},

                {field: 'ssxq', title: '所属选区', align: 'left', width: 150},

                {field: 'sqdnhm', title: '社区电话号码', align: 'left', width: 150},

                {field: 'xb', title: '性别', align: 'left', width: 150},

                {field: 'csrq', title: '出生日期', align: 'left', width: 150},

                {field: 'cjgzsj', title: '参加工作时间', align: 'left', width: 150},

                {field: 'rdsj', title: '入党时间', align: 'left', width: 150},

                {field: 'gzdwjzw', title: '工作单位及职务', align: 'left', width: 150},

                {field: 'dwdv', title: '单位地址', align: 'left', width: 150},

                {field: 'sfwjdb', title: '是否往届代表', align: 'left', width: 150},

                {field: 'jtzv', title: '家庭住址', align: 'left', width: 150},

                {field: 'gzjl', title: '工作简历', align: 'left', width: 150},

                {field: 'dbszqk', title: '代表述职情况附件', align: 'left', width: 150},

                {field: 'dbszap', title: '代表述职安排附件', align: 'left', width: 150},

                {field: 'dblvqk', title: '代表履职情况附件', align: 'left', width: 150},

                {field: 'pjmyd', title: '满意度评测表附件', align: 'left', width: 150},

                {
                    field: '', title: '操作', align: 'center', width: 180, fixed: 'right',
                    templet: function (data) {
                        return '<div class="layui-btn-group">' +
                            '<a href="javascript:;" class="layui-btn layui-btn-normal layui-btn-xs BTNSHOW BTNSHOW_EDIT" lay-event="look">编辑/查看</a>' +
                            '<a href="javascript:;" class="layui-btn layui-btn-danger layui-btn-xs BTNSHOW BTNSHOW_DELETE" lay-event="del" >删除</a>' +
                            '</div>'
                    }
                }
            ]],
            done: function (res,curr,count) {
                //如果是异步请求数据方式，res即为你接口返回的信息。
                //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                //console.log(res);
                //permissionFUN()//功能按钮权限
                if (res.status != 200) {
                    $(".layui-none").text(res.resultMsg)
                }
                console.log(res,curr,count);
                try{
                    
                }catch(e){}
                }
        });
        //监听行工具事件
        table.on('tool(test)', function (obj) {
            form.render();//需要渲染一下
            var data = obj.data;
            //编辑删除功能
            if (obj.event === 'del') {  //删除
                layer.confirm('真的要删除这行数据？', function (index) {
                    var requestData = {"id": data.id, "other": data};
                    $.ajax({
                        url: 'http://127.0.0.1:8000/assets/js/api/data/djzhb/rd/rddb/remove.json'+'?t='+(new Date().getTime()),//数据接口
                        type: "POST",              //请求类型
                        data: formatParam(requestData),              //请求数据
                        timeout: 200000,                //请求超时时间(毫秒)
                        headers: setHeader(),
                        success: function (res) {         //请求成功
                            if (res.status == 200) {
                                    layer.closeAll();//关闭加载层
                                    table.reload("tabledata", {});
                            } else {
                                layer.msg(res.resultMsg, {icon: res.icon});
                            }

                        }
                    })
                    return false;
                });
            } else if (obj.event === 'look') { //编辑
                var num = obj.data;
                $('#queryCondBtn').attr('lay-filter','editInfo');
                var fullindex = layer.open({
                    type: 1,
                    area: ['690px', '420px'],
                    fix: false, //不固定
                    maxmin: true,
                    shadeClose: true,
                    shade: 0.4, //遮罩层
                    title: ['编辑表单', 'background:#1E9FFF;color:#fff'],
                    content: $('#form_edit'),
                    end: function () {
                        $('#form_edit').hide();
                    }
                });
                $("#id").val(num.id);

                $("#name_edit").val(num.name);

                $("#lxfs_edit").val(num.lxfs);

                $("#ssxq_edit").val(num.ssxq);

                $("#sqdnhm_edit").val(num.sqdnhm);

                $("#xb_edit").val(num.xb);

                $("#csrq_edit").val(num.csrq);

                $("#cjgzsj_edit").val(num.cjgzsj);

                $("#rdsj_edit").val(num.rdsj);

                $("#gzdwjzw_edit").val(num.gzdwjzw);

                $("#dwdv_edit").val(num.dwdv);

                $("#sfwjdb_edit").val(num.sfwjdb);

                $("#jtzv_edit").val(num.jtzv);

                $("#gzjl_edit").val(num.gzjl);

                $("#dbszqk_edit").val(num.dbszqk);

                $("#dbszap_edit").val(num.dbszap);

                $("#dblvqk_edit").val(num.dblvqk);

                $("#pjmyd_edit").val(num.pjmyd);

                form.render();
            } else if (obj.event === 'lookimg') { //图片查看
                var viewer = new Viewer(document.getElementById('img_' + data.qrcode), {
                    url: 'data-original',
                    navbar: false
                });
            }
            form.render();//需要渲染一下
        });
        //表单验证
        form.verify({
            fNameFile: function (value, item) {//姓名验证
                if (validate.isBlank(value)) {
                    return "请输入小区名称";
                }
                if (!validate.isLength(value, 1, 50)) {
                    return '小区名称长度不能超过50个字符';
                }

            },
            fcommunity: function (value, item) {
                if (validate.isBlank(value)) {
                    return "请选择社区";
                }
            },
            ftype: function (value, item) {
                if (validate.isBlank(value)) {
                    return "请选择类型";
                }
            },
            fremarks: function (value, item) {
                if (!validate.isLength(value, 0, 100)) {
                    return "备注长度不能超过100";
                }
            }
        });
        //表单添加提交事件
        form.on('submit(addInfo)', function (data) {
            this.blur();//防止点回车，按钮重复点击
            //var loadIndex = layer.load(1);//显示加载层
            var requestData = formToJsonObj("form_edit", []);
            $.ajax({
                url:'http://127.0.0.1:8000/assets/js/api/data/djzhb/rd/rddb/add.json'+'?t='+(new Date().getTime()),//数据接口
                type: "POST",              //请求类型
                data: formatParam(requestData),              //请求数据
                timeout: 200000,                //请求超时时间(毫秒)
                headers: setHeader(),
                success: function (res) {         //请求成功
                    if (res.status == 200) {
                        layer.closeAll();//关闭加载层
                        table.reload("tabledata", {});
                    } else {
                        layer.msg(res.resultMsg, {icon: res.icon});
                        //layer.closeAll();//关闭加载层
                    }
                }
            })
            return false; //阻止表单跳转。
        });
        //表单编辑提交事件
        form.on('submit(editInfo)', function (data) {
            this.blur();//防止点回车，按钮重复点击
            //var loadIndex = layer.load(1);//显示加载层
            var requestData = formToJsonObj("form_edit", []);
            $.ajax({
                url:'http://127.0.0.1:8000/assets/js/api/data/djzhb/rd/rddb/edit.json'+'?t='+(new Date().getTime()),//数据接口
                type: "POST",              //请求类型
                data: formatParam(requestData),              //请求数据
                timeout: 200000,                //请求超时时间(毫秒)
                headers: setHeader(),
                success: function (res) {         //请求成功
                    if (res.status == 200) {
                        layer.closeAll();//关闭加载层
                        table.reload("tabledata", {});
                    } else {
                        layer.msg(res.resultMsg, {icon: res.icon});
                        //layer.closeAll();//关闭加载层
                    }
                }
            })
            return false; //阻止表单跳转。
        });
        $("#exportData").click(function () {
            window.location.href = "/res/page/Management/imporDate.html?id=exportfrqs";
        })
        // 查询按钮提交查询信息
        form.on('submit(queryData)', function (data) {
            // 组装查询条件
            var reqData = getConditionValue();
            // 重新加载表格数据
            table.reload("tabledata", {
                where: {"reqData": JSON.stringify(reqData)}
                , page: {
                    curr: 1 //重新从第 1 页开始
                }
            });
        });
    });

    $(document.body).on('click','.layui-table-page a',function(){
        __page =  $(this).attr('data-page');
        console.log(__page);
    });
})
var __page = 1;


function addDataFunc(){
var fullindex = layer.open({
type: 1,
area: ['690px', '420px'],
fix: false, //不固定
maxmin: true,
shadeClose: true,
shade: 0.4, //遮罩层
title: ['编辑表单', 'background:#1E9FFF;color:#fff'],
content: $('#form_edit'),
end: function () {
$('#form_edit').hide();
}
});

$("#name_edit").val('');

$("#lxfs_edit").val('');

$("#ssxq_edit").val('');

$("#sqdnhm_edit").val('');

$("#xb_edit").val('');

$("#csrq_edit").val('');

$("#cjgzsj_edit").val('');

$("#rdsj_edit").val('');

$("#gzdwjzw_edit").val('');

$("#dwdv_edit").val('');

$("#sfwjdb_edit").val('');

$("#jtzv_edit").val('');

$("#gzjl_edit").val('');

$("#dbszqk_edit").val('');

$("#dbszap_edit").val('');

$("#dblvqk_edit").val('');

$("#pjmyd_edit").val('');

$('#queryCondBtn').attr('lay-filter','addInfo');
form.render();
}