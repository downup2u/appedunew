var _imgsz = new ReactiveVar([]);
Template.sendletter.helpers({
  'isparent':function(){
    return  Roles.userIsInRole(Meteor.user(), ['parent']);
  },
  'isheaderteacher':function(){
    return  Roles.userIsInRole(Meteor.user(), ['headerteacher']);
  },
  'sendusers':function(){
    var users = [];
    var classtermid = Meteor.user().profile.curclasstermid;
    if(Roles.userIsInRole(Meteor.user(), ['parent'])){
      users.push({
        userid: dbClassterms.findOne(classtermid).headerteacherid,
        truename:dbClassterms.findOne(classtermid).headerteachername,
      });
    }
    if(Roles.userIsInRole(Meteor.user(), ['headerteacher'])){
      //找到本班级所有孩子
      dbChildren.find({curclasstermid:classtermid}).forEach(function(child){
          dbUserchildren.find({childid:child._id}).forEach(function(userchild){
            console.log("users:" + userchild.userid + ",childid:" + child._id);
            var usershowname = Meteor.users.findOne(userchild.userid).profile.truename + "(" + child.truename + userchild.releationshipname + ")";
              var user = {
                userid:userchild.userid,
                truename:usershowname
              }
              users.push(user);
          });
      });
    }
    console.log("sendusers:" + EJSON.stringify(users));
    return users;
  },
	'imagefile':function(){
    var imgsz = _imgsz.get();
    var imgurlsz = _.map(imgsz,function(imgid){
    var imgurl = globalgetimgurl(imgid);
    //
    var imgurl = Images.findOne(imgid);
      return {imgurl:imgurl};
    });
    console.log("imgurlsz:"+EJSON.stringify(imgurlsz));
		return imgurlsz;
	}
});
//当模版关闭的时候
Template.sendletter.destroyed = function(){
  _imgsz.set([]);
	//_imgsz = new ReactiveVar([]);//清空上传图片缓存
};
Template.sendletter.events({
  'change #letterimage' : function(event, template){
     console.log("change image...");
     var self = this;
     FS.Utility.eachFile(event, function(file){
       var image = Images.insert(file, function(err, fileObj){
         if(err){
           //handle error
           console.log("error:" + EJSON.stringify(err));
           alert(err.reason);
         } else {
           var imgsz = _imgsz.get();
           imgsz.push({imageid:image._id});
           _imgsz.set(imgsz);
           console.log("imgsz:" + EJSON.stringify(imgsz));
         }

       });
     });
   },
  'click #btnsendletter': function(event) {
     event.preventDefault();

	   var title= $('#title').val();
	   var content= $('#textcontent').val();
     var createuserid = Meteor.userId();
     var createusername = Meteor.user().username;
     var createtruename = Meteor.user().profile.truename;
	 var createuseravatar = Meteor.user().profile.avatar;
     //to users:todo
     var touserid =  $("#specialrecvuser").val();
     var totruename =  $("#specialrecvuser").find("option:selected").text();

     var recvid = this.recvid;
     var classtermid = Meteor.user().profile.curclasstermid;

	var images = [];

	var letterDoc ={
		title:title,
		content:content,
		createuserid:createuserid,
		createusername:createusername,
		createtruename:createtruename,
		createuseravatar:createuseravatar,
		tousers:[],
		images:images,
		touserid:touserid,
		totruename:totruename,
		classtermid:classtermid,
		recvid:recvid,
		images:_imgsz.get(),
	}
	Meteor.call('insertLetter', letterDoc);

	console.log("insertLetter doc:"+EJSON.stringify(letterDoc));
	Router.go("/parentsletters");
  },

});
