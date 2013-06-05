function ToAppWindow(title, TiTwilio){
  var self = Ti.UI.createWindow({
    backgroundColor: '#CCEAEE',
    barImage: '/images/navBar.png',
    barColor: "#99cccc",
    layout: 'vertical',
    title: title });

  var me = Ti.UI.createTextField({
    top: 10,
    hintText: '自分の名前(アルファベット)',
    borderStyle : Titanium.UI.INPUT_BORDERSTYLE_BEZEL,
    backgroundColor: 'White',
    left: 10,
    right: 10
  });
  self.add(me);

  var login = Ti.UI.createButton({
    title: 'ログイン',
    width: Ti.UI.SIZE,
    height: Ti.UI.SIZE,
    top: 10
  });
  var pendingIntent;
  if(Ti.Platform.osname === 'android'){
    var intent = Ti.Android.createServiceIntent({url:'service.js', twilio: TiTwilio});
    pendingIntent = Ti.Android.createPendingIntent({intent: intent});
  }
  function login_func(){
    TiTwilio.login({
      url: 'http://dev.voidoid.com/auth?name=' + me.value,
      params: {name: Ti.App.Properties.getString('username'), type: 'login'},
      pendingIntent: pendingIntent
    });
  }
  login.addEventListener('click', function(){
    login_func();
  });
  if(Ti.Platform.osname === 'android'){
    self.add(login);
  }else{
    self.leftNavButton = login;
  }

  var you = Ti.UI.createTextField({
    top: 10,
    hintText: '相手の名前(アルファベット)',
    borderStyle : Titanium.UI.INPUT_BORDERSTYLE_BEZEL,
    backgroundColor: 'White',
    left: 10,
    right: 10
  });
  self.add(you);

  var call = Ti.UI.createButton({
    title: '電話する',
    width: Ti.UI.SIZE,
    height: Ti.UI.SIZE,
    top: 10
  });
  call.addEventListener('click', function(){
    var dialog = Ti.UI.createAlertDialog({
      buttonNames: ['Disconnect'],
      title: '電話中',
      message: 'ボタンを押して切ってね'
    });
    dialog.show();
    dialog.addEventListener('click', function(){
      TiTwilio.disconnect();
    });
    TiTwilio.connect({
      url: 'http://dev.voidoid.com/auth',
      params: {name: me.value, to: you.value, type: 'call_to_app'}
    });
  });
  if(Ti.Platform.osname === 'android'){
    self.add(call);
  }else{
    self.rightNavButton = call;
  }

  return self;
}

module.exports = ToAppWindow;
