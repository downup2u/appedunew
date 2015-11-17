Template.newactivity.events({
    'click #btnaddactivity':function(){
      event.preventDefault();

      var title =  $("#title").val();
      var activitydate =  $("#activitydate").val();
      var content =  $("#newactivitycontent").val();

  //    var visiblerange = $("#visiblerange").find("option:selected").text();
      var visiblerange = $("#visiblerange").val();
      var schoolid = Meteor.user().profile.curschoolid;
      var activityDoc = {
          title:title,
          activitydate:activitydate,
          content:content,
          visiblerange:visiblerange,
          schoolid:schoolid,
          createuserid:Meteor.user()._id,
          createtime:moment().format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log("insert activityDoc:" + EJSON.stringify(activityDoc));
      Meteor.call("insertactivity",activityDoc);

      Router.go("/activities");

    }
});

Template.newactivity.rendered=function() {
    $('#activitydate').pickadate();
}
