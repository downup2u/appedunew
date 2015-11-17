/**
 * Created by Luforn on 2015/9/11.
 */

Template.redflowerslistxq.helpers({
    'isheaderteacher':function() {
        return Roles.userIsInRole(Meteor.user(), ['headerteacher']);
    }
});
