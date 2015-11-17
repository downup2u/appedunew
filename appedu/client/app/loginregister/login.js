Template.login.events({
    "click #btntest":function(){
      if(Session.get('targetdevice') == 'ios'){
        console.log("click btntest run on ios device");
        var inputjson = {type:'req',param1:'wx',param2:''};
        globalcalliosfunction('isinstalled',inputjson,function(outputjson){
            console.log("outputjson:" + EJSON.stringify(outputjson));
        });
      }
    },
    "click #btnlogin": function () {
      console.log("click btn sign");
      event.preventDefault();
      var username =  $('#username').val();
      var password =  $('#password').val();
      Meteor.loginWithPassword(username,password, function (error) {
        if(error){
           alert(error.reason);
           console.log(error.reason);
          // FlashMessages.sendError(error.reason);
        }
        else{
          if (Roles.userIsInRole(Meteor.user(), ['parent'])) {
            if(Meteor.user().profile.isnextskip){
              Router.go('/');
            }
            else{
              Router.go('/loginselectchild');//登录成功
            }

          }
          else if(Roles.userIsInRole(Meteor.user(), ['headerteacher'])) {
            if(Meteor.user().profile.isnextskip){
              Router.go('/');
            }
            else{
              Router.go('/loginselectclassterm');//登录成功
            }
          }
          else{
            console.log("no role for this user!");
          }
        }
      });
    },
  });
