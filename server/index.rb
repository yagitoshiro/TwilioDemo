require 'rubygems'
require 'sinatra'
require 'twilio-ruby'

class MyApp < Sinatra::Base

  get '/auth' do
    account_sid = 'YOUR ACCOUNT SID'
    auth_token = 'YOUR AUTH TOKEN'
    demo_app_sid = 'YOUR APP TOKEN'

    capability = Twilio::Util::Capability.new account_sid, auth_token
    capability.allow_client_incoming params[:name] if params[:name]
    capability.allow_client_outgoing demo_app_sid
    token = capability.generate
    "#{token}"
  end

  post '/hello-monkey' do
    Twilio::TwiML::Response.new do |r|
      r.Say 'Hello Monkey'
    end.text
  end

  post '/call-to-me' do
    my_phone_number = '+81MY_PHONE_NUMBER'
    case params[:type]
    when 'auto_response'
      #返事をする
      Twilio::TwiML::Response.new do |r|
        r.Say "Hi #{params[:name]}, Hello Monkey"
      end.text
    when 'call_to_app'
      #アプリに電話する
      Twilio::TwiML::Response.new do |r|
        #r.Say 'Hello Monkey'
        r.Dial do |d|
          d.Client params[:to]
        end
      end.text
    when 'call_to_phone'
      #携帯や固定電話に電話をかける
      Twilio::TwiML::Response.new do |r|
        r.Dial :callerId => my_phone_number do |d|
          #d.Client 'toshiro'
          d.Number params[:phoneNumber]
        end
      end.text
    else
      Twilio::TwiML::Response.new do |r|
        #r.Say 'Hello Monkey'
        r.Dial do |d|
          d.Client 'toshiro1'
        end
      end.text
    end
  end

end
