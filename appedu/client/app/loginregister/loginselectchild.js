var curchildid = new ReactiveVar('');
Template.loginselectchild.events({
	"click #btnenter": function () {
		console.log("click btn btnenter");
		event.preventDefault();
		var selchildid = curchildid.get();
		var isnextskip = $('input[name=isnextskip]').is(':checked');
		console.log("isnextskip:" + isnextskip);
		Meteor.call('setSelChildid',selchildid, Meteor.user(),isnextskip);
		Router.go('/');
	},
	'click .jcd_btnselectchild li':function(){
		var id = this.childid;
		$('.jcd_btnselectchild li').removeClass('sel');
		$('.selchild_'+id).addClass('sel');
		curchildid.set(id);
	}
});

Template.loginselectchild.helpers({
	'mychildlist':function(){
		var mychildlist = globalgetchildrenfromuser(Meteor.userId());
		mychildlist = _.map(mychildlist,function(child){
			var iscurchild = child.childid == Meteor.user().profile.curchildid;
			if(iscurchild){
				curchildid.set(child.childid);
			}
			return _.extend(child,{
				iscurchild:iscurchild,
			});
		});
		console.log("mychildlist:" + EJSON.stringify(mychildlist));
		return mychildlist;
	}
})
