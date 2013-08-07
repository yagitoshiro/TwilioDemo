function ToPhoneWindow(title, TiTwilio){
  var self = Ti.UI.createWindow({
    backgroundColor: '#CCEAEE',
    barColor: '#2f6f6f',
    title: title
  });

  var view = Ti.UI.createView({
    layout: 'vertical'
  });
  var display = Ti.UI.createView({
    height: 64,
    left: 0,
    right: 0,
    backgroundColor: '#dcdcdc'
  });
  view.add(display);
  var number = Ti.UI.createLabel({
    text: '',
    color: '#454545',
    font: {fontSize: '24px'},
    textAlign: 'right',
    right: 40
  });
  display.add(number);

  var clear = Ti.UI.createButton({
    title: 'Clear'
  });
  self.leftNavButton = clear;
  clear.addEventListener('click', function(){
    number.text = '';
  });
  
  var buttonArea = Ti.UI.createView({
    top: 0,
    layout: 'horizontal'
  });
  view.add(buttonArea);
  var width = Ti.Platform.displayCaps.platformWidth / 3;
  var height = width * 0.7;

  function listener(obj){
    var add = obj.title;
    return function(e){
      overlay = Ti.UI.createView({backgroundColor: 'Black', opacity: 0.8});
      e.source.add(overlay);
      number.text = number.text + add;
      e.source.remove(overlay);
    };
  }

  var button7 = Ti.UI.createView({
    top: 0,
    title: '7',
    bubbleParent: false,
    left: 0,
    width: width,
    height: height,
    backgroundColor: '#2f4f4f'
  });
  button7.add(Ti.UI.createLabel({text: '7', font:{fontSize:'24px'},color:'#d3d3d3'}));
  button7.addEventListener('click', listener(button7));
  buttonArea.add(button7);
  var button8 = Ti.UI.createView({
    top:0,
    title: '8',
    bubbleParent: false,
    width: width,
    height: height,
    backgroundColor: '#d3d3d3'
  });
  button8.add(Ti.UI.createLabel({text: '8', font:{fontSize:'24px'},color:'#2f4f4f'}));
  button8.addEventListener('click', listener(button8));
  buttonArea.add(button8);
  var button9 = Ti.UI.createView({
    top: 0,
    title: '9',
    bubbleParent: false,
    left: 0,
    width: width,
    height: height,
    backgroundColor: '#2f4f4f'
  });
  button9.add(Ti.UI.createLabel({text: '9', font:{fontSize:'24px'},color:'#d3d3d3'}));
  buttonArea.add(button9);
  button9.addEventListener('click', listener(button9));
  var button4 = Ti.UI.createView({
    width: width,
    title: '4',
    bubbleParent: false,
    height: height,
    backgroundColor: '#d3d3d3'
  });
  button4.add(Ti.UI.createLabel({text: '4', font:{fontSize:'24px'},color:'#2f4f4f'}));
  button4.addEventListener('click', listener(button4));
  buttonArea.add(button4);
  var button5 = Ti.UI.createView({
    top: 0,
    title: '5',
    bubbleParent: false,
    left: 0,
    width: width,
    height: height,
    backgroundColor: '#2f4f4f'
  });
  button5.add(Ti.UI.createLabel({text: '5', font:{fontSize:'24px'},color:'#d3d3d3'}));
  button5.addEventListener('click', listener(button5));
  buttonArea.add(button5);
  var button6 = Ti.UI.createView({
    width: width,
    height: height,
    title: '6',
    bubbleParent: false,
    backgroundColor: '#d3d3d3'
  });
  button6.add(Ti.UI.createLabel({text: '6', font:{fontSize:'26px'},color:'#2f6f6f'}));
  button6.addEventListener('click', listener(button6));
  buttonArea.add(button6);
  var button1 = Ti.UI.createView({
    top: 0,
    left: 0,
    title: '1',
    bubbleParent: false,
    width: width,
    height: height,
    backgroundColor: '#2f4f4f'
  });
  button1.add(Ti.UI.createLabel({text: '1', font:{fontSize:'24px'},color:'#d3d3d3'}));
  button1.addEventListener('click', listener(button1));
  buttonArea.add(button1);
  var button2 = Ti.UI.createView({
    top:0,
    title: '2',
    bubbleParent: false,
    width: width,
    height: height,
    backgroundColor: '#d3d3d3'
  });
  button2.add(Ti.UI.createLabel({text: '2', font:{fontSize:'24px'},color:'#2f4f4f'}));
  button2.addEventListener('click', listener(button2));
  buttonArea.add(button2);
  var button3 = Ti.UI.createView({
    top: 0,
    left: 0,
    title: '3',
    bubbleParent: false,
    width: width,
    height: height,
    backgroundColor: '#2f4f4f'
  });
  button3.add(Ti.UI.createLabel({text: '3', font:{fontSize:'24px'},color:'#d3d3d3'}));
  button3.addEventListener('click', listener(button3));
  buttonArea.add(button3);
  var buttonStar = Ti.UI.createView({
    width: width,
    title: '0',
    bubbleParent: false,
    height: height,
    backgroundColor: '#2f4f4f'
  });
  buttonStar.add(Ti.UI.createLabel({text: '0', font:{fontSize:'24px'},color:'#d3d3d3'}));
  buttonStar.addEventListener('click', listener(buttonStar));
  var buttonCall = Ti.UI.createView({
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: '#d3d3d3'
  });
  buttonCall.add(Ti.UI.createLabel({text: '☎', font:{fontSize:'24px'},color:'#2f4f4f'}));
  buttonArea.add(buttonCall);
  buttonArea.add(buttonStar);
  var buttonSharp = Ti.UI.createView({
    width: width,
    title: '#',
    bubbleParent: false,
    height: height,
    backgroundColor: '#d3d3d3'
  });
  buttonSharp.add(Ti.UI.createLabel({text: '#', font:{fontSize:'26px'},color:'#2f6f6f'}));
  buttonSharp.addEventListener('click', listener(buttonSharp));
  buttonArea.add(buttonSharp);

  buttonCall.addEventListener('click', function(){
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
      url: 'http://example.com/auth',
      params: {phoneNumber: number.text.replace(/^0/, '+81'), type: 'call_to_phone'}
    });
  });

  self.add(view);
  return self;
}

module.exports = ToPhoneWindow;
