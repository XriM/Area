// ignore_for_file: avoid_print, prefer_const_literals_to_create_immutables, prefer_const_constructors, unused_import

import 'dart:async';
import 'dart:convert';

import 'package:area_app/Screens/App/AppScreens/ifFilled.dart';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'package:rounded_loading_button/rounded_loading_button.dart';
import 'dart:io';
import 'package:area_app/globals.dart' as globals;
import 'package:http/http.dart' as http;

import 'package:webview_flutter/webview_flutter.dart';

class OotlookWebview extends StatefulWidget {
  OotlookWebview({Key? key}) : super(key: key);

  @override
  State<OotlookWebview> createState() => _OotlookWebviewState();
}

class _OotlookWebviewState extends State<OotlookWebview> {
  late WebViewController controller;

  @override
  Widget build(BuildContext context) {
    Future<Map<String, dynamic>> getAccesToken(var _code) async {
      final Map<String, String> body = {
        'nom de l area': globals.serviceName + ' + ' + globals.reactionName,
        'client_id': 'dee479f7-7be3-49a8-a238-71bf50de2175',
        'scope':
            'openid email offline_access https://outlook.office.com/IMAP.AccessAsUser.All',
        'redirect_uri': 'http://localhost:3000/profile',
        'grant_type': 'authorization_code',
        'client_secret': '2e88322a-c579-45ce-95b9-5788c7f7072c',
        'code': _code,
      };

      final Uri url = Uri.https(
        'https://login.microsoftonline.com/common/oauth2/v2.0/token',
        '',
      );
      final http.Response response = await http.post(url, body: body);
      if (response.statusCode == 200) {
        final Map<String, dynamic> json =
            await jsonDecode(response.body) as Map<String, dynamic>;
        globals.ootCode = json['access_token'].toString();
        return json;
      } else {
        throw Exception('Failed to get login');
      }
    }

    urlParser(String _url) {
      var uri = Uri.parse(_url);
      uri.queryParameters.forEach((key, value) async {
        if (key == "code") {
          print("-------------");
          print(value);
          globals.ootCode = value;
          print("-------------");
        }
        await getAccesToken(value);
      });
      // xNavigator.pop(context);
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
            "AREA | Github",
            style: const TextStyle(color: Color(0xff333333)),
          ),
        ),
        body: WebView(
          javascriptMode: JavascriptMode.unrestricted,
          initialUrl:
              'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=dee479f7-7be3-49a8-a238-71bf50de2175response_type=code&redirect_uri=http://localhost:3000/profile&response_mode=query&scope=openid%20email%20offline_access%20https%3A%2F%2Foutlook.office.com%2FIMAP.AccessAsUser.All&state=12345',
          onWebViewCreated: (controller) {
            this.controller = controller;
          },
          onPageStarted: (url) {
            urlParser(url);
          },
        ));
  }
}
