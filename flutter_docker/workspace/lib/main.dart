import 'package:area_app/widgets.dart';
import 'package:flutter/material.dart';
import 'sideBar.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          centerTitle: false,
          iconTheme: IconThemeData(color: Color(0xff333333)),
          backgroundColor: Colors.white,
          elevation: 0,
          bottom: PreferredSize(
              child: Container(
                color: Color(0xff333333),
                height: 4.0,
                width: 350,
              ),
              preferredSize: Size.fromHeight(10.0)),
          title: Text(
            'AREA',
            style: TextStyle(color: Color(0xff333333)),
          ),
        ),
        endDrawer: NavDrawer(),
        body: widgets());
  }
}
