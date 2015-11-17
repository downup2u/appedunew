Template.addteachplan.events({
    'click #btnaddteachplan':function(){
      event.preventDefault();

      var teachcontent =  $("#teachcontent").val();
      var teachdate =  $("#teachdate").val();
      var teachername = $("#teachername").val();
    //  var content =  $("#content").val();
      var classtermname = $("#classtermtype").find("option:selected").text();
      var classtermid = $("#classtermtype").val();

      var schoolid =  Meteor.user().profile.curschoolid;
      var teachplanDoc = {
          teachcontent:teachcontent,
          teachdate:teachdate,
          teachername:teachername,
      //    content:content,
          schoolid:schoolid,
          classtermid:classtermid,
          classtermname:classtermname,
          createuserid:Meteor.user()._id,
          createtime:moment().format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log("insert teachplanDoc:" + EJSON.stringify(teachplanDoc));
      Meteor.call("insertteachplan",teachplanDoc);

      Router.go("/teachplans");

    }
});
Template.addteachplan.rendered=function() {
    $('#teachdate').pickadate();
}
