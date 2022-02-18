import 'dart:async';
import 'dart:io';

import 'package:area_app/main.dart';
import 'package:flutter/material.dart';
import 'package:rounded_loading_button/rounded_loading_button.dart';
import 'loader.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:flutter_signin_button/flutter_signin_button.dart';
import 'globals.dart' as globals;

final GoogleSignIn _googleSignIn = GoogleSignIn(scopes: ['email']);

void signOut(BuildContext context) {
  print(globals.user?.displayName);
  print(globals.user?.email);
  _googleSignIn.disconnect();
  RestartWidget.restartApp(context);
}

class OverlayView extends StatefulWidget {
  OverlayView({
    Key? key,
  }) : super(key: key);

  @override
  State<OverlayView> createState() => _OverlayViewState();
}

class _OverlayViewState extends State<OverlayView> {
  TextEditingController nameController = TextEditingController();

  TextEditingController passwordController = TextEditingController();

  final RoundedLoadingButtonController _btnController =
      RoundedLoadingButtonController();

  GoogleSignInAccount? _currentUser;

  void _loginExit() async {
    Timer(Duration(seconds: 3), () async {
      _btnController.success();
      print(nameController.text);
      print(passwordController.text);
      await Future.delayed(const Duration(seconds: 2), () {
        Loader.appLoader.hideLoader();
      });
    });
  }

