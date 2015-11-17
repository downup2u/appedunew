Meteor.methods({
    'insertLetter': function(letterDoc){
       var sendDoc = _.extend(letterDoc,  {
         createtime:moment().format('YYYY-MM-DD HH:mm:ss'),
       });
       console.log("sendDoc:" + EJSON.stringify(sendDoc));
       dbparentsletterssend.insert(letterDoc);

       if(sendDoc.touserid == '0'){
         //发送给所有家长
         var users = [];
         var classtermid = Meteor.user().profile.curclasstermid;
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
         _.each(users,function(user){
           var recvDoc = {
              title:sendDoc.title,
              content:sendDoc.content,
              createtime:sendDoc.createtime,
              images:sendDoc.images,
              recvuserid:user.userid,
              recvtruename:user.truename,
              fromuserid:sendDoc.createuserid,
              fromtruename:sendDoc.createtruename,
              classtermid:sendDoc.classtermid,
              isreaded:false,
           };
           dbparentslettersrecv.insert(recvDoc);
         });
       }
       else{
         var recvDoc = {
            title:sendDoc.title,
            content:sendDoc.content,
            createtime:sendDoc.createtime,
            images:sendDoc.images,
            recvuserid:sendDoc.touserid,
            recvtruename:sendDoc.totruename,
            fromuserid:sendDoc.createuserid,
            fromtruename:sendDoc.createtruename,
            classtermid:sendDoc.classtermid,
            isreaded:false,
         };
         dbparentslettersrecv.insert(recvDoc);
       }

       //
     },
     'setLetterReaded':function(recvid){
       dbparentslettersrecv.update(recvid,{$set:{isreaded:true}});
     }
	});
