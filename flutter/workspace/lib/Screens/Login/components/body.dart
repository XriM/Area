import 'dart:async';

import 'package:area_app/Screens/Api/loginCall.dart';
import 'package:area_app/Screens/App/app.dart';
import 'package:flutter/material.dart';
import 'package:area_app/Screens/Login/components/background.dart';
import 'package:area_app/Screens/Signup/signup_screen.dart';
import 'package:area_app/components/already_have_an_account_acheck.dart';
import 'package:area_app/components/rounded_button.dart';
import 'package:area_app/components/rounded_input_field.dart';
import 'package:area_app/components/rounded_password_field.dart';
import 'package:flutter_svg/svg.dart';
import 'package:rounded_loading_button/rounded_loading_button.dart';
import 'package:area_app/globals.dart' as globals;

class Body extends StatelessWidget {
  Body({
    Key? key,
  }) : super(key: key);

  TextEditingController mailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  TextEditingController userNameController = TextEditingController();
  final RoundedLoadingButtonController _btnController =
      RoundedLoadingButtonController();

  @override
  Widget build(BuildContext context) {
    void loginExit() async {
      // print(mailController.text);
      // print(passwordController.text);
      // print(userNameController.text);

      // Map<String, dynamic> myJson;
      // myJson = getLogin(mailController.text, passwordController.text)
      //     as Map<String, dynamic>;
      print(globals.userMail);
      print(globals.userName);
      final Map<String, dynamic> myJson =
          await getLogin(mailController.text, passwordController.text);

      if (mailController.text == "" ||
          passwordController.text == "" ||
          userNameController.text == "") {
        Timer(Duration(seconds: 1), () async {
          _btnController.error();
        });
        Timer(Duration(seconds: 3), () async {
          _btnController.reset();
        });
      } else {
        if (myJson['message'].toString() == "Successfully logged in!") {
          globals.userName = myJson['user'].toString();
          globals.token = myJson['token'].toString();
          // globals.userName = userNameController.text;
          globals.userMail = passwordController.text;
          Timer(Duration(seconds: 3), () async {
            _btnController.success();
            await Future.delayed(const Duration(seconds: 2), () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) {
                    return Application();
                  },
                ),
              );
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
    }

    Size size = MediaQuery.of(context).size;
    return Background(
      child: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              "LOGIN",
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            SizedBox(height: size.height * 0.03),
            Text(
              "AREA",
              style: TextStyle(
                  color: Color(0xff333333),
                  fontWeight: FontWeight.w500,
                  fontSize: 120),
            ),
            SizedBox(height: size.height * 0.03),
            RoundedUserNameInputField(
              hintText: "Your Username",
              onChanged: (value) {
                userNameController.text = value;
              },
            ),
            RoundedInputField(
              hintText: "Your Email",
              onChanged: (value) {
                mailController.text = value;
              },
            ),
            RoundedPasswordField(
              onChanged: (value) {
                passwordController.text = value;
              },
            ),
            SizedBox(
              height: 30,
            ),
            Container(
                height: 50,
                width: 700,
                padding: const EdgeInsets.fromLTRB(10, 0, 10, 0),
                child: RoundedLoadingButton(
                  color: Color(0xFF333333),
                  child: Text('LOGIN', style: TextStyle(color: Colors.white)),
                  controller: _btnController,
                  onPressed: loginExit,
                )),
            SizedBox(height: size.height * 0.03),
            AlreadyHaveAnAccountCheck(
              press: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      return SignUpScreen();
                    },
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
