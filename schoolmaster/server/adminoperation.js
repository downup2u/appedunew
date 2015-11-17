Meteor.methods({
  'insertSchool': function(schoolDoc){
		console.log("insertSchool:" + EJSON.stringify(schoolDoc));
		dbSchools.insert(schoolDoc);
	},
  'updateSchool': function(id,schoolDoc){
		console.log("updateSchool:" + EJSON.stringify(schoolDoc));
		dbSchools.update(id,{$set: schoolDoc});
	},
  'insertclassterm':function(classtermDoc){
    console.log("insertclassterm:" + EJSON.stringify(classtermDoc));
		dbClassterms.insert(classtermDoc);
  },
  'updateclassterm':function(id,classtermDoc){
    console.log("updateclassterm:" + EJSON.stringify(classtermDoc));
		dbClassterms.update(id,{$set:classtermDoc});
  },
  'insertactivity':function(activityDoc){
    console.log("insertactivity:" + EJSON.stringify(activityDoc));
    dbActivities.insert(activityDoc);
  },
  'updateactivity':function(id,activityDoc){
    console.log("updateactivity:" + EJSON.stringify(activityDoc));
		dbActivities.update(id,{$set:activityDoc});
  },
  'insertfood':function(foodDoc){
    console.log("insertfood:" + EJSON.stringify(foodDoc));
    dbFoods.insert(foodDoc);
  },
  'updatefood':function(id,foodDoc){
    console.log("updatefood:" + EJSON.stringify(foodDoc));
		dbFoods.update(id,{$set:foodDoc});
  },
  'insertteachplan':function(teachplanDoc){
    console.log("insertteachplan:" + EJSON.stringify(teachplanDoc));
    dbTeachplans.insert(teachplanDoc);
  },
  'updateteachplan':function(id,teachplanDoc){
    console.log("updateteachplan:" + EJSON.stringify(teachplanDoc));
    dbTeachplans.update(id,{$set:teachplanDoc});
  },
});
