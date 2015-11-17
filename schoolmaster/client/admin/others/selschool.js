Template.selschool.events({
    "click #btnenter": function () {
      console.log("click btn btnenter");
      event.preventDefault();

      var selclasstypestring = $("#selschool").find("option:selected").text();
  		var selclasstypevalue = $("#selschool").val();
  		var selschoolid = selclasstypevalue;

  		Meteor.call('setSelSchoolid',selschoolid, Meteor.user());
  		Router.go('/myschool');
    },
    'click #btnselectchild':function(){
        console.log("select child:" + this.childid + ",this childtruename:" + this.childtruename);
    }
  });

Template.selschool.helpers({
  'myschoollist':function(){
    var schoollist = [];
    dbSchools.find({schoolmasterid:Meteor.userId()}).forEach(function(school){
      schoollist.push({
        schoolid:school._id,
        schoolname:school.name,
      });
    });
    return schoollist;
  }
})
