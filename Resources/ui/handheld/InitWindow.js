function InitWindow(){
  var self = Ti.UI.createWindow();
  var view = Ti.UI.createView({
    backgroundColor: '#FCF8F5',
    layout: 'vertical',
    borderRadius: 10,
    width: Ti.Platform.displayCaps.platformWidth * 0.9,
    height: Ti.Platform.displayCaps.platformHeight * 0.65,
    top: Ti.Platform.displayCaps.platformHeight + 100
  });

  var logo = Ti.UI.createImageView({
    top: 10,
    image: '/images/twilio-header-logo.png'
  });
  view.add(logo);

  var zuruLineBlack = Ti.UI.createView({
    top:10,
    height: 1,
    left: 20,
    right: 20,
    backgroundColor: 'Black',
    opacity: 0.1
  }); 
  var zuruLineWhite = Ti.UI.createView({
    top:1,
    height: 1,
    left: 20,
    right: 20,
    backgroundColor: 'White',
    opacity: 0.7
  }); 
  view.add(zuruLineBlack);
  view.add(zuruLineWhite);

  var label = Ti.UI.createLabel({
    top: 10,
    left: 20,
    text: L('welcome'),
    font: {fontSize: '18px'},
    color: '#F3B184',
    textAlign: 'left'
  });
  view.add(label);

  var text_field = Ti.UI.createTextField({
    left: 20,
    right: 20,
    height: 40,
    height: 60,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    top: 20,
    hintText: 'ユーザー名'
  });
  view.add(text_field);

  var startButton = Ti.UI.createButton({
    width: Ti.UI.SIZE,
    height: Ti.UI.SIZE,
    title: 'Start',
    top: 20
  });
  view.add(startButton);

  startButton.addEventListener('click', function(){
    if(text_field.value.toString().length > 0){

      password = '1234567890';

      var Cloud = require('ti.cloud');
      Cloud.Users.create({
        username: text_field.value.toString(),
        password: password,
        password_confirmation: password
      }, function(elem){
        if(elem.success){
          Ti.App.Properties.setString('username', text_field.value.toString());  
          self.close();
        }else{
          alert(elem.message);
        }
      });

    }else{
      alert('お名前を入力してくださいな');
    }
  });

  view.slide_up = function(){
    view.animate({
      top: 40,
      duration: 1000
    }, function(){
      view.animate({top: 65, duration: 200}, function(){
        view.animate({top: 60, duration: 100});
      });
    });
  };
  self.add(view);
  self.addEventListener('open', function(){
    view.slide_up();  
  });

  return self;
}

module.exports = InitWindow;
