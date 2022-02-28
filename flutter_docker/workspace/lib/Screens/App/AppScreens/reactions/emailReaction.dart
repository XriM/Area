// ignore_for_file: avoid_print, prefer_const_literals_to_create_immutables, prefer_const_constructors, unused_import

import 'dart:async';

import 'package:area_app/Screens/App/AppScreens/services/outlookWebview.dart';
import 'package:area_app/Screens/App/AppScreens/thenFilled.dart';
import 'package:flutter/material.dart';
import 'package:flutter_signin_button/flutter_signin_button.dart';
import 'package:path_provider/path_provider.dart';
import 'package:rounded_loading_button/rounded_loading_button.dart';
import 'dart:io';
import 'package:area_app/globals.dart' as globals;

class EmailReactionForm extends StatelessWidget {
  EmailReactionForm({Key? key}) : super(key: key);

  TextEditingController _email = TextEditingController();
  TextEditingController _cc = TextEditingController();
  TextEditingController _sub = TextEditingController();
  TextEditingController _msg = TextEditingController();

  final RoundedLoadingButtonController _btnController =
      RoundedLoadingButtonController();

  @override
  Widget build(BuildContext context) {
    _test() {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => OotlookWebview(),
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
            "AREA | Outlook",
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
                  'Outlook',
                  style: TextStyle(
                      color: Color(0xff333333),
                      fontWeight: FontWeight.w500,
                      fontSize: 30),
                )),
            Container(
                alignment: Alignment.center,
                padding: const EdgeInsets.all(10),
                child: const Text(
                  'Email to send mail',
                  style: TextStyle(fontSize: 20),
                )),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextField(
                controller: _email,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Email',
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextField(
                controller: _cc,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Cc',
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextField(
                controller: _sub,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Subject',
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextField(
                controller: _msg,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Message',
                ),
              ),
            ),
            SizedBox(
              height: 20,
            ),
            SignInButton(
              Buttons.Microsoft,
              onPressed: _test,
            ),
            RoundedLoadingButton(
              child: Text('ADD', style: TextStyle(color: Colors.white)),
              controller: _btnController,
              color: Color(0xff333333),
              onPressed: () async {
                globals.reactionName = globals.outlookValues[0] as String;
                print(globals.emailValues[0]);
                globals.reactionColor = Colors.green;
                globals.reactionPara = _email.text;
                globals.emailPara = {
                  "to": [
                    _email.text,
                  ],
                  "cc": [_cc.text],
                  "subject": _sub.text,
                  "message": _msg.text
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
