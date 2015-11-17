Router.configure({
    layoutTemplate: 'mainlayout'
});

Router.route('/', function () {
    this.render('home');
});

Router.route('/ios', function () {
    Session.set('targetdevice', 'ios');
    console.log("run on ios");
    this.redirect("/");
});

Router.route('/android', function () {
    Session.set('targetdevice', 'android');
    console.log("run on android");
    this.redirect("/");
});

Router.route('/login');

Router.route('/loginselectchild', function () {
    this.render('loginselectchild');
});

Router.route('/loginselectclassterm', function () {
    this.render('loginselectclassterm');
});

Router.route('/createclasstermsetschool/:returnurl', function () {
    var data = {
        returnurl: this.params.returnurl,
    };
    this.render('createclasstermsetschool', {data: data});
});

Router.route('/createclasstermsetclassterm/:schoolid/:returnurl', function () {
    var classterms = [];
    var schoolname = '';
    var schoolid = this.params.schoolid;
    if (schoolid) {
        schoolname = dbSchools.findOne(schoolid).name;
    }
    dbclassterms = dbClassterms.find({schoolid: schoolid});
    dbclassterms.forEach(function (cls) {
        classterms.push(cls);
    });
    var data = {
        schoolname: schoolname,
        classterms: classterms,
        returnurl: this.params.returnurl,
        schoolid: schoolid,
    };
    this.render('createclasstermsetclassterm', {data: data});
});

//================================================================

Router.route('/register', function () {//注册
    console.log("register html");
    this.render('register');
});
Router.route('/retrievepassword', function () {//忘记密码
    this.render('retrievepassword');
});

Router.route('/basicinfo');
Router.route('/profile', function () {
    if (Meteor.user()) {
        console.log("判断角色登录 login");
        if (Roles.userIsInRole(Meteor.user(), ['parent'])) {
            console.log("parent(家长) login");
        }
        if (Roles.userIsInRole(Meteor.user(), ['schoolmaster'])) {
            console.log("schoolmaster(园长) login");
        }
        if (Roles.userIsInRole(Meteor.user(), ['teacher'])) {
            console.log("teacher(老师) login");
        }
        if (Roles.userIsInRole(Meteor.user(), ['headerteacher'])) {
            console.log("headerteacher(班主任) login");
        }

        var truename = Meteor.user().username;
        if (Meteor.user().profile) {
            truename = Meteor.user().profile.truename;
            avatar = Meteor.user().profile.avatar;
        }
        var data = {
            username: truename,
            avatar: avatar
        };
        this.layout('mainlayout');
        this.render('profile', {data: data});
    }
    else {
        this.redirect("/login");
    }
});

Router.route('/parentsletters', function () {
    //家长信首页
    console.log("parentsletters html");
    var parentslettersrecv = [];
    var parentsletterssend = [];

    var lrecvlst = dbparentslettersrecv.find({recvuserid: Meteor.userId()});
    lrecvlst.forEach(function (dbrv) {
        parentslettersrecv.push(dbrv);
    });

    var lsendlst = dbparentsletterssend.find({createuserid: Meteor.userId()});
    lsendlst.forEach(function (dbsd) {
        parentsletterssend.push(dbsd);
    });

    var data = {
        parentslettersrecv: parentslettersrecv,
        parentsletterssend: parentsletterssend
    }
    console.log("parentsletters:" + EJSON.stringify(data));
    this.render('parentsletters', {data: data});
});

Router.route('/sendletter', function () {
    this.render('sendletter');
});

Router.route('/sendletter/:id', function () {
    //新建家长信
    var data = {
        recvid: this.params.id,
    };
    this.render('sendletter', {data: data});
});

Router.route('/parentsletterssendinfo/:id', function () {
    //新建家长信
    var data = dbparentsletterssend.findOne({_id: this.params.id});
    this.render('parentsletterssendinfo', {data: data});
});

Router.route('/parentslettersrecvinfo/:id', function () {
    //新建家长信
    Meteor.call('setLetterReaded', this.params.id);
    var data = dbparentslettersrecv.findOne({_id: this.params.id});
    this.render('parentslettersrecvinfo', {data: data});
});


Router.route('/changepassword');//修改密码

//我的孩子列表
Router.route('/childlist', function () {
    this.render('childlist');
});


//------------------------------------------------------------
//新增孩子
Router.route('/newchild/:returnurl', function () {
    var data = {
        returnurl: this.params.returnurl,
    };
    this.render('newchild', {data: data});
});

Router.route('/newchildsetschool/:childid/:returnurl', function () {
    var data = {
        returnurl: this.params.returnurl,
        childid: this.params.childid,
    };
    this.render('newchildsetschool', {data: data});
});

Router.route('/newchildsetclassterm/:childid/:schoolid/:returnurl', function () {
    var data = {
        returnurl: this.params.returnurl,
        childid: this.params.childid,
        schoolid: this.params.schoolid,
    };
    this.render('newchildsetclassterm', {data: data});
});

