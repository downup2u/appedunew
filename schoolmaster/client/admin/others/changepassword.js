Template.changepassword.events({
  "click #btnchangepassword": function () {
    console.log("click btn btnchangepassword");
    event.preventDefault();

    var oldpassword =  $('#oldpassword').val();
    var newpassword = $('#newpassword').val();
    var newpassword2 = $('#newpassword2').val();

    if(newpassword != newpassword2){
        alert("两次密码必须相同");
        return;
    }

    Accounts.changePassword(oldpassword, newpassword,function(error,result){
      if(error){
        alert(error.reason);
      }
      else{
        alert("修改密码成功");
      }
    });
  },
});
