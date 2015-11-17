
Template.myschool.helpers({
	'schoollist':function(){
		var schoollist = [];
    dbSchools.find({schoolmasterid:Meteor.userId()}).forEach(function(school){
      schoollist.push(school);
    });
		return schoollist;
	},
	'curschool':function(){
		return this._id == Meteor.user().profile.curschoolid;
	}
});

Template.myschool.events({
  'click #btnswitch':function(){
    Meteor.call('setSelSchoolid',this._id,Meteor.user());
	}
});
