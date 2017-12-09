$(function () {
    $("#post").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();
        $.ajax({
            type:'post',
            url: 'http://zjh.hduzjh.cn/HouseKeeper/login-memberLogin',
            data:{
                "username": username,
                "password": password
            },
            success:function (res) {
                alert(res)
                window.location.href = "index.html"
            },
            error:function (err) {
                alert(err)
            }
        })
        return false;
    })
})

