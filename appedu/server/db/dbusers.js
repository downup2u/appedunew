Meteor.methods({
	'settruename':function(userinf){
		//console.log("userinf:" + EJSON.stringify(userinf));
		Meteor.users.update(Meteor.userId(),{$set:{'profile.truename':userinf.truename, 'profile.avatar':userinf.avatar}});
  },
  'setSelChildid':function(selchildid,user,isnextskip){
      console.log("setSelChildid:" + selchildid);
      if (Roles.userIsInRole(user, ['parent'])) {
        var child = dbChildren.findOne(selchildid);
        if(child){
          var schoolid = child.schoolid;
          var curclasstermid = child.curclasstermid;
          Meteor.users.update(user._id, { $set:
            {
              'profile.curschoolid':schoolid,
              'profile.curclasstermid':curclasstermid,
              'profile.curchildid':selchildid,
							'profile.isnextskip':isnextskip,
            }} );
        }
      }
  },
  'setschoolid':function(schoolid,user){
    if (Roles.userIsInRole(user, ['headerteacher'])) {

        Meteor.users.update(user._id, { $set:
          {
            'profile.curschoolid':schoolid,
          }} );

    }
  },
  'setclasstermidtomyself':function(selclasstermid,user){
    if (Roles.userIsInRole(user, ['headerteacher'])) {
      var classterm = dbClassterms.findOne(selclasstermid);
      if(classterm){
        if(Meteor.users.findOne(classterm.headerteacherid)){
            //error
        }
        else{
          dbClassterms.update(selclasstermid,{ $set:
            {
              'headerteacherid':user._id,
              'headerteachername':user.profile.truename,
            }} );
            Meteor.call('setSelClasstermid',selclasstermid,user);
        }
      }
    }
  },
  'setSelClasstermid':function(selclasstermid,user,isnextskip){
      if (Roles.userIsInRole(user, ['headerteacher'])) {
        var classterm = dbClassterms.findOne(selclasstermid);
        if(classterm){
          var schoolid = classterm.schoolid;
          Meteor.users.update(user._id, { $set:
            {
              'profile.curschoolid':schoolid,
              'profile.curclasstermid':selclasstermid,
							'profile.isnextskip':isnextskip,
            }} );
        }
      }
  },
});