  @override
  void initState() {
    _googleSignIn.onCurrentUserChanged.listen((account) {
      setState(() {
        _currentUser = account;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<bool>(
      valueListenable: Loader.appLoader.loaderShowingNotifier,
      builder: (context, value, child) {
        if (value) {
          return LoginPage();
        } else {
          return Container();
        }
      },
    );
  }

  Scaffold LoginPage() {
    return Scaffold(
      body: _buildWidget(),
    );
  }

  Widget _buildWidget() {
    GoogleSignInAccount? user = _currentUser;
    globals.user = user;

    void signOut() {
      print(globals.user?.displayName);
      print(globals.user?.email);
      _googleSignIn.disconnect();
    }

    Future<void> signIn() async {
      try {
        await _googleSignIn.signIn();
        globals.user = _currentUser;
        print("--------------------------------------------------");
        print(globals.user?.displayName);
        print(globals.user?.email);
        print("--------------------------------------------------");
        Loader.appLoader.hideLoader();
      } catch (e) {
        print('Error signing in $e');
      }
    }

    // if (globals.user?.email != null) {
    return Padding(
        padding: const EdgeInsets.all(10),
        child: ListView(
          children: <Widget>[
            Container(
                alignment: Alignment.center,
                padding: const EdgeInsets.all(10),
                child: const Text(
                  'AREA',
                  style: TextStyle(
                      color: Color(0xff333333),
                      fontWeight: FontWeight.w500,
                      fontSize: 30),
                )),
            Container(
                alignment: Alignment.center,
                padding: const EdgeInsets.all(10),
                child: const Text(
                  'Sign in',
                  style: TextStyle(fontSize: 20),
                )),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextField(
                controller: nameController,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'User Name',
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.fromLTRB(10, 10, 10, 0),
              child: TextField(
                obscureText: true,
                controller: passwordController,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Password',
                ),
              ),
            ),
            TextButton(
              onPressed: () {
                //forgot password screen
              },
              child: const Text(
                'Forgot Password',
              ),
            ),
            Container(
                height: 50,
                padding: const EdgeInsets.fromLTRB(10, 0, 10, 0),
                child: RoundedLoadingButton(
                  child: Text('Login', style: TextStyle(color: Colors.white)),
                  controller: _btnController,
                  onPressed: _loginExit,
                )),
            Row(
              children: <Widget>[
                const Text('Does not have account?'),
                TextButton(
                  child: const Text(
                    'Sign up',
                    style: TextStyle(fontSize: 20),
                  ),
                  onPressed: () {
                    //signup screen
                  },
                )
              ],
              mainAxisAlignment: MainAxisAlignment.center,
            ),
            SignInButton(
              Buttons.Google,
              onPressed: signIn,
            ),
            ElevatedButton(
                style: ElevatedButton.styleFrom(
                    primary: Colors.white,
                    textStyle: TextStyle(color: Colors.white)),
                onPressed: signOut,
                child: const Text('Google Sign out',
                    style: TextStyle(color: Colors.grey)))
          ],
        ));
  }
  // else {
  //   return Padding(
  //       padding: const EdgeInsets.all(10),
  //       child: ListView(
  //         children: <Widget>[
  //           Container(
  //               alignment: Alignment.center,
  //               padding: const EdgeInsets.all(10),
  //               child: const Text(
  //                 'AREA',
  //                 style: TextStyle(
  //                     color: Color(0xff333333),
  //                     fontWeight: FontWeight.w500,
  //                     fontSize: 30),
  //               )),
  //           Container(
  //               alignment: Alignment.center,
  //               padding: const EdgeInsets.all(10),
  //               child: const Text(
  //                 'Sign in',
  //                 style: TextStyle(fontSize: 20),
  //               )),
  //           Container(
  //             padding: const EdgeInsets.all(10),
  //             child: TextField(
  //               controller: nameController,
  //               decoration: const InputDecoration(
  //                 border: OutlineInputBorder(),
  //                 labelText: 'User Name',
  //               ),
  //             ),
  //           ),
  //           Container(
  //             padding: const EdgeInsets.fromLTRB(10, 10, 10, 0),
  //             child: TextField(
  //               obscureText: true,
  //               controller: passwordController,
  //               decoration: const InputDecoration(
  //                 border: OutlineInputBorder(),
  //                 labelText: 'Password',
  //               ),
  //             ),
  //           ),
  //           TextButton(
  //             onPressed: () {
  //               //forgot password screen
  //             },
  //             child: const Text(
  //               'Forgot Password',
  //             ),
  //           ),
  //           Container(
  //               height: 50,
  //               padding: const EdgeInsets.fromLTRB(10, 0, 10, 0),
  //               child: RoundedLoadingButton(
  //                 child: Text('Login', style: TextStyle(color: Colors.white)),
  //                 controller: _btnController,
  //                 onPressed: _loginExit,
  //               )),
  //           Row(
  //             children: <Widget>[
  //               const Text('Does not have account?'),
  //               TextButton(
  //                 child: const Text(
  //                   'Sign up',
  //                   style: TextStyle(fontSize: 20),
  //                 ),
  //                 onPressed: () {
  //                   //signup screen
  //                 },
  //               )
  //             ],
  //             mainAxisAlignment: MainAxisAlignment.center,
  //           ),
  //           SignInButton(
  //             Buttons.Google,
  //             onPressed: signIn,
  //           ),
  //           // ElevatedButton(
  //           //     style: ElevatedButton.styleFrom(
  //           //         primary: Colors.grey,
  //           //         textStyle: TextStyle(color: Colors.white)),
  //           //     onPressed: () {
  //           //       print(globals.user?.email);
  //           //     },
  //           //     child: const Text('test'))
  //         ],
  //       ));
  // }

  // if (user != null) {
  //   return Padding(
  //     padding: const EdgeInsets.fromLTRB(2, 12, 2, 12),
  //     child: Column(
  //       children: [
  //         ListTile(
  //           leading: GoogleUserCircleAvatar(identity: user),
  //           title: Text(
  //             user.displayName ?? '',
  //             style: TextStyle(fontSize: 22),
  //           ),
  //           subtitle: Text(user.email, style: TextStyle(fontSize: 22)),
  //         ),
  //         const SizedBox(
  //           height: 20,
  //         ),
  //         const Text(
  //           'Signed in successfully',
  //           style: TextStyle(fontSize: 20),
  //         ),
  //         const SizedBox(
  //           height: 10,
  //         ),
  //         ElevatedButton(onPressed: signOut, child: const Text('Sign out')),
  //         ElevatedButton(onPressed: test, child: Text("test"))
  //       ],
  //     ),
  //   );
  // } else {
  //   return Padding(
  //     padding: const EdgeInsets.all(12.0),
  //     child: Column(
  //       children: [
  //         const SizedBox(
  //           height: 20,
  //         ),
  //         const Text(
  //           'You are not signed in',
  //           style: TextStyle(fontSize: 30),
  //         ),
  //         const SizedBox(
  //           height: 10,
  //         ),
  //         ElevatedButton(
  //             onPressed: signIn,
  //             child: const Padding(
  //               padding: EdgeInsets.all(8.0),
  //               child: Text('Sign in', style: TextStyle(fontSize: 30)),
  //             )),
  //       ],
  //     ),
  //   );
  // }
  // }
}
