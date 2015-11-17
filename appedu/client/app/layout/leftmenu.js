Template.leftmenu.onRendered(function(){
    var winW = document.documentElement.clientWidth;//获取设备宽度
    var winH = document.documentElement.clientHeight;//获取设备高度
    $(".leftmenu,.leftmenuwamp").css("height", winH+"px");
});