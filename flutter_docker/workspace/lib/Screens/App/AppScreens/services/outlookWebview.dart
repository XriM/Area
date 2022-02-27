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
      tenant: "901cb4ca-b862-4029-9306-e5cd0f6d9f86",
      clientId: "dee479f7-7be3-49a8-a238-71bf50de2175",
      clientSecret: "Re47Q~hMlvpAZ7BN8SnBIChQK4SMEIFvgv1XF",
      scope: "https://graph.microsoft.com/.default",
      redirectUri: "https://localhost/callback");

  final AadOAuth oauth = new AadOAuth(config);

  @override
  Widget build(BuildContext context) {
    oauth.setWebViewScreenSizeFromMedia(MediaQuery.of(context));
    // Future<Map<String, dynamic>> getAccesToken(var _code) async {
    //   final Map<String, String> body = {
    //     'nom de l area': globals.serviceName + ' + ' + globals.reactionName,
    //     'client_id': 'dee479f7-7be3-49a8-a238-71bf50de2175',
    //     'scope':
    //         'openid email offline_access https://outlook.office.com/IMAP.AccessAsUser.All',
    //     'redirect_uri': 'http://localhost:3000/profile',
    //     'grant_type': 'authorization_code',
    //     'client_secret': '2e88322a-c579-45ce-95b9-5788c7f7072c',
    //     'code': _code,
    //   };

    //   final Uri url = Uri.https(
    //     'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    //     '',
    //   );
    //   final http.Response response = await http.post(url, body: body);
    //   if (response.statusCode == 200) {
    //     final Map<String, dynamic> json =
    //         await jsonDecode(response.body) as Map<String, dynamic>;
    //     print(json['access_token'].toString());
    //     globals.ootCode = json['access_token'].toString();
    //     return json;
    //   } else {
    //     throw Exception('Failed to get login');
    //   }
    // }

    // // var uri = https://sts.epitech.eu/adfs/ls/?client-request-id=ffbf306b-7914-4784-ab02-234b3b0f2f29&wa=wsignin1.0&wtrealm=urn%3Afederation%3AMicrosoftOnline&wctx=LoginOptions%3D3%26estsredirect%3D2%26estsrequest%3DrQIIAdNiNtIzsFJJSU01MbdMM9c1T0o11jWxTLTQTTQyttA1N0xKMzVISTUyNDctEuISyDbY_1-kssV9NZOytzW_vuYqRqmMkpKCYit9_Zz85MScjPziEn0gnZOUmJy9g5HxAiPjLSZ-f8fSkgwjEJFflFmV-omJtbA0tahyFjOroZGxiekqZrgh-aUlOfn52Xr5aWmZyal6yfm5m5jZgGRuft4pZp_8gtS8zBSF1NzEzBwFoJKczLzU-MTk5NTiYgXcJuh7-joG6DmClTkWhxanFuk55uTcYGZ8xCyRkliWmaKXl5mdn5OZ7JBakFmSmpyhl1p6gYXxFQuPAZMVBwe_AJMEgwLDDxbGRazAEFC_mGp8KOCM67SCJyIfJoYynGLVD_UJcnYJCgg2DtZP065Iz0oOLkvz0Q9K8XQsC43wTbYILylILws3cKuqSLY1sTKcwMb4gY2xg51hFyeewDvAy_CDr6m5ff2ZA__eeAAA0&cbcxt=&username=david.nikolic%40epitech.eu&mkt=&lc=[VERBOSE-2:ui_dart_state.cc(209)]

    // urlParser(String _url) {
    //   print("la");
    //   var uri = Uri.parse(_url);
    //   print(uri);
    //   uri.queryParameters.forEach((key, value) async {
    //     if (key == "code") {
    //       print("-------------");
    //       print(value);
    //       globals.ootCode = value;
    //       print("-------------");
    //       await getAccesToken(value);
    //     }
    //   });
    //   // xNavigator.pop(context);
    // }

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
          ListTile(
            title: Text(
              'AzureAD OAuth',
              style: Theme.of(context).textTheme.headline5,
            ),
          ),
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
    // WebView(
    //   javascriptMode: JavascriptMode.unrestricted,
    //   initialUrl:
    //       'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=dee479f7-7be3-49a8-a238-71bf50de2175&response_type=code&redirect_uri=https://localhost/callback&response_mode=query&scope=https://graph.microsoft.com/.default&state=12345',
    //   onWebViewCreated: (controller) {
    //     this.controller = controller;
    //   },
    //   onPageStarted: (url) {
    //     // urlParser(url);
    //   },
    // )
    // );
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
      showMessage('Logged in successfully, your access token: $accessToken');
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
