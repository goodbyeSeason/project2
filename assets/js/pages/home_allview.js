$(document).ready(function () {

    /* ------ datepicker ------ */

    $( function() {
        from = $( "#from" )
            .datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                dateFormat:"yy-mm-dd"
            })
            .on( "change", function() {
                to.datepicker( "option", "minDate", getDate( this ) );
            }),
            to = $( "#to" ).datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                dateFormat:"yy-mm-dd"
            })
                .on( "change", function() {
                    from.datepicker( "option", "maxDate", getDate( this ) );
                });

        function getDate( element ) {
            var date;
            try {
                date = $.datepicker.parseDate( dateFormat, element.value );
            } catch( error ) {
                date = null;
            }

            return date;
        }
    } );

    /* ---------- Stack chart ---------- */

    var barGraph = echarts.init(document.getElementById('barGraph'));

    option = {
        color: ['#0567'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel: {
                    formatter: '{value} k'
                },
            }
        ],
        series : [
            {
                name:'支出总览',
                type:'bar',
                barWidth: '60%',
                data:[1, 5.2, 2, 3.34, 3.9, 3.3, 2.2,2.6,5.3,4.02,3.6,2.1]
            }
        ]
    };
    barGraph.setOption(option);


    /* ------- in table ------- */

    function GetMultiLineSelectTable(tableId, selectIds) {
        var table = $(tableId);
        var url = table.data('zjh.hduzjh.cn/HouseKeeper/cash-inSave');
        var ischeckbox = false;
        //获取数据项名称
        var fileds = new Array();
        table.children('thead').children('tr').children('th').each(function (index, el) {
            var type = 'Content';
            if ($(this).data('type')) type = $(this).data('type');
            if (type == 'Content') {
                var field = $(this).data('field');
                fileds[index] = field;
            }
            else if (type == 'CheckBox') {
                ischeckbox = true;
            }
        });
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
        })
            .done(function (json) {
                //向表格内新增内容
                var tbody = '';
                $.each(json, function (index, el) {
                    var tr = "<tr>";
                    if (ischeckbox) {//生成复选按钮
                        //tr+='<td><div class="checker"><span><input class="checkboxes" type="checkbox"></span></div></td>'
                        tr += '<td><input type="checkbox"></td>'
                    }
                    $.each(fileds, function (i, el) {//生成内容
                        if (fileds[i]) {
                            tr += '<td>' + formatJsonData(json[index][fileds[i]]) + '</td>';
                        }
                    });
                    tr += "</tr>";
                    tbody += tr;
                });
                table.children('tbody').empty();
                table.children('tbody').append(tbody);//显示数据
                if (selectIds) {//将需要选中的行设为选中状态
                    selectIds.each(function (index, el) {
                        //建设中
                    });
                }
                table.children('tbody').addClass('sel');
                table.children('tbody.sel').children('tr').click(function (event) {//点击行事件
                    $(this).toggleClass('active');//增加选中效果
                    if (ischeckbox) $(this).find('input[type="checkbox"]').attr('checked', $(this).hasClass('active'));//选择复选框
                });

            }).fail(function () {
            alert("Err");
        });
    }

//格式化JSON数据，比如日期
    function formatJsonData(jsondata) {
        if (jsondata == null) {
            return '';
        }
        else if (/\/Date\(\d+\)/.exec(jsondata)) {
            var date = new Date(parseInt(jsondata.replace("/Date(", "").replace(")/", ""), 10));
            return date.toLocaleString();
        }
        return jsondata;
    }

    /* ------out table -----*/

    function GetMultiLineSelectTable(tableId, selectIds) {
        var table = $(tableId);
        var url = table.data('zjh.hduzjh.cn/HouseKeeper/cash-outSave');
        var ischeckbox = false;
        //获取数据项名称
        var fileds = new Array();
        table.children('thead').children('tr').children('th').each(function (index, el) {
            var type = 'Content';
            if ($(this).data('type')) type = $(this).data('type');
            if (type == 'Content') {
                var field = $(this).data('field');
                fileds[index] = field;
            }
            else if (type == 'CheckBox') {
                ischeckbox = true;
            }
        });
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
        })
            .done(function (json) {
                //向表格内新增内容
                var tbody = '';
                $.each(json, function (index, el) {
                    var tr = "<tr>";
                    if (ischeckbox) {//生成复选按钮
                        //tr+='<td><div class="checker"><span><input class="checkboxes" type="checkbox"></span></div></td>'
                        tr += '<td><input type="checkbox"></td>'
                    }
                    $.each(fileds, function (i, el) {//生成内容
                        if (fileds[i]) {
                            tr += '<td>' + formatJsonData(json[index][fileds[i]]) + '</td>';
                        }
                    });
                    tr += "</tr>";
                    tbody += tr;
                });
                table.children('tbody').empty();
                table.children('tbody').append(tbody);//显示数据
                if (selectIds) {//将需要选中的行设为选中状态
                    selectIds.each(function (index, el) {
                        //建设中
                    });
                }
                table.children('tbody').addClass('sel');
                table.children('tbody.sel').children('tr').click(function (event) {//点击行事件
                    $(this).toggleClass('active');//增加选中效果
                    if (ischeckbox) $(this).find('input[type="checkbox"]').attr('checked', $(this).hasClass('active'));//选择复选框
                });

            }).fail(function () {
            alert("Err");
        });
    }

//格式化JSON数据，比如日期
    function formatJsonData(jsondata) {
        if (jsondata == null) {
            return '';
        }
        else if (/\/Date\(\d+\)/.exec(jsondata)) {
            var date = new Date(parseInt(jsondata.replace("/Date(", "").replace(")/", ""), 10));
            return date.toLocaleString();
        }
        return jsondata;
    }
});