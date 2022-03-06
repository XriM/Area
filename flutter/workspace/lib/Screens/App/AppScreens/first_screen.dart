import 'package:area_app/constants.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
import 'package:area_app/globals.dart' as globals;
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
    double width = MediaQuery.of(context).size.width / 1.1;
    double height = MediaQuery.of(context).size.height / 3.5;
    Icon getIconAction(String serviceName) {
      print('----------');
      print(serviceName);
      if (serviceName == 'Steam players changed') {
        return Icon(
          MdiIcons.steam,
          color: Colors.white,
          size: 40,
        );
      }
      if (serviceName == 'Github') {
        return Icon(
          MdiIcons.github,
          color: Colors.white,
          size: 40,
        );
      }
      if (serviceName == 'Weather') {
        return Icon(
          MdiIcons.weatherRainy,
          color: Colors.white,
          size: 40,
        );
      }
      if (serviceName == 'Crypto') {
        return Icon(
          MdiIcons.bitcoin,
          color: Colors.white,
          size: 40,
        );
      }
      if (serviceName == 'Outlook') {
        return Icon(
          MdiIcons.microsoftOutlook,
          color: Colors.white,
          size: 40,
        );
      }
      if (serviceName == 'Youtube') {
        return Icon(
          MdiIcons.youtube,
          color: Colors.white,
          size: 40,
        );
      }
      if (serviceName == 'Reddit') {
        return Icon(
          MdiIcons.reddit,
          color: Colors.white,
          size: 40,
        );
      }
      if (serviceName == 'One Drive') {
        return Icon(
          MdiIcons.microsoftOnedrive,
          color: Colors.white,
          size: 40,
        );
      } else {
        print(serviceName);
        return Icon(
          MdiIcons.batteryUnknown,
          color: Colors.white,
          size: 40,
        );
      }
    }

    Icon getIconReaction(String reactionName) {
      print('----------');
      print(reactionName);
      if (reactionName == 'Trello') {
        return Icon(
          MdiIcons.trello,
          color: Colors.white,
          size: 40,
        );
      }
      if (reactionName == 'Send Discord message') {
        return Icon(
          MdiIcons.discord,
          color: Colors.white,
          size: 40,
        );
      }
      if (reactionName == 'Outlook') {
        return Icon(
          MdiIcons.microsoftOutlook,
          color: Colors.white,
          size: 40,
        );
      }
      if (reactionName == 'Github') {
        return Icon(
          MdiIcons.github,
          color: Colors.white,
          size: 40,
        );
      } else {
        print(reactionName);
        return Icon(
          MdiIcons.batteryUnknown,
          color: Colors.white,
          size: 40,
        );
      }
    }

    Text getActionDescrpition(String serviceName) {
      if (serviceName == 'Steam players changed') {
        return globals.steamDescription;
      }
      if (serviceName == 'Received email') {
        return globals.actionOutlookDescription;
      }
      if (serviceName == 'Youtube subscribers changed') {
        return globals.youtubeDescription;
      }
      if (serviceName == 'Subreddit subscriber') {
        return globals.redditDescription;
      }
      if (serviceName == 'GitHub repo stared') {
        return globals.actionGitDescription;
      }
      if (serviceName == 'Weather changed') {
        return globals.weatherDescription;
      }
      if (serviceName == 'CryptoCurrency price changed') {
        return globals.cryptoDescription;
      }
      if (serviceName == 'File added') {
        return globals.oneDriveDescription;
      } else
        return Text("data");
    }

    Text getReactionDescrpition(String reactionName) {
      if (reactionName == 'Send Discord message') {
        return globals.discordDescription;
      }
      if (reactionName == 'Send Git Issue') {
        return globals.reactionGitDescription;
      }
      if (reactionName == 'Send email') {
        return globals.reactionOutlookDescription;
      }
      if (reactionName == 'Add trello card') {
        return globals.trelloDescription;
      } else
        return Text("data");
    }

    return FutureBuilder<Map<String, dynamic>>(
        future: widget.areas,
        builder: (BuildContext context,
            AsyncSnapshot<Map<String, dynamic>> snapshot) {
          if (snapshot.hasData && snapshot.data!['areas'].length > 0) {
            return ListView.separated(
              padding: const EdgeInsets.all(40),
              itemCount: snapshot.data!['areas'].length,
              itemBuilder: (BuildContext context, int index) {
                return Container(
                  height: height,
                  width: width,
                  color: Colors.transparent,
                  child: Container(
                      decoration: const BoxDecoration(
                          color: kPrimaryColor,
                          borderRadius:
                              BorderRadius.all(Radius.circular(10.0))),
                      child: Container(
                          margin:
                              const EdgeInsets.only(left: 20.0, right: 20.0),
                          child: Column(
                            // direction: Axis.vertical,
                            // alignment: WrapAlignment.spaceBetween,
                            children: [
                              // const Text(" "),
                              const SizedBox(
                                height: 15,
                              ),
                              SizedBox(
                                width: 280,
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceEvenly,
                                  children: [
                                    Text(
                                      snapshot.data!['areas'][index]['name'],
                                      style: TextStyle(
                                          fontSize: 18,
                                          color: Colors.white,
                                          fontWeight: FontWeight.bold),
                                      textAlign: TextAlign.justify,
                                    ),
                                    getIconAction(snapshot.data!['areas'][index]
                                        ['action']['name']),
                                    getIconReaction(snapshot.data!['areas']
                                        [index]['reaction']['name']),
                                  ],
                                ),
                              ),
                              const SizedBox(height: 20),
                              // Text(
                              //     "azerezeeekzaefazefzaefazefazefazefazefazefazef"),
                              getActionDescrpition(snapshot.data!['areas']
                                  [index]['action']['name']),
                              Divider(
                                color: Colors.white,
                              ),
                              getReactionDescrpition(snapshot.data!['areas']
                                  [index]['reaction']['name']),
                              // Text(
                              //     "azerezeeekzaefazefzaefazefazefazefazefazefazef"),
                              const SizedBox(height: 20),
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
                          ))),
                );
              },
              separatorBuilder: (BuildContext context, int index) =>
                  const Divider(),
            );
          } else {
            return Container(color: Colors.white // This is optional
                );
          }
        });
  }
}
