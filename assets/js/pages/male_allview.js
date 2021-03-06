$(document).ready(function () {

    /* -------date time picker ------*/

    $('#date_time_picker1').datetimepicker();

    $('#date_time_picker2').datetimepicker();
    
    $('.sel').change(getMapData)
    /* ---------- Chart with points ---------- */
    var dotChart = echarts.init(document.getElementById('dotChart'));
    var option1;
    option1 = {
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
                formatter: '{value} '
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
                color:'red'
            },
            {
                name: '收入金额',
                type: 'line',
                smooth: true,
                data: [1, 3, 2, 2.3, 1.2, 4, 2.2, 2.6, 5.3, 3, 3.6, 2.1],
                color:'green'
            }
        ]
    };

    dotChart.setOption(option1);

    /* ---------- Stack chart ---------- */

    var barGraph = echarts.init(document.getElementById('barGraph'));
    var option2;
    option2 = {
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
                    formatter: '{value} '
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
    barGraph.setOption(option2);


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
    function deleteData(id, i) {
      $.ajax({
        url: 'http://zjh.hduzjh.cn/HouseKeeper/operator-delete',
        type: 'post',
        data: {
          which: 'c' + i,
          id: id
        }
      })
        .done(function (res) {
          if (res.status === 200) {
            getData(i)
            alert("删除成功")
          }
        })
    }
    function getData(i) {
        var memberId = localStorage.memberId;
        var url = 'http://zjh.hduzjh.cn/HouseKeeper/cash-query';
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: {
              which: 'm'+i,
              memberId: memberId,
            }
        })
            .done(function (json) {
                //向表格内新增内容
                var tbody = i === 'i' ? $("#inTable tbody") : $("#outTable tbody");
                tbody.empty()
                for (const [index, item] of json.data.entries()) {
                    tbody.append(`
                <tr>
                    <td>${format(item.time)}</td>
                    <td>${item.money}</td>
                    <td>${item.site}</td>
                    <td>${item.account}</td>
                    <td>${item.balance}</td>
                    <td>${item.item}</td>
                    <td>${item.remark}</td>
                    <td>
                      <button class="btn btn-primary edit"  data-toggle="modal" data-target="#myModal">编辑</button>
                      <button class="btn btn-danger delete">删除</button>
                    </td>
                </tr>
              `)
                $(".delete").eq(index).on("click",function(){
                  deleteData(item.id, i)
                });
                $(".edit").eq(index).on("click",function(){
                  $("#time").val(format(item.time))
                  $("#money").val(item.money)
                  $("#site").val(item.site)
                  $("#account").val(item.account)
                  $("#balance").val(item.balance)
                  $("#item").val(item.item)
                  $("#remark").val(item.remark)
                });
                // $(".edit").eq(index).on("click", edit(item.id, i));
                }
            }).fail(function () {
            alert("Err");
        });
    }
    function getMapData() {
        var memberId = localStorage.memberId;
        var year = $(".sel").val()
        var url = 'http://zjh.hduzjh.cn/HouseKeeper/cash-yearSum';
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: {
              year: year,
              memberId: memberId,
            }
        })
            .done(function (res) {
                //向表格内新增内容
                var dataIn = [];
                var dataOut = [];
                var dataSum = [];
                for(let i = 1;i<13;i++){
                  dataIn.push(res.date.i[i]);
                  dataOut.push(res.date.o[i]);
                  dataSum.push(res.date.sum[i]);
                }
                console.log(dataIn,dataOut,dataSum)
                option1.series[0].data = dataIn;
                option1.series[1].data = dataOut;
                option2.series[0].data = dataSum;
                dotChart.setOption(option1)
                barGraph.setOption(option2)
            }).fail(function () {
            alert("Err");
        });
    }
    getData('i');
    getData('o');
    getMapData();
  });
