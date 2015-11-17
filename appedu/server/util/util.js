Meteor.startup(function(){
    //client only:
    Meteor.publish("curclassterm",function(childid){
      var schoolid = '';
      var schoolname = '';
      var classtermid = '';
      var classtermname = '';
      var children = [];
      var headerteacherid = '';
      var headerteachername = '';
      var teacherlist = [];
      var parentlist = [];

      var curuser = {};
      if(this.userId) {
          curuser = Meteor.users.findOne(this.userId);
          console.log("publish curuser:" + EJSON.stringify(curuser));
      }
      if (Roles.userIsInRole(curuser, ['parent'])) {
        if(curuser.children){
          console.log("parent(家长) children:" + EJSON.stringify(curuser.children));
          var curchildid = childid;
          if(curuser.children.length > 0 && curchildid == ''){
            curchildid = curuser.children[0]._id;
          }
          var child = dbChildren.findOne(curchildid);
          if(child){
            classtermid = child.curclasstermid;
          }
         console.log("parent(家长) curchildid:" + curchildid +",child" + EJSON.stringify(child));
        }
        else{
            console.log("parent(家长) 没有孩子:" + EJSON.stringify(curuser));
        }
      }
      if (Roles.userIsInRole(curuser, ['schoolmaster'])) {
        console.log("schoolmaster(园长) login");
      }
      if (Roles.userIsInRole(curuser, ['teacher'])) {
        console.log("teacher(老师) login");
      }
      if (Roles.userIsInRole(curuser, ['headerteacher'])) {
        console.log("headerteacher(班主任) login");
      //  var usr = Meteor.users.findOne(this.userId());
      //  if (usr) {
          classtermid = curuser.curclasstermid;
      //  }
      }
      var classterm = dbClassterms.findOne({_id:classtermid});
      if(classterm){
          schoolid = classterm.schoolid;
          schoolname = classterm.schoolname;
          classtermname = classterm.name;
          headerteacherid = classterm.headerteacherid;
          headerteachername = classterm.headerteachername;
          if(classterm.teacherlist){
            teacherlist = classterm.teacherlist;
          }

          if(classterm.studentslist){
            for(var i = 0;i < classterm.studentslist.length;i++){
              var student = classterm.studentslist[i];
              if(student.parentlist){
                for(var j = 0;j < student.parentlist.length;j++){
                  parentlist.push(student.parentlist[j]);
                }
              }
            }
          }

      }
      //当前班级信息
      var resultinfo = {
         schoolid : schoolid,
         schoolname :schoolname,
         classtermid :classtermid,
         classtermname :classtermname,
         children :children,
         headerteacherid :headerteacherid,
         headerteachername :headerteachername,
         teacherlist:teacherlist,
         parentlist:parentlist,
      };
      console.log("publish curclassterm:" + EJSON.stringify(resultinfo));
      this.added('curclassterm',classtermid,resultinfo);
      this.ready();
      //return resultinfo;
    });

	});
