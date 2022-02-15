import 'package:flutter/material.dart';
import 'package:rolling_switch/rolling_switch.dart';

class FirstScreen extends StatelessWidget {
  const FirstScreen({Key? key}) : super(key: key);

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
                  margin: const EdgeInsets.only(left: 30.0, right: 30.0),
                  child: Wrap(
                    direction: Axis.vertical,
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
                      Wrap(
                        alignment: WrapAlignment.spaceEvenly,
                        direction: Axis.horizontal,
                        children: [
                          RollingSwitch.icon(
                            onChanged: (bool state) {
                              print('turned ${(state) ? 'on' : 'off'}');
                            },
                            rollingInfoRight: const RollingIconInfo(
                              icon: Icons.check,
                              text: Text('ON'),
                            ),
                            rollingInfoLeft: const RollingIconInfo(
                              icon: Icons.clear,
                              backgroundColor: Color(0xff333333),
                              text: Text('OFF'),
                            ),
                          ),
                          const SizedBox(width: 50),
                          IconButton(
                            onPressed: () => {},
                            icon: const Icon(Icons.cancel_rounded),
                            iconSize: 40,
                          ),
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
