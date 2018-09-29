var linebot = require('linebot');
var express = require('express');
var getJSON = require('get-json');
var now = require('moment');
var fs = require('fs');
var readline = require('readline');
var  {google}  = require("googleapis");
var googleAuth  = require('google-auth-library');










//Linebotbot gettopost
//var getdata= getutilities();
var userId = 'Uea28d9fe05d59acdd0067e1584becc84';
var nowdata = now().utcOffset(480).hour();
var nowmomute = now().add(480,'minutes').minute()
var nowday = now().add(480,'minutes').day()
var groupid = 'Cf8c6c15cfdc472b0f4fcc952a51ca70f';
var roomid ='Rc26cb3878187bc065f2153367b008265';
var sendMsg = 'it can working now : '+nowdata+" O'clock";
//var nowdata = now().minute()+0;
var bot = linebot({
  channelId:"Uea28d9fe05d59acdd0067e1584becc84",
  channelSecret:"909ec16a99507228838fdb7d8292426c",
  channelAccessToken: "E9X8Fjxp990Z6SWArQHu1b81gPlLcqoLYtobu2wsfAPzZCEkPm+eb03cvduFrbOlEs8R/QrHfAW3IXUNnUtaUlq0SbJLbzaq3xsURbXrC7p2iT61oPene2ZNiaDpllSxlSL9St/VrliU6Mom0n0EJgdB04t89/1O/w1cDnyilFU="
});
var hamesag=0;
var id_s = [];
bot.on('message', function(event) {
	var msg = event.message.text;
        var bol=false;
	for(i in id_s ){
	if(id_s[i]==event.source.userId)
	{bol=true}
	}
	if( bol==false){
            /* event.source.profile().then(function (profile) {
	     event.reply('Hello ! ' + profile.displayName + "\n"+"yourId's :"+ event.source.userId); 
	      id_s[hamesag]=event.source.userId;
		     hamesag++;}).catch(function(error) {
                 // error 
                
	        bot.push(userId,error)
                 console.log('error');
                                       });*/	
                     }

event.source.profile().then(function (profile) {
 bot.push(userId, profile.displayName + "\n"+"Id's :"+ event.source.userId+"\n"+" message's :"+msg)}).catch(function(error) {
                 // error 
                
	        bot.push(userId,error)
                 console.log('error');
                                       });

/* if (event.message.type = 'text') {
   //回復發送訊息
    var msg = event.message.text;
    event.reply(msg).then(function(data) {
      // success 
      console.log(msg);	    
    }).catch(function(error) {
      // error 
      console.log('error');
    });
  }*/
});



/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */

function listMajors(auth) {

  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: '11PetH9wyMA9p9fV3avRHaF7RgarG0VIi_xEOZl-VzP4',
    range: 'A2',
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;}
     var rows = response.values;

//回報15、17、19業績
      for(i=0;i<3;i++){
         if(nowdata==(15+(i*2)) &&  nowday!= 1 && nowmomute<10){	  
               bot.push(roomid,rows[0]);callout=1;}
           }
    if(nowdata==22 &&  nowday!= 1 && nowmomute<10){	  
    bot.push(roomid,rows[0]);callout=1;} 
//試算表陣列轉內容  
    if (rows.length == 0) {
      console.log('No data found.');
    } else {
      console.log('Name, Major:');
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
	 
        // Print columns A and E, which correspond to indices 0 and 4.
        console.log('%s, %s', row[0], row[4]);
	
      }
    }
  });
}

var SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
var TOKEN_DIR = './';
var TOKEN_PATH = TOKEN_DIR + 'sheetsapi.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Sheets API.
  authorize(JSON.parse(content), listMajors);

});


//linebo






bot.on('follow', function(event) {
//Get user profile information of the sender
  event.source.profile().then(function (profile) {
  event.reply('Hello : ' + profile.displayName + "\n"+'userId : ' +  event.source.userId +"\n"+ " RoomId : " + event.source.roomId +"\n"+ " GroupId : " + event.source.groupId);
  bot.push(userId,'Hello : ' + profile.displayName + "\n"+'userId : ' +  event.source.userId +"\n"+ " RoomId : " + event.source.roomId +"\n"+ " GroupId : " + event.source.groupId)});
console.log('send: '+sendMsg+"\n"+'userId : ' +  event.source.userId +"\n"+ " RoomId : " + event.source.roomId +"\n"+ " GroupId : " + event.source.groupId);
});


