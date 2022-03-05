import 'package:area_app/Screens/Api/getWidgets.dart';
import 'package:area_app/Screens/App/AppScreens/first_screen.dart';
import 'package:area_app/Screens/App/AppScreens/second_screen.dart';
import 'package:area_app/Screens/App/AppScreens/third_screen.dart';
import 'package:area_app/Screens/App/loader.dart';
import 'package:flutter/material.dart';

enum ScreenType {
  firstScreen,
  secondScreen,
  thirdScreen,
}

class Application extends StatefulWidget {
  const Application({
    Key? key,
  }) : super(key: key);

  @override
  State<Application> createState() => _ApplicationState();
}

class _ApplicationState extends State<Application> {
  ScreenType _screenType = ScreenType.firstScreen;

  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  void _incrementCounter() async {
    Loader.appLoader.showLoader();
    await Future.delayed(Duration(seconds: 5));
    // Loader.appLoader.hideLoader();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      appBar: AppBar(
        centerTitle: false,
        iconTheme: const IconThemeData(color: Color(0xff333333)),
        backgroundColor: Colors.white,
        elevation: 0,
        bottom: PreferredSize(
            child: Container(
              color: const Color(0xff333333),
              height: 4.0,
              width: 350,
            ),
            preferredSize: const Size.fromHeight(10.0)),
        title: Text(
          getTitle(_screenType),
          style: const TextStyle(color: Color(0xff333333)),
        ),
      ),
      endDrawer: Drawer(
        backgroundColor: const Color(0xFF333333),
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            DrawerHeader(
                child: Row(
              children: [
                IconButton(
                  onPressed: () => {onTabTapped(ScreenType.thirdScreen)},
                  icon: const Icon(Icons.account_circle_rounded),
                  color: Colors.white,
                  iconSize: 60,
                ),
                Wrap(
                  direction: Axis.vertical,
                  spacing: 0,
                  runSpacing: 0,
                  children: const [
                    Text(
                      'UserName',
                      style: TextStyle(color: Colors.white, fontSize: 20),
                    ),
                    Text(
                      'UserMail',
                      style: TextStyle(color: Colors.white, fontSize: 20),
                    ),
                  ],
                )
              ],
            )),
            const Divider(
              height: 0,
              thickness: 3,
              indent: 30,
              endIndent: 30,
              color: Colors.white,
            ),
            const SizedBox(
              height: 20,
            ),
            ListTile(
              leading: const Icon(
                Icons.home,
                color: Colors.white,
              ),
              title: const Text(
                'My Widgets',
                style: TextStyle(color: Colors.white, fontSize: 20),
              ),
              onTap: () => onTabTapped(ScreenType.firstScreen),
            ),
            ListTile(
              leading: const Icon(
                Icons.add,
                color: Colors.white,
              ),
              title: const Text(
                'Create',
                style: TextStyle(color: Colors.white, fontSize: 20),
              ),
              onTap: () => onTabTapped(ScreenType.secondScreen),
            ),
            ListTile(
              leading: const Icon(
                Icons.account_box_rounded,
                color: Colors.white,
              ),
              title: const Text(
                'Profile',
                style: TextStyle(color: Colors.white, fontSize: 20),
              ),
              onTap: () => onTabTapped(ScreenType.thirdScreen),
            ),
          ],
        ),
      ),
      body: _body(_screenType),
    );
  }

  Widget _body(ScreenType screenType) {
    switch (screenType) {
      case ScreenType.firstScreen:
        return FirstScreen(areas: getWidgets());
      case ScreenType.secondScreen:
        return const SecondScreen();
      case ScreenType.thirdScreen:
        return ThirdScreen();
    }
  }

  void onTabTapped(ScreenType screenType) {
    if ((_scaffoldKey.currentState ?? ScaffoldState()).isDrawerOpen) {
      (_scaffoldKey.currentState ?? ScaffoldState()).openEndDrawer();
    }
    setState(() {
      _screenType = screenType;
    });
    Navigator.pop(context);
  }

  String getTitle(ScreenType screenType) {
    switch (screenType) {
      case ScreenType.firstScreen:
        return "AREA | My Widgets";
      case ScreenType.secondScreen:
        return "AREA | Create";
      case ScreenType.thirdScreen:
        return "AREA | Profile";
    }
  }
}
