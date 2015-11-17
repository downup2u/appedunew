Template.adminmainlayout.onRendered(function () {
	resizeBox();
	$(window).resize(function() {
		resizeBox();
	});
	function resizeBox(){
	var jcd_viewHeight = document.documentElement.clientHeight;//获取屏幕宽度
	var jcd_viewWidth = document.documentElement.clientWidth;//获取屏幕高度
		var jcd_bodyHeight = document.body.scrollHeight;//获取页面高度
	var jcd_adminHeadHeight = $('.jcd_admin_logo_con').height();
	var jcd_admin_sidebar = $('.jcd_admin_sidebar');
	var jcd_admin_content = $('.jcd_admin_content');
	jcd_admin_sidebar.css({
		'height' : (jcd_viewHeight-jcd_adminHeadHeight)+'px'
	})
	jcd_admin_content.css({
			'padding-left' : jcd_admin_sidebar.width()+'px',
			'height' : (jcd_viewHeight-jcd_adminHeadHeight)+'px',
			'overflow' : 'auto'
	})
	}
	$('body').css('backgroundColor','#FFF');
	$('body').click(function(){
		$('#admin_user .admin_user_con').removeClass('admin_user_con_hover');
		$('#admin_user .admin_user_list').hide();
	})
});

Template.adminmainlayout.events({
	"click #admin_user": function (oEvent) {
		$('#admin_user .admin_user_con').addClass('admin_user_con_hover');
		$('#admin_user .admin_user_list').show();
		oEvent = oEvent || window.event;
		if(document.all){
			oEvent.cancelBubble = true;
		}else{
			oEvent.stopPropagation();
		}
	},
	'click #btnlogout': function(event){
        event.preventDefault();
        Meteor.logout();
    },
		'click #btnchangepassword': function(event){
					//event.preventDefault();
					Router.go('/changepassword');
			}
})
