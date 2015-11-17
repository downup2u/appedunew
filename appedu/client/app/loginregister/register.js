var countdownHandler;
var count = new ReactiveVar(0);

function CountDown() {
    if (count.get() > 0) {
        count.set(count.get() - 1);
    } else {
        clearInterval(countdownHandler);
    }
}

Template.register.events({
    "click #btngetauthcode": function () {
        event.preventDefault();
        if (count.get() > 0) {
            return;
        }
        if (countdownHandler) {
            clearInterval(countdownHandler);
        }
        count.set(60);
        //$('#btngetauthcode').addClass('noclick');
        $('#btngetauthcode').css("color", "#999");
        var phonenumber = $('#phonenumber').val();
        Meteor.call('getauthcode', phonenumber, 'register', function (error, result) {
            if (error) {
                count.set(0);
                console.log(error.reason);
                swal({
                    title: "获取验证码失败",
                    text: error.reason,
                    confirmButtonText: "确定"
                });
                //$('#btngetauthcode').removeClass('noclick');
                $('#btngetauthcode').css("color", "#1ea5e9");
            } else {
                console.log("getauthcode:" + EJSON.stringify(result));
                Session.set('registerauthcode', result);
                countdownHandler = setInterval(CountDown, 1000);
            }
        });
    },
    "click #btnregister": function () {
        console.log("click btn sign");
        event.preventDefault();
        var truename = $('#truename').val();
        var phonenumber = $('#phonenumber').val();
        var authcode = $('#authcode').val();
        var password = $('#password').val();
        var sessionauthcode = Session.get('registerauthcode');
        if (sessionauthcode) {
            if (sessionauthcode.phonenumber == phonenumber && sessionauthcode.authcode == authcode) {

            }
            else {
                alert("验证码错误，请重新获取");
                return;
            }
        }
        else {
            alert("请先获取验证码");
            return;
        }

        var newuser =
        {
            username: phonenumber,
            password: password,
            truename: truename,
            avatar: 0
        };
        var roles = ['parent'];
        var radiorole = $('input:radio[name=role]:checked').val();
        console.log("radiorole:" + radiorole);
        if (radiorole == 'teacher') {
            roles = ['headerteacher'];
        }
        Meteor.call('createuser', newuser, roles, function (error, result) {
            if (error) {
                alert(error.reason);
            }
            else {
                Router.go('/profile');//
            }
        });

    }
});

Template.register.helpers({
    'getauthtitle': function () {
        var title = '发送验证码';
        if (count.get() > 0) {
            title = '(' + count.get() + ')重新获取';
        } else {
            $('#btngetauthcode').css("color", "#1ea5e9");
        }
        return title;
    }
});
