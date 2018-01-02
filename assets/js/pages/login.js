$(function () {
    $("#post").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();
        $.ajax({
            type:'post',
            url: 'http://zjh.hduzjh.cn/HouseKeeper/login-login',
            data:{
                "which": "m",
                "username": username,
                "password": password
            },
            success:function (res) {
              localStorage.memberId = res.data.id.memberId;
              console.log(localStorage.memberId);
              window.location.href = "index.html";
            },
            error:function (err) {
                alert(err)
            }
        })
        return false;
    })
})

