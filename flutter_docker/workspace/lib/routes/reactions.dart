// ignore_for_file: avoid_print, prefer_const_literals_to_create_immutables, prefer_const_constructors

import 'package:flutter/material.dart';

class Reactions extends StatelessWidget {
  const Reactions({Key? key}) : super(key: key);

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
            "AREA | Reactions",
            style: const TextStyle(color: Color(0xff333333)),
          ),
        ),
        body: Center(
            child: Column(children: [
          SizedBox(height: 30),
          Row(mainAxisAlignment: MainAxisAlignment.spaceEvenly, children: [
            InkWell(
                onTap: () {
                  Navigator.pop(context);
                },
                child: Container(
                    height: 150.0,
                    width: 150.0,
                    color: Colors.transparent,
                    child: Container(
                        decoration: const BoxDecoration(
                            color: Colors.lightBlue,
                            borderRadius:
                                BorderRadius.all(Radius.circular(10.0))),
                        child: Container(
                          margin:
                              const EdgeInsets.only(left: 30.0, right: 30.0),
                          child: SizedBox(
                            width: 280,
                            child: Center(
                                child: Column(
                              children: [
                                SizedBox(height: 20),
                                Icon(
                                  Icons.mail,
                                  color: Colors.white,
                                  size: 60,
                                ),
                                SizedBox(height: 20),
                                Text(
                                  "Gmail",
                                  style: TextStyle(
                                      fontSize: 11, color: Colors.white),
                                )
                              ],
                            )),
                          ),
                        )))),
            InkWell(
                onTap: () {
                  Navigator.pop(context);
                },
                child: Container(
                    height: 150.0,
                    width: 150.0,
                    color: Colors.transparent,
                    child: Container(
                        decoration: const BoxDecoration(
                            color: Colors.green,
                            borderRadius:
                                BorderRadius.all(Radius.circular(10.0))),
                        child: Container(
                          margin:
                              const EdgeInsets.only(left: 30.0, right: 30.0),
                          child: SizedBox(
                            width: 280,
                            child: Center(
                                child: Column(
                              children: [
                                SizedBox(height: 20),
                                Icon(
                                  Icons.notification_add,
                                  color: Colors.white,
                                  size: 60,
                                ),
                                SizedBox(height: 20),
                                Text(
                                  "Discord ping",
                                  style: TextStyle(
                                      fontSize: 11, color: Colors.white),
                                )
                              ],
                            )),
                          ),
                        )))),
          ]),
          SizedBox(height: 50),
          Row(mainAxisAlignment: MainAxisAlignment.spaceEvenly, children: [
            InkWell(
                onTap: () {
                  Navigator.pop(context);
                },
                child: Container(
                    height: 150.0,
                    width: 150.0,
                    color: Colors.transparent,
                    child: Container(
                        decoration: const BoxDecoration(
                            color: Colors.lightGreen,
                            borderRadius:
                                BorderRadius.all(Radius.circular(10.0))),
                        child: Container(
                          margin:
                              const EdgeInsets.only(left: 30.0, right: 30.0),
                          child: SizedBox(
                            width: 280,
                            child: Center(
                                child: Column(
                              children: [
                                SizedBox(height: 20),
                                Icon(
                                  Icons.message,
                                  color: Colors.white,
                                  size: 60,
                                ),
                                SizedBox(height: 20),
                                Text(
                                  "Message",
                                  style: TextStyle(
                                      fontSize: 11, color: Colors.white),
                                )
                              ],
                            )),
                          ),
                        )))),
            InkWell(
                onTap: () {
                  Navigator.pop(context);
                },
                child: Container(
                    height: 150.0,
                    width: 150.0,
                    color: Colors.transparent,
                    child: Container(
                        decoration: const BoxDecoration(
                            color: Colors.orange,
                            borderRadius:
                                BorderRadius.all(Radius.circular(10.0))),
                        child: Container(
                          margin:
                              const EdgeInsets.only(left: 30.0, right: 30.0),
                          child: SizedBox(
                            width: 280,
                            child: Center(
                                child: Column(
                              children: [
                                SizedBox(height: 20),
                                Icon(
                                  Icons.question_answer,
                                  color: Colors.white,
                                  size: 60,
                                ),
                                SizedBox(height: 20),
                                Text(
                                  "Google ...",
                                  style: TextStyle(
                                      fontSize: 11, color: Colors.white),
                                )
                              ],
                            )),
                          ),
                        )))),
          ]),
          SizedBox(height: 50),
          Row(mainAxisAlignment: MainAxisAlignment.spaceEvenly, children: [
            InkWell(
                onTap: () {
                  Navigator.pop(context);
                },
                child: Container(
                    height: 150.0,
                    width: 150.0,
                    color: Colors.transparent,
                    child: Container(
                        decoration: const BoxDecoration(
                            color: Colors.brown,
                            borderRadius:
                                BorderRadius.all(Radius.circular(10.0))),
                        child: Container(
                          margin:
                              const EdgeInsets.only(left: 30.0, right: 30.0),
                          child: SizedBox(
                            width: 280,
                            child: Center(
                                child: Column(
                              children: [
                                SizedBox(height: 20),
                                Icon(
                                  Icons.radar,
                                  color: Colors.white,
                                  size: 60,
                                ),
                                SizedBox(height: 20),
                                Text(
                                  "Aucune idée",
                                  style: TextStyle(
                                      fontSize: 11, color: Colors.white),
                                )
                              ],
                            )),
                          ),
                        )))),
            Opacity(
                opacity: 0.0,
                child: Container(
                    height: 150.0,
                    width: 150.0,
                    color: Colors.transparent,
                    child: Container(
                        decoration: const BoxDecoration(
                            color: Colors.green,
                            borderRadius:
                                BorderRadius.all(Radius.circular(10.0))),
                        child: Container(
                          margin:
                              const EdgeInsets.only(left: 30.0, right: 30.0),
                          child: SizedBox(
                            width: 280,
                            child: Center(
                                child: Column(
                              children: [
                                SizedBox(height: 20),
                                Icon(
                                  Icons.question_answer,
                                  color: Colors.white,
                                  size: 60,
                                ),
                                SizedBox(height: 20),
                                Text(
                                  "Google ...",
                                  style: TextStyle(
                                      fontSize: 11, color: Colors.white),
                                )
                              ],
                            )),
                          ),
                        )))),
          ]),
        ])));
  }
}
