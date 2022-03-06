// ignore_for_file: avoid_print, prefer_const_literals_to_create_immutables, prefer_const_constructors, unused_import

import 'dart:async';
import 'dart:convert';

import 'package:aad_oauth/model/config.dart';
import 'package:area_app/Screens/App/AppScreens/ifFilled.dart';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'package:rounded_loading_button/rounded_loading_button.dart';
import 'dart:io';
import 'package:area_app/globals.dart' as globals;
import 'package:http/http.dart' as http;
import 'package:aad_oauth/aad_oauth.dart';

import 'package:webview_flutter/webview_flutter.dart';

class OotlookWebview extends StatefulWidget {
  OotlookWebview({Key? key}) : super(key: key);

  @override
  State<OotlookWebview> createState() => _OotlookWebviewState();
}

class _OotlookWebviewState extends State<OotlookWebview> {
  late WebViewController controller;

  static final Config config = new Config(
      tenant: "c63dfed5-a22f-42f6-9d9d-35703cf453b8",
      clientId: "e5427ba3-bbbd-4c91-b696-ff0a1d337e44",
      clientSecret: "WTr7Q~2ILsDGX5BG5jJfv8MoSSuJcu25TdmC2",
      scope:
          "email openid profile https://graph.microsoft.com/IMAP.AccessAsUser.All https://graph.microsoft.com/Mail.Read https://graph.microsoft.com/Mail.ReadBasic https://graph.microsoft.com/Mail.ReadWrite https://graph.microsoft.com/Mail.Send https://graph.microsoft.com/Files.ReadWrite.All",
      redirectUri: "https://localhost/callback");

  final AadOAuth oauth = new AadOAuth(config);

  @override
  Widget build(BuildContext context) {
    oauth.setWebViewScreenSizeFromMedia(MediaQuery.of(context));
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
          "AREA | Outlook",
          style: const TextStyle(color: Color(0xff333333)),
        ),
      ),
      body: ListView(
        children: <Widget>[
          // ListTile(
          //   title: Text(
          //     'AzureAD OAuth',
          //     style: Theme.of(context).textTheme.headline5,
          //   ),
          // ),
          ListTile(
            leading: Icon(Icons.launch),
            title: Text('Login'),
            onTap: () {
              login();
            },
          ),
          ListTile(
            leading: Icon(Icons.delete),
            title: Text('Logout'),
            onTap: () {
              logout();
            },
          ),
        ],
      ),
    );
  }

  void showError(dynamic ex) {
    showMessage(ex.toString());
  }

  void showMessage(String text) {
    var alert = AlertDialog(content: Text(text), actions: <Widget>[
      TextButton(
          child: const Text('Ok'),
          onPressed: () {
            Navigator.pop(context);
          })
    ]);
    showDialog(context: context, builder: (BuildContext context) => alert);
  }

  void login() async {
    try {
      await oauth.login();
      var accessToken = await oauth.getAccessToken();
      // showMessage('Logged in successfully, your access token: $accessToken');
      globals.ootCode = accessToken;
    } catch (e) {
      showError(e);
    }
  }

  void logout() async {
    await oauth.logout();
    showMessage('Logged out');
    globals.ootCode = null;
  }
}
