// var createThumb = function(fileObj, readStream, writeStream) {
//   // Transform the image into a 10x10px thumbnail
//   gm(readStream, fileObj.name()).resize('640', '270').stream().pipe(writeStream);
// };

// var createThumb = function(fileObj, readStream, writeStream) {
//   gm(readStream, fileObj.name()).resize('640', '270').gravity('Center').extent('640', '270').stream().pipe(writeStream);
// };
// var createThumb = function(fileObj, readStream, writeStream) {
// 			// Transform & Crop Image
// 			gm(readStream, fileObj.name())
// 				.autoOrient()
// 				.resize('400', '225', "^")
// 				.gravity('Center')
// 				.extent('400', '225')
// 			.stream().pipe(writeStream);
// 		};

Images = new FS.Collection("images", {
  stores: [
  //  new FS.Store.GridFS("thumbs", { transformWrite: createThumb }),
    new FS.Store.GridFS("images"),
  ],
  filter: {
		maxSize: 512000, //in bytes
    allow: {
      contentTypes: ['image/*'], //allow only images in this FS.Collection
			extensions: ['png', 'jpg', 'jpeg', 'gif']
    }
  }
});


Images.allow({
 insert: function(){
 return true;
 },
 update: function(){
 return true;
 },
 remove: function(){
 return true;
 },
 download: function(){
 return true;
 }
});
