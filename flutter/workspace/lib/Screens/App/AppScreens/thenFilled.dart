// ignore_for_file: avoid_print, prefer_const_literals_to_create_immutables, prefer_const_constructors, unused_field

import 'dart:async';
import 'dart:convert';

import 'package:area_app/Screens/Api/postWidgets.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
import 'package:rounded_loading_button/rounded_loading_button.dart';
import 'package:area_app/globals.dart' as globals;

import 'reactions.dart';
import 'services.dart';

class ThenFilled extends StatefulWidget {
  final Color ifPassedColor;
  final String ifPassedColorName;
  final Color thenPassedColor;
  final String thenPassedColorName;
  const ThenFilled(
      {Key? key,
      required this.ifPassedColor,
      required this.ifPassedColorName,
      required this.thenPassedColor,
      required this.thenPassedColorName})
      : super(key: key);
  @override
  _ThenFilledState createState() => _ThenFilledState(
        ifPassedColor: this.ifPassedColor,
        ifPassedColorName: this.ifPassedColorName,
        thenPassedColor: this.thenPassedColor,
        thenPassedColorName: this.thenPassedColorName,
      );
}

class _ThenFilledState extends State<ThenFilled> {
  Color ifPassedColor;
  String ifPassedColorName;
  Color thenPassedColor;
  String thenPassedColorName;
  _ThenFilledState(
      {required this.ifPassedColor,
      required this.ifPassedColorName,
      required this.thenPassedColor,
      required this.thenPassedColorName});
  // String? IfFilled;
  String? _if;
  String? _then;

  final RoundedLoadingButtonController _btnController =
      RoundedLoadingButtonController();

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    void postWidgets() async {
      final Map<String, dynamic> myJson = await createArea();

      if (myJson['message'].toString() == "Area successfully created") {
        Timer(Duration(seconds: 3), () async {
          _btnController.success();
          await Future.delayed(const Duration(seconds: 2), () {
            Navigator.pop(context);
            Navigator.pop(context);
            Navigator.pop(context);
            Navigator.pop(context);
            Navigator.pop(context);
            Navigator.pop(context);
          });
        });
      } else {
        Timer(Duration(seconds: 1), () async {
          _btnController.error();
        });
        Timer(Duration(seconds: 3), () async {
          _btnController.reset();
        });
      }
    }

    Future<int> postServiceA() async {
      final Map<String, dynamic> myJson = await createServiceA();

      if (myJson['message'].toString() == "Service token successfully loaded") {
        return 1;
      } else {
        return 42;
      }
    }

    Future<int> postServiceR() async {
      final Map<String, dynamic> myJson = await createServiceR();
      if (myJson['message'].toString() == "Service token successfully loaded") {
        return 1;
      } else {
        return 42;
      }
    }

    Icon getIconAction() {
      if (globals.serviceName == 'Steam') {
        return Icon(
          MdiIcons.steam,
          color: Colors.white,
          size: 40,
        );
      }
      if (globals.serviceName == 'Github') {
        return Icon(
          MdiIcons.github,
          color: Colors.white,
          size: 40,
        );
      }
      if (globals.serviceName == 'Weather') {
        return Icon(
          MdiIcons.weatherRainy,
          color: Colors.white,
          size: 40,
        );
      }
      if (globals.serviceName == 'Crypto') {
        return Icon(
          MdiIcons.bitcoin,
          color: Colors.white,
          size: 40,
        );
      }
      if (globals.serviceName == 'Outlook') {
        return Icon(
          MdiIcons.microsoftOutlook,
          color: Colors.white,
          size: 40,
        );
      }
      if (globals.serviceName == 'Youtube') {
        return Icon(
          MdiIcons.youtube,
          color: Colors.white,
          size: 40,
        );
      }
      if (globals.serviceName == 'Reddit') {
        return Icon(
          MdiIcons.reddit,
          color: Colors.white,
          size: 40,
        );
      }
      if (globals.serviceName == 'One Drive') {
        return Icon(
          MdiIcons.microsoftOnedrive,
          color: Colors.white,
          size: 40,
        );
      } else {
        return Icon(
          MdiIcons.batteryUnknown,
          color: Colors.white,
          size: 40,
        );
      }
    }

