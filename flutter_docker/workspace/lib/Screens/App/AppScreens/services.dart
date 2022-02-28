// ignore_for_file: avoid_print, prefer_const_literals_to_create_immutables, prefer_const_constructors

import 'package:area_app/Screens/App/AppScreens/services/outlookService.dart';
import 'package:area_app/Screens/App/AppScreens/services/steamService.dart';
import 'package:area_app/Screens/App/AppScreens/services/cryptoService.dart';
import 'package:area_app/Screens/App/AppScreens/services/githubService.dart';
import 'package:area_app/Screens/App/AppScreens/services/meteoService.dart';

import 'package:flutter/material.dart';

class Services extends StatefulWidget {
  const Services({Key? key}) : super(key: key);

  @override
  State<Services> createState() => _ServicesState();
}

class _ServicesState extends State<Services> {
  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width / 3;
    double height = MediaQuery.of(context).size.height / 5;
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
        body: Column(mainAxisAlignment: MainAxisAlignment.start, children: [
          SizedBox(
            height: 20,
          ),
          Row(mainAxisAlignment: MainAxisAlignment.spaceEvenly, children: [
            ElevatedButton(
                style: ElevatedButton.styleFrom(
                  primary: Colors.lightBlue,
                ),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => SteamServiceForm()),
                  );
                },
                child: Container(
                    height: height,
                    width: width,
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
                                child: Column(
                              children: [
                                SizedBox(height: 20),
                                Icon(
                                  Icons.gamepad_outlined,
                                  color: Colors.white,
                                  size: 60,
                                ),
                                SizedBox(height: 20),
                                Text(
                                  "STEAM",
                                  style: TextStyle(
                                      fontSize: 11, color: Colors.white),
                                )
                              ],
                            )),
                          ),
                        )))),
            ElevatedButton(
                style: ElevatedButton.styleFrom(
                  primary: Colors.lightGreen,
                ),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => GithubServiceForm()),
                  );
                },
                child: Container(
                    height: height,
                    width: width,
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
                                child: Column(
                              children: [
                                SizedBox(height: 20),
                                Icon(
                                  Icons.email_outlined,
                                  color: Colors.white,
                                  size: 60,
                                ),
                                SizedBox(height: 20),
                                Text(
                                  "GITHUB",
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
            ElevatedButton(
                style: ElevatedButton.styleFrom(
                  primary: Colors.purple,
                ),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => MeteoServiceForm()),
                  );
                },
                child: Container(
                    height: height,
                    width: width,
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
                                child: Column(
                              children: [
                                SizedBox(height: 20),
                                Icon(
                                  Icons.wb_sunny_rounded,
                                  color: Colors.white,
                                  size: 60,
                                ),
                                SizedBox(height: 20),
                                Text(
                                  "METEO",
                                  style: TextStyle(
                                      fontSize: 11, color: Colors.white),
                                )
                              ],
                            )),
                          ),
                        )))),
            ElevatedButton(
                style: ElevatedButton.styleFrom(
                  primary: Colors.brown,
                ),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => CryptoServiceForm()),
                  );
                },
                child: Container(
                    height: height,
                    width: width,
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
                                child: Column(
                              children: [
                                SizedBox(height: 20),
                                Icon(
                                  Icons.euro_rounded,
                                  color: Colors.white,
                                  size: 60,
                                ),
                                SizedBox(height: 20),
                                Text(
                                  "CRYPTO",
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
            ElevatedButton(
                style: ElevatedButton.styleFrom(
                  primary: Colors.lightBlue,
                ),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => OutlookServiceForm()),
                  );
                },
                child: Container(
                    height: height,
                    width: width,
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
                                  "OUTLOOK",
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
                    height: height,
                    width: width + 30,
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
        ]));
  }
}
