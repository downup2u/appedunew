Template.newchildsetclassterm.events({
	"click #btnaddclass": function () {
		console.log(EJSON.stringify(this.schools));
		console.log("click btn btnaddclass");
		event.preventDefault();
		
		var selclasstypevalue = $("#selclass").val();
		if(selclasstypevalue!=''){
			var classtermid = selclasstypevalue;
			Meteor.call('addChildtoclassterm',classtermid, Meteor.user(), this.childid);
			Router.go('/' + this.returnurl);
		}
	}
	,'click .selclassroom li': function(){
		var id = this._id;
		$('.selclassroom li').removeClass('sel');
		$('.selchild_'+id).addClass('sel');
		$('#selclass').val(id);
	}

});

Template.newchildsetclassterm.helpers({
	'classterms':function(){
    var classterms = [];
		var schoolid = this.schoolid;
  	dbclassterms = dbClassterms.find({schoolid:schoolid});
  	dbclassterms.forEach(function(cls){
  		classterms.push(cls);
  	});
		return classterms;
	}
})
