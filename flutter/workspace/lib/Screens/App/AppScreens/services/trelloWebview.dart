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

class TrelloWebview extends StatefulWidget {
  TrelloWebview({Key? key}) : super(key: key);

  @override
  State<TrelloWebview> createState() => _TrelloWebviewState();
}

class _TrelloWebviewState extends State<TrelloWebview> {
  late WebViewController controller;

  @override
  Widget build(BuildContext context) {
    urlParser(String _url) {
      var uri = Uri.parse(_url);
      uri.queryParameters.forEach((key, value) async {
        if (key == "code") {
          print("-------------");
          print(value);
          globals.trellToken = value;
          globals.trelloToken = {"token": value};
          print("-------------");
        }
      });
      // Navigator.pop(context);
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
              'https://trello.com/1/authorize?expiration=1day&name=MyPersonalToken&scope=read,write&response_type=token&key=7b6292b9c2d2d0d8cbe96937dee3765a',
          onWebViewCreated: (controller) {
            this.controller = controller;
          },
          onPageStarted: (url) {
            // urlParser(url);
          },
        ));
  }
}
