// ignore_for_file: avoid_print, prefer_const_literals_to_create_immutables, prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'reactions.dart';
import 'services.dart';

class SecondScreen extends StatefulWidget {
  const SecondScreen({Key? key}) : super(key: key);

  @override
  State<SecondScreen> createState() => _SecondScreenState();
}

class _SecondScreenState extends State<SecondScreen> {
  String? data;

  void _loadData() async {
    final _loadedData = await rootBundle.loadString('lib/routes/abo.txt');
    setState(() {
      data = _loadedData;
    });
  }

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      // crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        InkWell(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const Services()),
              );
            },
            child: Container(
                height: 60.0,
                width: 300.0,
                color: Colors.transparent,
                child: Container(
                  decoration: const BoxDecoration(
                      color: Color(0xff333333),
                      borderRadius: BorderRadius.all(Radius.circular(10.0))),
                  child: Container(
                    margin: const EdgeInsets.only(left: 30.0, right: 30.0),
                    child: SizedBox(
                        width: 280,
                        child: Center(
                          child: Text(
                            data ?? 'IF THIS',
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
        InkWell(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const Reactions()),
              );
            },
            child: Container(
                height: 60.0,
                width: 300.0,
                color: Colors.transparent,
                child: Container(
                    decoration: const BoxDecoration(
                        color: Color(0xff8F8F8F),
                        borderRadius: BorderRadius.all(Radius.circular(10.0))),
                    child: Container(
                      margin: const EdgeInsets.only(left: 30.0, right: 30.0),
                      child: const SizedBox(
                        width: 280,
                        child: Center(
                            child: Text(
                          "THEN THAT",
                          style: TextStyle(fontSize: 28, color: Colors.white),
                          textAlign: TextAlign.justify,
                        )),
                      ),
                    )))),
        SizedBox(height: 60),
        InkWell(
            onTap: () {
              print("ADD");
            },
            child: Container(
                height: 60.0,
                width: 200.0,
                color: Colors.transparent,
                child: Container(
                    decoration: const BoxDecoration(
                        color: Color(0xff333333),
                        borderRadius: BorderRadius.all(Radius.circular(50.0))),
                    child: Container(
                      margin: const EdgeInsets.only(left: 30.0, right: 30.0),
                      child: const SizedBox(
                        width: 280,
                        child: Center(
                            child: Text(
                          "ADD",
                          style: TextStyle(fontSize: 28, color: Colors.white),
                          textAlign: TextAlign.justify,
                        )),
                      ),
                    )))),
        const SizedBox(height: 30),
      ],
    ));
  }
}
