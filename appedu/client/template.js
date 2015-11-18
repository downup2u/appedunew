Template.onRendered(function () {
	// Initialize all datepicker inputs whenever any template is rendered
	var winW = document.documentElement.clientWidth;//获取设备宽度
	var winH = document.documentElement.clientHeight;//获取设备高度
	var jcd_templete = {
		jcd_start : function(){
			this.jcd_form_chickbox();
			this.jcd_height_full();//设置高度全屏
		}
		//单选框
		,jcd_form_chickbox : function(){
			var length = $('.jcd_form_center').length;
			var dom = $('.jcd_form_center');
			if(length>0){
				for(var i=0; i<length; i++){
					//该控件的宽度
					var w = dom.width();
					var cw = 0;
					var c = dom.eq(i).children();
					for(var j=0;j<c.length;j++){
						cw = cw+c.eq(j).outerWidth();
					}
					//居中显示
					if(cw<w){
						c.eq(0).css('margin-left', Math.floor((w-cw)/2)+'px');
					}
				}
			}
			$('.jcd_form .jcd_form_chickbox_lnk').each(function(index, element) {
				$(this).click(function(){
					//$('.jcd_form .jcd_form_chickbox_lnk').removeClass('sel');
					$(".jcd_form_chickbox_lnk", $(this).parent()).removeClass('sel');//luforn 2015-11-18 20:39
					$(this).addClass('sel');
				})
			});
		}
		,jcd_height_full : function(){
			var full = $('.jcd_height_full');
			if(full.length>0){
				for(var i=0;i<full.length;i++){
					var hh = full.eq(i).height();
					if(hh<winH){
						full.eq(i).css('height',winH+"px");
					}
				}
			}
		}

	};
	jcd_templete.jcd_start();
	window.onresize = function(){
		jcd_templete.jcd_start();
	};

	if($("#bgwamp").length==0){
		$('body').append("\<div id=\"bgwamp\"\>\<\/div\>");
	}
	$("#bgwamp").css('height',winH+"px");
});