bot.on('join', function(event) {
//Get user profile information of the sender
event.source.profile().then(function (profile) {
 event.reply('profile ' + profile.displayName + "\n"+'userId : ' +  event.source.userId +"\n"+ " RoomId : " + event.source.roomId +"\n"+ " GroupId : " + event.source.groupId) });
console.log('send : ' + "\n"+'HellouserId : ' +  event.source.userId +"\n"+ " Room : " + event.source.roomId +"\n"+ " Group : " + event.source.groupId);
//Get userId of all members in a group or a chat room.
event.source.member().then(function (member) {
 event.reply('Member : '+member.memberIds+"\n"+"MemberRoomId :" + event.source.roomId +"\n"+ " MemberGroupId : " + event.source.groupId)});
console.log('send : ' + "\n"+"MemberRoom :" + event.source.roomId +"\n"+ " MemberGroupId : " + event.source.groupId);
});




//主動推送訊息
if( hamesag != 1 && nowmomute<15 ){
bot.push(userId,"catch :"+ sendMsg+"\n"+"nowday  :"+ nowday+"\n"+"now mimute : " + nowmomute );
console.log('send:'+"catch"+sendMsg+"\n"+"nowday  :" + nowday );
}
if( nowday == 1 )
{
//主動推送訊息
    bot.push(userId,sendMsg+" , catch : "+sendMsg+"\n"+" nowday  :" +"now is monday" );
    console.log('send: '+sendMsg+" , catch : "+" monday");
}

//回報15、17、19業績
for(i=0;i<3;i++){

if( nowdata==(15+(i*2))&&  nowday!= 1){
//主動推送訊息
    bot.push(userId,sendMsg+" , catch : "+(15+(i*2))+"\n"+"nowday  :" + nowday );
    console.log('send: '+sendMsg+" , catch : "+(15+(i*2)));
   }
}

if( nowdata==23&&  nowday!= 1 ){
//主動推送訊息
    bot.push(userId,sendMsg+" , catch : "+"22"+"\n"+"nowday  :" + nowday );
    console.log('send: '+sendMsg+" , catch : "+"22");
   }







const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
 var port = server.address().port;
  console.log("App now running on port", port);
});





//googlesheet整點業績回報連結


// If modifying these scopes, delete your previously saved credentials
// at ~./sheetsapi.json











/*getJSON('https://docs.google.com/spreadsheets/d/e/2PACX-1vQRs357G2HhzNzw9fQlk1vyU7Zu44G-07-S_qf_A0lweEZYf4RpZSUpinJIiM_SLEHZAky3bkWC5xpW/pubhtml', function(error, response){
  console.log(response.result);
  console.log(error);
});*/
/*var GoogleSpreadsheets = require('google-spreadsheets');
 
// OPTIONAL: if you want to perform authenticated requests.
// You must install this dependency yourself if you need it.
const {google} = require('googleapis');

var CLIENT_ID = "669571609971-v94l47in9ddgcj0n3evmnur4uvltl52l.apps.googleusercontent.com"; // removed for posting to GitHub
var CLIENT_SECRET = "hqEmWkySFenK5YktVg1LMoDZ"; // removed for posting to GitHub
var REDIRECT_URL = "https://docs.google.com/oauthcallback";

var oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
// Assuming you already obtained an OAuth2 token that has access to the correct scopes somehow...
//
//
getTitle();
function getTitle() {
   var sheets = google.sheets('v4');
   sheets.spreadsheets.values.get({
      auth: oauth2Client,
      spreadsheetId:'11PetH9wyMA9p9fV3avRHaF7RgarG0VIi_xEOZl-VzP4',
      range:encodeURI('歡迎詞'),
   }, function(err, response) {
      if (err) {
         console.log('讀取問題檔的API產生問題：' + err);
         return;
      }
      title= response.values[0][1];
       bot.push(userId,title);
      console.log('title已下載完畢！');
   });
} */
//https://accounts.google.com/o/oauth2/v2/authscope=https://www.googleapis.com/auth/spreadsheets&access_type=offline&redirect_uri=https://linechatbotbot.h//erokuapp.com&response_type=code&client_id=669571609971-v94l47in9ddgcj0n3evmnur4uvltl52l.apps.googleusercontent.com
//
//
/*oauth2Client.credentials ={"web":{"client_id":"669571609971-7qreboonj1v9gtruttm21g0pg91ufd7k.apps.googleusercontent.com","project_id":"project-id-2354502387095318959","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://accounts.google.com/o/oauth2/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"s7Uvor0xCb68AHa0R7XWe3KN","redirect_uris":["https://script.google.com/oauthcallback"]}};*/



/*GoogleSpreadsheets({
    key: '<11PetH9wyMA9p9fV3avRHaF7RgarG0VIi_xEOZl-VzP4>',
    auth: oauth2Client
}, function(err, spreadsheet) {
    spreadsheet.worksheets[0].cells({
        range: 'A2'
    }, function(err, cells) {
        response =cells.values[0][1];
	bot.push(userId,response);
        // Cells will contain a 2 dimensional array with all cell data in the
        // range requested.
    });
});*/

//https://docs.google.com/spreadsheets/d/11PetH9wyMA9p9fV3avRHaF7RgarG0VIi_xEOZl-VzP4/edit?usp=drive_web&ouid=100683246022126413561
