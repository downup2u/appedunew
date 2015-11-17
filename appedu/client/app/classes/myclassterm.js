Template.myclassterm.helpers({
  'classtermlist':function(){
    var classtermlist = [];
    dbClassterms.find({headerteacherid:Meteor.userId()}).forEach(function(cls){
        var cls = {
          id:cls._id,
          name:cls.name,
          schoolname:cls.schoolname,
          schoolid:cls.schoolid,
        }
        classtermlist.push(cls);
    });
    console.log("classtermlist:" + EJSON.stringify(classtermlist));
    return classtermlist;
  },
  'curclass':function(){
    return this.id == Meteor.user().profile.curclasstermid;
  }
});

Template.myclassterm.events({
  'click #btnswitch':function(){
    Meteor.call('setSelClasstermid',this.id,Meteor.user());
  }
})
