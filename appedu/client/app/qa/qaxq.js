/**
 * Created by Luforn on 2015/9/16.
 */

Template.qaxq.helpers({
    'qaxq':function(){
        return dbQa.findOne({'_id':this.qaid});
    }
});

Template.qaxq.events({
    'click #add_reply':function(event,template){
        event.preventDefault();
        template.$('#reply_zone').show();
        template.$('#add_reply').hide();
    },
    'click .jcd_submit_reply':function(event,template){
        event.preventDefault();
        var replycontent = template.$('#qreply').val();
        var reply = {
            'replyuserid':Meteor.userId(),
            'replyusername': Meteor.user().profile.truename,
            'replycontent':replycontent,
            'replytime':moment().format('YYYY-MM-DD HH:mm:ss')
        };
        Meteor.call('updateQA',{'_id':this.qaid},{$push: {'replylist': reply}});
        template.$('#qreply').val('');
        template.$('#reply_zone').hide();
        template.$('#add_reply').show();

    },
    'click #cancle_reply':function(event,template){
        event.preventDefault();
        template.$('#qreply').val('');
        template.$('#reply_zone').hide();
        template.$('#add_reply').show();
    },
});
