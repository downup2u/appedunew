Template.basicinfo.events({
    "click #btnmodify": function (event) {
        event.preventDefault();
        //上传头像
        var truename = $("#truename").val();
        var avatar = $("#avatarid").val();
        var userinf = {
            truename: truename,
            avatar: avatar
        }
        Meteor.call('settruename', userinf);
        Router.go('profile');
    },
    "click .sel_avatar li": function (event) {
        event.preventDefault();
        var id = this.id;
        $('#avatarid').val(id);
        $('.sel_avatar li').removeClass('sel');
        $('.sel_t_' + id).addClass('sel');
        $('#nowAvatar').attr('src', '/images/avatar/' + id + '.jpg')
    },
    "click .changeavatar": function (event) {
        $('.sel_avatar').slideToggle(100);
    },
    "click .changeLnk": function(event){
        $('.sel_avatar').slideToggle(100);
    }
});

Template.basicinfo.helpers({
    "truename": function (event) {
        return Meteor.user().profile.truename;
    },
    "avatar": function (event) {
        return Meteor.user().profile.avatar || 0;
    },
    "avararlist": function (event) {
        var a = [];
        for (var i = 0; i < 10; i++) {
            var j = i + 1;
            var b = {
                url: '/images/avatar/' + j + '.jpg',
                id: j
            };
            if (Meteor.user().profile.avatar == j) {
                b.now = true;
            } else {
                b.now = false;
            }
            a.push(b);
        }
        return a;
    }
});
Template.basicinfo.rendered = function () {
    $('.sel_avatar li span.n').css({
        'height': $('.sel_avatar li img').eq(0).height() + 'px',
        'width': $('.sel_avatar li img').eq(0).width() + 'px',
        'line-height': ('.sel_avatar li img').eq(0).height() + 'px'
    })

}
