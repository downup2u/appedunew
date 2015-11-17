

Meteor.startup(function(){
    console.log("start up");
    if(Meteor.isClient){
        console.log("client start...0");
        Meteor.subscribe("users");
        Meteor.subscribe("schools");
        Meteor.subscribe("classterms");
        Meteor.subscribe("activities");
        Meteor.subscribe("foods");
        Meteor.subscribe("teachplan");
        Meteor.subscribe("constaddress");
        Session.set("MeteorToys_display", true);
    }

    if(Meteor.isServer){
    //===================================================================
    //
     //
     Meteor.publish("users", function () {
        return Meteor.users.find();
     });
     Meteor.publish("schools", function () {
        return dbSchools.find();
     });
     Meteor.publish("classterms", function () {
        return dbClassterms.find();
     });
     Meteor.publish("activities", function () {
        return dbActivities.find();
     });
     Meteor.publish("foods", function () {
        return dbFoods.find();
     });
     Meteor.publish("teachplan", function () {
        return dbTeachplans.find();
     });
     Meteor.publish("constaddress", function () {
        return dbConstaddress.find();
     });

 }
});
