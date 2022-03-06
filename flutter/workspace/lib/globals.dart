library area_app.globals;

import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'token.dart';

GoogleSignInAccount? user;
String serviceName = 'IF THIS';
String servicePara = '';
Color serviceColor = Color(0xFF333333);

String reactionName = 'THEN THAT';
String reactionPara = '';
Color reactionColor = Color(0xff8F8F8F);

var userName = null;
var userMail = null;

String token = "";
var githCode;
var ootCode;
var googleToken;
var lastRedditToken;
var googleIdToken;

var outlookValues = ['Outlook'];
var outlookValuesId = '1';
var youtubeValues = ['Youtube'];
var youtubeValuesId = '2';
var redditValues = ['Reddit'];
var redditValuesId = '3';
var githubValues = ['Github'];
var githubValuesId = '4';
var weatherValues = ['Weather'];
var weatherValuesId = '5';
var steamValues = ['Steam'];
var steamValuesId = '6';
var cryptoValues = ['Crypto'];
var cryptoValuesId = '7';
var oneDriveValues = ['One Drive'];
var oneDriveValuesId = '8';
Map<String, dynamic> steamPara = {};
Map<String, dynamic> githubPara = {};
Map<String, dynamic> githubToken = {};
Map<String, dynamic> weatherPara = {};
Map<String, dynamic> cryptoPara = {};
Map<String, dynamic> outlookPara = {};
Map<String, dynamic> youtubePara = {};
Map<String, dynamic> redditPara = {};
Map<String, dynamic> oneDrivePara = {};

var outlookValuesR = ['Outlook'];
var outlookValuesRId = '1';
var trelloValues = ['Trello'];
var trelloValuesId = '2';
var githubValuesR = ['Github'];
var githubValuesRId = '3';
var discordValues = ['Discord'];
var discordValuesId = '4';
Map<String, dynamic> trelloPara = {};
Map<String, dynamic> discordPara = {};
Map<String, dynamic> outlookParaR = {};
Map<String, dynamic> githubParaR = {};

Color steamColor = Color(0xFF171a21);
Color githubColor = Color(0xFF424242);
Color cryptoColor = Color(0xFFff9900);
Color outlookColor = Color(0xFF044484);
Color youtubeColor = Color(0xFFff0000);
Color redditColor = Color(0xFFff5700);
Color oneDriveColor = Color(0xFF00a4ef);
Color trelloColor = Color(0xFF8bbdd9);
Color discordColor = Color(0xFF7289da);

String trelloId = '1';
String redditId = '2';
String discordId = '3';
String weatherId = '4';
String cryptoId = '5';
String gitHubId = '6';
String outlookId = '7';
String steamId = '8';
String youtubeId = '9';

Future<Token> redditToken = fetchEmptyToken();

String ngrokUri = '7f99-163-5-10-196.ngrok.io';

Text steamDescription = Text(
  "Get notified when there is currently an amount of players between 2 specified values for a specific Steam Game Id",
  style: TextStyle(
    fontSize: 16,
    color: Colors.white,
  ),
  textAlign: TextAlign.justify,
);

Text youtubeDescription = Text(
  "youtube",
  style: TextStyle(
    fontSize: 16,
    color: Colors.white,
  ),
  textAlign: TextAlign.justify,
);

Text actionOutlookDescription = Text(
  "outlook",
  style: TextStyle(
    fontSize: 16,
    color: Colors.white,
  ),
  textAlign: TextAlign.justify,
);

Text actionGitDescription = Text(
  "git",
  style: TextStyle(
    fontSize: 16,
    color: Colors.white,
  ),
  textAlign: TextAlign.justify,
);

Text cryptoDescription = Text(
  "crypto",
  style: TextStyle(
    fontSize: 16,
    color: Colors.white,
  ),
  textAlign: TextAlign.justify,
);

Text weatherDescription = Text(
  "weather",
  style: TextStyle(
    fontSize: 16,
    color: Colors.white,
  ),
  textAlign: TextAlign.justify,
);

Text discordDescription = Text(
  "discord",
  style: TextStyle(
    fontSize: 16,
    color: Colors.white,
  ),
  textAlign: TextAlign.justify,
);

Text redditDescription = Text(
  "reddit",
  style: TextStyle(
    fontSize: 16,
    color: Colors.white,
  ),
  textAlign: TextAlign.justify,
);

Text oneDriveDescription = Text(
  "onedrive",
  style: TextStyle(
    fontSize: 16,
    color: Colors.white,
  ),
  textAlign: TextAlign.justify,
);
Text reactionGitDescription = Text(
  "git",
  style: TextStyle(
    fontSize: 16,
    color: Colors.white,
  ),
  textAlign: TextAlign.justify,
);
Text trelloDescription = Text(
  "trello",
  style: TextStyle(
    fontSize: 16,
    color: Colors.white,
  ),
  textAlign: TextAlign.justify,
);
Text reactionOutlookDescription = Text(
  "outlook",
  style: TextStyle(
    fontSize: 16,
    color: Colors.white,
  ),
  textAlign: TextAlign.justify,
);
