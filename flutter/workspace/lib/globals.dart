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

var outlookValues = ['Outlook', 1];
var youtubeValues = ['Youtube', 2];
var redditValues = ['Reddit', 3];
var githubValues = ['Github', 4];
var weatherValues = ['Weather', 5];
var steamValues = ['Steam', 6];
var cryptoValues = ['Crypto', 7];
var oneDriveValues = ['One Drive', 8];
Map<String, dynamic> steamPara = {};
Map<String, dynamic> githubPara = {};
Map<String, dynamic> githubToken = {};
Map<String, dynamic> weatherPara = {};
Map<String, dynamic> cryptoPara = {};
Map<String, dynamic> outlookPara = {};
Map<String, dynamic> youtubePara = {};
Map<String, dynamic> redditPara = {};
Map<String, dynamic> oneDrivePara = {};

var outlookValuesR = ['Outlook', 1];
var trelloValues = ['Trello', 2];
var githubValuesR = ['Github', 3];
var discordValues = ['Discord', 4];
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

Future<Token> redditToken = fetchEmptyToken();

var ngrokUri = "";