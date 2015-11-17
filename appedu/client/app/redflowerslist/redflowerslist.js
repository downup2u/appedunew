/**
 * Created by luforn on 2015/9/9.
 */

Template.redflowerslist.helpers({

    flowerslist : function(){
        var list = [];
        var termid = Meteor.user().profile.curclasstermid;
        var records = dbRedflowerslist.find({'classtermid':termid});
        records.forEach(function(rec){
            var temp_rec = _.extend(rec,{
                redflowercount:rec.redflowerlist.length
            });
            list.push(temp_rec);
            console.log("rec:" + EJSON.stringify(temp_rec))
        });
        return  list;
    },
    'isparent':function(){
        return  Roles.userIsInRole(Meteor.user(), ['parent']);
    },
    'isheaderteacher':function(){
        return  Roles.userIsInRole(Meteor.user(), ['headerteacher']);
    }

});