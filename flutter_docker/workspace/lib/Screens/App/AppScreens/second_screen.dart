// ignore_for_file: avoid_print, prefer_const_literals_to_create_immutables, prefer_const_constructors

import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:rounded_loading_button/rounded_loading_button.dart';
import 'package:area_app/globals.dart' as globals;

import 'reactions.dart';
import 'services.dart';

class SecondScreen extends StatefulWidget {
  const SecondScreen({Key? key}) : super(key: key);

  @override
  State<SecondScreen> createState() => _SecondScreenState();
}

class _SecondScreenState extends State<SecondScreen> {
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
    return Center(
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
              primary: Color(0xff333333),
            ),
            child: Container(
                height: 60.0,
                width: 300.0,
                color: Colors.transparent,
                child: Container(
                  decoration: const BoxDecoration(
                      color: Colors.transparent,
                      borderRadius: BorderRadius.all(Radius.circular(10.0))),
                  child: Container(
                    margin: const EdgeInsets.only(left: 30.0, right: 30.0),
                    child: SizedBox(
                        width: 280,
                        child: Center(
                          child: Text(
                            _if ?? 'IF THIS',
                            style: TextStyle(fontSize: 28, color: Colors.white),
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
                        borderRadius: BorderRadius.all(Radius.circular(10.0))),
                    child: Container(
                      margin: const EdgeInsets.only(left: 30.0, right: 30.0),
                      child: SizedBox(
                        width: 280,
                        child: Center(
                            child: Text(
                          _then ?? "THEN THAT",
                          style: TextStyle(fontSize: 28, color: Colors.white),
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
    ));
  }
}
