/**
 * Created by Luforn on 2015/9/14.
 */


Template.redflowerslistxz.events({
    'click .gift_btn': function(event) {
        event.preventDefault();
        var content = $('#redflower_content').val();
        var redflower = {
            'teacherid':Meteor.userId(),
            'teachername':Meteor.user().username,
            'happentime':$('#happendtime').val(),
            'content':content
        };
        console.log("teacherid:"+Meteor.userId()+" teachername:"+Meteor.user().username+" flowerlistid:"+this.flowerlistid);
        Meteor.call('updateFlowerslist', {'_id':this.flowerlistid},{$push: {'redflowerlist': redflower}});
        Router.go("/redflowerslistxq/"+this.flowerlistid);
    }
});

Template.redflowerslistxz.rendered=function() {
    $('#happendtime').pickadate();
}
