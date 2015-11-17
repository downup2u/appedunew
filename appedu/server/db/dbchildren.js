Meteor.methods({

    'insertChild': function(user,childDoc,returnurl){
       console.log("insertchildDoc:" + EJSON.stringify(childDoc));
       var childid = dbChildren.insert(childDoc);
       //把孩子放入自己信息中
       if (Roles.userIsInRole(user, ['parent'])) {
         //插入孩子和家长关系
         var userchildrenDoc = {
           userid:user._id,
           childid:childid,
           releationshipname:childDoc.releationshipname
         }
         dbUserchildren.insert(userchildrenDoc);
       }
       return {
         returnurl:returnurl,
         childid:childid
       };
     },
     'editChild':function(childid,childDoc,returnurl){
        console.log("editChild:" + EJSON.stringify(childDoc));
        dbChildren.update(childid, {$set: childDoc});
        if(childDoc.releationshipname){
          var userchild = dbUserchildren.findOne({
            userid:Meteor.userId(),
            childid:childid,
          });
          if(userchild){
            dbUserchildren.update(userchild._id,{$set:{releationshipname:childDoc.releationshipname}});
          }
          else{
            var userchildrenDoc = {
              userid:Meteor.userId(),
              childid:childid,
              releationshipname:childDoc.releationshipname
            }
            dbUserchildren.insert(userchildrenDoc);
          }

        }
        return {
          returnurl:returnurl,
          childid:childid
        };
      },
     'addChildtoschool':function(schoolid,parentuser,childid){
         if (Roles.userIsInRole(parentuser, ['parent'])) {
           dbChildren.upsert(childid, {$set: {schoolid: schoolid}});
         }
     },
     'addChildtoclassterm':function(classtermid,parentuser,childid){
       if (Roles.userIsInRole(parentuser, ['parent'])) {
          //把学生和自己放入班级中
          var child = dbChildren.findOne(childid);

          console.log("add child/" +"childid:"+childid + "/curclasstermid:" + classtermid );
          dbChildren.update(childid, {$set:{curclasstermid: classtermid}});
          //追加班级花名册

          var classterm = dbClassterms.findOne(classtermid);
          if(classterm && child){
            var studentslist = [];
            if(classterm.studentslist){
              studentslist = classterm.studentslist;
            }
            var student = {
              childid:childid,
              childname :child.truename,
              parentlist:[
                {
                  parentid : parentuser._id,
                  username : parentuser.username,
                  truename: parentuser.profile.truename,
                }
              ]
            };
            studentslist.push(student);
            dbClassterms.update(classtermid, {$set: {studentslist: studentslist}});

            //新增红花榜数据
            Meteor.call('insertFlowerslist',{
                'classtermid':classtermid,
                'childid':childid,
                'childname':child.truename,
                'redflowerlist':[],
                'blackflowerlist':[]
            });
            console.log("addChildtoclassterm:" + EJSON.stringify(dbClassterms.findOne(classtermid)));
          }
       }
     }
	});
