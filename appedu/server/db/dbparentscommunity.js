Meteor.methods({
	'insertParentscommunity': function(doc){
		console.log("letterDoc:" + EJSON.stringify(doc));
		dbparentscommunity.insert(doc);
	},
	'loveParentscommunity': function(doc, id){
		//console.log("letterDoc:" + EJSON.stringify(doc));
		//dbParentscommunity.insert(doc);
		var i=0;
		var j=0;
		var lovelist = dbparentscommunity.findOne({_id: id}).love;
		if(lovelist.length>0){
			for(i in lovelist){
				if(lovelist[i].uid==doc.uid){
					j++;
				}
			}
		}
		if(j>0){
			var x=0,lovelist2=[];
			for(x in lovelist){
				if(lovelist[x].uid!=doc.uid){
					lovelist2.push(lovelist[x]);
				}
			}
			dbparentscommunity.update(id,{$set: {"love": lovelist2 }})
		}else{
			lovelist.push(doc);
			dbparentscommunity.update(id,{$set: {"love": lovelist }})
		}
	},
	'replyParentscommunity': function(doc, id){
		var i=0;
		var replylist = dbparentscommunity.findOne({_id: id}).reply;
		replylist.push(doc);
		dbparentscommunity.update(id,{$set: {"reply": replylist }})
	}
});
