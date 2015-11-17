/**
 * Created by Luforn on 2015/9/24.
 */

Template.questionnaire.helpers({
    questionnairelist:function(){
        var termid = Meteor.user().profile.curclasstermid;
        return  dbQuestionnaire.find({'classtermid':termid});
    },
    'isparent':function(){
        return  Roles.userIsInRole(Meteor.user(), ['parent']);
    },
    'isheaderteacher':function(){
        return  Roles.userIsInRole(Meteor.user(), ['headerteacher']);
    }
});
