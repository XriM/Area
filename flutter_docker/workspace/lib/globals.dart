library area_app.globals;

import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';

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

var steamValues = ['Steam', 2];
Map<String, dynamic> steamPara = {};
var githubValues = ['Github', 2];
Map<String, dynamic> githubPara = {};
Map<String, dynamic> githubToken = {};
var weatherValues = ['Weather', 2];
Map<String, dynamic> weatherPara = {};
var cryptoValues = ['Crypto', 2];
Map<String, dynamic> cryptoPara = {};
var outlookValues = ['Outlook', 2];
Map<String, dynamic> outlookPara = {};

var trelloValues = ['Trello', 2];
Map<String, dynamic> trelloPara = {};
var sheetsValues = ['Sheets', 2];
Map<String, dynamic> sheetsPara = {};
var discordValues = ['Discord', 2];
Map<String, dynamic> discordPara = {};
var emailValues = ['Outlook', 2];
Map<String, dynamic> emailPara = {};
var twilioValues = ['Twilio', 2];
Map<String, dynamic> twilioPara = {};
var githubValuesR = ['Github', 2];
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
