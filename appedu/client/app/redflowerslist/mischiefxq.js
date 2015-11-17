/**
 * Created by Luforn on 2015/9/14.
 */


Template.mischiefxq.helpers({
    'isheaderteacher':function() {
        return Roles.userIsInRole(Meteor.user(), ['headerteacher']);
    }
});
