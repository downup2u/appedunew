globalgetimgurl = function(imageid){
  var imageurl = "/cfs/files/images/" + imageid;
  return imageurl;
}


globalgetchildrenfromuser = function(userid){
  var mychildlist = [];

  dbUserchildren.find({userid:userid}).forEach(
    function(userchildren){
      var child = dbChildren.findOne(userchildren.childid);
        if(child){
          var schoolname = '';
          var classtermname = '';
          var schoolid = child.schoolid;
          var curclasstermid = child.curclasstermid;
          if(schoolid){
            schoolname = dbSchools.findOne(schoolid).name;
          }
          if(curclasstermid){
            classtermname = dbClassterms.findOne(curclasstermid).name;
          }

          mychildlist.push({
            childid:userchildren.childid,
            releationshipname:userchildren.releationshipname,
            schoolname:schoolname,
            classtermname:classtermname,
            schoolid:schoolid,
            curclasstermid:curclasstermid,
            childname:child.truename
          });
        }
      });
      console.log("mychildlist:" + EJSON.stringify(mychildlist));
      return mychildlist;
};
