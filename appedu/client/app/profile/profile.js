Template.profile.events({
	"click #btnlogout": function(event){
		event.preventDefault();
		Meteor.logout();
		Router.go('/login');
	},
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

Template.profile.helpers({
	'isparent':function(){
		return  Roles.userIsInRole(Meteor.user(), ['parent']);
	},
	'isheaderteacher':function(){
		return  Roles.userIsInRole(Meteor.user(), ['headerteacher']);
	},
	'newrecvcount':function(){
		return dbparentslettersrecv.find({
			recvuserid:Meteor.userId(),
			isreaded:false
		}).count();
	}
});
