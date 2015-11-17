/**
 * Created by Luforn on 2015/9/14.
 */


Template.mischiefxz.events({
    'click .gift_btn': function(event) {
        event.preventDefault();
        var content = $('#blackflower_content').val();
        var redflower = {
            'teacherid':Meteor.userId(),
            'teachername':Meteor.user().username,
            'happentime':$('#happendtime').val(),
            'content':content
        };
        console.log("teacherid:"+Meteor.userId()+" teachername:"+Meteor.user().username+" flowerlistid:"+this.flowerlistid);
        Meteor.call('updateFlowerslist', {'_id':this.flowerlistid},{$push: {'blackflowerlist': redflower}});
        Router.go("/mischiefxq/"+this.flowerlistid);
    }

});

Template.mischiefxz.rendered=function() {
    $('#happendtime').pickadate();
}
