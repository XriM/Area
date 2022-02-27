// ignore_for_file: avoid_print, prefer_const_literals_to_create_immutables, prefer_const_constructors, unused_import

import 'dart:async';

import 'package:area_app/Screens/App/AppScreens/thenFilled.dart';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'package:rounded_loading_button/rounded_loading_button.dart';
import 'dart:io';
import 'package:area_app/globals.dart' as globals;

class DiscordReactionForm extends StatelessWidget {
  DiscordReactionForm({Key? key}) : super(key: key);

  TextEditingController _discordAccount = TextEditingController();

  final RoundedLoadingButtonController _btnController =
      RoundedLoadingButtonController();

  @override
  Widget build(BuildContext context) {
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
            "AREA | Discord",
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
                  'Discord',
                  style: TextStyle(
                      color: Color(0xff333333),
                      fontWeight: FontWeight.w500,
                      fontSize: 30),
                )),
            Container(
                alignment: Alignment.center,
                padding: const EdgeInsets.all(10),
                child: const Text(
                  'Discord account',
                  style: TextStyle(fontSize: 20),
                )),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextField(
                controller: _discordAccount,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Account',
                ),
              ),
            ),
            SizedBox(
              height: 20,
            ),
            RoundedLoadingButton(
              child: Text('ADD', style: TextStyle(color: Colors.white)),
              controller: _btnController,
              color: Color(0xff333333),
              onPressed: () async {
                // Timer(Duration(seconds: 1), () async {
                //   _btnController.success();
                //   print(_email.text);
                //   await Future.delayed(const Duration(seconds: 1), () {
                //     Navigator.pop(context);
                //     Navigator.pop(context);

                //   });
                // });
                globals.reactionName = 'DISCORD';
                globals.reactionColor = Colors.purple;
                globals.reactionPara = _discordAccount.text;
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
