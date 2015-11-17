
Template.qa.helpers({

  qalist : function(){
     var alllist = [];
     var undolist = [];
     var records = dbQa.find();
     if (records.count()>0){
        var uid = Meteor.userId();
        records.forEach(function(rec){
           var temp_rec = _.extend(rec,{
              replycount:rec.replylist.length
           });
           if (rec.isvisibleforothers){
              alllist.push(temp_rec);
              if (rec.isallowotherscommit && rec.replylist.length==0){
                undolist.push(temp_rec);
              }
           }else if(rec.createuserid==uid){
              alllist.push(temp_rec);
              if (rec.replylist.length==0){
                undolist.push(temp_rec);
              }
           }
        });
     }
     return {'alllist':alllist,'undolist':undolist};
  }

});



Template.qa.events({
  'click #tabone1':function(event,template){
    event.preventDefault();
    template.$('#tabone2').removeClass('hover');
    template.$('#tabone1').addClass('hover');
    template.$('#con_one_1').css({'display':'block'});
    template.$('#con_one_2').css({'display':'none'});
    console.log("click tab1");
  },
  'click #tabone2':function(event,template){
    event.preventDefault();
    template.$('#tabone1').removeClass('hover');
    template.$('#tabone2').addClass('hover');
    template.$('#con_one_2').css({'display':'block'});
    template.$('#con_one_1').css({'display':'none'});
    console.log("click tab2");
  },
});
