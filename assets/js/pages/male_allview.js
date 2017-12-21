$(document).ready(function () {

    /* -------date time picker ------*/

    $('#date_time_picker1').datetimepicker();

    $('#date_time_picker2').datetimepicker();

    /* ---------- Chart with points ---------- */
    var dotChart = echarts.init(document.getElementById('dotChart'));

    option = {
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

    dotChart.setOption(option);

    /* ---------- Stack chart ---------- */

    var barGraph = echarts.init(document.getElementById('barGraph'));

    option = {
        color: ['#0567'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: '{value} k'
                },
            }
        ],
        series: [
            {
                name: '支出总览',
                type: 'bar',
                barWidth: '60%',
                data: [1, 5.2, 2, 3.34, 3.9, 3.3, 2.2, 2.6, 5.3, 4.02, 3.6, 2.1]
            }
        ]
    };
    barGraph.setOption(option);


    /* ------- in table ------- */
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
        console.log('getData')
        var in_url = 'http://zjh.hduzjh.cn/HouseKeeper/cash-memberQuery';
        var out_url = 'http://zjh.hduzjh.cn/HouseKeeper/cash-memberQuery';
        var url = i === 'i' ? in_url : out_url;
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: {
                which: i,
                memberId: 3,
            }
        })
            .done(function (json) {
                //向表格内新增内容
                var tbody = i === 'i' ? $("#inTable tbody") : $("#outTable tbody");
                for (const item of json) {
                    tbody.append(`
                <tr>
                    <td>${format(item.id.time)}</td>
                    <td>${item.id.money}</td>
                    <td>${item.id.site}</td>
                    <td>${item.id.accountName}</td>
                    <td>${item.id.account_balance}</td>
                    <td>${item.id.itemName}</td>
                    <td>${item.id.remark}</td>
                    <td>${item.id.control}</td>
                </tr>
              `)
                }
            }).fail(function () {
            alert("Err");
        });
    }

    getData('i');
    getData('o')
});