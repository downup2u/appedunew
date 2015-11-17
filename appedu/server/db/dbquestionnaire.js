/**
 * Created by Luforn on 2015/9/23.
 */

Meteor.methods({
    'insertQuestionnaire': function(qnDoc){
        console.log("insertQuestionnaire:" + EJSON.stringify(qnDoc));
        dbQuestionnaire.insert(qnDoc);
    },
    'updateQuestionnaire': function(selector,params){
        dbQuestionnaire.update(selector,params);
    },
    'insertQnfeedback': function(qnfDoc){
        console.log("insertQnfeedback:" + EJSON.stringify(qnfDoc));
        dbQnfeedback.insert(qnfDoc);
    },
    'updateQnfeedback': function(selector,params){
        dbQnfeedback.update(selector,params);
    }
});
