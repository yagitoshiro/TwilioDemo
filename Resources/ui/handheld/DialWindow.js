function DialWindow(row, TiTwilio){
  var self = Ti.UI.createWindow({
    backgroundColor: '#CCEAEE',
    barImage: '/images/navBar.png',
    barColor: "#99cccc",
    titie: row.title + 'に電話中…'
  });

  var disconnect_image = "/images/hangup.png";
  var connect_image = "/images/dial.png";
  var disconnect = Ti.UI.createImageView({
    image: disconnect_image
  });
  self.add(disconnect);

  function connect(){
    TiTwilio.connect({
      url: 'http://example.com/auth',
      params: {name: Ti.App.Properties.getString('username'), to: row.title, type: 'call_to_app'}
    });
  }

  TiTwilio.addEventListener('disconnected', function(e){
    if(connect_image && disconnect && disconnect.image){
      disconnect.image = connect_image;
    }
  });

  disconnect.addEventListener('click', function(){
    if(disconnect.image == disconnect_image){
      TiTwilio.disconnect();
      disconnect.image = connect_image;
    }else{
      connect();
      disconnect.image = disconnect_image;
    }
  });

  self.addEventListener('open', function(){
      connect();
  });
  
  self.addEventListener('close', function(){
    TiTwilio.disconnect();
  });

  return self;
}

module.exports = DialWindow;
