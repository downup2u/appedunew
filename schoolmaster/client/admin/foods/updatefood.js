Template.updatefood.events({
    'click #btnupdatefood':function(){
      event.preventDefault();

      var foodname =  $("#foodname").val();
      var fooddate =  $("#fooddate").val();
      var content =  $("#content").val();

      var schoolid =  Meteor.user().profile.curschoolid;
      var foodDoc = {
          foodname:foodname,
          fooddate:fooddate,
          content:content,
          schoolid:schoolid,
          createuserid:Meteor.user()._id,
      }
      console.log("update foodDoc:" + EJSON.stringify(foodDoc));
      Meteor.call("updatefood",this._id,foodDoc);

      Router.go("/foods");

    }
});

Template.updatefood.rendered=function() {
    $('#fooddate').pickadate();
}
