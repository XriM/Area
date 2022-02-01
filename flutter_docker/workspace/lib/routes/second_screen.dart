// ignore_for_file: avoid_print, prefer_const_literals_to_create_immutables, prefer_const_constructors

import 'package:flutter/material.dart';

class SecondScreen extends StatelessWidget {
  const SecondScreen({Key? key}) : super(key: key);

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
                      child: const SizedBox(
                        width: 280,
                        child: Center(
                            child: Text(
                          "IF THIS",
                          style: TextStyle(fontSize: 28, color: Colors.white),
                          textAlign: TextAlign.justify,
                        )),
                      ),
                    )))),
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

class Services extends StatelessWidget {
  const Services({Key? key}) : super(key: key);

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
            "AREA | Services",
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
                                  Icons.calendar_today,
                                  color: Colors.white,
                                  size: 60,
                                ),
                                SizedBox(height: 20),
                                Text(
                                  "Google Calendar",
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
                                  Icons.file_present,
                                  color: Colors.white,
                                  size: 60,
                                ),
                                SizedBox(height: 20),
                                Text(
                                  "Google Sheets",
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
                            color: Colors.blueGrey,
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
                                  Icons.contact_page,
                                  color: Colors.white,
                                  size: 60,
                                ),
                                SizedBox(height: 20),
                                Text(
                                  "Google Contacts",
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
                            color: Colors.deepPurple,
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
                            color: Colors.teal,
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
                                  Icons.contact_page,
                                  color: Colors.white,
                                  size: 60,
                                ),
                                SizedBox(height: 20),
                                Text(
                                  "Google Contacts",
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
