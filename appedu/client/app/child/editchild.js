Template.editchild.events({
	"click #btneditchild": function (event, tmpl) {
		console.log("click btn btneditchild");
		event.preventDefault();
		var truename =  $('#truename').val();
		var sex = tmpl.find('input:radio[name=gender]:checked').value;
		var birthday =  $('#birthday').val();
		var releationshipname = $("#releationshipname").val();
		var childDoc = {
			truename:truename,
			sex:sex,
			birthday:birthday,
			archiveclassterms:[],
			createuserid:Meteor.userId(),
			createusername:Meteor.user().username,
			releationshipname:releationshipname
		}
		Meteor.call('editChild',this.childid,childDoc,this.returnurl,function(error,result){
			if(!error){
        Router.go('/'+result.returnurl);
        // if(dbChildren.findOne(result.childid).schoolid){
        //   Router.go('/'+result.returnurl);
        // }
        // else{
        //   Router.go('/newchildsetschool/' + result.childid +"/" + result.returnurl);
        // }
			}
			else{
				alert(error.reason);
			}
		});
	}
});
Template.editchild.helpers({
	'releationshiplist':function(){
		return [
			{name:'爸爸'},
			{name:'妈妈'},
			{name:'爷爷'},
			{name:'奶奶'},
			{name:'外公'},
			{name:'外婆'},
			{name:'叔叔'},
			{name:'阿姨'},
			{name:'伯伯'},
			{name:'伯母'},
			{name:'哥哥'},
			{name:'姐姐'},
			{name:'其他'},
		];
	}
});

Template.editchild.rendered=function() {
    $('#birthday').pickadate();
}
