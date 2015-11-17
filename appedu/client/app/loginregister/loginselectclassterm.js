var curclasstermid = new ReactiveVar('');
Template.loginselectclassterm.events({
    'click #btncreateclassterm':function(){
        console.log("click btn btncreateclassterm");
        event.preventDefault();
        Router.go('/createclasstermsetschool/loginselectclassterm');
    },
    "click #btnenter": function () {
      console.log("click btn btnenter");
      event.preventDefault();

      var selclasstermid = curclasstermid.get();
      if(!dbClassterms.findOne(selclasstermid)){
        alert("请先选择一个班级");
        return;
      }
      var isnextskip = $('input[name=isnextskip]').is(':checked');
      Meteor.call('setSelClasstermid',selclasstermid, Meteor.user(),isnextskip);
      Router.go('/');
    },
	'click .jcd_btnselectchild li':function(){
		var id = this.classtermid;
		$('.jcd_btnselectchild li').removeClass('sel');
		$('.selchild_'+id).addClass('sel');
	  curclasstermid.set(id);
	}
  });

  Template.loginselectclassterm.helpers({
    'classtermlist':function(){
      var classtermlist = [];
      dbClassterms.find({headerteacherid:Meteor.userId()}).forEach(function(cls){
        var iscurclassterm = cls._id == Meteor.user().profile.curclasstermid;
  			if(iscurclassterm){
  				curclasstermid.set(cls._id);
  			}
          var cls = {
            iscurclassterm:iscurclassterm,
            classtermid:cls._id,
            name:cls.name,
            schoolname:cls.schoolname,
          }
          classtermlist.push(cls);
      });
      return classtermlist;
    }
  })
