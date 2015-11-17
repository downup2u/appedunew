Template.createclasstermsetschool.events({
  'click #btnnext': function () {
    console.log(EJSON.stringify(this.schools));
    console.log("click btn btnaddclass");
    event.preventDefault();

    var selschooltypestring = $("#selschool").find("option:selected").text();
    var selschooltypevalue = $("#selschool").val();
    var schoolid = selschooltypevalue;
    console.log(EJSON.stringify(Meteor.user()));
  	Meteor.call('setschoolid',schoolid,Meteor.user());

    Router.go('/createclasstermsetclassterm/' + schoolid + "/" + this.returnurl );
    //加入学校
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

Template.createclasstermsetschool.helpers({
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
		return provinceList;
	},
  'schools':function(){

    var query = {};
    if(Session.get('selprovice')){
      query = _.extend(query,{
        addressprovice:Session.get('selprovice')
      });
    }

    if(Session.get('selcity')){
      query = _.extend(query,{
        addresscity:Session.get('selcity')
      });
    }

    console.log("select schools :" + EJSON.stringify(query));

    var schools = [];
    var dbschools = dbSchools.find(query);
    dbschools.forEach(function(sc){
      schools.push(sc);
    });
    return schools;
  }
})
