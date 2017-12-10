$(document).ready(function(){
	
	todoList();
	discussionWidget();
	
	/* ---------- Placeholder Fix for IE ---------- */
	$('input, textarea').placeholder();

	/* ---------- Auto Height texarea ---------- */
	$('textarea').autosize();
	
	$('#recent a:first').tab('show');
	$('#recent a').click(function (e) {
	  e.preventDefault();
	  $(this).tab('show');
	}); 

	
	/*------- Moris Chart -------*/
	Morris.Donut({
		element: 'hero-donut',
		data: [
			{label: '张家豪', value: 60 },
			{label: '俞有成', value: 30 },
	      	{label: '吴伟伟', value: 10 },
	    ],
		colors: ["#36A9E1", "#d1b993", "#bdea74"],
		formatter: function (y) { return y + "%" }
	});

$(function () {
    $("#savein").click(function () {
        var time = $("#timein").val();
        var itemId = $("#selecttypesin").val();
        var subItemId = $("#selectaccountsin").val();
        var money = $("#moneyin").val();
        var remark = $("#remarksin").val();
        var site = $("#addrin").val();
        var memberId = $("#selectmembersin").val();
  //      var people = $("#").val();
        $.ajax({
            method:'post',
            url: 'https://zjh.hduzjh.cn/HouseKeeper/cash-inSave',
            data:{
                time: time,//注意日期格式
                site:site,
         //       people:people,
                money:money,
                remark:remark,
                memberId:memberId, //成员id
                itemId:itemId,//父分类id
                subItemId:subItemId//子分类id
            },
            success:function (res) {
                alert(res)

            },
            error:function (err) {
                alert(1)
            }
        })
        return false;
    })
})

$(function () {
    $("#saveout").click(function () {
        var time = $("#timeout" ).val();
        var itemId = $("#selecttypesout").val();
        var subItemId = $("#selectaccountsout").val();
        var money = $("#moneyout").val();
        var remark = $("#remarksout").val();
        var site = $("#addrout").val();
        var memberId = $("#selectmembersout").val();
       //var people = $("#").val();
        $.ajax({
            method:'post',
            url: 'https://zjh.hduzjh.cn/HouseKeeper/cash-outSave',
            data:{
                time: time,//注意日期格式
                site:site,
            //    people:people,
                money:money,
                remark:remark,
                memberId:memberId, //成员id
                itemId:itemId,//父分类id
                subItemId:subItemId//子分类id
            },
            success:function (res) {
                alert(res)
            },
            error:function (err) {
                alert(err)
            }
        })
        return false;
    })
})

});
