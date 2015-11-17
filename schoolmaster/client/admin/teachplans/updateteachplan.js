Template.updateteachplan.events({
    'click #btnupdateteachplan':function(){
      event.preventDefault();

      var teachcontent =  $("#teachcontent").val();
      var teachdate =  $("#teachdate").val();
      var teachername = $("#teachername").val();
      var content =  $("#content").val();
      var classtermname = $("#classtermtype").find("option:selected").text();
      var classtermid = $("#classtermtype").val();
      var schoolid =  Meteor.user().profile.curschoolid;
      var teachplanDoc = {
          teachcontent:teachcontent,
          teachdate:teachdate,
          teachername:teachername,
          content:content,
          schoolid:schoolid,
          createuserid:Meteor.user()._id,
          classtermid:classtermid,
          classtermname:classtermname,
      }
      console.log("update teachplanDoc:" + EJSON.stringify(teachplanDoc));
      Meteor.call("updateteachplan",this._id,teachplanDoc);

      Router.go("/teachplans");

    }
});
Template.updateteachplan.rendered=function() {
    $('#teachdate').pickadate();
}
