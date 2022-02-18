// ignore_for_file: prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';

class NavDrawer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: const Color(0xFF333333),
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          DrawerHeader(
              child: Row(
            children: [
              IconButton(
                onPressed: () => {},
                icon: const Icon(Icons.account_circle_rounded),
                color: Colors.white,
                iconSize: 60,
              ),
              Wrap(
                direction: Axis.vertical,
                spacing: 0,
                runSpacing: 0,
                children: [
                  const Text(
                    'UserName',
                    style: TextStyle(color: Colors.white, fontSize: 20),
                  ),
                  const Text(
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
          SizedBox(
            height: 20,
          ),
          ListTile(
            leading: const Icon(
              Icons.home,
              color: Colors.white,
            ),
            title: const Text(
              'HOME',
              style: TextStyle(color: Colors.white, fontSize: 20),
            ),
            onTap: () => {},
          ),
          ListTile(
            leading: const Icon(
              Icons.add,
              color: Colors.white,
            ),
            title: const Text(
              'CREATE',
              style: TextStyle(color: Colors.white, fontSize: 20),
            ),
            onTap: () => {},
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
            onTap: () => {},
          ),
          ListTile(
            leading: const Icon(
              Icons.account_box_rounded,
              color: Colors.white,
            ),
            title: const Text(
              'Sign Out',
              style: TextStyle(color: Colors.white, fontSize: 20),
            ),
            onTap: () => {},
          ),
        ],
      ),
    );
  }
}
