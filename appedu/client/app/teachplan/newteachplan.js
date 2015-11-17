Template.newteachplan.events({
    'click #btnaddteachplan':function(){
      event.preventDefault();

      var teachcontent =  $("#teachcontent").val();
      var teachdate =  $("#teachdate").val();
      var teachername = $("#teachername").val();

      var classtermid = Meteor.user().profile.curclasstermid;
      var classtermname =  classtermname = dbClassterms.findOne(classtermid).name;

      var schoolid =  Meteor.user().profile.curschoolid;

      var teachplanDoc = {
          teachcontent:teachcontent,
          teachdate:teachdate,
          teachername:teachername,
        //  content:content,
          schoolid:schoolid,
          classtermid:classtermid,
          classtermname:classtermname,
          createuserid:Meteor.user()._id,
          createtime:moment().format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log("insert teachplanDoc:" + EJSON.stringify(teachplanDoc));
      Meteor.call("insertteachplan",teachplanDoc);

      Router.go("/teachplan");

    }
});
Template.newteachplan.rendered=function() {
    $('#teachdate').pickadate();
}
