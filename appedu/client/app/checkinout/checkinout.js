Template.checkinout.events({
  'click #tabone1':function(){
  //  event.preventDefault();
    $('#tabone2').removeClass('hover');
    $('#tabone1').addClass('hover');
    $('#con_one_1').css({'display':'block'});
    $('#con_one_2').css({'display':'none'});
    console.log("click tab1");
  },
  'click #tabone2':function(){
  //  event.preventDefault();
    $('#tabone1').removeClass('hover');
    $('#tabone2').addClass('hover');
    $('#con_one_2').css({'display':'block'});
    $('#con_one_1').css({'display':'none'});
    console.log("click tab2");
  },
});
