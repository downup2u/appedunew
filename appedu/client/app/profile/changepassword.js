Template.changepassword.events({
    "click #btnsave": function () {
      console.log("click btn btnsave");
      event.preventDefault();
      var old_password =  $('#old_password').val();
      var password =  $('#password').val();
      var confirmpassword =  $('#confirmpassword').val();
      if(password != confirmpassword ){
        alert("两次密码输入不同");
        return;
      }
      Accounts.changePassword(old_password,password,function(err,result){
           if(!err){
             	Meteor.logout();
             	Router.go('/profile');
             	console.log('Password Changed');
           }
           else{
             alert(err.reason);
           }
      })

    },
  });
