$(document).ready(function () {

    /* ------ date time picker ------ */

    $(function () {
        from = $(".from")
            .datetimepicker({
                defaultDate: "+1w",
                changeMonth: true,
            })
            .on("change", function () {
                to.datetimepicker("option", "minDate", getDate(this));
            }),
            to = $(".to").datetimepicker({
                defaultDate: "+1w",
                changeMonth: true,
            })
                .on("change", function () {
                    from.datetimepicker("option", "maxDate", getDate(this));
                });

        function getDate(element) {
            var date;
            try {
                date = $.datetimepicker.parseDate(dateFormat, element.value);
            } catch (error) {
                date = null;
            }

            return date;
        }
    });

    /* -------year picker --------*/
    var sel = $('.sel');
    for (var i = 2010; i < 2020; i++) {
        var option = `<option>${i}</option>`
        sel.each(function () {
            $(this).append(option)
        })
        // option[1].appendChild(txt);
    }
    /* ---------- Stack chart ---------- */

    var barGraph = echarts.init(document.getElementById('barGraph_home'));

    option = {
        brush: {
            xAxisIndex: 0
        },
        tooltip: {},
        xAxis: {
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            name: '月份',
            silent: false
        },
        yAxis: {
            axisLabel: {
                formatter: '{value}k'
            },
            inverse: false,
            splitArea: {
                show: false
            }
        },
        grid: {
            left: 100
        },
        series: [{
            type: 'bar',
            data: [1, 3, -2, 8, 9, 5, 4, 2, 6, -3, 1, 2]
        }]
    };
    barGraph.setOption(option);

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
        series: [{
            name: '支出金额',
            type: 'line',
            smooth: true,
            data: [3, 2.8, 2.5, 2.6, 2.7, 3, 5.5, 5, 4, 3.9, 3.8, 3.9],
        }]
    };

    lineChart.setOption(option);

    function add0(m) {
        return m < 10 ? '0' + m : m
    }

    function format(shijianchuo) {
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
    }
    function getData(i) {
        var familyId = localStorage.familyId;
        var url = 'http://localhost:8080/HouseKeeper/cash-query';
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: {
                which: 'f' + i,
                id: familyId,
            }
        })
            .done(function (json) {
                //向表格内新增内容
                var tbody = i === 'i' ? $("#home_inTable tbody") : $("#home_outTable tbody");
                tbody.empty();
                for (const [index, item] of json.data.entries()) {
                    tbody.append(`
                <tr>
                    <td>${format(item.time)}</td>
                    <td>${item.money}</td>
                    <td>${item.member}</td>
                    <td>${item.site}</td>
                    <td>${item.account}</td>
                    <td>${item.item}</td>
                    <td>${item.remark}</td>
                </tr>
              `)
                }
            }).fail(function () {
            alert("Err");
        });
    }
    getData("i");
    getData("o");

});