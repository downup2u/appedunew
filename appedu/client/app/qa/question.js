/**
 * Created by Luforn on 2015/9/16.
 */

Template.question.events({
    'click .gift_btn': function(event) {
        event.preventDefault();
        var title = $('#qtitle').val();
        var content = $('#qcontent').val();
        var isvisibleforothers = $('#isvisibleforothers').attr('checked') == "checked";
        var isallowotherscommit = $('#isallowotherscommit').attr('checked') == "checked";
        var createuserid = Meteor.userId();
        var createusername = Meteor.user().username;
        var createtime = moment().format('YYYY-MM-DD HH:mm:ss');
        var qaDoc = {
            'qtitle':title,
            'qcontent':content,
            'createuserid':createuserid,
            'createusername':createusername,
            'createtime':createtime,
            'isvisibleforothers':isvisibleforothers,
            'isallowotherscommit':isallowotherscommit,
            'replylist':[]
        };
        Meteor.call('insertQA', qaDoc);
        Router.go("/qa");
    }
});
