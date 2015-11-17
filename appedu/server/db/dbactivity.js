Meteor.methods({
  'insertactivity':function(activityDoc){
    console.log("insertactivity:" + EJSON.stringify(activityDoc));
    dbActivities.insert(activityDoc);
  },
  'updateactivity':function(id,activityDoc){
    console.log("updateactivity:" + EJSON.stringify(activityDoc));
    dbActivities.update(id,{$set:activityDoc});
  },
});
