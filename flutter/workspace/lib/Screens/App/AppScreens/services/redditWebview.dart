// ignore_for_file: avoid_print, prefer_const_literals_to_create_immutables, prefer_const_constructors, unused_import

import 'dart:async';
import 'dart:convert';
import 'dart:math';

import 'package:area_app/Screens/App/AppScreens/ifFilled.dart';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'package:rounded_loading_button/rounded_loading_button.dart';
import 'dart:io';
import 'package:area_app/globals.dart' as globals;
import 'package:http/http.dart' as http;
import 'package:area_app/token.dart';
import 'package:webview_flutter/webview_flutter.dart';

class RedditWebview extends StatefulWidget {
  RedditWebview({Key? key}) : super(key: key);

  @override
  State<RedditWebview> createState() => _RedditWebviewState();
}

class _RedditWebviewState extends State<RedditWebview> {
  late WebViewController controller;

  final Completer<WebViewController> _controller =
      Completer<WebViewController>();

  final Map<String, String> queryParameters = {
    'client_id': '_AH7eByuCQvZ7TW_NpKGUg',
    'response_type': 'code',
    'state': getRandString(10),
    'redirect_uri': 'http://localhost:8080',
    'duration': 'permanent',
    'scope':
        'identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread'
  };

  @override
  Widget build(BuildContext context) {
    String getAuthorizeUrl() {
      String str = 'https://www.reddit.com/api/v1/authorize?';
      queryParameters.forEach((String k, String v) {
        str = str + k + '=' + v + '&';
      });
      str = str.substring(0, str.length - 1);
      return str;
    }

    return Scaffold(
      appBar: AppBar(
        centerTitle: false,
        iconTheme: const IconThemeData(color: Color(0xff333333)),
        backgroundColor: Colors.white,
        elevation: 0,
        bottom: PreferredSize(
            child: Container(
              color: const Color(0xff333333),
              height: 4.0,
              width: 350,
            ),
            preferredSize: const Size.fromHeight(10.0)),
        title: Text(
          "AREA | Reddit",
          style: const TextStyle(color: Color(0xff333333)),
        ),
      ),
      body: WebView(
          initialUrl: getAuthorizeUrl(),
          userAgent: 'random',
          javascriptMode: JavascriptMode.unrestricted,
          onWebViewCreated: (WebViewController webViewController) {
            _controller.complete(webViewController);
          },
          onPageStarted: (String url) {
            if (url.toLowerCase().startsWith('http://localhost:8080')) {
              String parsedToken = url;
              final int codeParameterIndex =
                  parsedToken.indexOf('code=') + 'code='.length;
              parsedToken =
                  parsedToken.substring(codeParameterIndex, parsedToken.length);
              parsedToken = parsedToken.substring(0, parsedToken.indexOf('#'));
              globals.redditToken = fetchToken(parsedToken);
              // Navigator.pushNamed(context, '/home');
              Navigator.pop(context);
              print('---------------------------');
              globals.redditToken.then(
                  (value) => globals.lastRedditToken = value.getAccessToken);
              print('---------------------------');
            }
          }),
    );
  }
}

String getRandString(int len) {
  final Random random = Random.secure();
  final List<int> values =
      List<int>.generate(len, (int i) => random.nextInt(255));
  return base64UrlEncode(values);
}
