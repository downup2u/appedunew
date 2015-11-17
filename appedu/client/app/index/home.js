var sollInterval;
Template.home.events({
    "click .menu": function(event){
		event.preventDefault();
		$(".leftmenuwamp").show();
		$(".leftmenu").animate({
			"left": 0
		},100);
		$("#content,#header,#footer").animate({
			"left": '22%'
		},200)
	},
	"click .leftmenuwamp":function(event){
		event.preventDefault();
		$(".leftmenuwamp").hide();
		$(".leftmenu").animate({
			"left": "-40%"
		},100);
		$("#content,#header,#footer").animate({
			"left": '0'
		},100)
	}
});

Template.home.helpers({
	'isparent':function(){
		return Roles.userIsInRole(Meteor.user(), ['parent']);
	},
	'isheaderteacher':function(){
		return Roles.userIsInRole(Meteor.user(), ['headerteacher']);
	},
	'newrecvcount':function(){
		return dbparentslettersrecv.find({
			recvuserid:Meteor.userId(),
			isreaded:false
		}).count();
	}
});

Template.home.rendered = function(){
	var viewHeight = document.documentElement.clientHeight;
	var viewWidth = document.documentElement.clientWidth;

	//禁用原来的滑动事件
	document.addEventListener('touchmove', function(event){
		event.preventDefault();
	},false);

	//首页图片滚动
	sollimg();

	//图片滚动方法
	function sollimg(){
		var l, j,page=0;
		l = $('.ad_soll_img li').length;
		$('.ad_soll_img li img').css({'width' : viewWidth+'px'});
		$('.ad_soll_img ul').css({'width' : (viewWidth*l)+'px'});
		if(l>0){
			var imm = new Image();
			imm.src = $('.ad_soll_img li').eq(0).find('img').attr('src');
			imm .onload = function(){
				var imgheight = imm.height;
				var sollheight = Math.floor((imgheight*viewWidth)/imm.width);
				$('.ad_soll_img').css({'height' : sollheight+'px'});
				if(l>1){
					var p = '<i></i>';
					for(var i=0;i<l;i++){
						$('.ad_soll_img span').append(p);
					}
					$('.ad_soll_img span i:first').addClass('sel');
					$('.ad_soll_img span').css({
						'width': (l*12)+'px',
						'left': Math.floor((viewWidth-l*12)/2)+'px'
					})
					sollInterval = setInterval(function(){
						$('.ad_soll_img ul').animate({
							'left':  '-'+viewWidth+'px'
						},500,function(){
							$('.ad_soll_img ul li:first').insertAfter(".ad_soll_img ul li:last");
							$('.ad_soll_img ul').css('left',0);
							page++;
							if(page>=l){page=0}
							$('.ad_soll_img span i').removeClass('sel');
							$('.ad_soll_img span i').eq(page).addClass('sel');
						})
					},2000)
				}
			}
		}
	}
};

Template.home.destroyed = function(){
	clearInterval(sollInterval);
};