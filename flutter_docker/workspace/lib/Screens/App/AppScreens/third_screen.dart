import 'dart:async';

import 'package:area_app/Screens/Api/googleSignInApi.dart';
import 'package:area_app/Screens/Signup/signup_screen.dart';
import 'package:flutter/material.dart';
import 'package:area_app/globals.dart' as globals;
import 'package:rounded_loading_button/rounded_loading_button.dart';

class ThirdScreen extends StatelessWidget {
  ThirdScreen({Key? key}) : super(key: key);
  final RoundedLoadingButtonController _btnController =
      RoundedLoadingButtonController();
  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width / 1.2;
    double height = MediaQuery.of(context).size.height / 12;
    void signOut() async {
      await GoogleSignInApi.logout();
      Timer(Duration(seconds: 3), () async {
        _btnController.success();
        await Future.delayed(const Duration(seconds: 2), () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => SignUpScreen()),
          );
        });
      });
    }

    return Column(
      children: [
        const SizedBox(
          height: 20,
        ),
        Wrap(
          children: [
            SizedBox(
              width: 50,
            ),
            Wrap(
              direction: Axis.vertical,
              spacing: 0,
              runSpacing: 0,
              children: [
                SizedBox(
                  height: 20,
                ),
                const Text(
                  "     Name",
                  style: TextStyle(fontSize: 20),
                ),
                Container(
                  margin: const EdgeInsets.only(left: 20.0, right: 20.0),
                  height: height,
                  width: width,
                  color: Colors.transparent,
                  child: Container(
                      decoration: BoxDecoration(
                          color: Color(0xff333333),
                          borderRadius:
                              BorderRadius.all(Radius.circular(10.0))),
                      child: Center(
                        child: Text(
                          globals.userName,
                          style: TextStyle(fontSize: 22, color: Colors.white),
                          textAlign: TextAlign.center,
                        ),
                      )),
                ),
              ],
            ),
          ],
        ),
        Wrap(
          direction: Axis.horizontal,
          children: [
            Wrap(
              direction: Axis.vertical,
              spacing: 0,
              runSpacing: 0,
              children: [
                SizedBox(
                  height: 20,
                ),
                const Text(
                  "     Email",
                  style: TextStyle(fontSize: 20),
                ),
                Container(
                  margin: const EdgeInsets.only(left: 20.0, right: 20.0),
                  height: height,
                  width: width,
                  color: Colors.transparent,
                  child: Container(
                      decoration: BoxDecoration(
                          color: Color(0xff333333),
                          borderRadius:
                              BorderRadius.all(Radius.circular(10.0))),
                      child: Center(
                        child: Text(
                          globals.userMail,
                          style: TextStyle(fontSize: 22, color: Colors.white),
                          textAlign: TextAlign.center,
                        ),
                      )),
                ),
              ],
            ),
          ],
        ),
        SizedBox(
          height: 50,
        ),
        Container(
            height: 50,
            width: 700,
            padding: const EdgeInsets.fromLTRB(10, 0, 10, 0),
            child: RoundedLoadingButton(
              color: Color(0xFF333333),
              child: Text('SIGN OUT', style: TextStyle(color: Colors.white)),
              controller: _btnController,
              onPressed: signOut,
            )),
      ],
    );
  }
}
