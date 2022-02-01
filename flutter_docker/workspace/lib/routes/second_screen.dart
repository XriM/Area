import 'package:flutter/material.dart';

class SecondScreen extends StatelessWidget {
  const SecondScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Column(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Container(
            height: 60.0,
            width: 300.0,
            color: Colors.transparent,
            child: Container(
                decoration: const BoxDecoration(
                    color: Colors.lightBlue,
                    borderRadius: BorderRadius.all(Radius.circular(10.0))),
                child: Container(
                  margin: const EdgeInsets.only(left: 30.0, right: 30.0),
                  child: const SizedBox(
                    width: 280,
                    child: Text(
                      "IF THIS",
                      style: TextStyle(fontSize: 18, color: Colors.white),
                      textAlign: TextAlign.justify,
                    ),
                  ),
                ))),
        Container(
            height: 60.0,
            width: 300.0,
            color: Colors.transparent,
            child: Container(
                decoration: const BoxDecoration(
                    color: Colors.lightBlue,
                    borderRadius: BorderRadius.all(Radius.circular(10.0))),
                child: Container(
                  margin: const EdgeInsets.only(left: 30.0, right: 30.0),
                  child: const SizedBox(
                    width: 280,
                    child: Text(
                      "IF THIS",
                      style: TextStyle(fontSize: 18, color: Colors.white),
                      textAlign: TextAlign.justify,
                    ),
                  ),
                )))
      ],
    ));
  }
}
