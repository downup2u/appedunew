Router.configure({
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',

});

Router.route('/register');
Router.route('/forgetpassword');
Router.route('/selschool');
Router.route('/', function () {
  // console.log("admin index html");
  // this.layout('adminmainlayout');
  // this.render('adminnavbar', {to: 'adminnavbar'});
  // this.render('adminorders', {to: 'admincontent'});
  Router.go('/myschool');
});

Router.route('/changepassword',function(){
  console.log("admin index html");
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('changepassword', {to: 'admincontent'});
});

//==========================================================================
//幼儿园列表页面
Router.route('/myschool', function () {
    // console.log(" myschool html:" + EJSON.stringify(Meteor.user()));
    // var myschool = dbSchools.findOne({createuserid:Meteor.user()._id});
    //
    // console.log("展示幼儿园:" + EJSON.stringify(myschool));

   this.layout('adminmainlayout');
   this.render('adminnavbar', {to: 'adminnavbar'});
   this.render('myschool', {to: 'admincontent'});
});

Router.route('/addschool/:returnurl', function () {

  console.log("admin index html");
  var returnurl = this.params.returnurl;
  var data = {
    returnurl:returnurl
  };
  if(returnurl == "selschool"){
    this.render('addschool',{data:data});
  }
  else {
    this.layout('adminmainlayout');
    this.render('adminnavbar', {to: 'adminnavbar'});
    this.render('addschool', {to: 'admincontent',data:data});
  }

});

Router.route('/updateschool/:id', function () {
  var myschool = dbSchools.findOne(this.params.id);
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('updateschool', {to: 'admincontent',data:myschool});
});

//------------------------------------------------------------------------------------
//班级列表页面
Router.route('/classterms', function () {
  console.log("admin classterms html");
  var schoolid =  Meteor.user().profile.curschoolid;
  var classtermlist = [];
  dbClassterms.find({schoolid:schoolid}).forEach(function(cls){
    classtermlist.push(cls);
  });

  console.log("展示班级:" + EJSON.stringify(classtermlist));

  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('classterms', {to: 'admincontent',data:{classtermlist:classtermlist}});
});

Router.route('/addclassterm', function () {
  var headerteacherlist = [];
  var schoolid =  Meteor.user().profile.curschoolid;
  Meteor.users.find({schoolid:schoolid}).forEach(function(user){
    if(Roles.userIsInRole(user, ['headerteacher'])){
      headerteacherlist.push(user);
    }
  });
  console.log("admin index html");
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('addclassterm', {to: 'admincontent',data:{headerteacherlist:headerteacherlist}});
});
//headerteacherlist
Router.route('/updateclassterm/:id', function () {
  var headerteacherlist = [];
  var schoolid =  Meteor.user().profile.curschoolid;
  Meteor.users.find({schoolid:schoolid}).forEach(function(user){
    if(Roles.userIsInRole(user, ['headerteacher'])){
      headerteacherlist.push(user);
    }
  });
  var classterm = dbClassterms.findOne(this.params.id);
  var data = _.extend(classterm,{headerteacherlist:headerteacherlist});
  console.log("admin index html");
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('updateclassterm', {to: 'admincontent',data:data});
});

Router.route('/classterminfo/:id', function () {
  var headerteacherlist = [];
  var schoolid =  Meteor.user().profile.curschoolid;
  Meteor.users.find({schoolid:schoolid}).forEach(function(user){
    if(Roles.userIsInRole(user, ['headerteacher'])){
      headerteacherlist.push(user);
    }
  });
  var classterm = dbClassterms.findOne(this.params.id);
  var data = _.extend(classterm,{headerteacherlist:headerteacherlist});
  console.log("admin index html");
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('classterminfo', {to: 'admincontent',data:data});
});

//=============================================================================

