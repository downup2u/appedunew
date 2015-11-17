Template.updateschool.events({
    'click #btnupdateschool':function(){
      event.preventDefault();

      var name =  $("#name").val();
      var address =  $("#address").val();

      var schoolDoc = {
          name:name,
          address:address,
          createuserid:Meteor.userId(),
          createusername:Meteor.user().profile.truename,
          schoolmasterid:Meteor.userId(),
          schoolmastername:Meteor.user().profile.truename,
      }
      if(Session.get('selprovice')){
        schoolDoc = _.extend(schoolDoc,{
          addressprovice:Session.get('selprovice')
        });
      }

      if(Session.get('selcity')){
        schoolDoc = _.extend(schoolDoc,{
          addresscity:Session.get('selcity')
        });
      }

      console.log("update schoolDoc:" + EJSON.stringify(schoolDoc));
      Meteor.call("updateSchool",this._id,schoolDoc);

      Router.go("/myschool");

    },
      'change #J_province':function(){
        var cy = dbConstaddress.findOne();
        var cy_cities = cy.cities;
        var province = $('#J_province').val();
        var citiesList = [];
        var citiesArr = cy_cities[province];
        for(var i=0; i<citiesArr.length; i++){
          var city_list = {
            'name': citiesArr[i],
            'id' : i
          }
          citiesList.push(city_list);
        }
        $("#J_city").empty();
        $("#J_city").append("<option value='0'>-请选择-</option>");
        for(var i=0;i<citiesList.length;i++){
          $("#J_city").append("<option value='"+citiesList[i].name+"'>"+citiesList[i].name+"</option>");
        }
        Session.set('selprovice',province);
      },
      'change #J_city':function(){
        var city = $('#J_city').val();
        Session.set('selcity',city);
      }
  });

  Template.updateschool.helpers({
  	'newProvince':function(){
  		var pr = dbConstaddress.findOne().province;
  		var provinceList = [];
  		for (var i=0; i<pr.length; i++){
  			var p = {
  				'name': pr[i],
  				'id': i
  			};
  			provinceList.push(p);
  		}
      console.log("provinceList:" + EJSON.stringify(provinceList));
  		return provinceList;
  	},
  });