Router.route('/editchild/:childid/:returnurl', function () {
    var child = dbChildren.findOne(this.params.childid);
    var data = {
        returnurl: this.params.returnurl,
        childid: this.params.childid,
    };
    data = _.extend(child, data);
    this.render('editchild', {data: data});
});
//------------------------------------------------------------


//--------------------------------
Router.route('/myclassterm', function () {
    //<----------------
    // <td>{{classname}}</td>
    // <td>{{schoolname}}</td>
    this.render('myclassterm');
});

// Router.route('/createclassterm',function(){
//   var schools = [];
//   var dbschools = dbSchools.find();
//   dbschools.forEach(function(sc){
//     schools.push(sc);
//   });
//   var data = {
//     schools:schools,
//   };
//
//   console.log("createclassterm:" + EJSON.stringify(data));
//   this.render('createclassterm', {data: data});
// });

Router.route('/studentslist', function () {
    this.render('studentslist');
});
//Router.route('/basicinfo');

Router.route('/teachplan', function () {

    var getteachplanlist = function (offsetweekdays) {
        var teachplanlist = [];

        if (offsetweekdays < 0) {
            var thisweekbegin = moment().subtract({days: 7}).startOf('week');
            ;
            var thisweekend = moment().subtract({days: 7}).endOf('week');
        }
        else if (offsetweekdays == 0) {
            var thisweekbegin = moment().startOf('week');
            var thisweekend = moment().endOf('week');
        }
        else {
            var thisweekbegin = moment().add({days: 7}).startOf('week');
            var thisweekend = moment().add({days: 7}).endOf('week');
        }

        var startdate = thisweekbegin.format('YYYY-MM-DD');
        var enddate = thisweekend.format('YYYY-MM-DD');
        console.log("thisweekbegin:" + startdate + ",thisweekend:" + enddate);
        //  .add(1, 'day');
        var schoolid = Meteor.user().profile.curschoolid;
        var classtermid = Meteor.user().profile.curclasstermid;


        var querycondition =
        {
            schoolid: schoolid,
            classtermid: classtermid,
            teachdate: {
                $gte: startdate,
                $lte: enddate,
            }
        };
        var weekdaysFull = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        console.log("query:" + EJSON.stringify(querycondition));
        dbTeachplans.find(querycondition).forEach(function (plan) {

            //weekname/teachername/teachcontent
            teachplanlist.push({
                index: moment(plan.teachdate).day(),
                weekname: weekdaysFull[moment(plan.teachdate).day()],
                teachername: plan.teachername,
                teachcontent: plan.teachcontent
            });
        });
        console.log("teachplanlist:" + EJSON.stringify(teachplanlist));
        return teachplanlist;
    };
//------------------------------------------------------------------------
    var data = {
        lasteachplanlist: getteachplanlist(-7),
        thiseachplanlist: getteachplanlist(0),
        nexteachplanlist: getteachplanlist(7),
    }
    console.log("teachplan:" + EJSON.stringify(data));
    this.render('teachplan', {data: data});
});
//Router.route('/profile');
//Router.route('/parentsletters');
Router.route('/evaluation');
Router.route('/checkinout');

Router.route('/activities', function () {

    var data = {
        returnurl: '',
        //  activitylist:activitylist
    }
    this.render('activities', {data: data});
});

Router.route('/newteachplan');

Router.route('/activityinfo/:id', function () {
    var actinfo = dbActivities.findOne(this.params.id);
    this.render('activityinfo', {data: actinfo});
});

Router.route('/newactivity', function () {
    var data = {
        returnurl: 'activities'
    }
    this.render('newactivity', {data: data});
});
//-------------------------------------------------------------
Router.route('/foods', function () {

    var getfoodlist = function (offsetweekdays) {
        var foodlist = [];
        if (offsetweekdays < 0) {
            var thisweekbegin = moment().subtract({days: 7}).startOf('week');
            ;
            var thisweekend = moment().subtract({days: 7}).endOf('week');
        }
        else if (offsetweekdays == 0) {
            var thisweekbegin = moment().startOf('week');
            var thisweekend = moment().endOf('week');
        }
        else {
            var thisweekbegin = moment().add({days: 7}).startOf('week');
            var thisweekend = moment().add({days: 7}).endOf('week');
        }

        var startdate = thisweekbegin.format('YYYY-MM-DD');
        var enddate = thisweekend.format('YYYY-MM-DD');
        console.log("thisweekbegin:" + startdate + ",thisweekend:" + enddate);

        var schoolid = Meteor.user().profile.curschoolid;
        var classtermid = Meteor.user().profile.curclasstermid;

        var querycondition =
        {
            schoolid: schoolid,
            fooddate: {
                $gte: startdate,
                $lte: enddate,
            }
        };
        var weekdaysFull = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        console.log("query:" + EJSON.stringify(querycondition));
        dbFoods.find(querycondition).forEach(function (food) {

            //weekname/teachername/teachcontent
            foodlist.push({
                index: moment(food.fooddate).day(),
                weekname: weekdaysFull[moment(food.fooddate).day()],
                foodname: food.foodname,
                content: food.content
            });
        });
        console.log("foodlist:" + EJSON.stringify(foodlist));
        return foodlist;
    };
//------------------------------------------------------------------------
    var data = {
        lastfoodlist: getfoodlist(-7),
        thisfoodlist: getfoodlist(0),
        nextfoodlist: getfoodlist(7),
    }
    console.log("foodlist:" + EJSON.stringify(data));
    this.render('foods', {data: data});

});

