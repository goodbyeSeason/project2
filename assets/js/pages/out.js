$(document).ready(function () {

    /* ------ datepicker ------ */

    from = $("#from")
        .datetimepicker({
            defaultDate: "+1w",
            changeMonth: true,
        })
        .on("change", function () {
            to.datetimepicker("option", "minDate", getDate(this));
        }),
        to = $("#to").datetimepicker({
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

    function getRate() {
        var familyId = localStorage.familyId;
        var url = 'http://zjh.hduzjh.cn/HouseKeeper/cash-analyse';
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: {
                year: '2017',
                id: familyId,
            },
            success: function (ret) {
                if (ret.status === 200) {
                    var data = ret.data;
                    var arr = []
                    for (var i = 0; i < data.length; i++) {
                        var temp = {'label': data[i].name, 'value': data[i].rate};
                        arr.push(temp);
                    }
                    chart(arr);
                } else {
                    alert("家庭中未添加成员！");
                }
            },
            error: function () {
                alert("服务端错误！请求失败！");
            }
        })
    }

    getRate();

    function chart(data) {
        Morris.Donut({
            element: 'hero-donut',
            data: data,
            colors: ["#36A9E1", "#d1b993", "#bdea74"],
            formatter: function (y) {
                return y + "%"
            }
        })
    }
});