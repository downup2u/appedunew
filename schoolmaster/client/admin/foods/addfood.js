Template.addfood.events({
    'click #btnaddfood':function(){
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
          createtime:moment().format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log("insert foodDoc:" + EJSON.stringify(foodDoc));
      Meteor.call("insertfood",foodDoc);

      Router.go("/foods");

    }
});

Template.addfood.rendered=function() {
    $('#fooddate').pickadate();
}
