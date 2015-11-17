Template.adminnavbar.onRendered(function () {
   // $('#admin-offcanvas').offCanvas('open');
    console.log("Template.adminnavbar.onRendered");
});

Template.adminnavbar.helpers({
  navlists: function () {
    var navlists = [
        {
          navurl:'/myschool',
          navico:'glyphicon glyphicon-tower',
          navtitle:'我的幼儿园'
        },
        {
          navurl:'/classterms',
          navico:'glyphicon glyphicon-th-list',
          navtitle:'班级管理'
        },
        {
          navurl:'/headerteachers',
          navico:'glyphicon glyphicon-user',
          navtitle:'老师管理'
        },
        {
          navurl:'/activities',
          navico:'glyphicon glyphicon-tag',
          navtitle:'活动管理'
        },
        // {
        //   navurl:'/foods',
        //   navico:'jcd_icon jcd_icon_offsell',
        //   navtitle:'食谱'
        // },
        {
          navurl:'/teachplans',
          navico:'jcd_icon jcd_icon_offsell',
          navtitle:'教学计划'
        },

    ];
    return navlists;
  }
});