    Icon getIconReaction() {
      if (thenPassedColorName == 'Trello') {
        return Icon(
          MdiIcons.trello,
          color: Colors.white,
          size: 40,
        );
      }
      if (thenPassedColorName == 'Discord') {
        return Icon(
          MdiIcons.discord,
          color: Colors.white,
          size: 40,
        );
      }
      if (thenPassedColorName == 'Outlook') {
        return Icon(
          MdiIcons.microsoftOutlook,
          color: Colors.white,
          size: 40,
        );
      }
      if (thenPassedColorName == 'Github') {
        return Icon(
          MdiIcons.github,
          color: Colors.white,
          size: 40,
        );
      } else {
        return Icon(
          MdiIcons.batteryUnknown,
          color: Colors.white,
          size: 40,
        );
      }
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
            "AREA | Create",
            style: const TextStyle(color: Color(0xff333333)),
          ),
        ),
        body: Center(
            child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          // crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const Services()),
                  );
                },
                style: ElevatedButton.styleFrom(
                    // primary: Color(0xff333333),
                    primary: ifPassedColor),
                child: Container(
                    height: 60.0,
                    width: 300.0,
                    color: Colors.transparent,
                    child: Container(
                      decoration: const BoxDecoration(
                          color: Colors.transparent,
                          borderRadius:
                              BorderRadius.all(Radius.circular(10.0))),
                      child: Container(
                        margin: const EdgeInsets.only(left: 30.0, right: 30.0),
                        child: SizedBox(
                            width: 280,
                            child: Center(
                              child: ListTile(
                                leading: getIconAction(),
                                title: Text(
                                  globals.serviceName,
                                  style: TextStyle(
                                      fontSize: 28,
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold),
                                  textAlign: TextAlign.justify,
                                ),
                              ),
                            )),
                      ),
                    ))),
            SizedBox(height: 30),
            Icon(
              Icons.arrow_downward,
              size: 50,
            ),
            SizedBox(height: 30),
            ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const Reactions()),
                  );
                },
                style: ElevatedButton.styleFrom(
                  primary: thenPassedColor,
                ),
                child: Container(
                    height: 60.0,
                    width: 300.0,
                    color: Colors.transparent,
                    child: Container(
                        decoration: const BoxDecoration(
                            color: Colors.transparent,
                            borderRadius:
                                BorderRadius.all(Radius.circular(10.0))),
                        child: Container(
                          margin:
                              const EdgeInsets.only(left: 30.0, right: 30.0),
                          child: SizedBox(
                            width: 280,
                            child: Center(
                              child: ListTile(
                                  leading: getIconReaction(),
                                  title: Text(
                                    thenPassedColorName,
                                    style: TextStyle(
                                        fontSize: 28,
                                        color: Colors.white,
                                        fontWeight: FontWeight.bold),
                                    textAlign: TextAlign.justify,
                                  )),
                            ),
                          ),
                        )))),
            SizedBox(height: 60),
            RoundedLoadingButton(
              child: Text(
                "ADD",
                style: TextStyle(fontSize: 28, color: Colors.white),
                textAlign: TextAlign.justify,
              ),
              controller: _btnController,
              color: Color(0xff333333),
              height: 60,
              onPressed: () async {
                final int monTestA = await postServiceA();
                final int monTestR = await postServiceR();

                print(globals.token);

                postWidgets();
                // Timer(Duration(seconds: 1), () async {
                //   _btnController.error();
                // });
                // Timer(Duration(seconds: 3), () async {
                //   _btnController.reset();
                // });
              },
            ),
            const SizedBox(height: 30),
          ],
        )));
  }
}
