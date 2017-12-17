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

    /*------- Moris Chart -------*/
    Morris.Donut({
        element: 'hero-donut',
        data: [
            {label: '张家豪', value: 60},
            {label: '俞有成', value: 30},
            {label: '吴伟伟', value: 10},
        ],
        colors: ["#36A9E1", "#d1b993", "#bdea74"],
        formatter: function (y) {
            return y + "%"
        }
    })
});