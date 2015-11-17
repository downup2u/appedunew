Template.activities.events({
  'click #tabone1':function(){
  //  event.preventDefault();
    $('#tabone2').removeClass('hover');
    $('#tabone3').removeClass('hover');
    $('#tabone1').addClass('hover');
    // $('#con_one_1').css({'display':'block'});
    // $('#con_one_2').css({'display':'none'});
    // $('#con_one_3').css({'display':'none'});
    Session.set('curtab',0);
    console.log("click tab1");
  },
  'click #tabone2':function(){
  //  event.preventDefault();
    $('#tabone1').removeClass('hover');
    $('#tabone3').removeClass('hover');
    $('#tabone2').addClass('hover');
    // $('#con_one_2').css({'display':'block'});
    // $('#con_one_1').css({'display':'none'});
    // $('#con_one_3').css({'display':'none'});
    Session.set('curtab',1);
    console.log("click tab2");
  },
  'click #tabone3':function(){
  //  event.preventDefault();
    $('#tabone1').removeClass('hover');
    $('#tabone2').removeClass('hover');
    $('#tabone3').addClass('hover');
    // $('#con_one_3').css({'display':'block'});
    // $('#con_one_1').css({'display':'none'});
    // $('#con_one_2').css({'display':'none'});
    Session.set('curtab',2);
    console.log("click tab3");
  },

});


Template.activities.helpers({
  'isheaderteacher':function(){
    return Roles.userIsInRole(Meteor.user(), ['headerteacher']);
  },
  'visiblerangeisclass':function(){
    return this.visiblerange == 'class';
  },
  'activitylist':function(){
    var curtab = 0;
    if(Session.get('curtab')){
      curtab = Session.get('curtab');
    }
    var activitylist = [];
    var schoolid = Meteor.user().profile.curschoolid;
    var classtermid = Meteor.user().profile.curclasstermid;

    console.log("schoolid:" + schoolid +",classid:" + classtermid);
    //下面有很多过滤条件，学校和班级

//=======================================================
    if(curtab == 0){
      var thismonthbegin = moment().subtract({months:1}).startOf('month');
      var thismonthend = moment().subtract({months:1}).endOf('month');
    }
    else if(curtab == 2){
      var thismonthbegin = moment().add({month:1}).startOf('month');
      var thismonthend = moment().add({month:1}).endOf('month');
    }
    else{//本月
      var thismonthbegin = moment().startOf('month');
      var thismonthend = moment().endOf('month');
    }

  //  var curdate = mcurdate.format('YYYY-MM-DD');
    var startdate =  thismonthbegin.format('YYYY-MM-DD');
    var enddate = thismonthend.format('YYYY-MM-DD');
    console.log("startdate:" + startdate + ",enddate:"+ enddate);
//=======================================================
    var query = {
      schoolid:schoolid,
      activitydate:{
        $gte:startdate,
        $lte:enddate,
      }
    };
    dbActivities.find(query).forEach(function(act){
      if(act == 'class'){
        if ( act.classtermid == 'classtermid'){
          activitylist.push(act);
        }
      }
      else{
        activitylist.push(act);
      }

    });

    return activitylist;
  }
});
