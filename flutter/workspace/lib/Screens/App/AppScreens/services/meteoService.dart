// ignore_for_file: avoid_print, prefer_const_literals_to_create_immutables, prefer_const_constructors, unused_import

import 'dart:async';

import 'package:area_app/Screens/App/AppScreens/ifFilled.dart';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'package:rounded_loading_button/rounded_loading_button.dart';
import 'dart:io';
import 'package:area_app/globals.dart' as globals;

class MeteoServiceForm extends StatelessWidget {
  MeteoServiceForm({Key? key}) : super(key: key);

  TextEditingController city = TextEditingController();
  TextEditingController degreesMin = TextEditingController();
  TextEditingController degreesMax = TextEditingController();

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
            "AREA | Meteo",
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
                  'Meteo',
                  style: TextStyle(
                      color: Color(0xff333333),
                      fontWeight: FontWeight.w500,
                      fontSize: 30),
                )),
            Container(
                alignment: Alignment.center,
                padding: const EdgeInsets.all(10),
                child: const Text(
                  'City and degrees Celcius',
                  style: TextStyle(fontSize: 20),
                )),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextField(
                controller: city,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'City',
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextField(
                controller: degreesMin,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Degrees Celcius',
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextField(
                controller: degreesMax,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Degrees Celcius',
                ),
              ),
            ),
            RoundedLoadingButton(
              child: Text('ADD', style: TextStyle(color: Colors.white)),
              controller: _btnController,
              color: Color(0xff333333),
              onPressed: () async {
                globals.serviceName = globals.weatherValues[0] as String;
                globals.weatherPara = {
                  "city": city.text,
                  "temp_min": degreesMin.text,
                  "temp_max": degreesMax.text,
                };
                print("-------------");
                print(globals.weatherPara);
                print("-------------");
                globals.serviceColor = Colors.lightBlue;
                globals.servicePara =
                    city.text + '|' + degreesMin.text + '|' + degreesMax.text;
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
