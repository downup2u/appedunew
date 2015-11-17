Meteor.methods({
  'insertteachplan':function(teachplanDoc){
    console.log("insertteachplan:" + EJSON.stringify(teachplanDoc));
    dbTeachplans.insert(teachplanDoc);
  },
  'updateteachplan':function(id,teachplanDoc){
    console.log("updateteachplan:" + EJSON.stringify(teachplanDoc));
    dbTeachplans.update(id,{$set:teachplanDoc});
  },
});