Router.route('/foodinfo/:id', function () {
    var food = foodlist.findOne(this.params.id);
    this.render('foodinfo', {data: food});
});

Router.route('/newfood', function () {
    var data = {
        returnurl: 'foods'
    }
    this.render('newfood', {data: data});
});
//---------------------------------------------
Router.route('/classmanagement');
Router.route('/cxw');
//Router.route('/memberindex');
//Router.route('/register');
Router.route('/growth');
Router.route('/studentslistxq');
Router.route('/studentslistxg');

Router.route('/personal');
//Router.route('/sendletter');
Router.route('/publish');
Router.route('/activitiesfb');

Router.route('/classxz');
//Router.route('/changepassword');
Router.route('/news');

Router.route('/redflowerslist', function () {
    console.log("redflowerslist.html");
    this.render('redflowerslist');
});

Router.route('/redflowerslistxq/:id', function () {
    console.log("redflowerslist.html");
    var flowerslist = dbRedflowerslist.findOne({'_id': this.params.id});
    var data = {
        'flowerlistid': this.params.id,
        'childname': flowerslist.childname,
        'flowerscount': flowerslist.redflowerlist.length,
        'redflowerslist': flowerslist.redflowerlist
    };
    this.render('redflowerslistxq', {data: data});
});

Router.route('/redflowerslistxz/:id', function () {
    console.log("redflowerslist.html");
    var data = {
        'flowerlistid': this.params.id,
        'happendtime': moment().format('YYYY-MM-DD')
    };
    this.render('redflowerslistxz', {data: data});
});

Router.route('/mischief', function () {
    console.log("mischief.html");
    this.render('mischief');
});

Router.route('/mischiefxq/:id', function () {
    console.log("mischiefxq.html");
    var flowerslist = dbRedflowerslist.findOne({'_id': this.params.id});
    var data = {
        'flowerlistid': this.params.id,
        'childname': flowerslist.childname,
        'flowerscount': flowerslist.blackflowerlist.length,
        'blackflowerslist': flowerslist.blackflowerlist
    };
    this.render('mischiefxq', {data: data});
});

Router.route('/mischiefxz/:id', function () {
    console.log("mischiefxz.html");
    var data = {
        'flowerlistid': this.params.id,
        'happendtime': moment().format('YYYY-MM-DD')
    };
    this.render('mischiefxz', {data: data});
});

Router.route('/qa', function () {
    console.log("qa.html");
    this.render('qa');
});

Router.route('/question', function () {
    console.log("question.html");
    this.render('question');
});

Router.route('/qaxq/:id', function () {
    console.log("qa.html");
    //this.render('navbar', {to: 'navbar'});
    var data = {
        'qaid': this.params.id
    };
    this.render('qaxq', {data: data});
});

Router.route('/sp');
Router.route('/dlls');

Router.route('/questionnaire', function () {
    console.log("questionnaire.html");
    this.render('questionnaire');
});

Router.route('/questionnairexz', function () {
    console.log("questionnairexz.html");
    this.render('questionnairexz');
});

Router.route('/questionnairexq/:id', function () {
    console.log("questionnairexq.html");
    if (Roles.userIsInRole(Meteor.user(), ['parent'])) {
        if (dbQnfeedback.find({'qnaireid': this.params.id, 'answererid': Meteor.userId()}).count() > 0) {
            Router.go("/qnfeedbackxq/" + this.params.id + "/" + Meteor.userId());
        } else {
            Router.go("/qnfeedbackxz/" + this.params.id);
        }
    } else {
        this.render('questionnairexq', {data: {'qnid': this.params.id}});
    }
});

Router.route('/qnfeedbackxz/:qnid', function () {
    console.log("questionnairexq.html");
    this.render('qnfeedbackxz', {data: {'qnid': this.params.qnid}});
});

Router.route('/qnfeedbackxq/:qnid/:answererid', function () {
    console.log("questionnairexq.html");
    this.render('qnfeedbackxq', {data: {'qnid': this.params.qnid, 'answererid': this.params.answererid}});
});

Router.route("/editstudent");
