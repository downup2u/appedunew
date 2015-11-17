var _imgsz_parentscommunity = new ReactiveVar([]);
Template.sendcommunity.events({
	'click #btnsendcommunity': function(event) {
		event.preventDefault();
		var title= $('#title').val();
		var content= $('#textcontent').val();
		var visiblerange = $('#visiblerange').val();
		var createuserid = Meteor.userId();
		var createusername = Meteor.user().profile.truename;
		var createuseravatar = Meteor.user().profile.avatar;
		var createtime = new Date().getTime();//获取当前时间的时间戳
		if(title!='' && content!=''){
			var communityDoc ={
				title:title,
				content: content,
				visiblerange: visiblerange,
				createuserid: createuserid,
				createusername: createusername,
				createtime: createtime,
				createuseravatar: createuseravatar,
				images:_imgsz_parentscommunity.get(),
				love: [],
				reply: []
			};
			console.log(communityDoc);
			Meteor.call('insertParentscommunity', communityDoc);
			Router.go("/parentscommunity");
			}else{
				if(title=='')
				alert('取一个响亮的标题吧');
			else if(content=='')
				alert('内容部分不能为空');
			return false;
		}
	},
    'change #addImgInput': function(event){
		var self = this;
		FS.Utility.eachFile(event, function(file){
			var image = Images.insert(file, function(err, fileObj){
				if(err){
					alert("图片尺寸过大或这文件格式不正确！");
				} else {
					var imgsz = _imgsz_parentscommunity.get();
					var intervalHandle = Meteor.setInterval(function () {
						if (fileObj.hasStored('images')) {
							imgsz.push({imageid: image._id});
							Meteor.clearInterval(intervalHandle);
							_imgsz_parentscommunity.set(imgsz);
						}
					},1000);
				}
			});
		});
	},
	'click .addImg img': function(event){
		var newImgsz = [];
		var id = this.imageid;
		var scurValue = _imgsz_parentscommunity.curValue;
		swal({
			title: "确定要删除该图片吗?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#dd6b55",
			cancelButtonText: "取消",
			confirmButtonText: "确定",
			closeOnConfirm: true
		},function(isConfirm){
			if (isConfirm) {
				for(var i=0;i<scurValue.length;i++){
					if (scurValue[i].imageid!=id){
						newImgsz.push({imageid: scurValue[i].imageid});
					}
				}
				_imgsz_parentscommunity.set(newImgsz);
			}
		});
	}
});
Template.sendcommunity.helpers({
	'imagefile':function(){
		return _imgsz_parentscommunity.get();
	}
});
//当模版关闭的时候
Template.sendcommunity.destroyed = function(){
	_imgsz_parentscommunity = new ReactiveVar([]);//清空上传图片缓存
};