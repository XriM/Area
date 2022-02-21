library area_app.globals;

import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';

GoogleSignInAccount? _currentUser;
GoogleSignInAccount? user = _currentUser;
String serviceName = 'IF THIS';
String servicePara = '';
Color serviceColor = Color(0xFF333333);

String reactionName = 'THEN THAT';
String reactionPara = '';
Color reactionColor = Color(0xff8F8F8F);
