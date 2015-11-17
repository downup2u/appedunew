 iosconnectWebViewJavascriptBridge = function(callback) {
   if (window.WebViewJavascriptBridge) {
       callback(WebViewJavascriptBridge);
   } else {
       document.addEventListener('WebViewJavascriptBridgeReady', function() {
           callback(WebViewJavascriptBridge);
       }, false);
   }
}

globalcalliosfunction = function(funname,inputjson,outjsonfunc) {
  console.log('globalcalliosfunction empty');
}

Meteor.startup(function(){
  var self = this;
  Tracker.autorun(function (c) {
    console.log("autorun..."+Session.get('targetdevice'));
    if(Session.get('targetdevice') != ''){
      if(Session.get('targetdevice') == 'ios'){
        console.log("run on ios device");
        iosconnectWebViewJavascriptBridge(function(bridge) {
                /*初始化代码,不管他,但一定要写*/
                bridge.init(function(message, responseCallback) {
                });
                self.globalcalliosfunction = function(funname,inputjson,outjsonfunc) {
                      console.log('call globalcalliosfunction:' + funname);
                      bridge.callHandler(funname,inputjson,function responseCallback(jsonobj) {
                        console.log('callHandler:' + EJSON.stringify(jsonobj));
                        outjsonfunc(jsonobj);
                      })
                };
        });
      }
      c.stop(); //run first
    }

  });

});
