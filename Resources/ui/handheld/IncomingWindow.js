function IncomingWindow(title, TiTwilio){
  var self = Ti.UI.createWindow({
    backgroundColor: '#CCEAEE',
    title: title
  });
  //TiTwilio.addEventListener('incomingConnection', function(e){
  //  Ti.API.info(e);
  //  var dialog = Ti.UI.createAlertDialog({
  //    title: 'Phone call!',
  //    message: 'You have a incoming call',
  //    buttonNames: ['Accept', 'Ignore']
  //  });
  //  dialog.addEventListener('click', function(elem){
  //    if(elem.index === 0){
  //      Ti.API.info('accept');
  //      TiTwilio.acceptIncomingCall();
  //    }else{
  //      Ti.API.info('ignore');
  //      TiTwilio.ignoreIncomingCall();
  //    }
  //  });
  //  dialog.show();
  //});

  var disconnect = Ti.UI.createImageView({
    image: '/images/hangup.png'
  });
  self.add(disconnect);
  disconnect.addEventListener('click', function(e){
    TiTwilio.disconnect();
    self.close();
  });

  return self;

}

module.exports = IncomingWindow;
