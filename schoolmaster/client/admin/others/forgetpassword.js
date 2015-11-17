Template.forgetpassword.events({
  "click #btngetauthcode": function () {
    console.log("click btn btngetauthcode");
    event.preventDefault();
    var phonenumber =  $('#phonenumber').val();
    Meteor.call('getauthcode',phonenumber,function(error, result){
      if(error){
        alert(error.reason);
      }
      else{
        console.log("getauthcode:" +EJSON.stringify(result));
        Session.set('resetpasswordauthcode',result);
      }

    });

  },
  "click #btnsetnewpassword": function () {
      console.log("click btn sign");
      event.preventDefault();
      var phonenumber =  $('#phonenumber').val();
      var authcode = $('#authcode').val();
      var password = $('#password').val();
      var sessionauthcode = Session.get('resetpasswordauthcode');
      if(sessionauthcode){
        if(sessionauthcode.phonenumber == phonenumber && sessionauthcode.authcode == authcode ){

        }
        else{
          // alert("验证码错误，请重新获取");
          // return;
        }
      }
      else{
        alert("请先获取验证码");
        return;
      }

      var newuser =
      {
        username:phonenumber,
        password:password,
      };
      Meteor.call('resetpassword',newuser,function(error,result){
        if(!error){
          Router.go('/profile');//登录成功
        }
      });

    },
  });

Template.forgetpassword.rendered = (function () {
  $('.school_login_pagebg').css('height',document.documentElement.clientHeight+'px')
  $('body').css('backgroundColor','#FFF');
});
