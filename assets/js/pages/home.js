$(document).ready(function () {

    /* ------ date time picker ------ */
    $( function() {
        from = $( "#from" )
            .datetimepicker({
                defaultDate: "+1w",
                changeMonth: true,
            })
            .on( "change", function() {
                to.datetimepicker( "option", "minDate", getDate( this ) );
            }),
            to = $( "#to" ).datetimepicker({
                defaultDate: "+1w",
                changeMonth: true,
            })
                .on( "change", function() {
                    from.datetimepicker( "option", "maxDate", getDate( this ) );
                });

        function getDate( element ) {
            var date;
            try {
                date = $.datetimepicker.parseDate( dateFormat, element.value );
            } catch( error ) {
                date = null;
            }

            return date;
        }
    } );

    /* ---------- Chart with points ---------- */

    var lineChart = echarts.init(document.getElementById('lineChart'));

    var option = {
        title: {
            text: '个人一年支出统计',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} k'
            },
            axisPointer: {
                snap: true
            }
        },
        color: 'black',
        series: [
            {
                name: '支出金额',
                type: 'line',
                smooth: true,
                data: [3, 2.8, 2.5, 2.6, 2.7, 3, 5.5, 5, 4, 3.9, 3.8, 3.9],
            }
        ]
    };

    lineChart.setOption(option);

    /* ------- table ------- */

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