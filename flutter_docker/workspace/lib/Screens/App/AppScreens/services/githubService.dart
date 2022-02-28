// ignore_for_file: avoid_print, prefer_const_literals_to_create_immutables, prefer_const_constructors, unused_import

import 'dart:async';

import 'package:area_app/Screens/App/AppScreens/ifFilled.dart';
import 'package:area_app/Screens/App/AppScreens/services/githubWebview.dart';
import 'package:flutter/material.dart';
import 'package:flutter_signin_button/flutter_signin_button.dart';
import 'package:path_provider/path_provider.dart';
import 'package:rounded_loading_button/rounded_loading_button.dart';
import 'dart:io';
import 'package:area_app/globals.dart' as globals;

class GithubServiceForm extends StatelessWidget {
  GithubServiceForm({Key? key}) : super(key: key);

  TextEditingController _repo = TextEditingController();
  TextEditingController _owner = TextEditingController();

  final RoundedLoadingButtonController _btnController =
      RoundedLoadingButtonController();

  @override
  Widget build(BuildContext context) {
    _test() {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => GithubWebview(),
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
            "AREA | Github",
            style: const TextStyle(color: Color(0xff333333)),
          ),
        ),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Container(
                alignment: Alignment.center,
                padding: const EdgeInsets.all(10),
                child: const Text(
                  'Github',
                  style: TextStyle(
                      color: Color(0xff333333),
                      fontWeight: FontWeight.w500,
                      fontSize: 30),
                )),
            Container(
                alignment: Alignment.center,
                padding: const EdgeInsets.all(10),
                child: const Text(
                  'Github repo that we will listen to',
                  style: TextStyle(fontSize: 20),
                )),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextField(
                controller: _repo,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Repo Name',
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextField(
                controller: _owner,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Owner',
                ),
              ),
            ),
            SizedBox(
              height: 20,
            ),
            SignInButton(
              Buttons.GitHub,
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
                globals.serviceName = globals.githubValues[0] as String;
                globals.githubPara = {
                  "github": _repo.text,
                  "owner": _owner.text,
                };
                globals.serviceColor = Colors.lightGreen;
                Timer(Duration(seconds: 1), () async {
                  _btnController.success();
                  await Future.delayed(const Duration(seconds: 1), () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => IfFilled(
                          passedColor: globals.serviceColor,
                          passedColorName: globals.serviceName,
                        ),
                      ),
                    );
                  });
                });
              },
            ),
          ],
        ));
  }
}