//班主任列表页面
Router.route('/headerteachers', function () {
  console.log("admin navusers html");
  var teacherlist = [];
  var schoolid =  Meteor.user().profile.curschoolid;
  dbClassterms.find({schoolid:schoolid}).forEach(function(cls){
    var usr = Meteor.users.findOne(cls.headerteacherid);
    if(usr){
      var teacher = {
        truename:usr.profile.truename,
        classtermname: cls.name,
        phonenumber:usr.username,
      }
     teacherlist.push(teacher);
    }
  });

  console.log("展示班主任:" + EJSON.stringify(teacherlist));
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('headerteachers', {to: 'admincontent',data:{teacherlist:teacherlist}});
});

//===================================================================================
//活动列表页面
Router.route('/activities', function () {
  var activitylist = [];
  var schoolid =  Meteor.user().profile.curschoolid;
  dbActivities.find({schoolid:schoolid}).forEach(function(sp){
      activitylist.push(sp);
  });
  console.log("展示活动:" + EJSON.stringify(activitylist));

  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('activities', {to: 'admincontent',data:{activitylist:activitylist}});
});

Router.route('/addactivity', function () {
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('addactivity', {to: 'admincontent'});
});

Router.route('/updateactivity/:id', function () {
  var oneact = dbActivities.findOne(this.params.id);
  console.log("展示活动:" + EJSON.stringify(oneact));

  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('updateactivity', {to: 'admincontent',data:oneact});
});


//===================================================================================
//食谱列表页面
Router.route('/foods', function () {
  var foodlist = [];
  var schoolid =  Meteor.user().profile.curschoolid;
  dbFoods.find({schoolid:schoolid}).forEach(function(sp){
      foodlist.push(sp);
  });
  console.log("展示食谱:" + EJSON.stringify(foodlist));

  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('foods', {to: 'admincontent',data:{foodlist:foodlist}});
});

Router.route('/addfood', function () {
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('addfood', {to: 'admincontent'});
});

Router.route('/updatefood/:id', function () {
  var onefood = dbFoods.findOne(this.params.id);
  console.log("展示食谱:" + EJSON.stringify(onefood));

  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('updatefood', {to: 'admincontent',data:onefood});
});


//===================================================================================
//教学计划列表页面
Router.route('/teachplans', function () {
  var teachplanlist = [];
  var schoolid =  Meteor.user().profile.curschoolid;
  dbTeachplans.find({schoolid:schoolid}).forEach(function(sp){
      teachplanlist.push(sp);
  });
  console.log("展示教学计划:" + EJSON.stringify(teachplanlist));

  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('teachplans', {to: 'admincontent',data:{teachplanlist:teachplanlist}});
});

Router.route('/addteachplan', function () {
  this.layout('adminmainlayout');
  var schoolid =  Meteor.user().profile.curschoolid;
  var classtermlist = [];
  dbClassterms.find({schoolid:schoolid}).forEach(function(cls){
    classtermlist.push(cls);
  });
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('addteachplan', {to: 'admincontent',data:{classtermlist:classtermlist}});
});

Router.route('/updateteachplan/:id', function () {
  var oneteachplan = dbTeachplans.findOne(this.params.id);
  console.log("展示教学计划:" + EJSON.stringify(oneteachplan));
  var schoolid =  Meteor.user().profile.curschoolid;

  var classtermlist = [];
  dbClassterms.find({schoolid:schoolid}).forEach(function(cls){
    classtermlist.push(cls);
  });
  var data = _.extend(oneteachplan,{
    classtermlist:classtermlist
  })
  this.layout('adminmainlayout');
  this.render('adminnavbar', {to: 'adminnavbar'});
  this.render('updateteachplan', {to: 'admincontent',data:data});
});

//----------------------------------------------------------------

Router.onBeforeAction(function() {
  if (!Meteor.user()) {
    this.render('login');
  }
  else {
    if(Roles.userIsInRole(Meteor.user(), ['schoolmaster'])){
        this.next();
    }
    else{
      this.render('login');
    }
  }
},{except:['register','forgetpassword']});
