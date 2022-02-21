import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
// import 'package:rolling_switch/rolling_switch.dart';

class FirstScreen extends StatefulWidget {
  const FirstScreen({Key? key}) : super(key: key);

  @override
  State<FirstScreen> createState() => _FirstScreenState();
}

class _FirstScreenState extends State<FirstScreen> {
  bool state = false;

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      padding: const EdgeInsets.all(40),
      itemCount: 4,
      itemBuilder: (BuildContext context, int index) {
        return Container(
          height: 400.0,
          width: 150.0,
          color: Colors.transparent,
          child: Container(
              decoration: const BoxDecoration(
                  color: Colors.lightBlue,
                  borderRadius: BorderRadius.all(Radius.circular(10.0))),
              child: Container(
                  margin: const EdgeInsets.only(left: 20.0, right: 20.0),
                  child: Column(
                    // direction: Axis.vertical,
                    // alignment: WrapAlignment.spaceBetween,
                    children: [
                      const Text(" "),
                      const SizedBox(
                        height: 25,
                      ),
                      const SizedBox(
                        width: 280,
                        child: Text(
                          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum ",
                          style: TextStyle(fontSize: 18, color: Colors.white),
                          textAlign: TextAlign.justify,
                        ),
                      ),
                      const SizedBox(height: 50),
                      Row(
                        // alignment: WrapAlignment.spaceEvenly,
                        // direction: Axis.horizontal,
                        children: [
                          SizedBox(width: 40),
                          CupertinoSwitch(
                              value: state,
                              onChanged: (value) {
                                state = value;
                                setState(() {});
                              }),
                          const SizedBox(width: 50),
                          ElevatedButton.icon(
                              style: ElevatedButton.styleFrom(
                                primary: Colors.red,
                              ),
                              onPressed: () => {},
                              icon: Icon(Icons.cancel_presentation_rounded),
                              label: Text("CANCEL"))
                        ],
                      )
                    ],
                  ))),
        );
      },
      separatorBuilder: (BuildContext context, int index) => const Divider(),
    );
  }
}
