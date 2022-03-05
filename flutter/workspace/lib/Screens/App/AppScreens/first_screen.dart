import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
// import 'package:rolling_switch/rolling_switch.dart';

class FirstScreen extends StatefulWidget {
  final Future<Map<String, dynamic>> areas;
  const FirstScreen({Key? key, required this.areas}) : super(key: key);

  @override
  State<FirstScreen> createState() => _FirstScreenState();
}

class _FirstScreenState extends State<FirstScreen> {
  bool state = true;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Map<String, dynamic>>(
      future: widget.areas,
      builder: (BuildContext context, AsyncSnapshot<Map<String, dynamic>> snapshot) {
        if (snapshot.hasData) {
          return ListView.separated(
            padding: const EdgeInsets.all(40),
            itemCount: snapshot.data!.length,
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
                            SizedBox(
                              width: 280,
                              child: Text(
                                snapshot.data![index].name,
                                style: TextStyle(fontSize: 18, color: Colors.white),
                                textAlign: TextAlign.justify,
                              ),
                            ),
                            const SizedBox(height: 50),
                            Row(
                              // alignment: WrapAlignment.spaceEvenly,
                              // direction: Axis.horizontal,
                              children: [
                                // SizedBox(width: 40),
                                // CupertinoSwitch(
                                //     value: state,
                                //     onChanged: (value) {
                                //       state = value;
                                //       setState(() {});
                                //     }),
                                // const SizedBox(width: 50),
                                ElevatedButton.icon(
                                    style: ElevatedButton.styleFrom(
                                      primary: Colors.red,
                                    ),
                                    onPressed: () => {},
                                    icon: Icon(Icons.cancel_rounded),
                                    label: Text("CANCEL"))
                              ],
                            )
                          ],
                    )
                  )
                ),
              );
            },
            separatorBuilder: (BuildContext context, int index) => const Divider(),
          );
        } else {
          return Container(
            color: Colors.white // This is optional
          );
        }
      }
    );
  }
}
