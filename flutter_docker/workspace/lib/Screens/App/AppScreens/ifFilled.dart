// ignore_for_file: avoid_print, prefer_const_literals_to_create_immutables, prefer_const_constructors, unused_field

import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:rounded_loading_button/rounded_loading_button.dart';

import 'reactions.dart';
import 'services.dart';

class IfFilled extends StatefulWidget {
  final Color passedColor;
  final String passedColorName;
  const IfFilled(
      {Key? key, required this.passedColor, required this.passedColorName})
      : super(key: key);
  @override
  _IfFilledState createState() => _IfFilledState(
      passedColor: this.passedColor, passedColorName: this.passedColorName);
}

class _IfFilledState extends State<IfFilled> {
  Color passedColor;
  String passedColorName;
  _IfFilledState({required this.passedColor, required this.passedColorName});
  // String? IfFilled;
  String? _if;
  String? _then;

  final RoundedLoadingButtonController _btnController =
      RoundedLoadingButtonController();

  void loadData() async {
    final LoadedIf = await rootBundle.loadString('lib/txt/if.txt');
    final LoadedThen = await rootBundle.loadString('lib/txt/then.txt');
    setState(() {
      _if = LoadedIf;
      _then = LoadedThen;
    });
  }

  @override
  void initState() {
    super.initState();
    loadData();
  }

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
            "AREA | Steam",
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
                    primary: passedColor),
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
                              child: Text(
                                passedColorName,
                                style: TextStyle(
                                    fontSize: 28, color: Colors.white),
                                textAlign: TextAlign.justify,
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
                  primary: Color(0xff8F8F8F),
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
                                child: Text(
                              _then ?? "THEN THAT",
                              style:
                                  TextStyle(fontSize: 28, color: Colors.white),
                              textAlign: TextAlign.justify,
                            )),
                          ),
                        )))),
            SizedBox(height: 60),
            // RoundedLoadingButton(
            //   child: Text(
            //     "ADD",
            //     style: TextStyle(fontSize: 28, color: Colors.white),
            //     textAlign: TextAlign.justify,
            //   ),
            //   controller: _btnController,
            //   color: Color(0xff333333),
            //   height: 60,
            //   onPressed: () async {
            //     Timer(Duration(seconds: 1), () async {
            //       _btnController.success();
            //       print("ADD");
            //       await Future.delayed(const Duration(seconds: 1), () {});
            //     });
            //   },
            // ),
            const SizedBox(height: 30),
          ],
        )));
  }
}
