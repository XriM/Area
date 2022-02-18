// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'dart:async';

import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:area_app/overlay.dart';
import 'package:cron/cron.dart';
import 'package:area_app/globals.dart' as globals;

import '../main.dart';

class ThirdScreen extends StatefulWidget {
  const ThirdScreen({Key? key}) : super(key: key);

  @override
  State<ThirdScreen> createState() => _ThirdScreenState();
}

class _ThirdScreenState extends State<ThirdScreen> {
  // String name = "test";
  // String email = "testmail";
  // String? tempName = globals.user?.displayName;
  // final contactNameController = TextEditingController();
  // final contactEmailController = TextEditingController();

  // void updateState() {
  //   setState(() {
  //     this.name = this.contactNameController.text;
  //     this.email = this.contactEmailController.text;
  //   });
  //   //update TextEditingControllers
  //   this.contactNameController.text = this.name;
  //   this.contactEmailController.text = this.email;
  //   // this.contactNameController.text = globals.user?.displayName as String;
  //   // this.contactEmailController.text = globals.user?.email as String;
  // }

  // void setStateA() {
  //   // this.contactNameController.text = "David a";
  //   // this.contactEmailController.text = "David a mail";
  //   if (globals.user != null) {
  //     this.contactNameController.text = globals.user?.displayName as String;
  //     this.contactEmailController.text = globals.user?.email as String;
  //   } else {
  //     this.contactNameController.text = 'null';
  //     this.contactEmailController.text = 'null';
  //   }
  //   print(globals.user?.displayName);
  //   print(globals.user?.email);
  //   updateState();
  // }

  // void setStateB() {
  //   this.contactNameController.text = "David b";
  //   this.contactEmailController.text = "David b mail";
  //   updateState();
  // }

  @override
  Widget build(BuildContext context) {
//     // updateState();
//     Timer mytimer = Timer.periodic(Duration(seconds: 5), (timer) {
//       setStateA();
//       //code to run on every 5 seconds
//     });
//     return Scaffold(
//       body: Center(
//         child: Column(
//           mainAxisAlignment: MainAxisAlignment.center,
//           children: <Widget>[
//             Text(
//               email,
//               style: Theme.of(context).textTheme.headline4,
//             ),
//             Text(
//               email,
//               style: Theme.of(context).textTheme.headline6,
//             ),
//             Text(
//               '\n',
//               style: Theme.of(context).textTheme.headline6,
//             ),
//             const Text(
//               'EDIT YOUR ACCOUNT DATA:',
//             ),
//             TextFormField(
//                 controller: contactNameController,
//                 decoration: const InputDecoration(
//                   border: UnderlineInputBorder(),
//                   labelText: 'Contact name:',
//                 )),
//             TextFormField(
//                 controller: contactEmailController, //stepValue,
//                 decoration: const InputDecoration(
//                   border: UnderlineInputBorder(),
//                   labelText: 'Contact email:',
//                 )),
//             TextButton(
//                 style: ButtonStyle(
//                   foregroundColor:
//                       MaterialStateProperty.all<Color>(Colors.blue),
//                 ),
//                 onPressed: setStateB,
//                 child: Text('Show State B')),
//             TextButton(
//                 style: ButtonStyle(
//                   foregroundColor:
//                       MaterialStateProperty.all<Color>(Colors.blue),
//                 ),
//                 onPressed: setStateA,
//                 child: Text('Show State A')),
//           ],
//         ),
//       ),
//     );
//   }
// }

    if (globals.user != null) {
      return Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(2, 12, 2, 12),
            child: Column(
              children: [
                ListTile(
                  leading: Icon(
                    Icons.account_circle_rounded,
                    size: 100,
                  ),
                  title: Text(
                    globals.user!.displayName ?? '',
                    style: TextStyle(fontSize: 22),
                  ),
                  subtitle:
                      Text(globals.user!.email, style: TextStyle(fontSize: 22)),
                ),
                const SizedBox(
                  height: 20,
                ),
                // const Text(
                //   'Signed in successfully',
                //   style: TextStyle(fontSize: 20),
                // ),
                const SizedBox(
                  height: 10,
                ),
                ElevatedButton(
                    onPressed: () {
                      RestartWidget.restartApp(context);
                    }
                    // signOut(context)
                    ,
                    child: const Text('Sign out')),
              ],
            ),
          )
        ],
      );
    } else {
      return Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(2, 12, 2, 12),
            child: Column(
              children: [
                ListTile(
                  leading: Icon(Icons.account_circle_rounded),
                  title: Text(
                    '',
                    style: TextStyle(fontSize: 22),
                  ),
                  subtitle: Text('UNKNOWN', style: TextStyle(fontSize: 22)),
                ),
                const SizedBox(
                  height: 20,
                ),
                const Text(
                  'Signed in successfully',
                  style: TextStyle(fontSize: 20),
                ),
                const SizedBox(
                  height: 10,
                ),
              ],
            ),
          ),
          ElevatedButton(
              onPressed: () {
                // globals.user = null;
                RestartWidget.restartApp(context);
              }
              // signOut(context)
              ,
              child: const Text('Sign out')),
        ],
      );
    }
  }
}
