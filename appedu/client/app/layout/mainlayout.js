var ANIMATION_DURATION = 300;
var initiator = null;
Template.mainlayout.onRendered(function () {
    this.find("#content-container")._uihooks = {
        insertElement: function (node, next) {
            var start = (initiator === 'back') ? '-100%' : '100%';
            if (initiator == 'footer') {
                start = 0;
                ANIMATION_DURATION = 0;
            }
            $.Velocity.hook(node, 'translateX', start);
            $(node)
                .insertBefore(next)
                .velocity({translateX: [0, start]}, {
                    duration: ANIMATION_DURATION,
                    easing: 'ease-in-out',
                    queue: false
                });


        },
        removeElement: function (node) {
            var end = (initiator === 'back') ? '100%' : '-100%';
            if (initiator == 'footer') {
                end = 0;
                ANIMATION_DURATION = 0;
            }
            $(node).velocity({translateX: end}, {
                duration: ANIMATION_DURATION,
                easing: 'ease-in-out',
                queue: false,
                complete: function () {
                    $(node).remove();
                    initiator = null;
                    ANIMATION_DURATION = 300;
                }
            });
        }
    };
});
Template.mainlayout.helpers({
    'showfooter': function () {
        return Session.get('pageshowfooter');
    }
});
Template.mainlayout.events({
    'click .back': function (event) {
        event.stopImmediatePropagation();
        event.preventDefault();
        initiator = 'back';
        history.back();
    },
    "click .footerlnk p a": function (event) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault();
        var url = $(event.target).attr("href");
        console.log("url:"+url);
        initiator = 'footer';
        Router.go("/login");
    }
});
