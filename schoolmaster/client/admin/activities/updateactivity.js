Template.updateactivity.events({
    'click #btnupdateactivity':function(){
      event.preventDefault();

      var title =  $("#title").val();
      var activitydate =  $("#activitydate").val();
      var content =  $("#content").val();

  //    var visiblerange = $("#visiblerange").find("option:selected").text();
      var visiblerange = $("#visiblerange").val();

      var activityDoc = {
          title:title,
          activitydate:activitydate,
          content:content,
          visiblerange:visiblerange,

          createuserid:Meteor.userId(),
          createtime:moment().format('YYYY-MM-DD HH:mm:ss'),
      }
      console.log("update activityDoc:" + EJSON.stringify(activityDoc));
      Meteor.call("updateactivity",this._id,activityDoc);

      Router.go("/activities");

    }
});
