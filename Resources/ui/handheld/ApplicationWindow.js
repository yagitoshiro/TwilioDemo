function ApplicationWindow(title, TiTwilio) {
	var self = Ti.UI.createWindow({
		title:title,
    barImage: '/images/navBar.png',
    barColor: "#99cccc",
    backgroundColor: '#CCEAEE'
	});
	
	var view = Ti.UI.createScrollView({
    contentWidth: 'auto',
    contentHeight: 'auto',
    layout: 'vertical'
  });
	
  
  var connect = Ti.UI.createImageView({
    image: '/images/dial.png',
    width: Ti.UI.SIZE,
    height: Ti.UI.SIZE,
    top: 30
  });
  
  view.add(connect);
  
  var disconnect = Ti.UI.createImageView({
    image: '/images/hangup.png',
    width: Ti.UI.SIZE,
    height: Ti.UI.SIZE,
    top: 30
  });
  
  view.add(disconnect);
  
  function isOnline(){
    //return Ti.Network.online && 
    //(Ti.Network.networkType === Ti.Network.NETWORK_LAN || Ti.Network.networkType === Ti.Network.NETWORK_WIFI);
    return true;
  }
  
  connect.addEventListener('click', function(){
    if(isOnline()){
      TiTwilio.connect({
        url: 'http://dev.voidoid.com/auth',
        params: {name: "Titanium", type: 'auto_response'}
      });
    }else{
       alert("Twilio works only with Wifi or LAN network");
    }
  });
  disconnect.addEventListener('click', function(){
    TiTwilio.disconnect();
  });
	
  self.add(view);
	return self;
}

module.exports = ApplicationWindow;
