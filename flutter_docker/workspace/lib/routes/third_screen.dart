import 'package:flutter/material.dart';

class ThirdScreen extends StatelessWidget {
  const ThirdScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const SizedBox(
          height: 80,
        ),
        Wrap(
          children: [
            SizedBox(
              width: 50,
            ),
            const Icon(
              Icons.account_circle_rounded,
              size: 100,
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
                  height: 50.0,
                  width: 200.0,
                  color: Colors.transparent,
                  child: Container(
                      decoration: const BoxDecoration(
                          color: Color(0xff333333),
                          borderRadius:
                              BorderRadius.all(Radius.circular(10.0))),
                      child: const Center(
                        child: Text(
                          "USERNAME",
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
                  height: 50.0,
                  width: 390.0,
                  color: Colors.transparent,
                  child: Container(
                      decoration: const BoxDecoration(
                          color: Color(0xff333333),
                          borderRadius:
                              BorderRadius.all(Radius.circular(10.0))),
                      child: const Center(
                        child: Text(
                          "monmail@gmail.com",
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
                  "     Password",
                  style: TextStyle(fontSize: 20),
                ),
                Container(
                  margin: const EdgeInsets.only(left: 20.0, right: 20.0),
                  height: 50.0,
                  width: 390.0,
                  color: Colors.transparent,
                  child: Container(
                      decoration: const BoxDecoration(
                          color: Color(0xff333333),
                          borderRadius:
                              BorderRadius.all(Radius.circular(10.0))),
                      child: const Center(
                        child: Text(
                          "monmotdepasse",
                          style: TextStyle(fontSize: 22, color: Colors.white),
                          textAlign: TextAlign.center,
                        ),
                      )),
                ),
              ],
            ),
          ],
        ),
      ],
    );
  }
}
