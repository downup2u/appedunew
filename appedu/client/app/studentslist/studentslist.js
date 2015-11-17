Template.studentslist.events({
  'click #tabone1':function(){
  //  event.preventDefault();
    $('#tabone2').removeClass('hover');
    $('#tabone1').addClass('hover');
    $('#con_one_1').css({'display':'block'});
    $('#con_one_2').css({'display':'none'});
    console.log("click tab1");
  },
  'click #tabone2':function(){
  //  event.preventDefault();
    $('#tabone1').removeClass('hover');
    $('#tabone2').addClass('hover');
    $('#con_one_2').css({'display':'block'});
    $('#con_one_1').css({'display':'none'});
    console.log("click tab2");
  },
});

Template.studentslist.helpers({
  'studentslistregister':function(){
    var studentslistregister = [];
    //当前班级
    var classtermid = Meteor.user().profile.curclasstermid;
    //通过班级找到所有同学
    dbChildren.find({curclasstermid:classtermid}).forEach(function(child){
        var childtruename = child.truename;
        var sex = child.sex;
        var birthday =child.birthday;
        var parentuserlist = [];
        dbUserchildren.find({childid:child._id}).forEach(function(userchild){
            var parentid = userchild.userid;
            var parentrelationname = userchild.releationshipname;
            var parent = Meteor.users.findOne(parentid);
            if(parent){
              var parenttruename = parent.profile.truename;
              var parenttel = parent.username;
              parentuserlist.push({
                parentid:parentid,
                parentrelationname:parentrelationname,
                parenttruename:parenttruename,
                parenttel:parenttel,
              });
            }

        });
        studentslistregister.push({
          childid:child._id,
          childtruename:childtruename,
          sex:sex,
          birthday:birthday,
          parentuserlist:parentuserlist,
        });
    });
    console.log("studentslistregister:" + EJSON.stringify(studentslistregister));
    return studentslistregister;
  }
});
