import 'routes/first_screen.dart';
import 'routes/second_screen.dart';
import 'routes/third_screen.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

enum ScreenType {
  firstScreen,
  secondScreen,
  thirdScreen,
}

class _MyHomePageState extends State<MyHomePage> {
  ScreenType _screenType = ScreenType.firstScreen;

  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

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
        return const FirstScreen();
      case ScreenType.secondScreen:
        return const SecondScreen();
      case ScreenType.thirdScreen:
        return const ThirdScreen();
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









// import 'package:area_app/widgets.dart';
// import 'package:flutter/material.dart';
// import 'sideBar.dart';

// void main() => runApp(MyApp());

// class MyApp extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       debugShowCheckedModeBanner: false,
//       title: 'Flutter Demo',
//       theme: ThemeData(
//         primarySwatch: Colors.blue,
//       ),
//       home: MyHomePage(),
//     );
//   }
// }

// class MyHomePage extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//         appBar: AppBar(
//           centerTitle: false,
//           iconTheme: IconThemeData(color: Color(0xff333333)),
//           backgroundColor: Colors.white,
//           elevation: 0,
//           bottom: PreferredSize(
//               child: Container(
//                 color: Color(0xff333333),
//                 height: 4.0,
//                 width: 350,
//               ),
//               preferredSize: Size.fromHeight(10.0)),
//           title: Text(
//             'AREA',
//             style: TextStyle(color: Color(0xff333333)),
//           ),
//         ),
//         endDrawer: NavDrawer(),
//         body: widgets());
//   }
// }