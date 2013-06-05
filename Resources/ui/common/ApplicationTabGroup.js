function ApplicationTabGroup(Window) {
  var TiTwilio = require('org.selfkleptomaniac.mod.titwilio');

  TiTwilio.addEventListener('connecting', function(){
    Ti.API.info('connecting');
  });
  TiTwilio.addEventListener('connected', function(){
    Ti.API.info('connected');
  });
  TiTwilio.addEventListener('disconnected', function(){
    Ti.API.info('disconnected');
  });
  TiTwilio.addEventListener('disconnectedByError', function(){
    Ti.API.info('disconnectedByError');
  });
  TiTwilio.addEventListener('callWaiting', function(){
    alert('phone call!');
  });
  TiTwilio.addEventListener('incomingCallError', function(){
    alert('incomingCallError');
  });
  TiTwilio.addEventListener('onStartListening', function(){
    alert('onStartListening');
  });
  TiTwilio.addEventListener('onStopListening', function(){
    alert('onStopListening');
  });
  TiTwilio.addEventListener('didStopListening', function(){
    Ti.API.info('didStopListening');
  });

	//create module instance
	var self = Ti.UI.createTabGroup();
	var ToPhoneWindow = require('ui/handheld/ToPhoneWindow');
  var IncomingWindow = require('ui/handheld/IncomingWindow');
  var ToAppWindow = require('ui/handheld/ToAppWindow');
	//create app tabs
	var win1 = new Window(L('home'), TiTwilio);
	var win2 = new ToPhoneWindow('電話', TiTwilio);
  var win3 = new ToAppWindow('アプリに電話', TiTwilio);
  var win4 = new IncomingWindow('着信アリ', TiTwilio);

	var tab1 = Ti.UI.createTab({
		title: L('home'),
		icon: '/images/KS_nav_ui.png',
		window: win1
	});
	win1.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: '電話',
		icon: '/images/KS_nav_views.png',
		window: win2
	});
	win2.containingTab = tab2;
	
	var tab3 = Ti.UI.createTab({
		title: 'アプリに電話',
		icon: '/images/KS_nav_views.png',
		window: win3
	});
	win3.containingTab = tab3;

 // Twilio
  function inComingCall(e){
    Ti.API.info("INCOMING CALL");
    var intent = null;
    var dialog = Ti.UI.createAlertDialog({
      buttonNames: ['accept', 'ignore'],
      title: 'Phone Call!'
    });
    if(Ti.Platform.osname == 'android'){
      intent = e.intent;
      win1.add(dialog);
      self.setActiveTab(tab1);
    }
    dialog.show();
    dialog.addEventListener('click', function(elem){
      if(elem.index.toString() == "0"){
        TiTwilio.acceptIncomingCall({intent: intent});
        win4.open(TiTwilio);
      }else{
        TiTwilio.ignoreIncomingCall({intent: intent});
      }
    });
  }
  Ti.App.addEventListener('inComingCall', function(e){
    inComingCall(e);
  });

  TiTwilio.addEventListener('incomingConnection', inComingCall);

	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	
	return self;
}

module.exports = ApplicationTabGroup;
