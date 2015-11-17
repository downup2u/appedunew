Template.parentsletters.events({
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
