Template.login.events({
    "click #btnsign": function () {
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
          if(Roles.userIsInRole(Meteor.user(), ['schoolmaster'])){
            Router.go('/selschool');//登录成功
          }
          else{
            alert("非园长用户");
          }

        }
      });
    },
  });
Template.login.rendered=(function () {
   $('body').css('backgroundColor','#0066CA');
   jcd_admin_loginform_dom()
    window.onresize = function(){
      jcd_admin_loginform_dom()
    }
   function jcd_admin_loginform_dom(){
    var viewHeight = document.documentElement.clientHeight;
    var viewWidth = document.documentElement.clientWidth;
    var form_dom = document.getElementById('jcd_admin_loginform');
    var form_height = 330;
    form_dom.style.marginTop = Math.floor((viewHeight-form_height)/2)+"px";
  }
});
