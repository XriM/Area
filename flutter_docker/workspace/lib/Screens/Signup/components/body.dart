import 'dart:async';

import 'package:area_app/Screens/App/app.dart';
import 'package:flutter/material.dart';
import 'package:area_app/Screens/Login/login_screen.dart';
import 'package:area_app/Screens/Signup/components/background.dart';
import 'package:area_app/Screens/Signup/components/or_divider.dart';
import 'package:area_app/Screens/Signup/components/social_icon.dart';
import 'package:area_app/components/already_have_an_account_acheck.dart';
import 'package:area_app/components/rounded_button.dart';
import 'package:area_app/components/rounded_input_field.dart';
import 'package:area_app/components/rounded_password_field.dart';
import 'package:flutter_svg/svg.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:flutter_signin_button/flutter_signin_button.dart';

import 'package:area_app/globals.dart' as globals;
import 'package:rounded_loading_button/rounded_loading_button.dart';

final GoogleSignIn _googleSignIn = GoogleSignIn(scopes: ['email']);

class Body extends StatelessWidget {
  GoogleSignInAccount? _currentUser;
  final RoundedLoadingButtonController _btnController =
      RoundedLoadingButtonController();
  TextEditingController mailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    void signUpExit() async {
      print(mailController.text);
      print(passwordController.text);
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
    }

    Future<void> signIn() async {
      try {
        await _googleSignIn.signIn();
        globals.user = _currentUser;
        print("--------------------------------------------------");
        print(globals.user?.displayName);
        print(globals.user?.email);
        print("--------------------------------------------------");
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
      } catch (e) {
        print('Error signing in $e');
      }
    }

    Size size = MediaQuery.of(context).size;
    return Background(
      child: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              "SIGNUP",
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
            RoundedInputField(
              hintText: "Your Email",
              onChanged: (value) {},
            ),
            RoundedPasswordField(
              onChanged: (value) {},
            ),
            Container(
                height: 50,
                width: 700,
                padding: const EdgeInsets.fromLTRB(10, 0, 10, 0),
                child: RoundedLoadingButton(
                  color: Color(0xFF333333),
                  child: Text('LOGIN', style: TextStyle(color: Colors.white)),
                  controller: _btnController,
                  onPressed: signUpExit,
                )),
            SizedBox(height: size.height * 0.03),
            AlreadyHaveAnAccountCheck(
              login: false,
              press: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      return LoginScreen();
                    },
                  ),
                );
              },
            ),
            OrDivider(),
            SignInButton(
              Buttons.Google,
              onPressed: signIn,
            ),
          ],
        ),
      ),
    );
  }
}
