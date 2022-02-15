import 'package:flutter/material.dart';

class widgets extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      padding: const EdgeInsets.all(40),
      itemCount: 4,
      itemBuilder: (BuildContext context, int index) {
        return Container(
          height: 300.0,
          width: 150.0,
          color: Colors.transparent,
          child: Container(
              decoration: const BoxDecoration(
                  color: Colors.lightBlue,
                  borderRadius: BorderRadius.all(Radius.circular(10.0))),
              child: const Center(
                child: Text(
                  "TEST",
                  style: TextStyle(fontSize: 22, color: Colors.white),
                  textAlign: TextAlign.center,
                ),
              )),
        );
      },
      separatorBuilder: (BuildContext context, int index) => const Divider(),
    );
  }
}
