Meteor.methods({
    'insertSchool': function(schoolDoc){
       console.log("insertSchool:" + EJSON.stringify(schoolDoc));
       dbSchools.insert(schoolDoc);
     },
	});
