$(document).ready(function() {
  var data=[{"name":"张三", "age":"21"},{"name":"李四", "age":"21"},{"name":"王五", "age":"21"}]
        for(var i = 0;i < data.length;i++){
            var a = "<li>姓名：" + data[i].name + ",年龄: "+ data[i].age +"</li>";
            var $ul = document.getElementById("ml");
            $ul.append(a);
        }
})