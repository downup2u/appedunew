/**
 * Created by Luforn on 2015/9/16.
 */


Meteor.methods({
    'insertQA': function(qaDoc){
        console.log("insertQA:" + EJSON.stringify(qaDoc));
        dbQa.insert(qaDoc);
    },
    'updateQA': function(selector,params){
        dbQa.update(selector,params);
    }

});
