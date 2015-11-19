/**
 * Created by Luforn on 2015/9/27.
 */



Template.questionnairexq.helpers({
    'questionnairexq':function() {
        return  dbQuestionnaire.findOne({'_id':this.qnid});
    }
});


Template.qnfeedbackxz.helpers({
    'questionnairexq':function() {
        var qnaire = dbQuestionnaire.findOne({'_id':this.qnid});
        for(var i=0;i<qnaire['questionlist'].length;i++){
            var question = qnaire['questionlist'][i];
            for(var j=0; j<question['answerlist'].length;j++){
                var answer = question['answerlist'][j];
                answer['questionid']=question.questionid;
            }
        }
        return  qnaire;
    }
});

Template.qnfeedbackxz.events({
    'click input[type="radio"]':function(event){
        event.preventDefault();
        var qid = $(event.target).attr('name');
        if($('#'+qid).hasClass('uncheck')){
            $('#'+qid).removeClass('uncheck');
        }
    },
    'click #qnxzbtn':function(event){
       event.preventDefault();
        if($('.uncheck').length>0){
            alert('请完成所有问题解答，再提交！');
            return ;
        }
        var qfDoc = {
            'qnaireid':this.qnid,
            'answertime':moment().format('YYYY-MM-DD'),
            'answererid':Meteor.userId(),
            'answerername':Meteor.user().username
        };
        var qfanswerlist = [];
        var qnaire = dbQuestionnaire.findOne({'_id':this.qnid});
        for(var i=0;i<qnaire['questionlist'].length;i++){
            var question = qnaire['questionlist'][i];
            var qval = $("#"+question['questionid']+" > .sel").attr('selval');
            console.log(qval);
            //反馈表中解答记录
            qfanswerlist.push({'questionid': question['questionid'],'questionanswer':qval});
            for(var j=0;j<question['answerlist'].length;j++){
                var answer = question['answerlist'][j];
                if(answer['index']==qval){
                    answer['checkcount'] = answer['checkcount']+1;
                    break;
                }
            }
        }

        qfDoc['questionlist'] = qfanswerlist;
        Meteor.call('insertQnfeedback', qfDoc,function(){
            Meteor.call('updateQuestionnaire', {'_id':qnaire['_id']},qnaire,function(){
                Router.go("/questionnaire");
            });
        });
    }
});

Template.qnfeedbackxq.helpers({
    'questionnairexq':function() {
        var qnfb = dbQnfeedback.findOne({'qnaireid':this.qnid,'answererid':this.answererid});
        var answerlist = qnfb['questionlist'];
        var qnaire = dbQuestionnaire.findOne({'_id':this.qnid});
        var questionlist = qnaire['questionlist'];
        for(var i=0;i<questionlist.length;i++){
            var question = questionlist[i];
            var answer = answerlist[i];
            for(var j=0;j<question['answerlist'].length;j++){
                var qanswer=question['answerlist'][j];
                if(qanswer['index']==answer['questionanswer']){
                    qanswer['checked']=true;
                }else{
                    qanswer['checked']=false;
                }
            }
        }
        console.log(qnaire);
        return  qnaire;

    }
});
