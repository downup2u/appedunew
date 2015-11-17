Meteor.methods({
    'insertClassterm': function(user,classtermDoc){
       console.log("insertClassterm:" + EJSON.stringify(classtermDoc));
       var curclasstermid = dbClassterms.insert(classtermDoc);
       Meteor.call('setSelClasstermid',curclasstermid,user);
     },
	});
