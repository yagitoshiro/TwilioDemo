Ti.API.info("service start");
try{
  var service = Titanium.Android.currentService;
  var intent = service.intent;

  Ti.App.fireEvent('inComingCall', {intent: intent});
  service.stop();
}catch(e){
  Ti.API.info(e);
}
Ti.API.info("end service");
service.stop();
