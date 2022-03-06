// ignore_for_file: avoid_print, prefer_const_literals_to_create_immutables, prefer_const_constructors, unused_import

import 'dart:async';

import 'package:area_app/Screens/App/AppScreens/services/trelloWebview.dart';
import 'package:area_app/Screens/App/AppScreens/thenFilled.dart';
import 'package:flutter/material.dart';
import 'package:flutter_signin_button/flutter_signin_button.dart';
import 'package:path_provider/path_provider.dart';
import 'package:rounded_loading_button/rounded_loading_button.dart';
import 'dart:io';
import 'package:area_app/globals.dart' as globals;

class TrelloReactionForm extends StatelessWidget {
  TrelloReactionForm({Key? key}) : super(key: key);

  TextEditingController accessToken = TextEditingController();
  TextEditingController idList = TextEditingController();
  TextEditingController name = TextEditingController();

  final RoundedLoadingButtonController _btnController =
      RoundedLoadingButtonController();

  @override
  Widget build(BuildContext context) {
    _test() {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => TrelloWebview(),
        ),
      );
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
            "AREA | Trello",
            style: const TextStyle(color: Color(0xff333333)),
          ),
        ),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          // crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
                alignment: Alignment.center,
                padding: const EdgeInsets.all(10),
                child: const Text(
                  'Trello',
                  style: TextStyle(
                      color: Color(0xff333333),
                      fontWeight: FontWeight.w500,
                      fontSize: 30),
                )),
            Container(
                alignment: Alignment.center,
                padding: const EdgeInsets.all(10),
                child: const Text(
                  'Trello account',
                  style: TextStyle(fontSize: 20),
                )),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextField(
                controller: accessToken,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Access Token',
                ),
              ),
            ),
            SizedBox(
              height: 20,
            ),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextField(
                controller: idList,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'List Id',
                ),
              ),
            ),
            SizedBox(
              height: 20,
            ),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextField(
                controller: name,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Name',
                ),
              ),
            ),
            SizedBox(
              height: 20,
            ),
            SizedBox(
              height: 20,
            ),
            SignInButton(
              Buttons.Email,
              onPressed: _test,
            ),
            SizedBox(
              height: 20,
            ),
            RoundedLoadingButton(
              child: Text('ADD', style: TextStyle(color: Colors.white)),
              controller: _btnController,
              color: Color(0xff333333),
              onPressed: () async {
                globals.reactionName = globals.trelloValues[0] as String;
                globals.reactionColor = globals.trelloColor;
                // globals.reactionPara = _email.text;
                // globals.trelloToken = {'token': accessToken.text};
                globals.trellToken = accessToken.text;
                globals.trelloPara = {
                  "\"idList\"": "\"" + idList.text + "\"",
                  "\"name\"": "\"" + name.text + "\"",
                };
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => ThenFilled(
                      ifPassedColor: globals.serviceColor,
                      ifPassedColorName: globals.serviceName,
                      thenPassedColor: globals.reactionColor,
                      thenPassedColorName: globals.reactionName,
                    ),
                  ),
                );
              },
            ),
          ],
        ));
  }
}
