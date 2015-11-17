/**
 * Created by Luforn on 2015/9/24.
 */
var showdel = function(){
    var v = $(".delqnairecontentdiv");
    if(v.length>1){
        v.show();
    }else{
        v.eq(0).hide();
    }
};



Template.questionnairexz.events({
    'click #qnconfirmbtn':function(event){
        event.preventDefault();
        var sub = 0;
        for(var i =0 ;i<$("input:text").length;i++){
            if($("input:text").eq(i).val().replace(/(^\s*)|(\s*$)/g,'')==''){
                sub++;
            }
        }
        if(sub>0){
            swal("老师好像还有没填写的表格！");
            return false;
        }else{
            var qnDoc = {
                'qnairetitle': $('#qnairetitle').val(),
                'createuserid': Meteor.userId(),
                'createusername': Meteor.user().username,
                'createtime': moment().format('YYYY-MM-DD'),
                'classtermid': Meteor.user().profile.curclasstermid
            };
            var questionlist = [];
            $("div[class='qnairecontentdiv']").each(function () {
                var question = {
                    'questionid': Random.id(),
                    'questioncontent': $("input[name='questioncontent']", this).val()
                };
                var answerlist = [];
                $("input[name^='option']", this).each(function (i, element) {
                    var answer = {
                        'index': Math.pow(2, i),
                        'answercontent': $(element).val(),
                        'checkcount': 0
                    };
                    answerlist.push(answer);
                });
                question['answerlist'] = answerlist;
                questionlist.push(question);
            });
            qnDoc['questionlist'] = questionlist;
            Meteor.call('insertQuestionnaire', qnDoc);
            Router.go("/questionnaire");
        }
    },
    'click .gift_btn': function(event) {
        event.preventDefault();
        var ques1 = "\<div class=\"qnairecontentdiv\"\>"
        var ques2 = "\<div class=\"questioncontent\"\>";
        var ques3 = "\<input name=\"questioncontent\" type=\"text\" placeholder=\"问题内容\"\/\>\<a href=\"#\" class=\"delqnairecontentdiv\"\>删除\<\/a\>\<\/div\>";
        var ques4 = "\<div class=\"fb_m\"\>";
        var ques5 = "\<label for=\"option_a\"\>\<span\>选项A: \<\/span\>\<input name=\"option_a\" type=\"text\"\/\>\<\/label\>";
        var ques6 = "\<label for=\"option_b\"\>\<span\>选项B: \<\/span\>\<input name=\"option_b\" type=\"text\"\/\>\<\/label\>";
        var ques7 = "\<label for=\"option_c\"\>\<span\>选项C: \<\/span\>\<input name=\"option_c\" type=\"text\"\/\>\<\/label\>";
        var ques8 = "\<label for=\"option_d\"\>\<span\>选项D: \<\/span\>\<input name=\"option_d\" type=\"text\"\/\>\<\/label\>\<\/div\>\<\/div\>";
        var questionitem = ques1+ques2+ques3+ques4+ques5+ques6+ques7+ques8;
        $(".gift_btn").before(questionitem);
        showdel();
    },
    'click .delqnairecontentdiv':function(){
        event.preventDefault();
        var p = $(event.target).parents(".qnairecontentdiv");
        p.remove();
        showdel();
    }
});

Template.questionnairexz.onRendered(function(){
    showdel();
});
