/**
 * Created by Luforn on 2015/9/11.
 */

Meteor.methods({
    'insertFlowerslist': function(redflowerDoc){
        console.log("insertFlowerslist:" + EJSON.stringify(redflowerDoc));
        dbRedflowerslist.insert(redflowerDoc);
    },
    'updateFlowerslist': function(selector,params){
        dbRedflowerslist.update(selector,params);
    }

});
