// ignore_for_file: avoid_print, prefer_const_literals_to_create_immutables, prefer_const_constructors, unused_import

import 'dart:async';

import 'package:area_app/Screens/App/AppScreens/ifFilled.dart';
<<<<<<< HEAD
import 'package:area_app/Screens/App/AppScreens/services/outlookWebview.dart';
=======
import 'package:area_app/Screens/App/AppScreens/services/OutlookWebview.dart';
import 'package:area_app/Screens/App/AppScreens/thenFilled.dart';
>>>>>>> 631fedfba91b2ab630a7ca60c7c7d283a984077a
import 'package:flutter/material.dart';
import 'package:flutter_signin_button/flutter_signin_button.dart';
import 'package:path_provider/path_provider.dart';
import 'package:rounded_loading_button/rounded_loading_button.dart';
import 'dart:io';
import 'package:area_app/globals.dart' as globals;

<<<<<<< HEAD
class OneDriveServiceForm extends StatelessWidget {
  OneDriveServiceForm({Key? key}) : super(key: key);

  TextEditingController _drive = TextEditingController();
=======
class OutlookReactionForm extends StatelessWidget {
  OutlookReactionForm({Key? key}) : super(key: key);

  TextEditingController _to = TextEditingController();
  TextEditingController _cc = TextEditingController();
  TextEditingController _subject = TextEditingController();
  TextEditingController _msg = TextEditingController();
>>>>>>> 631fedfba91b2ab630a7ca60c7c7d283a984077a

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
<<<<<<< HEAD
            "AREA | One Drive",
=======
            "AREA | Outlook",
>>>>>>> 631fedfba91b2ab630a7ca60c7c7d283a984077a
            style: const TextStyle(color: Color(0xff333333)),
          ),
        ),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.start,
<<<<<<< HEAD
          // crossAxisAlignment: CrossAxisAlignment.center,
=======
>>>>>>> 631fedfba91b2ab630a7ca60c7c7d283a984077a
          children: [
            Container(
                alignment: Alignment.center,
                padding: const EdgeInsets.all(10),
                child: const Text(
<<<<<<< HEAD
                  'One Drive',
=======
                  'Outlook',
>>>>>>> 631fedfba91b2ab630a7ca60c7c7d283a984077a
                  style: TextStyle(
                      color: Color(0xff333333),
                      fontWeight: FontWeight.w500,
                      fontSize: 30),
                )),
            Container(
                alignment: Alignment.center,
                padding: const EdgeInsets.all(10),
                child: const Text(
<<<<<<< HEAD
                  'One Drive to check',
=======
                  'Outlook email',
>>>>>>> 631fedfba91b2ab630a7ca60c7c7d283a984077a
                  style: TextStyle(fontSize: 20),
                )),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextField(
<<<<<<< HEAD
                controller: _drive,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Currency',
                ),
              ),
            ),
=======
                controller: _to,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'To',
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
                controller: _subject,
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
>>>>>>> 631fedfba91b2ab630a7ca60c7c7d283a984077a
            SignInButton(
              Buttons.Microsoft,
              onPressed: _test,
            ),
<<<<<<< HEAD
=======
            SizedBox(
              height: 20,
            ),
>>>>>>> 631fedfba91b2ab630a7ca60c7c7d283a984077a
            RoundedLoadingButton(
              child: Text('ADD', style: TextStyle(color: Colors.white)),
              controller: _btnController,
              color: Color(0xff333333),
              onPressed: () async {
<<<<<<< HEAD
                globals.serviceName = globals.oneDriveValues[0] as String;
                globals.serviceColor = globals.oneDriveColor;
                globals.oneDrivePara = {"drive": _drive.text};
=======
                globals.reactionName = globals.outlookValuesR[0] as String;
                globals.reactionColor = globals.outlookColor;
                globals.outlookParaR = {
                  "to": [_to.text],
                  "cc": [_cc.text],
                  "subject": _subject.text,
                  "message": _msg.text
                };
>>>>>>> 631fedfba91b2ab630a7ca60c7c7d283a984077a
                Timer(Duration(seconds: 1), () async {
                  _btnController.success();
                  await Future.delayed(const Duration(seconds: 1), () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
<<<<<<< HEAD
                        builder: (_) => IfFilled(
                          passedColor: globals.serviceColor,
                          passedColorName: globals.serviceName,
=======
                        builder: (_) => ThenFilled(
                          ifPassedColor: globals.serviceColor,
                          ifPassedColorName: globals.serviceName,
                          thenPassedColor: globals.reactionColor,
                          thenPassedColorName: globals.reactionName,
>>>>>>> 631fedfba91b2ab630a7ca60c7c7d283a984077a
                        ),
                      ),
                    );
                  });
                });
              },
            ),
<<<<<<< HEAD
=======
            // SizedBox(height: 500),
>>>>>>> 631fedfba91b2ab630a7ca60c7c7d283a984077a
          ],
        ));
  }
}
