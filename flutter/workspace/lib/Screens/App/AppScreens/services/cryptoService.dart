// ignore_for_file: avoid_print, prefer_const_literals_to_create_immutables, prefer_const_constructors, unused_import

import 'dart:async';

import 'package:area_app/Screens/App/AppScreens/ifFilled.dart';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'package:rounded_loading_button/rounded_loading_button.dart';
import 'dart:io';
import 'package:area_app/globals.dart' as globals;

class CryptoServiceForm extends StatelessWidget {
  CryptoServiceForm({Key? key}) : super(key: key);

  TextEditingController _currency = TextEditingController();
  TextEditingController _limitMin = TextEditingController();
  TextEditingController _limitMax = TextEditingController();

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
            "AREA | Crypto",
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
                  'Crypto',
                  style: TextStyle(
                      color: Color(0xff333333),
                      fontWeight: FontWeight.w500,
                      fontSize: 30),
                )),
            Container(
                alignment: Alignment.center,
                padding: const EdgeInsets.all(10),
                child: const Text(
                  'Currency and limit to check',
                  style: TextStyle(fontSize: 20),
                )),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextField(
                controller: _currency,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Currency',
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextField(
                controller: _limitMin,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Limit Min',
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextField(
                controller: _limitMax,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Limit Max',
                ),
              ),
            ),
            RoundedLoadingButton(
              child: Text('ADD', style: TextStyle(color: Colors.white)),
              controller: _btnController,
              color: Color(0xff333333),
              onPressed: () async {
                globals.serviceName = globals.cryptoValues[0] as String;
                globals.cryptoPara = {
                  "\"crypto\"": "\"" + _currency.text + "\"",
                  "\"value_min\"": "\"" + _limitMin.text + "\"",
                  "\"value_max\"": "\"" + _limitMax.text + "\"",
                };
                print("-------------");
                print(globals.cryptoPara);
                print("-------------");
                globals.serviceColor = globals.cryptoColor;
                globals.servicePara = _currency.text +
                    '|' +
                    _limitMax.text +
                    '|' +
                    _limitMin.text;
                ;
                Timer(Duration(seconds: 1), () async {
                  _btnController.success();
                  await Future.delayed(const Duration(seconds: 1), () {
                    // Navigator.pop(context);
                    // Navigator.pop(context);
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
